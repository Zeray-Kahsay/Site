using System.Text;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Site.API.Data;
using Site.API.DTOs.Auth;
using Site.API.Entities.IdentityUser;
using Site.API.Extensions;
using Site.API.Middleware;
using Site.API.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);



// Jwt token strongly typed configuration
builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("JwtSettings"));
var jwtSettings = builder.Configuration
                    .GetSection("JwtSettings")
                    .Get<JwtSettings>() ?? throw new InvalidOperationException("Jwt settings is missing");
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
 .AddJwtBearer(options =>
 {
     var tokenKey = Encoding.UTF8.GetBytes(jwtSettings.TokenKey);
     options.TokenValidationParameters = new TokenValidationParameters
     {
         ValidateIssuerSigningKey = true,
         IssuerSigningKey = new SymmetricSecurityKey(tokenKey),
         ValidateIssuer = false,
         ValidateAudience = false
     };

 });




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

// FluentValidation 
app.Use(async (context, next) =>
{
    try
    {
        await next();
    }
    catch (ValidationException ex)
    {
        context.Response.StatusCode = 400;
        await context.Response.WriteAsJsonAsync(new
        {
            Errors = ex.Errors.Select(e => e.ErrorMessage)
        });
    }
});


app.UseAuthorization();

app.MapControllers();

// seeding data
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<SiteDbContext>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    var roleManager = services.GetRequiredService<RoleManager<AppRole>>();
    await context.Database.MigrateAsync();
    await DbInitializer.SeedAsync(userManager, context, roleManager);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration");

}


app.Run();
