import AddToCart from "@/app/_components/AddToCart";
import Product from "@/app/_types/Products";

function Details({ product }: { product: Product }) {
  return (
    <div className="flex-1 flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
      <div className="flex items-center gap-4 text-lg">
        <span className="text-accent font-semibold text-2xl">
          ${product.price}
        </span>
        {product.discountPercentage > 0 && (
          <span className="text-green-600 font-medium">
            {product.discountPercentage}% OFF
          </span>
        )}
      </div>
      <div className="text-gray-600">{product.description}</div>
      <div className="flex flex-wrap gap-2 text-sm mt-2">
        <span className="bg-gray-100 px-2 py-1 rounded">
          Category: {product.category}
        </span>
        <span className="bg-gray-100 px-2 py-1 rounded">
          Stock: {product.stock}
        </span>
        <span className="bg-gray-100 px-2 py-1 rounded">
          Shipping: {product.shippingInformation}
        </span>
        <span className="bg-gray-100 px-2 py-1 rounded">
          Status: {product.availabilityStatus}
        </span>
      </div>
      {/* Add to Cart Button */}
      <AddToCart id={product.id} price={product.price} />
    </div>
  );
}

export default Details;
