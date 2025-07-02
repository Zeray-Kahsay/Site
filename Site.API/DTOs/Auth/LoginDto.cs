using System;

namespace Site.API.DTOs.Auth;

public record LoginDto
{
    public required string PhoneNumber { get; set; }
    public required string Password { get; set; }
}
