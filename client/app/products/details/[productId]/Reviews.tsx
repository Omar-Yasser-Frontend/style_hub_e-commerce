import Product from "@/app/_types/Products";
import {
  computeRating,
  getRatingDistribution,
  getStars,
} from "@/app/_utils/reviewsFns";

function Reviews({
  reviews,
}: {
  product: Product;
  reviews: Product["reviews"];
}) {
  const ratingDistribution = getRatingDistribution(reviews);
  const rating = computeRating(reviews);

  return (
    <div className="my-10">
      <h2 className="text-xl font-semibold mb-6">Reviews & Ratings</h2>
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Left: Main rating and stars */}
        <div className="flex flex-col items-center min-w-[120px]">
          <span className="text-5xl font-extrabold text-black-txt mb-2">
            {rating}
          </span>
          <div className="flex gap-1 mb-2 text-2xl">
            {getStars(rating as number).map((Star, idx) => (
              <Star key={idx} className="text-yellow-500" />
            ))}
          </div>
          <span className="text-gray-500 text-sm">
            {reviews.length} ratings
          </span>
        </div>
        {/* Right: Rating distribution */}
        <div
          className="flex-1 flex flex-col gap-2 md:ml-8 w-full md:max-w-[400px]"
          style={{ gap: 32 }}
        >
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center gap-4">
              <span className="w-6 text-sm font-semibold">{star}</span>
              <div className="flex-1 h-3 rounded bg-ui-background relative overflow-hidden bg-primary">
                <div
                  className="h-3 rounded bg-accent absolute top-0 left-0"
                  style={{ width: `${ratingDistribution[5 - star]}%` }}
                ></div>
              </div>
              <span className="w-10 text-right text-xs text-gray-500">
                {Math.round(ratingDistribution[5 - star])}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reviews;
