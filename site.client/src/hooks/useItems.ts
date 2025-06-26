import api from "@/lib/api/axiosApi";
import { Item } from "@/types/Item";
import { useQuery } from "@tanstack/react-query";

export const useItems = () => {
  return useQuery<Item[]>({
    queryKey: ["items"],
    queryFn: async () => {
      const res = await api.get("/items");
      return res.data;
    },
  });
};
