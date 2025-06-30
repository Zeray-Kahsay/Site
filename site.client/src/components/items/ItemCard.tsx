"use client";

import { Item } from "@/types/Item";

export default function ItemCard({ item }: { item: Item }) {
  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white">
      <h2 className="text-lg font-bold">{item.title}</h2>
      <p className="text-sm text-gray-500">{item.location}</p>
      <p className="text-md mt-2">{item.description}</p>
      <p className="font-semibold mt-2 text-green-600">${item.price}</p>
    </div>
  );
}
