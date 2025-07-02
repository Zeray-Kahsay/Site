using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Site.API.Data;
using Site.API.DTOs.Auth;
using Site.API.Entities.IdentityUser;
using Site.API.Exceptions;
using Site.API.Interfaces;
using Site.API.Services;

namespace Site.API.Repositories;

public class AuthRepository(
    SiteDbContext context,
    UserManager<AppUser> userManager,
    SignInManager<AppUser> signInManager,
    ITokenService tokenService
    ) : IAuthRepository
{
    private readonly UserManager<AppUser> _userManager = userManager;
    private readonly SignInManager<AppUser> _signInManager = signInManager;
    private readonly ITokenService _tokenService = tokenService;
    private readonly SiteDbContext _context = context;


    public async Task<UserDto?> RegisterUserAsync(RegisterDto registerDto)
    {
        var userFromDb = await _userManager.Users.FirstOrDefaultAsync(u => u.PhoneNumber == registerDto.PhoneNumber);

        if (userFromDb is not null) throw new BadRequestException($"User with phone number: {registerDto.PhoneNumber} has already an account");

        var newUser = new AppUser
        {
            UserName = registerDto.UserName,
            PhoneNumber = registerDto.PhoneNumber
        };

        var result = await _userManager.CreateAsync(newUser, registerDto.Password);

        if (!result.Succeeded)
        {
            var errors = string.Join("; ", result.Errors.Select(e => e.Description));
            throw new BadRequestException($"Failed to create user: {errors}");
        }


        // TO DO: return CreatAtActio- code 201

        return new UserDto
        {
            UserName = newUser.PhoneNumber,
            Id = newUser.Id,
            Token = await _tokenService.GenerateToken(newUser),
        };
    }

    public async Task<UserDto?> LoginUserAsync(LoginDto loginDto)
    {
        var userFromDb = await _userManager.Users.FirstOrDefaultAsync(u => u.PhoneNumber == loginDto.PhoneNumber)
              ?? throw new NotFoundException($"User with phone number {loginDto.PhoneNumber} not found");

        var result = await _signInManager.CheckPasswordSignInAsync(userFromDb, loginDto.Password, false);

        if (!result.Succeeded) throw new UnauthorizedException("Phone number or password is invalid");

        return new UserDto
        {
            UserName = userFromDb.UserName ?? string.Empty,
            Id = userFromDb.Id,
            PhoneNumber = userFromDb.PhoneNumber ?? string.Empty,
            Token = await _tokenService.GenerateToken(userFromDb),
        };


    }

    public async Task<UserDto> GetUserById(int id)
    {
        var userDb = await _context.Users.FirstOrDefaultAsync(u => u.Id == id) ?? throw new NotFoundException($"user with id {id} not found ");

        return new UserDto
        {
            UserName = userDb.UserName ?? string.Empty,
            PhoneNumber = userDb.PhoneNumber ?? string.Empty,

            // more properties later as needed.
        };
    }
}
