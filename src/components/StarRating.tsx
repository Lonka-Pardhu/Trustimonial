import { Star } from "lucide-react";
import React, { useState } from "react";

interface StarRatingProps {
  value?: number;
  onChange?: (rating: number) => void;
  readOnly?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
  value,
  onChange,
  readOnly,
}) => {
  const [hoveredRating, setHoveredRating] = useState<number>(0);

  const handleClick = (starValue: number) => {
    if (onChange && !readOnly) {
      onChange(starValue); // Allow change if not readOnly
    }
  };

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((starValue) => (
        <Star
          key={starValue}
          onClick={() => handleClick(starValue)} // Only allows clicks when not readOnly
          onMouseEnter={() => !readOnly && setHoveredRating(starValue)} // Prevent hover effect if readOnly
          onMouseLeave={() => !readOnly && setHoveredRating(0)} // Prevent hover effect if readOnly
          strokeWidth={0}
          className={`w-5 h-5 cursor-pointer transform transition-all duration-200 ease-in-out ${
            starValue <= (hoveredRating || value)
              ? "fill-yellow-400 scale-110"
              : "fill-gray-500"
          } ${readOnly ? "cursor-default" : ""}`} // Disable cursor if readOnly
        />
      ))}
    </div>
  );
};

export default StarRating;
