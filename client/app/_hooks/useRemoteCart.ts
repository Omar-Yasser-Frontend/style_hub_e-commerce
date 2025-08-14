import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addToCart as addToCartApi,
  deleteFromCart as deleteFromCartApi,
  getCart as getCartApi,
  updateCart as updateCartApi,
} from "../_utils/cartApi";
import { Cart, Product, CartAction } from "../_types/cart";
import useGetUser from "./useGetUser";

export default function useRemoteCart() {
  const queryClient = useQueryClient();
  const { user } = useGetUser();

  const handleMutating = async (newItem: Product) => {
    await queryClient.cancelQueries({ queryKey: ["cart"] });

    const prevCart = queryClient.getQueryData(["cart"]);

    await queryClient.setQueryData(["cart"], (old: Cart) => [...old, newItem]);

    return { prevCart };
  };

  const handleSettled = () =>
    queryClient.invalidateQueries({ queryKey: ["cart"] });

  const { mutate: addToCart } = useMutation({
    mutationFn: addToCartApi,
    onSettled: handleSettled,
    onMutate: handleMutating,
  });
  // const onSuccess = () => toast.success("success update");

  const { mutate: updateCart } = useMutation({
    mutationFn: updateCartApi,
    onSettled: handleSettled,
    // onSuccess,
    onMutate: async (newItem: Product) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      const prevCart = queryClient.getQueryData(["cart"]);

      await queryClient.setQueryData(["cart"], (old: Cart) =>
        old.map((item) => (item.id === newItem.id ? newItem : item))
      );

      return { prevCart };
    },
  });

  const { mutate: deleteFromCart } = useMutation({
    mutationFn: deleteFromCartApi,
    onSettled: handleSettled,
    onMutate: async ({ id }: { id: number }) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      const prevCart = queryClient.getQueryData(["cart"]);

      await queryClient.setQueryData(["cart"], (old: Cart) =>
        old.filter((item) => item.id !== id)
      );

      return { prevCart };
    },
  });

  function dispatch(action: CartAction): void {
    switch (action.type) {
      case "create":
        return addToCart(action.payload);
      case "update":
        return updateCart(action.payload);
      case "delete":
        return deleteFromCart(action.payload);
      default:
        return;
    }
  }

  const {
    data: cart,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartApi,
    refetchOnMount: false,
    enabled: !!user,
  });

  return { cart, dispatch, isPending, isError, error };
}
