import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import Product from "../_types/Products";

export function getStars(rating: number) {
  const rateStars = [];

  for (let i = 0; i < 5; i++) {
    if (rating > 0) {
      if (rating >= 1) rateStars.push(FaStar);
      else rateStars.push(FaStarHalfAlt);
      rating--;
    } else rateStars.push(FaRegStar);
  }
  return rateStars;
}

export function getRatingDistribution(reviews: Product["reviews"]) {
  console.log(reviews);
  const total = reviews?.length || 0;
  const distribution = [0, 0, 0, 0, 0];
  reviews?.forEach((r) => {
    const idx = Math.floor(r.rating) - 1;
    if (idx >= 0 && idx < 5) distribution[idx]++;
  });
  return distribution
    .map((count) => (total ? (count / total) * 100 : 0))
    .reverse();
}

export function computeRating(reviews: { rating: number }[]) {
  if (!reviews.length) return 0;
  return (
    reviews.reduce((acc: number, review) => review.rating + acc, 0) /
    reviews.length
  ).toFixed(1);
}
