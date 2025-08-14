"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa";
import AddToCart from "./AddToCart";

type ProductCardProps = {
  id?: number;
  img: string;
  price?: number;
  title: string;
  category?: string;
  rate?: number;
  isProduct?: boolean;
};

function ProductCard({
  img,
  id,
  price,
  title,
  category,
  rate,
}: ProductCardProps) {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        if (id) router.push(`/products/details/${id}`);
        else if (category) router.push(`/products?category=${category}`);
      }}
      className="hover:shadow-lg hover:-translate-y-1 shadow-sm rounded-md p-4 bg-white relative flex flex-col cursor-pointer"
    >
      {rate !== undefined && (
        <span
          className="flex items-center gap-1 absolute top-5 right-5 text-xs px-2 py-1 bg-white/90 rounded shadow"
          style={{ minWidth: 36, minHeight: 24 }}
        >
          {rate}
          <FaStar className="text-yellow-400 text-xs" />
        </span>
      )}
      <Image
        src={img}
        className="mb-4 mx-auto"
        width={240}
        height={240}
        alt="Navigate To Accessories Category"
      />
      <p className="font-medium">{title}</p>
      {price ? <span className="mb-4 mt-2 text-burgundy">{price}$</span> : null}
      {id && price && <AddToCart id={id} price={price} />}
    </div>
  );
}

export default ProductCard;
