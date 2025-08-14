"use client";

import useFilterProducts from "@/app/_hooks/useFilterProducts";
import useSyncState from "@/app/_hooks/useSyncState";
import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

function RatingFilter({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const [rating, setRating] = useState<string>(() => {
    const filterValue = !searchParams.get("rating")
      ? ""
      : searchParams.get("rating") + "+";
    return filterValue;
  });
  const updateParams = useFilterProducts();

  const applyValue = useCallback(
    (value: string | null) => setRating(value ? `${value}+` : ""),
    []
  );

  useSyncState(applyValue, "rating");

  return (
    <div>
      <h3 className="font-medium mb-3">Rating</h3>
      <select
        value={rating}
        onChange={(e) => {
          setRating(e.target.value);
          updateParams({
            filter: "rating",
            value: e.target.value ? parseInt(e.target.value).toString() : "",
            single: true,
          });
        }}
        className="w-full px-3 py-2 border border-gray-200 rounded-md"
      >
        {children}
      </select>
    </div>
  );
}

export default RatingFilter;
