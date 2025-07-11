using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using Site.API.Data;
using Site.API.DTOs.Auth;
using Site.API.Interfaces;
using Site.API.Repositories;
using Site.API.Services;
using Site.API.Validators;

namespace Site.API.Extensions;

public static class ApplicationServiceExtensions
{
  public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
  {
    services.AddScoped<IITemRepository, ItemRepository>();
    services.AddScoped<IClientData, ClientDataRepository>();
    services.AddScoped<IAuthRepository, AuthRepository>();
    services.AddScoped<ITokenService, TokenService>();
    services.AddFluentValidationAutoValidation();
    services.AddValidatorsFromAssemblyContaining<Program>();
    services.AddFluentValidationAutoValidation(); // no need of injecting IValidator<T> inside controller
    services.AddControllers();
    services.AddOpenApi();
    services.AddSwaggerGen();
    services.AddDbContext<SiteDbContext>(options =>
      options.UseSqlServer(config.GetConnectionString("DefaultConnection"))
    );



    return services;
  }
}
