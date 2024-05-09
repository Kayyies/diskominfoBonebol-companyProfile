"use client";
import { useState } from "react";
import CarouselImage from "@/data/CarouselImage";
import Image from "next/image";

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(1);

  const goToSlide = (newSlide) => {
    setCurrentSlide(newSlide);
  };

  const nextSlide = () => {
    const next = currentSlide === CarouselImage.length ? 1 : currentSlide + 1;
    goToSlide(next);
  };

  const prevSlide = () => {
    const prev = currentSlide === 1 ? CarouselImage.length : currentSlide - 1;
    goToSlide(prev);
  };

  return (
    <div className="">
      <div className="carousel w-full relative rounded-lg shadow-xl">
        {CarouselImage.map((image, index) => (
          <div
            key={`slide${index + 1}`}
            className={`carousel-item relative w-full ${
              index + 1 === currentSlide ? "block" : "hidden"
            }`}
          >
            <Image src={image} className="w-full" alt={`slide${index + 1}`} />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <button onClick={prevSlide} className="btn btn-circle">
                ❮
              </button>
              <button onClick={nextSlide} className="btn btn-circle">
                ❯
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
