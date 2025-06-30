import { useCategories } from "@/hooks/useCategories";
import { useTypes } from "@/hooks/useTypes";
import { ItemParams } from "@/types/ItemParams";

type Props = {
  params: ItemParams;
  onChange: (name: keyof ItemParams, value: unknown) => void;
};

export type Category = {
  id: number;
  name: string;
};

export type Type = {
  id: number;
  name: string;
};

const FilterBar = ({ params, onChange }: Props) => {
  const { data: categories = [], isLoading: loadingCategories } =
    useCategories();
  const { data: types = [], isLoading: loadingTypes } = useTypes();

  const isLoading = loadingCategories || loadingTypes;

  if (isLoading) {
    return <p>Loading filters...</p>;
  }
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <select
        value={params.categoryId ?? ""}
        onChange={(e) =>
          onChange(
            "categoryId",
            e.target.value ? parseInt(e.target.value) : undefined
          )
        }
        className="border p-2 rounded"
      >
        <option value="">All Categories</option>
        {categories?.map((cat: Category) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <select
        value={params.typeId ?? ""}
        onChange={(e) =>
          onChange(
            "typeId",
            e.target.value ? parseInt(e.target.value) : undefined
          )
        }
        className="border p-2 rounded"
      >
        <option value="">All Types</option>
        {types.map((type: Type) => (
          <option key={type.id} value={type.id}>
            {type.name}
          </option>
        ))}
      </select>

      <select
        value={params.orderBy ?? ""}
        onChange={(e) => onChange("orderBy", e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">Sort By</option>
        <option value="price">Price</option>
        <option value="createdAt">Date</option>
      </select>

      <input
        type="text"
        placeholder="Search..."
        value={params.searchTerm ?? ""}
        onChange={(e) => onChange("searchTerm", e.target.value)}
        className="border p-2 rounded flex-1"
      />
    </div>
  );
};

export default FilterBar;
