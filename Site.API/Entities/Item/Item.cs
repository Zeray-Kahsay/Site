using Site.API.Entities.IdentityUser;

namespace Site.API.Entities.Item;

public class Item
{
  public int Id { get; set; }

  // Relationships
  public int OwnerId { get; set; }
  public AppUser Owner { get; set; } = null!;

  public int CategoryId { get; set; }
  public Category Category { get; set; } = null!;

  public int TypeId { get; set; }
  public ItemType Type { get; set; } = null!;

  // Item Info
  public string Title { get; set; } = string.Empty;
  public string Description { get; set; } = string.Empty;
  public decimal Price { get; set; }

  public string Location { get; set; } = string.Empty;
  public int? MinRentalDuration { get; set; } // in months

  public List<ItemPhoto> Photos { get; set; } = [];

  public ItemStatus Status { get; set; } = ItemStatus.Active;

  public bool IsPaid { get; set; } = true;

  public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

