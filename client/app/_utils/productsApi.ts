import axios from "axios";
import { ReadonlyURLSearchParams } from "next/navigation";
import Product from "../_types/Products";

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_URL;

const productsApi = axios.create({
  baseURL: BASE_API_URL,
});

productsApi.interceptors.response.use((res) => res.data);

export async function getProducts(searchParams?: ReadonlyURLSearchParams) {
  const res = await productsApi.get(
    `${BASE_API_URL}/products?limit=10&${searchParams?.toString() || ""}`
  );

  return res;
}

export async function getProductById(id: string) {
  const res = await productsApi.get<Product>(`${BASE_API_URL}/products/${id}`);

  console.log(res);

  return res;
}
