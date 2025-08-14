import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

interface StarsSelectProps {
  onStars: React.Dispatch<React.SetStateAction<number>>;
  stars: number;
}

function StarsSelect({ onStars, stars }: StarsSelectProps) {
  const [starsTheme, setStarsTheme] = useState<number>(stars);

  const handleClick = (idx: number) => onStars(idx + 1);
  const handleMouseEnter = (idx: number) => setStarsTheme(idx + 1);
  const handleMouseLeave = () => setStarsTheme(stars);

  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }).map((_, idx) =>
        idx + 1 <= starsTheme ? (
          <div
            onMouseEnter={() => handleMouseEnter(idx)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(idx)}
            key={idx}
            className="px-1 cursor-pointer"
          >
            <FaStar className="text-yellow-500" size={22} />
          </div>
        ) : (
          <div
            onMouseEnter={() => handleMouseEnter(idx)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(idx)}
            key={idx}
            className="px-1 cursor-pointer"
          >
            <FaRegStar className="text-yellow-500" size={22} />
          </div>
        )
      )}
    </div>
  );
}

export default StarsSelect;
