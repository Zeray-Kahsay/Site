using System;
using Microsoft.AspNetCore.Identity;

namespace Site.API.Entities.IdentityUser;

public class AppRole : IdentityRole<int>
{
  public ICollection<AppUserRole> UserRoles { get; set; } = [];
}
