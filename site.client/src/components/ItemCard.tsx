import { Item } from "@/types/Item";

const ItemCard = ({ item }: { item: Item }) => {
  return (
    <div className="rounded-xl shadow p-4 border bg-white">
      <h2 className="text-xl font-semibold">{item.title}</h2>
      <p className="text-gray-600">{item.location}</p>
      <p className="text-green-600 font-bold">{item.price} NOK</p>
    </div>
  );
};

export default ItemCard;
