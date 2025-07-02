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



    return services;



  }// end of the method
}
