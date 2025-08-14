import { useCallback, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import useFilterProducts from "../_hooks/useFilterProducts";
import useSyncState from "../_hooks/useSyncState";

export const useDoubleSlider = () => {
  const searchParams = useSearchParams();
  const updateParams = useFilterProducts();
  const timerId = useRef<NodeJS.Timeout | null>(null);

  const [rangeTheme, setRangeTheme] = useState<[number, number]>(() => {
    const filterValues = searchParams
      .get("price")
      ?.split(",")
      .map((val) => Number(val)) || [0, 16000];

    return filterValues as [number, number];
  });

  const handleSync = useCallback(
    (value: string | null) =>
      setRangeTheme(
        value
          ? (value.split(",").map((val) => +val) as [number, number])
          : [0, 16000]
      ),
    []
  );

  useSyncState(handleSync, "price");

  const debouncedUpdate = useCallback(
    (value: string) => {
      clearTimeout(timerId.current!);
      timerId.current = setTimeout(
        () =>
          updateParams({
            filter: "price",
            value,
            single: true,
          }),
        500
      );
    },
    [updateParams]
  );

  const handleSliderChange = useCallback(
    (val: number[]) => {
      setRangeTheme(val as [number, number]);
      debouncedUpdate(val.join(","));
    },
    [debouncedUpdate]
  );

  const handleInputChange = useCallback(
    (max: boolean) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(e.target.value);
      const newRange = max
        ? [rangeTheme[0], newValue]
        : [newValue, rangeTheme[1]];

      setRangeTheme(newRange as [number, number]);
      debouncedUpdate(newRange.join(","));
    },
    [rangeTheme, debouncedUpdate]
  );

  return {
    rangeTheme,
    handleSliderChange,
    handleInputChange,
  };
};
