import { Item } from "@/types/Item";

export async function getItems(): Promise<Item[]> {
  const res = await fetch("http://localhost:5000/api/items");

  if (!res.ok) throw new Error("Failed to fetch items");
  return res.json();
}
