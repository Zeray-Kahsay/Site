using Site.API.DTOs.Auth;
using Site.API.RequestHelpers;

namespace Site.API.Interfaces;

public interface IAuthRepository
{
    Task<Result<UserDto>> RegisterUserAsync(RegisterDto registerDto);
    Task<Result<UserDto>> LoginUserAsync(LoginDto loginDto);
    Task<UserDto> GetUserById(int id);
}
