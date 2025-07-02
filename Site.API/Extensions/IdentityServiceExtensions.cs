using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Site.API.Data;
using Site.API.Entities.IdentityUser;

namespace Site.API.Extensions;

public static class IdentityServiceExtensions
{
  public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
  {
    services.AddIdentity<AppUser, AppRole>(opt =>
      {
        opt.SignIn.RequireConfirmedEmail = false; // TODO: temporary til sendGrid is fixed
        opt.Password.RequireNonAlphanumeric = false;
        opt.User.RequireUniqueEmail = true;
      }).AddRoles<AppRole>()
        .AddRoleManager<RoleManager<AppRole>>()
        .AddEntityFrameworkStores<SiteDbContext>()
        .AddSignInManager<SignInManager<AppUser>>()
        .AddDefaultTokenProviders();

    services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
   .AddJwtBearer(options =>
   {
     var tokeyKey = config["JwtSettings:TokenKey"] ?? throw new Exception("TokenKey not found");
     options.TokenValidationParameters = new TokenValidationParameters
     {
       ValidateIssuerSigningKey = true,
       IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokeyKey)),
       ValidateIssuer = false,
       ValidateAudience = false
     };

   });

    return services;



  }// end of the method
}
