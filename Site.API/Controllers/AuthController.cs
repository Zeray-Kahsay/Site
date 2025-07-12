
using Microsoft.AspNetCore.Mvc;
using Site.API.DTOs.Auth;
using Site.API.Interfaces;
using Site.API.RequestHelpers;

namespace Site.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(IAuthRepository authRepository) : ControllerBase
{
    private readonly IAuthRepository _authRepo = authRepository;

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById(int id)
    {
        var user = await _authRepo.GetUserById(id);
        return user is not null ? Ok(user) : NotFound();
    }


    [HttpPost("register-user")]
    public async Task<Result<UserDto>> Register(RegisterDto registerDto)
    {
        var result = await _authRepo.RegisterUserAsync(registerDto);
        return result.IsSuccess
         ? result
         : Result<UserDto>.Failure(result.Errors, result.IsServiceUnavailable);
    }

    [HttpPost("login-user")]
    public async Task<Result<UserDto>> Login(LoginDto loginDto)
    {
        var result = await _authRepo.LoginUserAsync(loginDto);
        return result.IsSuccess
            ? result
            : Result<UserDto>.Failure(result.Errors, result.IsServiceUnavailable);
    }
}
