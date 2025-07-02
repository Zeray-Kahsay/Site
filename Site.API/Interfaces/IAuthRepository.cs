using Site.API.DTOs.Auth;

namespace Site.API.Interfaces;

public interface IAuthRepository
{
    Task<UserDto?> RegisterUserAsync(RegisterDto registerDto);
    Task<UserDto?> LoginUserAsync(LoginDto loginDto);
    Task<UserDto> GetUserById(int id);
}
