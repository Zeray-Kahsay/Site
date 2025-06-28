using Microsoft.EntityFrameworkCore;
using Site.API.Data;
using Site.API.DTOs;
using Site.API.Exceptions;
using Site.API.Interfaces;

namespace Site.API.Repositories;

public class ClientDataRepository(SiteDbContext context) : IClientData
{
  private readonly SiteDbContext _context = context;
  public async Task<List<CategoryDto>> GetCategoriesAsync()
  {
    var categories = await _context.Categories
          .Select(c => new CategoryDto { Id = c.Id, Name = c.Name })
          .ToListAsync();

    if (categories.Count == 0) throw new NotFoundException("No category found");

    return categories;


  }

  public async Task<List<TypeDto>> GetTypesAsync()
  {
    var types = await _context.ItemTypes
          .Select(t => new TypeDto { Id = t.Id, Name = t.Name })
          .ToListAsync();

    if (types.Count == 0) throw new NotFoundException("No Item type found");

    return types;
  }
}
