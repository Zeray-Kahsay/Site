using System;

namespace Site.API.Entities.Item;

public class Category
{
  public int Id { get; set; }
  public string Name { get; set; } = string.Empty; // e.g. "Residential", "Business"

  public List<Item> Items { get; set; } = [];
}

