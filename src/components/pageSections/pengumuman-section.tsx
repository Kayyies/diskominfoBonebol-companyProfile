"use client";

import { IoMdDownload, IoMdShare } from "react-icons/io";
import JumbotronNew from "../Jumbotron/JumbotronNew";
import { SearchBar } from "../Pagination";
import { useState } from "react";

const PengumumanSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };
  return (
    <>
      <JumbotronNew
        title="️🗞️ Pengumuman"
        descColor="Pengumuman"
        descNormal="Lebih lengkap"
        subdesc="Mulai dari beasiswa sampai regulasi!"
      />
      <div className="-mt-4 bg-gradient-to-b from-[#edf1fd] to-[#f5f4f4] to-10% dark:bg-gradient-to-b dark:from-[#283257] dark:to-darkPrimary dark:to-15% dark:text-white">
        <div className="container mx-auto md:px-48 md:py-10 ">
          <div className="mb-52">
            <div className="mb-20">
              <SearchBar
                placeholder="Cari pengumuman yang kamu butuhkan"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div className="flex h-fit w-full flex-col gap-5 rounded-lg border-2 border-gray-200 bg-white p-5 text-darkPrimary drop-shadow-sm transition-all duration-150 ease-in-out dark:border-textAccent/30 dark:bg-transparent dark:text-white/90 hover:dark:border-textAccent">
              {/* title & date */}
              <div className="flex flex-col gap-2">
                <h1 className="text-md line-clamp-2 font-bold tracking-wide ">
                  Pengumuman Beasiswa Bone Bolango Cemerlang 2024
                </h1>
                <p className="text-xs font-light text-gray-500">
                  🕛 Selasa, 26 September 2023 Pukul 16:13
                </p>
              </div>
              {/* donwload & share */}
              <div className="flex gap-3 text-xs font-bold">
                <button className="flex items-center gap-2 rounded-lg border-2 border-textAccent/70 p-3 transition-colors duration-100 hover:border-textAccent hover:text-textAccent dark:border-textAccent">
                  Unduh Dokumen <IoMdDownload className="text-lg" />
                </button>
                <button className="transition-color rounded-lg border-2 border-textAccent/70 p-3 duration-100 hover:border-textAccent hover:text-textAccent dark:border-textAccent">
                  <IoMdShare className="text-lg" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PengumumanSection;
