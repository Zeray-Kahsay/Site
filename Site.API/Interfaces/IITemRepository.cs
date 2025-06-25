using System;
using Site.API.DTOs;
using Site.API.Entities.Item;

namespace Site.API.Interfaces;

public interface IITemRepository
{
  Task<IEnumerable<ItemDto>> GetItemsAsync(int? typeId, int? categoryId);
  Task<Item?> GetItemByIdAsync(int id);
}
