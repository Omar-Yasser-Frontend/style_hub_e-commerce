import useCart from "@/app/_hooks/useCart";

function CartOrderInfo() {
  const { cart, isPending } = useCart();

  if (isPending) return <p className="text-center">Loading Total Price...</p>;

  const totalPrice = cart?.reduce(
    (acc: number, cur: { price: number; quantity: number }) =>
      acc + cur.price * cur.quantity,
    0
  );

  return (
    <div className="flex items-center">
      <p>Total Price: </p>
      <span className="block ml-auto text-xl font-semibold">${totalPrice.toFixed(2)}</span>
    </div>
  );
}

export default CartOrderInfo;
