namespace Site.API.RequestHelpers;

public class ItemParams : PaginationParams
{
    public int? CategoryId { get; set; }
    public int? TypeId { get; set; }
    public string? SearchTerm { get; set; }
    public string? OrderBy { get; set; }

}
