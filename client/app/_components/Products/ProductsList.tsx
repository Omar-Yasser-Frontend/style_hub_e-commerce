"use client";

import ProductCard from "../ProductCard";
import Product from "@/app/_types/Products";
import PaginationNav from "./PaginationNav";
import LoadingSpinner from "../LoadingSpinner";
import useProducts from "@/app/_hooks/useProducts";
import PrimaryBtn from "@/app/_components/PrimaryBtn";

function ProductsList() {
  // important to check again after build
  const { data, isPending, isError, error } = useProducts();

  if (isPending) return <LoadingSpinner />;

  if (isError)
    return (
      <div className="text-burgundy font-bold text-2xl text-center mx-auto">
        <p className="mb-5">Error: {error?.message}</p>
        <PrimaryBtn href="/">Back To Home</PrimaryBtn>
      </div>
    );

  return (
    <div className="flex-1">
      <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
        {data?.products?.map((product: Product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            img={product.thumbnail}
            price={product.price}
            title={product.title}
            rate={product.rating}
          />
        ))}
      </div>

      <PaginationNav productsLenght={data?.productsLength || 0} />
    </div>
  );
}

export default ProductsList;
