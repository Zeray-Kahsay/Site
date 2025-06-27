using System;
using Site.API.Entities.Item;

namespace Site.API.DTOs;

public record ItemDto
{
  public int Id { get; set; }
  public string Title { get; set; } = string.Empty;
  public string Description { get; set; } = string.Empty;
  public string Location { get; set; } = string.Empty;
  public decimal Price { get; set; }
  public int? MinRentalDuration { get; set; }
  public string Category { get; set; } = string.Empty;
  public string Type { get; set; } = string.Empty;
  public List<ItemPhotoDto> Photos { get; set; } = [];
  public ItemStatus Status { get; set; }
  public DateTime CreatedAt { get; set; }
}
