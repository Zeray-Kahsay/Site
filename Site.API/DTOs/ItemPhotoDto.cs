using System;

namespace Site.API.DTOs;

public record ItemPhotoDto
{
  public int Id { get; set; }
  public string Url { get; set; } = string.Empty;

}
