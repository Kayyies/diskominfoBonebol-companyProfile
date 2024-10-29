"use client";

import newsData from "@/data/newsData";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

//assets
import { MdPerson } from "react-icons/md";
import { PiTagSimpleFill } from "react-icons/pi";
import { BsFillCalendarFill } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowDropleftCircle } from "react-icons/io";

export const NewsRecom = () => {
  const highlightData = newsData.slice(0, 3);
  return (
    <div className="container mx-auto flex flex-row justify-center gap-3">
      {highlightData.map((news, index) => (
        <Link href={news.link} key={index}>
          <div className="flex h-full w-card flex-col gap-3 rounded-lg border-2 border-transparent bg-white p-5 transition-all hover:border-2 hover:border-[#38BDF8] hover:bg-base-300 hover:text-blue-600 dark:bg-[#01091E] dark:text-white hover:dark:text-blue-600">
            <div className="relative h-[200px] rounded-sm">
              <Image
                src={`/${news.image}`}
                alt={news.title}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-md"
              />
            </div>
            <h2 className="text-lg font-semibold">{news.title}</h2>
            <div className="category flex flex-col gap-x-5 gap-y-2 text-sm  text-gray-600">
              <p className="flex items-center gap-2 text-ellipsis">
                🧑🏻‍🦱
                {news.author}
              </p>
              <p className="flex items-center gap-2 text-ellipsis">
                📌
                {news.category}
              </p>
              <p className="flex items-center gap-2 text-ellipsis">
                📅
                {news.date}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
export const BeritaBaru = ({ id }) => {
  //===states
  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState("next");
  const [visibleCards, setVisibleCards] = useState(3);
  //===========states drag & mouse touch
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);

  // data limit
  const maxItems = Math.min(newsData.length, 7);
  const beritaBaru = newsData.slice(0, maxItems);
  const currentPage = Math.floor(startIndex / visibleCards);
  const totalPages = Math.ceil(maxItems / visibleCards);

  //handlers
  //handle next button
  const handleNext = () => {
    if (startIndex + visibleCards >= maxItems) {
      // Kembali ke awal jika sudah di page terakhir
      setStartIndex(0);
    } else {
      setDirection("next");
      setStartIndex(startIndex + visibleCards);
    }
  };

  //handle previous button
  const handlePrev = () => {
    if (startIndex > 0) {
      setDirection("prev");
      setStartIndex(startIndex - visibleCards);
    }
  };

  useEffect(() => {
    const updateVisibleCards = () => {
      setVisibleCards(window.innerWidth < 768 ? 1 : 3);
    };

    // Update visibleCards saat komponen pertama kali di-render
    updateVisibleCards();

    // Tambahkan event listener untuk resize
    window.addEventListener("resize", updateVisibleCards);

    // Cleanup event listener saat komponen unmount
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  //interval otomatis - agar page slide otomatis
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [startIndex]);

  //handler touch
  // Handler untuk swipe
  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (window.innerWidth < 768) {
      // Swipe hanya diaktifkan di mobile
      if (startX - endX > 50) {
        handleNext(); // Swipe ke kiri (Next)
      } else if (endX - startX > 50) {
        handlePrev(); // Swipe ke kanan (Prev)
      }
    }
  };

  const handlePageClick = (pageIndex) => {
    setDirection("next"); // Sesuaikan arah transisi
    setStartIndex(pageIndex * visibleCards);
  };

  return (
    <div className="container mx-auto mb-20">
      <div className="mb-2 flex items-center justify-between">
        <div className="h-10 w-52 bg-[url(/assets/beritabonebolfull-dark.png)] bg-no-repeat dark:bg-[url(/assets/beritabonebolfull.png)] dark:bg-no-repeat"></div>
        <Link
          href="https://berita.bonebolangokab.go.id/"
          className="transition-color text-sm font-medium duration-100 hover:text-textAccent"
        >
          Lihat semua
        </Link>
      </div>
      <div className="group relative overflow-hidden">
        {/* card */}
        <div
          className="flex justify-start gap-0 transition-transform duration-500 ease-in-out md:gap-3"
          style={{
            transform: `translateX(-${currentPage * 100}%)`,
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {beritaBaru.map((news, index) => (
            <Link
              href={news.link}
              key={index}
              className="w-full flex-shrink-0 md:w-[374px]"
            >
              <div className="card grid h-[397.2px] grid-cols-1 content-start gap-3 rounded-lg border-2 border-transparent bg-white p-5 transition-all duration-100 ease-in-out hover:border-2 hover:border-[#38BDF8] hover:bg-base-300 hover:text-blue-600 dark:bg-[#01091E] dark:text-white hover:dark:text-blue-600">
                <figure className="">
                  <Image
                    src={`/${news.image}`}
                    alt={news.title}
                    width={150}
                    height={150}
                    className="h-[250px] w-full rounded-lg object-cover"
                  />
                </figure>
                <h2 className="text-md line-clamp-2 font-bold leading-tight">
                  {news.title}
                </h2>
                <div className="category flex flex-wrap gap-x-5 gap-y-2 text-xs  text-gray-600">
                  <p className="line-clamp-1 max-w-31">🧑🏻 {news.author}</p>
                  <p>📎{news.category}</p>
                  <p>📆 {news.date}</p>
                </div>
              </div>
            </Link>
          ))}
          {startIndex + visibleCards > maxItems && (
            <div className="see-more card">
              <p>
                <a href="https://example.com/full-list">Lihat Selengkapnya</a>
              </p>
            </div>
          )}
        </div>
        {/* button prev & next */}
        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          className="absolute left-1 top-1/2 hidden -translate-y-1/2  scale-0 rounded-full bg-blue-100 p-2 text-2xl text-blue-500 opacity-0 transition-all duration-300 ease-in-out group-hover:scale-100 group-hover:opacity-100 md:block"
        >
          <IoIosArrowBack />
        </button>
        <button
          onClick={handleNext}
          disabled={false}
          className="absolute right-1 top-1/2 hidden -translate-y-1/2 rotate-180 scale-0 rounded-full bg-blue-100 p-2 text-2xl text-blue-500 opacity-0 transition-all duration-300 ease-in-out group-hover:scale-100 group-hover:opacity-100 md:block"
        >
          <IoIosArrowBack />
        </button>
      </div>
      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <div
            key={index}
            onClick={() => handlePageClick(index)}
            className={`h-3 w-3 cursor-pointer rounded-full ${
              index === currentPage ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
