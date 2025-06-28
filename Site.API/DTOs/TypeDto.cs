namespace Site.API.DTOs;

public record TypeDto
{
  public int Id { get; set; }
  public string Name { get; set; } = string.Empty;
}
