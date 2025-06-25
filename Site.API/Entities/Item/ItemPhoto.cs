using System;

namespace Site.API.Entities.Item;

public class ItemPhoto
{
  public int Id { get; set; }
  public string Url { get; set; } = string.Empty;
  public string PublicId { get; set; } = string.Empty; // Cloudinary
  public int ItemId { get; set; }
  public Item Item { get; set; } = null!;
}

