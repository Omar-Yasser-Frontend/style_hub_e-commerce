import Product from "@/app/_types/Products";
import Comment from "./Comment";
import ImageAndDetails from "./ImageAndDetails";
import Reviews from "./Reviews";
import ReviewsList from "./ReviewsList";

async function ProductDetails({
  product,
  reviews,
}: {
  product: Product;
  reviews: Product["reviews"];
}) {
  return (
    <div className="p-6 rounded-lg container mx-auto">
      <ImageAndDetails product={product} />

      <Reviews product={product} reviews={reviews} />
      <div className="mt-10">
        <ReviewsList reviews={reviews} />

        <Comment productId={product._id}>
          <textarea
            maxLength={1000}
            name="comment"
            placeholder="Comment Something..."
            className="w-full px-3 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-burgundy focus:border-transparent focus:shadow-md focus:shadow-burgundy resize-none min-h-[150px] text-base text-black-txt bg-white"
          />
        </Comment>
      </div>
    </div>
  );
}

export default ProductDetails;
