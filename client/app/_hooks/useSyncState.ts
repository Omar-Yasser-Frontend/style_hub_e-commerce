import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function useSyncState(
  applyValue: (value: string | null) => void,
  filter: string
) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const value = searchParams.get(filter);
    applyValue(value);
  }, [searchParams, filter, applyValue]);
}
