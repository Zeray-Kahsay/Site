import { Category } from "@/components/FilterBar";
import axiosApi from "@/lib/api/axiosApi";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosApi.get("/api/categories/get-item-categories");
      console.log(res.data);
      return res.data;
    },
  });
};
