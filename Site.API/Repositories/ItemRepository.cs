using Microsoft.EntityFrameworkCore;
using Site.API.Data;
using Site.API.DTOs;
using Site.API.Entities.Item;
using Site.API.Interfaces;

namespace Site.API.Repositories;

public class ItemRepository(SiteDbContext context) : IITemRepository
{
  private readonly SiteDbContext _context = context;

  public async Task<Item?> GetItemByIdAsync(int id)
  {
    return await _context.Items
             .FirstOrDefaultAsync(i => i.Id == id);
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
}
