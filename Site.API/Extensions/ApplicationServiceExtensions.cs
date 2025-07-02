using Microsoft.EntityFrameworkCore;
using Site.API.Data;
using Site.API.Interfaces;
using Site.API.Repositories;
using Site.API.Services;

namespace Site.API.Extensions;

public static class ApplicationServiceExtensions
{
  public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
  {
    services.AddScoped<IITemRepository, ItemRepository>();
    services.AddScoped<IClientData, ClientDataRepository>();
    services.AddScoped<IAuthRepository, AuthRepository>();
    services.AddScoped<ITokenService, TokenService>();
    services.AddControllers();
    services.AddOpenApi();
    services.AddSwaggerGen();
    services.AddDbContext<SiteDbContext>(options =>
      options.UseSqlServer(config.GetConnectionString("DefaultConnection"))
    );



    return services;
  }
}
