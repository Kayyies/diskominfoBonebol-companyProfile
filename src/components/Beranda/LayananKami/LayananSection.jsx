"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { LayKamData } from "@/data/LayKamData";

const LayananSection = () => {
    const datas = LayKamData;
    const [currentSlide, setCurrentSlide] = useState(0);
    const [itemsPerSlide, setItemsPerSlide] = useState(1); // Default untuk sm dan di bawah
    const [totalSlides, setTotalSlides] = useState(0);

    // Fungsi untuk memperbarui itemsPerSlide berdasarkan ukuran layar
    const updateItemsPerSlide = () => {
        const width = window.innerWidth;
        if (width >= 1280) { // xl dan di atas
            setItemsPerSlide(6);
        } else if (width >= 1024) { // lg
            setItemsPerSlide(3);
        } else { // sm dan di bawah
            setItemsPerSlide(1);
        }
    };

    useEffect(() => {
        // Inisialisasi itemsPerSlide saat komponen mount
        updateItemsPerSlide();
        // Tambahkan event listener untuk resize
        window.addEventListener("resize", updateItemsPerSlide);
        return () => window.removeEventListener("resize", updateItemsPerSlide);
    }, []);

    useEffect(() => {
        // Hitung totalSlides setiap kali itemsPerSlide atau datas berubah
        const slidesCount = Math.ceil(datas.length / itemsPerSlide);
        setTotalSlides(slidesCount);
        // Pastikan currentSlide tidak melebihi batas
        if (currentSlide >= slidesCount) {
            setCurrentSlide(slidesCount - 1);
        }
    }, [itemsPerSlide, datas.length, currentSlide]);

    // Membagi data menjadi beberapa slide
    const getSlides = () => {
        const slides = [];
        for (let i = 0; i < datas.length; i += itemsPerSlide) {
            slides.push(datas.slice(i, i + itemsPerSlide));
        }
        return slides;
    };

    const slides = getSlides();

    // Fungsi untuk berpindah ke slide berikutnya
    const nextSlide = () => {
        if (currentSlide < totalSlides - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    // Fungsi untuk kembali ke slide sebelumnya
    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    // Fungsi untuk langsung menuju slide tertentu
    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className="flex flex-col gap-10">
            <div className="relative">
                {/* Tombol Sebelumnya */}
                <button
                    onClick={prevSlide}
                    className={`absolute z-10 left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-[#38BDF8] dark:bg-white bg-opacity-50 shadow-lg p-2 rounded-full hover:bg-opacity-100 transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] ${
                        currentSlide === 0 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={currentSlide === 0}
                    aria-label="Tombol Sebelumnya"
                    aria-disabled={currentSlide === 0}
                >
                    <FaArrowLeft />
                </button>

                {/* Container Slider */}
                <div className="overflow-hidden w-full">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {slides.map((slide, index) => (
                            <div key={index} className="w-full flex-shrink-0">
                                <div
                                    className={`grid gap-4 
                                        grid-cols-1 
                                        lg:grid-cols-3 
                                        xl:grid-cols-3 xl:grid-rows-2`}
                                >
                                    {slide.map((item, i) => (
                                        <Link key={i} href={`/layanan/${item.id}`} passHref>
                                            <div className="dark:bg-darkSecondary dark:text-darkAccent group card w-full border-2 border-transparent bg-white shadow-md hover:border-blue-500 hover:shadow-md hover:transition-all hover:duration-75 cursor-pointer">
                                                <div className="card-body flex flex-col gap-5">
                                                    {/* Gambar */}
                                                    <div className="overflow-hidden rounded-xl">
                                                        <Image
                                                            src={item.logo}
                                                            height={50}
                                                            width={50}
                                                            alt={item.title}
                                                            className="rounded-xl transition-transform duration-200 group-hover:scale-110"
                                                        />
                                                    </div>

                                                    {/* Judul */}
                                                    <h2 className="card-title font-bold text-black transition-colors duration-200 group-hover:text-[#38BDF8] dark:text-white">
                                                        {item.title}
                                                    </h2>

                                                    {/* Deskripsi */}
                                                    <p className="line-clamp-6 text-sm">{item.desc}</p>

                                                    {/* Aksi */}
                                                    <div className="card-actions items-center justify-between rounded py-1 pr-3">
                                                        <button className="text-blue-500 hover:underline">Buka Halaman</button>
                                                        <FaArrowRight />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tombol Berikutnya */}
                <button
                    onClick={nextSlide}
                    className={`absolute z-10 right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 bg-[#38BDF8] dark:bg-white bg-opacity-50 shadow-lg p-2 rounded-full hover:bg-opacity-100 transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] ${
                        currentSlide === totalSlides - 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={currentSlide === totalSlides - 1}
                    aria-label="Tombol Berikutnya"
                    aria-disabled={currentSlide === totalSlides - 1}
                >
                    <FaArrowRight />
                </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center space-x-2">
                {slides.map((_, index) => (
                    <span
                        key={index}
                        className={`h-3 w-3 rounded-full cursor-pointer ${
                            currentSlide === index ? "bg-[#38BDF8]" : "bg-blue-gray-600"
                        }`}
                        onClick={() => goToSlide(index)}
                        role="button"
                        aria-label={`Pergi ke slide ${index + 1}`}
                        tabIndex="0"
                        onKeyPress={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                goToSlide(index);
                            }
                        }}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default LayananSection;
