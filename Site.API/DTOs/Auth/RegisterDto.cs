namespace Site.API.DTOs.Auth;

public record RegisterDto
{
    public required string UserName { get; set; }
    public required string PhoneNumber { get; set; }
    public string Email { get; set; } = string.Empty;
    public required string Password { get; set; }
    public required string ConfirmPassword { get; set; }
}
