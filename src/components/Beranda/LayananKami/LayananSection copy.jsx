"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { LayKamData } from "@/data/LayKamData";

const LayananSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(1); // Default 1 item for mobile
  const totalItems = LayKamData.length;
  const totalPages = Math.ceil(totalItems / itemsPerSlide);

  // Responsive layout
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth >= 1024) {
        setItemsPerSlide(6); // Desktop: 6 items (2 baris x 3 items per baris)
      } else if (screenWidth >= 768) {
        setItemsPerSlide(3); // Tablet: 3 items (1 baris x 3 items)
      } else {
        setItemsPerSlide(1); // Mobile: 1 item per slide
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages); // Loop to first card when reaching the end
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages); // Loop to last card when pressing previous at first card
  };

  const getCurrentItems = () => {
    const start = currentIndex * itemsPerSlide;
    return LayKamData.slice(start, start + itemsPerSlide);
  };

  return (
    <div
      className="mx-auto bg-[url('/mesh-for-layananLight.png')] bg-contain
          bg-left-bottom bg-no-repeat dark:bg-[url('/mesh-for-layananDark.png')]"
    >
      <div className="relative flex flex-wrap justify-center gap-5 px-10">
        {/* Tombol Sebelumnya */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-gray-200 p-2 dark:bg-gray-700"
        >
          <FaArrowLeft />
        </button>

        {/* Card Container */}
        <div
          className="flex w-full overflow-hidden transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {getCurrentItems().map((item, i) => (
            <Link key={i} href={`/layanan/${item.id}`} passHref>
              <div className="dark:bg-darkSecondary dark:text-darkAccent group card mb-4 w-80 border-2 border-transparent bg-white shadow-md hover:border-blue-500 hover:shadow-md hover:transition-all hover:duration-75 md:mb-2 xl:w-card">
                <div className="card-body flex flex-col gap-5">
                  {/* Image */}
                  <div className="overflow-hidden rounded-xl">
                    <Image
                      src={item.logo}
                      height={50}
                      alt="logo"
                      className="rounded-xl transition-transform duration-200 group-hover:scale-110"
                    />
                  </div>

                  {/* Title */}
                  <h2 className="card-title font-bold text-black transition-colors duration-200 group-hover:text-[#38BDF8] dark:text-white">
                    {item.title}
                  </h2>
                  <p className="line-clamp-6 text-sm">{item.desc}</p>
                  <div className="card-actions items-center justify-between rounded py-1 pr-3 ">
                    <button>Buka Halaman</button>
                    <FaArrowRight />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Tombol Berikutnya */}
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-gray-200 p-2 dark:bg-gray-700"
        >
          <FaArrowRight />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="mt-5 flex justify-center">
        {Array.from({ length: totalPages }).map((_, pageIndex) => (
          <div
            key={pageIndex}
            className={`mx-1 h-3 w-3 rounded-full border-2 ${
              currentIndex === pageIndex ? "bg-blue-500" : "border-blue-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default LayananSection;
