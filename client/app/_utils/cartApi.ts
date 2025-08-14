import axios from "axios";
import type { Product } from "../_types/cart";
import toast from "react-hot-toast";

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_URL;

const cartErrorMessages = {
  CART_NOT_FOUND: "Cart not found.",
  INVALID_CART_ITEM: "Invalid cart item data.",
  INVALID_CART_ITEM_ID: "Invalid cart item ID.",
  CART_ITEMS_NOT_FOUND: "Cart items not found.",
  ITEM_NOT_FOUND: "Item not found.",
  MISSING_CART_ITEM_ID: "Cart item ID is required",
};

const cartApi = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
});

cartApi.interceptors.response.use(
  (response) => response.data,
  (err) => {
    if (err.response) {
      if (err.response.data.code === "NOT_LOGGED_IN") return;
      const code = err.response.data?.code;
      const message =
        code && cartErrorMessages[code as keyof typeof cartErrorMessages]
          ? cartErrorMessages[code as keyof typeof cartErrorMessages]
          : "An unexpected error occurred.";

      toast.error(message);
    } else if (err.request) {
      toast.error("Unable to connect to the server. Please try again later.");
    } else {
      toast.error("Error while preparing the request.");
    }

    return Promise.reject(err);
  }
);

if (!BASE_API_URL) throw new Error("Missing NEXT_PUBLIC_BASE_URL env variable");

export async function getCart() {
  const res = await cartApi.get("/cart");
  return res.data;
}

export async function addToCart(item: Product) {
  const res = await cartApi.post("/cart/add", item);
  return res.data;
}

export async function updateCart(item: Product) {
  const res = await cartApi.put("/cart/update", item);
  return res.data;
}

export async function deleteFromCart({ id }: { id: number }) {
  const res = await cartApi.delete(`/cart/delete/${id}`);
  return res.data;
}

export async function getItemsById(items: Product[]) {
  const res = await cartApi.post("/cart/get-cart-by-id", items);
  return res.data;
}
