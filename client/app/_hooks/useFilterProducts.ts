import { usePathname, useRouter, useSearchParams } from "next/navigation";

function useFilterProducts() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function updateSearchParam({
    filter,
    value,
    single = false,
  }: {
    filter: string;
    value: string;
    single?: boolean;
  }): void {
    console.log("Updating query param", { filter, value, single });
    const urlSearchParams = new URLSearchParams(searchParams.toString());

    if (single) {
      if (value) urlSearchParams.set(filter, value);
      else urlSearchParams.delete(filter);
    } else {
      const current = urlSearchParams.get(filter)?.split(",") || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];

      if (updated.length) urlSearchParams.set(filter, updated.join(","));
      else urlSearchParams.delete(filter);
    }

    router.push(`${pathname}?${urlSearchParams.toString()}`);
  }

  return updateSearchParam;
}

export default useFilterProducts;
