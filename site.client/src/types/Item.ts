// types/item.ts
export interface Item {
  id: number;
  title: string;
  description: string;
  location: string;
  price: number;
  minRentalDuration: number | null;
  category: string;
  type: string;
  photos: unknown[]; // Can be improved with a specific Photo type
  status: number;
  createdAt: string;
}
