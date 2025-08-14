"use client";
import CartItem from "../_components/cart/CartItem";
import CartOrderInfo from "../_components/cart/CartOrderInfo";
import LoadingSpinner from "../_components/LoadingSpinner";
import PrimaryBtn from "../_components/PrimaryBtn";
import useCartItems from "../_hooks/useCartItems";

export default function CartPage() {
  const { cartItems, isError, isPending } = useCartItems();

  if (isPending) return <LoadingSpinner />;

  if (isError) return <div>Error: Something went wrong</div>;

  return (
    <section className="min-h-screen mt-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-[22px] font-bold mb-6">Your Cart</h1>
        <div className="flex flex-col gap-4 mb-8">
          {!cartItems?.length ? (
            <div className="text-center text-gray-500 py-12">
              Your cart is empty.
            </div>
          ) : (
            cartItems?.map(
              (item: {
                product: {
                  title: string;
                  price: number;
                  quantity: number;
                  id: number;
                  thumbnail: string;
                };
              }) => (
                <CartItem
                  key={item.product.id}
                  name={item.product.title}
                  price={item.product.price}
                  quantity={item.product.quantity}
                  productId={item.product.id}
                  image={item.product.thumbnail}
                />
              )
            )
          )}
        </div>
        {cartItems?.length > 0 && <CartOrderInfo />}
        <div className="flex justify-between items-center mt-8 gap-4">
          <PrimaryBtn href="/products">Continue Shopping</PrimaryBtn>
          <PrimaryBtn href="/checkout">Checkout</PrimaryBtn>
        </div>
      </div>
    </section>
  );
}
