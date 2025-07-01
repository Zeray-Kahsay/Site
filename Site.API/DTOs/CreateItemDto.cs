using System;

namespace Site.API.DTOs;

public record CreateItemDto
{
  public required string Title { get; set; }
  public required string Description { get; set; }
  public required string Location { get; set; }
  public decimal Price { get; set; }
  public int CategoryId { get; set; }
  public int TypeId { get; set; }
}
