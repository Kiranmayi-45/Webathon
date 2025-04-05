import React, { useState } from "react";

const StarRating = ({ onRate, disabled }) => {
  const [selected, setSelected] = useState(0);

  const handleClick = (star) => {
    if (!disabled) {
      setSelected(star);
      onRate(star);
    }
  };

  return (
    <div className="flex space-x-1 mt-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleClick(star)}
          className={`cursor-pointer text-3xl ${
            star <= selected ? "text-yellow-400" : "text-gray-400"
          } ${disabled ? "cursor-not-allowed" : ""}`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
