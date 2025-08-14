import ProductImage from "./ProductImage";
import Details from "./Details";
import Product from "@/app/_types/Products";

function ImageAndDetails({ product }: { product: Product }) {
  return (
    <div className="flex flex-col md:flex-row gap-10">
      {/* Image on the left */}
      <ProductImage product={product} />
      {/* Details on the right */}
      <Details product={product} />
    </div>
  );
}

export default ImageAndDetails;
