import { useLocalCart } from "../_context/LocalCartProvider";
import useGetUser from "./useGetUser";
import useRemoteCart from "./useRemoteCart";

function useCart() {
  const { user, isPending } = useGetUser();

  const remoteCart = useRemoteCart();
  const localCart = useLocalCart();

  if (user) {
    return { ...remoteCart, loadingUser: isPending };
  }

  // For local cart, we don't have a loading state since it's synchronous
  return { ...localCart, isPending: false, loadingUser: isPending };
}

export default useCart;
