import Product from "@/app/_types/Products";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getProducts } from "../_utils/productsApi";

type ProductResponse = {
  products: Product[];
  productsLength: number;
  maxPrice?: number;
};

function useProducts() {
  const searchParams = useSearchParams();
  const searchParamsValue = Object.fromEntries(searchParams);

  const { data, isPending, error, isError } = useQuery<ProductResponse>({
    queryKey: ["products", searchParamsValue],
    queryFn: async () => {
      const res = await getProducts(searchParams);
      return res as unknown as ProductResponse;
    },
  });

  return { data, isPending, error, isError };
}

export default useProducts;
