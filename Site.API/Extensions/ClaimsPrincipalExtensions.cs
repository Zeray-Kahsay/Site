using System;
using System.Security.Claims;
using Site.API.Entities.IdentityUser;
using Site.API.Exceptions;

namespace Site.API.Extensions;

public static class ClaimsPrincipalExtensions
{
  public static string GetUsername(this ClaimsPrincipal user)
  {
    var username = user.FindFirstValue(ClaimTypes.Name) ??
      throw new UnauthorizedException("Cannot get username from token, UNAUTHORIZED!");

    return username;
  }

  public static int GetUserId(this ClaimsPrincipal user)
  {
    var Id = int.Parse(user.FindFirstValue(ClaimTypes.NameIdentifier) ??
      throw new UnauthorizedException("Cannot get user id from token, UNAUTHORIZED!"));

    return Id;
  }
}
