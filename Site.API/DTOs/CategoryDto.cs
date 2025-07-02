namespace Site.API.DTOs;

public record CategoryDto
{
  public int Id { get; set; }
  public string Name { get; set; } = string.Empty;
}
