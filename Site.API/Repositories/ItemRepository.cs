using Azure;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Site.API.Data;
using Site.API.DTOs;
using Site.API.Entities.Item;
using Site.API.Exceptions;
using Site.API.Extensions;
using Site.API.Interfaces;
using Site.API.RequestHelpers;

namespace Site.API.Repositories;

public class ItemRepository(SiteDbContext context) : IITemRepository
{
  private readonly SiteDbContext _context = context;

  public async Task<ItemDto> AddItemAsync(CreateItemDto createItemDto, int userId)
  {
    var newItem = new Item
    {
      Title = createItemDto.Title,
      Description = createItemDto.Description,
      Location = createItemDto.Location,
      Price = createItemDto.Price,
      CategoryId = createItemDto.CategoryId,
      TypeId = createItemDto.TypeId,
      OwnerId = userId,
      CreatedAt = DateTime.UtcNow
    };

    _context.Items.Add(newItem);

    if (await _context.SaveChangesAsync() < 0) throw new BadRequestException("Failed to creae an item");

    return new ItemDto
    {
      Id = newItem.Id,
      Title = newItem.Title,
      Location = newItem.Location,
      Price = newItem.Price,
      CreatedAt = newItem.CreatedAt
    };
  }

  public async Task<Item?> GetItemByIdAsync(int id)
  {
    var item = await _context.Items
             .FirstOrDefaultAsync(i => i.Id == id);

    if (item is null) throw new NotFoundException($"Item with id {id} not found");
    return item;
  }

  public async Task<IEnumerable<ItemDto>> GetItemsAsync(int? typeId, int? categoryId)
  {
    var query = _context.Items
        .Where(i => i.Status == ItemStatus.Active && i.IsPaid)
        .AsQueryable();

    if (typeId.HasValue)
      query = query.Where(i => i.TypeId == typeId.Value);

    if (categoryId.HasValue)
      query = query.Where(i => i.CategoryId == categoryId.Value);

    return await query.OrderByDescending(i => i.CreatedAt)
                      .Select(i => new ItemDto
                      {
                        Id = i.Id,
                        Title = i.Title,
                        Description = i.Description,
                        Location = i.Location,
                        Price = i.Price,
                        MinRentalDuration = i.MinRentalDuration,
                        Category = i.Category.Name,
                        Type = i.Type.Name,
                        Status = i.Status,
                        CreatedAt = i.CreatedAt
                      }).ToListAsync();
  }

  public async Task<PagedList<ItemDto>> GetPaginatedItemsAsync(ItemParams itemParams)
  {
    var query = _context.Items
        .Include(i => i.Category)
        .Include(i => i.Type)
        .AsQueryable()
        .Filter(itemParams)
        .Search(itemParams.SearchTerm)
        .Sort(itemParams.OrderBy);


    var pagedItems = await PagedList<Item>.ToPagedList(query, itemParams.PageNumber, itemParams.PageSize);

    var itemsDto = pagedItems.ToItemDtoList().ToList();

    return new PagedList<ItemDto>(itemsDto, pagedItems.MetaData.TotalCount, itemParams.PageNumber, itemParams.PageSize);
  }
}