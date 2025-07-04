"use client";

import { useState } from "react";
import ItemCard from "./ItemCard";
import { ItemParams } from "@/types/ItemParams";
import { useItemsInfinite } from "@/hooks/useItemsInfinite";
import InfiniteScroll from "react-infinite-scroll-component";
import FilterBar from "./FilterBar";
import SkeletonItemCard from "./SkeletonItemCard";

export default function ItemList() {
  const [params, setParams] = useState<ItemParams>({
    pageNumber: 1,
    pageSize: 4,
    categoryId: undefined,
    typeId: undefined,
    orderBy: undefined,
    searchTerm: "",
  });

  const { data, fetchNextPage, hasNextPage, isLoading } =
    useItemsInfinite(params);

  const handleFilterChange = (name: keyof ItemParams, value: unknown) => {
    setParams((prev) => ({
      ...prev,
      [name]: value,
      pageNumber: 1,
    }));
  };

  const items = data?.pages.flatMap((page) => page.items) || [];

  return (
    <div>
      <FilterBar params={params} onChange={handleFilterChange} />

      <InfiniteScroll
        dataLength={data?.pages.flatMap((p) => p.items).length ?? 0}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<SkeletonItemCard />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, idx) => (
              <SkeletonItemCard key={idx} />
            ))
            : items.map((item) => <ItemCard key={item.id} item={item} />)}
        </div>
      </InfiniteScroll>
    </div>
  );
}
