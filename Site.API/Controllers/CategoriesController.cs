using Microsoft.AspNetCore.Mvc;
using Site.API.DTOs;
using Site.API.Interfaces;

namespace Site.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController(IClientData clientData) : ControllerBase
{
  private readonly IClientData _clientData = clientData;


  [HttpGet("get-item-categories")]
  public async Task<ActionResult<List<CategoryDto>>> GetCategories()
  {
    var categories = await _clientData.GetCategoriesAsync();
    if (categories.Count == 0) return NotFound();

    return Ok(categories);
  }

  [HttpGet("get-item-types")]
  public async Task<ActionResult<List<TypeDto>>> GetTypes()
  {
    var types = await _clientData.GetTypesAsync();
    if (types.Count == 0) return NotFound();

    return Ok(types);
  }

}
