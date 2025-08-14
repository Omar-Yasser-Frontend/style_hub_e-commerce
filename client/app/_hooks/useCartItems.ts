import { useQuery } from "@tanstack/react-query";
import useCart from "./useCart";
import { getItemsById } from "../_utils/cartApi";
import { Product } from "../_types/cart";

function useCartItems() {
  const { cart }: { cart: Product[] } = useCart();
  let ids: undefined | number[] = [];

  if (cart?.length) ids = cart.map((item) => item.id).sort();

  const {
    data: cartItems,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["cart-products", ...ids],
    queryFn: () => getItemsById(cart),
    enabled: cart !== undefined,
  });

  return { cartItems, isPending, isError, error };
}

export default useCartItems;
