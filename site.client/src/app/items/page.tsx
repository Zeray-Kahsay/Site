import ItemList from "@/components/items/ItemList";

export default function ItemsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Items</h1>
      <ItemList />
    </div>
  );
}
