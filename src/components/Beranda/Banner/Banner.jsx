"use client";

import { useState, useEffect, useCallback } from "react";
import CarouselImage from "@/data/CarouselImage";
import Image from "next/image";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fungsi untuk langsung menuju slide tertentu
  const goToSlide = useCallback((newSlide) => {
    setCurrentSlide(newSlide);
  }, []);

  // Fungsi untuk berpindah ke slide berikutnya
  const nextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) =>
      prevSlide === CarouselImage.length - 1 ? 0 : prevSlide + 1,
    );
  }, []);

  // Fungsi untuk kembali ke slide sebelumnya
  const prevSlide = useCallback(() => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? CarouselImage.length - 1 : prevSlide - 1,
    );
  }, []);

  // Auto-slide setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // 5000ms = 5 detik
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative w-full overflow-hidden rounded-lg shadow-xl">
      {/* Kontainer Slides */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {CarouselImage.map((image, index) => (
          <div
            key={`slide${index + 1}`}
            className="relative w-full flex-shrink-0"
          >
            <Image
              src={image}
              className="h-auto w-full object-cover"
              alt={`slide${index + 1}`}
              layout="responsive"
              width={1600} // Sesuaikan dengan ukuran gambar Anda
              height={900} // Sesuaikan dengan ukuran gambar Anda
            />
          </div>
        ))}
      </div>

      {/* Tombol Navigasi */}
      <div className="absolute inset-0 flex items-center justify-between px-4">
        <button
          onClick={prevSlide}
          className="btn btn-circle hover:bg-[#38BDF8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]"
          aria-label="Tombol Sebelumnya"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={nextSlide}
          className="btn btn-circle hover:bg-[#38BDF8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]"
          aria-label="Tombol Berikutnya"
        >
          <FaArrowRight />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2">
        {CarouselImage.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 w-3 rounded-full border border-black ${
              currentSlide === index ? "bg-[#38BDF8]" : "bg-transparent"
            } focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]`}
            aria-label={`Pergi ke slide ${index + 1}`}
            role="button"
            tabIndex="0"
            onKeyPress={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                goToSlide(index);
              }
            }}
          ></button>
        ))}
      </div>
    </div>
  );
}
