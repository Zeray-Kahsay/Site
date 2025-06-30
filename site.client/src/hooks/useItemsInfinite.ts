import axiosApi from "@/lib/api/axiosApi";
import { ItemParams } from "@/types/ItemParams";
import { PaginatedItemsResponse } from "@/types/PaginatedItemsResponse";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useItemsInfinite = (params: ItemParams) => {
  return useInfiniteQuery<PaginatedItemsResponse, Error>({
    queryKey: ["items-infinite", params],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axiosApi.get<PaginatedItemsResponse>(
        "/api/items",
        {
          params: {
            ...params,
            pageNumber: pageParam,
          },
        }
      );
      return response.data;
    },
    initialPageParam: 1, //  Required in v5
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.metaData;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });
};

// return useQuery({
//   queryKey: ["items", params],
//   queryFn: async () => {
//     const response = await axiosApi.get("api/items", { params });
//     console.log(response.data);
//     return response.data; // contains metadata and items
//   },
// });
