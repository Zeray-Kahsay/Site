"use client";

import { useQuery } from "@tanstack/react-query";
import { getItems } from "@/lib/api/items";
import ItemCard from "./ItemCard";

export default function Listings() {
  const {
    data: items = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["items"],
    queryFn: getItems,
  });

  if (isLoading) return <p>Loading listings...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
