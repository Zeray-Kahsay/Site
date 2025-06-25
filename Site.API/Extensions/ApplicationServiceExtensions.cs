using Microsoft.EntityFrameworkCore;
using Site.API.Data;

namespace Site.API.Extensions;

public static class ApplicationServiceExtensions
{
  public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
  {
    services.AddControllers();
    services.AddOpenApi();
    services.AddSwaggerGen();
    services.AddDbContext<SiteDbContext>(options =>
      options.UseSqlServer(config.GetConnectionString("DefaultConnectionString"))
    );



    return services;
  }
}
