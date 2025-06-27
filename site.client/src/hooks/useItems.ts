import axiosApi from "@/lib/api/axiosApi";
import { ItemParams } from "@/types/ItemParams";
import { useQuery } from "@tanstack/react-query";

export const useItems = (params: ItemParams) => {
  return useQuery({
    queryKey: ["items", params],
    queryFn: async () => {
      const response = await axiosApi.get("api/items", { params });
      console.log(response.data);
      return response.data; // contains metadata and items
    },
  });
};
