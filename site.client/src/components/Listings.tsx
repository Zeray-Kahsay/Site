"use client";

import { useQuery } from "@tanstack/react-query";
import { getItems } from "@/lib/api/items";

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
        <div key={item.id} className="border rounded p-4 shadow">
          <h2 className="font-semibold text-lg">{item.title}</h2>
          <p>{item.location}</p>
          <p className="text-blue-600 font-bold">{item.price} NOK</p>
        </div>
      ))}
    </div>
  );
}
