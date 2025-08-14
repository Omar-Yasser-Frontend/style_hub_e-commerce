"use client";

import { useCallback, useState } from "react";
import FilterCheckbox from "./FilterCheckbox";
import useFilterProducts from "@/app/_hooks/useFilterProducts";
import { useSearchParams } from "next/navigation";
import useSyncState from "@/app/_hooks/useSyncState";

const categories = ["Men's", "Women's"];

function CategoryFilter() {
  const searchParams = useSearchParams();
  const [cat, setCat] = useState<string[]>(() => {
    return searchParams.get("category")?.split(",") || [];
  });
  const updateParams = useFilterProducts();

  const toggleFilter = (val: string): void =>
    setCat((state) =>
      state.includes(val) ? state.filter((cat) => cat !== val) : [...state, val]
    );

  const handleSync = useCallback(
    (values: string | null) =>
      values ? setCat(values.split(",")) : setCat([]),
    []
  );

  useSyncState(handleSync, "category");

  return (
    <div>
      <h3 className="font-medium mb-3">Categories</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <FilterCheckbox
            cat={cat}
            toggle={toggleFilter}
            category={category}
            key={category}
            updateParams={updateParams}
          />
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
