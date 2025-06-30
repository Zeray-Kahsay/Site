using System;
using Site.API.DTOs;
using Site.API.Entities.Item;
using Site.API.RequestHelpers;

namespace Site.API.Interfaces;

public interface IITemRepository
{
  Task<IEnumerable<ItemDto>> GetItemsAsync(int? typeId, int? categoryId); // TO DO: Remove later 
  Task<PagedList<ItemDto>> GetPaginatedItemsAsync(ItemParams itemParams);
  Task<Item?> GetItemByIdAsync(int id);

}
