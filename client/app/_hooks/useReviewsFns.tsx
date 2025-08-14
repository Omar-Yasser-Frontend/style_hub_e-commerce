import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

export function useReviewsFns() {
  function getStars(rating: number) {
    const rateStars = [];

    for (let i = 0; i < 5; i++) {
      if (rating > 0) {
        if (rating >= 1)
          rateStars.push(<FaStar key={i} className="text-yellow-500" />);
        else if (rating >= 0.5)
          rateStars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
        else rateStars.push(<FaRegStar key={i} className="text-yellow-500" />);
        rating--;
      } else rateStars.push(<FaRegStar key={i} className="text-yellow-500" />);
    }
    return rateStars;
  }

  return { getStars };
}
