using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Site.API.Data;
using Site.API.Entities.IdentityUser;
using Site.API.Extensions;
using Site.API.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(opt =>
   {
       opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins([
           "http://localhost:3000",
            "https://localhost:3000"
       ]);
   });

//app.UseHttpsRedirection();

app.UseMiddleware<ExceptionMiddleware>();

app.UseAuthorization();

app.MapControllers();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<SiteDbContext>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    await context.Database.MigrateAsync();
    await DbInitializer.SeedAsync(userManager, context);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration");

}


app.Run();
