using System;
using Site.API.RequestHelpers;

namespace Site.API.DTOs;

public class PaginatedResult<T>
{
  public MetaData MetaData { get; set; } = null!;
  public IEnumerable<T> Items { get; set; } = null!;
}
