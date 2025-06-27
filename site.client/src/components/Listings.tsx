"use client";

import { Item } from "@/types/Item";
import ItemCard from "./ItemCard";
import Pagination from "./Pagination";
import { useItems } from "@/hooks/useItems";

export default function Listings() {
  const { data, isLoading } = useItems({ pageNumber: 1, pageSize: 4 });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.items.map((item: Item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
      <Pagination meta={data.metaData} />
    </div>
  );
}
