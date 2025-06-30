import { Type } from "@/components/items/FilterBar";
import axiosApi from "@/lib/api/axiosApi";
import { useQuery } from "@tanstack/react-query";

export const useTypes = () => {
  return useQuery<Type[]>({
    queryKey: ["types"],
    queryFn: async () => {
      const res = await axiosApi.get("/api/categories/get-item-types");
      console.log(res.data);
      return res.data;
    },
  });
};
