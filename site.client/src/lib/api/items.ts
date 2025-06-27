import { PaginatedItemsResponse } from "@/types/PaginatedItemsResponse";
import { ItemParams } from "@/types/ItemParams";

export const fetchItems = async (
  params: ItemParams
): Promise<PaginatedItemsResponse> => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, value.toString());
    }
  });

  const res = await fetch(
    `http://localhost:5000/api/items?${query.toString()}`
  );

  if (!res.ok) throw new Error("Failed to fetch items");

  return res.json();
};
