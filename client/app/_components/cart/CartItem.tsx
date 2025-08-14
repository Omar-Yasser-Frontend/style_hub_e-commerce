import Image from "next/image";
import AddToCart from "../AddToCart";

interface CartItemProps {
  name: string;
  price: number;
  quantity: number;
  productId: number;
  image: string;
}

function CartItem({ name, price, productId, image }: CartItemProps) {
  return (
    <div className="flex items-center gap-5 py-4">
      <Image
        src={image}
        alt={name}
        width={80}
        height={80}
        className="rounded object-cover"
      />
      <div className="flex flex-col min-w-0 gap-5">
        <h3 className="font-semibold max-w-xs">{name}</h3>
        <p className="text-gray-600">${price.toFixed(2)}</p>
      </div>
      <div className="ml-auto">
        <AddToCart id={productId} price={price} />
      </div>
    </div>
  );
}

export default CartItem;
