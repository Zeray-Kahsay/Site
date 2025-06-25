using System;
using Microsoft.AspNetCore.Identity;
using Site.API.Entities.Chat;

namespace Site.API.Entities.IdentityUser;

public class AppUser : IdentityUser<int>
{
  public string FirstName { get; set; } = string.Empty;
  public string LastName { get; set; } = string.Empty;
  public string Description { get; set; } = string.Empty;
  public string PhotoUrl { get; set; } = string.Empty;
  public string PublicId { get; set; } = string.Empty;
  public bool IsExternalLogin { get; set; }
  public List<AppUserRole> UserRoles { get; set; } = [];
  public List<Message> MessageSent { get; set; } = [];
  public List<Message> MessageReceived { get; set; } = [];

}
