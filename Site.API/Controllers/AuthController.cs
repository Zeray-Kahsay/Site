
using Microsoft.AspNetCore.Mvc;
using Site.API.DTOs.Auth;
using Site.API.Interfaces;

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
    public async Task<IActionResult> Register(RegisterDto registerDto)
    {
        var result = await _authRepo.RegisterUserAsync(registerDto);
        return result.IsSuccess
         ? Ok(result)
         : BadRequest(result);
    }

    [HttpPost("login-user")]
    public async Task<IActionResult> Login(LoginDto loginDto)
    {
        var result = await _authRepo.LoginUserAsync(loginDto);
        return result.IsSuccess ?
           Ok(result) :
           Unauthorized(result);
    }
}
