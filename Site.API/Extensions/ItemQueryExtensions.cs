using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Site.API.DTOs;
using Site.API.Entities.Item;
using Site.API.RequestHelpers;

namespace Site.API.Extensions;

public static class ItemQueryExtensions
{
    public static IQueryable<Item> Filter(this IQueryable<Item> query, ItemParams itemParams)
    {
        if (itemParams.CategoryId.HasValue)
            query = query.Where(i => i.CategoryId == itemParams.CategoryId);

        if (itemParams.TypeId.HasValue)
            query = query.Where(i => i.TypeId == itemParams.TypeId);

        return query;
    }

    public static IQueryable<Item> Search(this IQueryable<Item> query, string? searchTerm)
    {
        if (string.IsNullOrWhiteSpace(searchTerm)) return query;

        var term = searchTerm.Trim().ToLower();
        return query.Where(i =>
            i.Title.ToLower().Contains(term) ||
            i.Description.ToLower().Contains(term) ||
            i.Location.ToLower().Contains(term));
    }

    public static IQueryable<Item> Sort(this IQueryable<Item> query, string? orderBy)
    {
        return orderBy?.ToLower() switch
        {
            "price" => query.OrderBy(i => i.Price),
            "pricedesc" => query.OrderByDescending(i => i.Price),
            _ => query.OrderByDescending(i => i.Id)
        };
    }

}




