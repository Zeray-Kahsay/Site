using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Site.API.Entities.IdentityUser;

namespace Site.API.Services;

public interface ITokenService
{
  Task<string> GenerateToken(AppUser user);
}

public class TokenService : ITokenService
{
  private readonly SymmetricSecurityKey _key;
  private readonly UserManager<AppUser> _userManager;
  private readonly JwtSettings _settings;

  public TokenService(IConfiguration config, UserManager<AppUser> userManager, IOptions<JwtSettings> settings)
  {
    _userManager = userManager;
    _settings = settings.Value;
    //var tokenKey = config["TokenKey"];
    var tokenKey = _settings.TokenKey;
    if (string.IsNullOrEmpty(tokenKey))
    {
      throw new ArgumentNullException(nameof(tokenKey), "Token key can not be found");
    }
    _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));
  }
  public async Task<string> GenerateToken(AppUser user)
  {
    if (user.UserName == null) return $"No user with {user.UserName} found";

    // create claims
    var claims = new List<Claim>
    {
      new(JwtRegisteredClaimNames.Email, user.Email ?? string.Empty),
      new(JwtRegisteredClaimNames.NameId, user.Id.ToString()),
      new(ClaimTypes.Name, user.UserName)
    };

    var roles = await _userManager.GetRolesAsync(user);
    claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

    var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

    var tokenDescriptor = new SecurityTokenDescriptor
    {
      SigningCredentials = creds,
      Subject = new ClaimsIdentity(claims),
      Expires = DateTime.Now.AddMinutes(60)
    };

    var tokenHandler = new JwtSecurityTokenHandler();

    var token = tokenHandler.CreateToken(tokenDescriptor);

    return tokenHandler.WriteToken(token);
  }
}