using FluentValidation;
using Microsoft.AspNetCore.Identity;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Site.API.Data;
using Site.API.DTOs.Auth;
using Site.API.Entities.IdentityUser;
using Site.API.Exceptions;
using Site.API.Interfaces;
using Site.API.RequestHelpers;
using Site.API.Services;

namespace Site.API.Repositories;

public class AuthRepository(
    SiteDbContext context,
    UserManager<AppUser> userManager,
    SignInManager<AppUser> signInManager,
    ITokenService tokenService,
    IValidator<RegisterDto> registerValidator,
    IValidator<LoginDto> loginValidator,
    ILogger<RegisterDto> logger
    ) : IAuthRepository
{
    private readonly UserManager<AppUser> _userManager = userManager;
    private readonly SignInManager<AppUser> _signInManager = signInManager;
    private readonly ITokenService _tokenService = tokenService;
    private readonly SiteDbContext _context = context;
    private readonly IValidator<RegisterDto> _registerValidator = registerValidator;
    private readonly IValidator<LoginDto> _loginValidator = loginValidator;
    private readonly ILogger<RegisterDto> _logger = logger;


    public async Task<Result<UserDto>> RegisterUserAsync(RegisterDto registerDto)
    {
        try
        {
            // Validate user input
            var validationResult = await _registerValidator.ValidateAsync(registerDto);
            if (!validationResult.IsValid)
            {
                return Result<UserDto>.Failure(validationResult.Errors.Select(e => e.ErrorMessage));
            }

            // verfiy database connectivity 
            if (!await _context.Database.CanConnectAsync())
            {
                return Result<UserDto>.Failure(
               "Registration temporarily unavailable. Please try again later.",
               isServiceUnavailable: true);
            }

            // Check if phone number or email already exists 
            if (await _context.Users.AnyAsync(u => u.PhoneNumber == registerDto.PhoneNumber))
            {
                return Result<UserDto>.Failure("Phone number already exista");
            }
            if (await _userManager.FindByEmailAsync(registerDto.Email) != null)
                return Result<UserDto>.Failure("Email already exists");


            // Create new user 
            var newUser = new AppUser
            {
                UserName = registerDto.UserName,
                PhoneNumber = registerDto.PhoneNumber,
                Email = registerDto.Email ?? string.Empty
            };

            //Proceed with registration
            var result = await _userManager.CreateAsync(newUser, registerDto.Password);

            if (!result.Succeeded)
            {
                // Expected Identity errors, such as password complexity
                return Result<UserDto>.Failure(result.Errors.Select(e => e.Description));
            }

            return Result<UserDto>.Success(new UserDto
            {
                UserName = newUser.PhoneNumber,
                Id = newUser.Id,
                Token = await _tokenService.GenerateToken(newUser),
            });
        }
        catch (SqlException ex) when (ex.IsTransient) // catch unexpected errors and the Exception handler will handle them
        {
            _logger.LogWarning(ex, "Database transient failure during registration");
            return Result<UserDto>.Failure(
                "System busy. Please retry in a moment.",
                isServiceUnavailable: true);
        }
        catch (Exception ex) // Unexpected errors
        {
            _logger.LogError(ex, "Database failure during registration");
            throw;
        }



    }

    public async Task<Result<UserDto>> LoginUserAsync(LoginDto loginDto)
    {

        try
        {
            // Validate user input
            var validationResult = await _loginValidator.ValidateAsync(loginDto);
            if (!validationResult.IsValid)
            {
                return Result<UserDto>.Failure(validationResult.Errors.Select(e => e.ErrorMessage));
            }

            // verfiy database connectivity 
            if (!await _context.Database.CanConnectAsync())
            {
                return Result<UserDto>.Failure(
               "Registration temporarily unavailable. Please try again later.",
               isServiceUnavailable: true);
            }

            var userFromDb = await _userManager.Users.FirstOrDefaultAsync(u => u.PhoneNumber == loginDto.PhoneNumber);

            if (userFromDb is null)
                return Result<UserDto>.Failure($"User with Phone Number: {loginDto.PhoneNumber} not found.");

            var result = await _signInManager.CheckPasswordSignInAsync(userFromDb, loginDto.Password, false);

            if (!result.Succeeded)
                return Result<UserDto>.Failure("Invalid phone number or password.");

            return Result<UserDto>.Success(new UserDto
            {
                UserName = userFromDb.UserName ?? string.Empty,
                PhoneNumber = userFromDb.PhoneNumber ?? string.Empty,
                Id = userFromDb.Id,
                Token = await _tokenService.GenerateToken(userFromDb)
            });
        }

        catch (SqlException ex) when (ex.IsTransient) // catch unexpected errors and the Exception handler will handle them
        {
            _logger.LogWarning(ex, "Database transient failure during login");
            return Result<UserDto>.Failure(
                "System busy. Please retry in a moment.",
                isServiceUnavailable: true);
        }
        catch (Exception ex) // Unexpected errors
        {
            _logger.LogError(ex, "Database failure during login");
            throw;
        }

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
