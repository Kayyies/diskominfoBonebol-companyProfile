"use client";
import React, { useState } from "react";

const CardSlider = () => {
  // Dummy data as provided
  const names = ["kay", "adiba", "aca", "dani", "sumargo", "goliath", "liatin"];

  // Limit data to the first 7 items (as per requirement)
  const maxItems = 7;
  const visibleCards = 3;

  // States
  const [startIndex, setStartIndex] = useState(0);

  // Handlers
  const handleNext = () => {
    // If at the last real card (6th index) or "See More" card, disable Next
    if (startIndex + visibleCards < maxItems + 1) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div className="card-slider-container">
      <button onClick={handlePrev} disabled={startIndex === 0}>
        Prev
      </button>

      <div className="card-slider">
        {names
          .slice(startIndex, startIndex + visibleCards)
          .map((name, index) => (
            <div key={index} className="card">
              <p>{name}</p>
            </div>
          ))}

        {/* Show "See More" card if at end of items */}
        {startIndex + visibleCards > maxItems && (
          <div className="see-more card">
            <p>
              <a href="https://example.com/full-list">Lihat Selengkapnya</a>
            </p>
          </div>
        )}
      </div>

      <button
        onClick={handleNext}
        disabled={startIndex + visibleCards >= maxItems + 1}
      >
        Next
      </button>
    </div>
  );
};

export default CardSlider;
