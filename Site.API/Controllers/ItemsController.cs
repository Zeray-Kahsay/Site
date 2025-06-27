using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Site.API.DTOs;
using Site.API.Interfaces;
using Site.API.RequestHelpers;

namespace Site.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ItemsController(IITemRepository itemRepo) : ControllerBase
{
  private readonly IITemRepository _itemRepo = itemRepo;

  [HttpGet]
  [AllowAnonymous]
  public async Task<ActionResult<IEnumerable<ItemDto>>> GetItems([FromQuery] ItemParams itemParams)
  {
    var pagedItems = await _itemRepo.GetPaginatedItemsAsync(itemParams);
    var result = new PaginatedResult<ItemDto>
    {
      MetaData = pagedItems.MetaData,
      Items = pagedItems
    };
    return Ok(result);
  }

  [HttpGet("{id}")]
  [AllowAnonymous]
  public async Task<ActionResult<ItemDto>> GetItem(int id)
  {
    var item = await _itemRepo.GetItemByIdAsync(id);
    if (item == null) return NotFound();

    var dto = new ItemDto
    {
      Id = item.Id,
      Title = item.Title,
      Description = item.Description,
      Location = item.Location,
      Price = item.Price,
      MinRentalDuration = item.MinRentalDuration,
      Category = item.Category.Name,
      Type = item.Type.Name,
      Status = item.Status,
      CreatedAt = item.CreatedAt
    };

    return Ok(dto);
  }

}
