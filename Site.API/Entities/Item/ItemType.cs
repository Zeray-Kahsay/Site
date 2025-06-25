using System;

namespace Site.API.Entities.Item;

public class ItemType
{
  public int Id { get; set; }
  public string Name { get; set; } = string.Empty; // e.g. "Rent", "Sell"

  public List<Item> Items { get; set; } = [];
}

