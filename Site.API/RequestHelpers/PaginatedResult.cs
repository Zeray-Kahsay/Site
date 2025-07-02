

namespace Site.API.RequestHelpers;

public class PaginatedResult<T>
{
  public MetaData MetaData { get; set; } = null!;
  public IEnumerable<T> Items { get; set; } = null!;
}
