import { getStars } from "@/app/_utils/reviewsFns";
import Image from "next/image";

type Review = {
  _id: string;
  userImage: string;
  userName: string;
  createdAt: Date;
  rating: number;
  comment: string;
};

function ReviewsList({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0)
    return <div className="text-gray-400 my-8">No reviews yet.</div>;
  return (
    <div className="mt-10 space-y-6">
      {reviews.map((review) => (
        <div key={review._id} className="flex gap-4 items-start mb-4 pb-4">
          <Image
            src={review.userImage || "/default-user.jpg"}
            alt={review.userName || "User"}
            width={40}
            height={40}
            className="rounded-full object-cover bg-gray-200"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-black-txt">
                {review.userName || "User"}
              </span>
              {review.createdAt && (
                <span className="text-gray-400 text-xs">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              )}
            </div>
            <div className="flex gap-1 mb-1 text-lg">
              {getStars(review.rating).map((Star, idx) => (
                <Star key={idx} className="text-yellow-500" />
              ))}
            </div>
            <div className="text-gray-700 mb-1">{review.comment}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReviewsList;
