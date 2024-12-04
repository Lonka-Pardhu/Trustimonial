import { Star } from "lucide-react";
import { useState } from "react";
interface StarRatingProps {
  value?: number;
  onChange?: (rating: number) => void;
  readOnly?: boolean;
}
const StarRating: React.FC<StarRatingProps> = ({
  value = 0,
  onChange,
  readOnly,
}) => {
  const [hoveredRating, setHoveredRating] = useState<number>(0);

  const handleClick = (starValue: number) => {
    if (onChange && !readOnly) {
      onChange(starValue);
    }
  };

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((starValue) => (
        <Star
          key={starValue}
          onClick={() => handleClick(starValue)}
          onMouseEnter={() => !readOnly && setHoveredRating(starValue)}
          onMouseLeave={() => !readOnly && setHoveredRating(0)}
          strokeWidth={0}
          className={`w-5 h-5 cursor-pointer transform transition-all duration-200 ease-in-out ${
            starValue <= (hoveredRating || value)
              ? "fill-yellow-400 scale-110"
              : "fill-gray-500"
          } ${readOnly ? "cursor-default" : ""}`}
        />
      ))}
    </div>
  );
};
export default StarRating;
