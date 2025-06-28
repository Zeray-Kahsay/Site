using Site.API.DTOs;

namespace Site.API.Interfaces;

public interface IClientData
{
  Task<List<CategoryDto>> GetCategoriesAsync();
  Task<List<TypeDto>> GetTypesAsync();

}
