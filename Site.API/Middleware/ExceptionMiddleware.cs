using System.Text.Json;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Site.API.Exceptions;

namespace Site.API.Middleware;

public class ExceptionMiddleware
{
  private readonly RequestDelegate _next;
  private readonly ILogger<ExceptionMiddleware> _logger;
  private readonly IHostEnvironment _env;

  public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
  {
    _next = next;
    _logger = logger;
    _env = env;
  }

  public async Task InvokeAsync(HttpContext context)
  {
    try
    {
      await _next(context); // Pass request to next middleware 
    }
    catch (Exception ex)
    {
      _logger.LogError(ex, "An unhandled exception occured");


      var statusCode = ex switch
      {
        NotFoundException => StatusCodes.Status404NotFound,
        UnauthorizedException => StatusCodes.Status401Unauthorized,
        ForbiddenException => StatusCodes.Status403Forbidden,
        ConflictException => StatusCodes.Status409Conflict,
        PaymentRequiredException => StatusCodes.Status402PaymentRequired,
        BadRequestException => StatusCodes.Status400BadRequest,
        _ => StatusCodes.Status500InternalServerError
      };


      var problemDetails = new ProblemDetails
      {
        Status = statusCode,
        Title = GetTitle(statusCode),
        Detail = _env.IsDevelopment() ? ex.ToString() : ex.Message,
        Instance = context.Request.Path,
        Type = $"https://httpstatuses.com/{statusCode}"
      };

      // Handle FluentValidation errors specifically
      if (ex is ValidationException validationEx)
      {
        problemDetails.Extensions["errors"] = validationEx.Errors
            .GroupBy(e => e.PropertyName)
            .ToDictionary(
                g => g.Key,
                g => g.Select(e => e.ErrorMessage).ToArray()
            );
      }

      var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
      var json = JsonSerializer.Serialize(problemDetails, options);
      await context.Response.WriteAsync(json);
    }
  }

  private static string GetTitle(int statusCode) => statusCode switch
  {
    400 => "Bad Request",
    401 => "Unauthorized",
    402 => "Payment Required",
    403 => "Forbidden",
    404 => "Not Found",
    409 => "Conflict",
    500 => "Internal Server Error",
    _ => "Error"
  };
}




