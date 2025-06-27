using System;
using Site.API.DTOs;
using Site.API.Entities.Item;

namespace Site.API.Extensions;

public static class ItemMappingExtensions
{
  public static ItemDto ToItemDto(this Item item)
  {
    return new ItemDto
    {
      Id = item.Id,
      Title = item.Title,
      Description = item.Description,
      Price = item.Price,
      Location = item.Location,
      Status = item.Status,
      Category = item.Category?.Name ?? "Unknown",
      Type = item.Type?.Name ?? "Unknown",
      Photos = item.Photos != null
            ? [.. item.Photos.Select(p => new ItemPhotoDto
                {
                    Id = p.Id,
                    Url = p.Url
                })]
            : []
    };

  }

  public static IEnumerable<ItemDto> ToItemDtoList(this IEnumerable<Item> items)
  {
    return items.Select(item => item.ToItemDto());
  }
}
