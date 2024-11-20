"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import JumbotronNew from "@/components/Jumbotron/JumbotronNew";
import { PengumumanCard } from "../News/NewsCard";
import { Pagination, SearchBar } from "@/components/Pagination";
import Spinner from "@/components/Spinner";
import { IoIosArrowDown, IoIosClose } from "react-icons/io";
import pengumumanData from "@/data/pengumumanData";

const DEFAULT_PAGE_SIZE = 12;
const MAX_PAGE_SIZE = 30;

const PengumumanSection = () => {
  const [pengumumans, setPengumumans] = useState(pengumumanData); // Data pengumuman
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [sortOrder, setSortOrder] = useState("Terbaru");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Kategori mapping
  const pengumumanCategoryMapping = {
    BEASISWA: "Beasiswa",
    REGULASI: "Regulasi",
    INFORMASI: "Informasi",
  };

  useEffect(() => {
    const fetchPengumumans = async () => {
      setIsLoading(true);

      try {
        const response = await fetch("/api/pengumuman");
        const data = await response.json();

        const mappedData = data.map((item) => ({
          ...item,
          category: pengumumanCategoryMapping[item.category],
          date: new Date(item.createdAt).toISOString().split("T")[0],
        }));
        setPengumumans(mappedData);
      } catch (error) {
        console.error("Failed to fetch pengumumans:", error);
        setPengumumans([]);
        setTotalPages(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPengumumans();
  }, []);

  const handleCategoryFilter = useCallback(
    (pengumumansList) => {
      if (selectedCategories.length === 0) {
        return pengumumansList;
      }
      return pengumumansList.filter((pengumuman) =>
        selectedCategories.includes(pengumuman.category),
      );
    },
    [selectedCategories],
  );

  const uniqueCategories = useMemo(() => {
    return [...new Set(pengumumans.map((pengumuman) => pengumuman.category))];
  }, [pengumumans]);

  useEffect(() => {
    const filteredArticles = handleCategoryFilter(pengumumans).filter(
      (pengumuman) => {
        const title = pengumuman.title ? pengumuman.title.toLowerCase() : "";
        const category = pengumuman.category
          ? pengumuman.category.toLowerCase()
          : "";
        return title.includes(searchQuery) || category.includes(searchQuery);
      },
    );
    setTotalPages(Math.ceil(filteredArticles.length / pageSize));
    setCurrentPage(1);
  }, [handleCategoryFilter, pageSize, pengumumans, searchQuery]);

  const sortPengumumans = (pengumumansList) => {
    switch (sortOrder) {
      case "Terbaru":
        return [...pengumumansList].sort(
          (a, b) => new Date(b.date) - new Date(a.date),
        );
      case "Terlama":
        return [...pengumumansList].sort(
          (a, b) => new Date(a.date) - new Date(b.date),
        );
      default:
        return pengumumansList;
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleCategoryFilterChange = (categoryName) => {
    if (selectedCategories.includes(categoryName)) {
      setSelectedCategories(
        selectedCategories.filter((category) => category !== categoryName),
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryName]);
    }
  };

  const handleRemoveCategory = (categoryName) => {
    setSelectedCategories(
      selectedCategories.filter((category) => category !== categoryName),
    );
  };

  const handleClearCategoryFilter = () => {
    setSelectedCategories([]);
  };

  const filteredPengumumans = useMemo(() => {
    return handleCategoryFilter(pengumumans).filter((pengumuman) => {
      const title = pengumuman.title ? pengumuman.title.toLowerCase() : "";
      const category = pengumuman.category
        ? pengumuman.category.toLowerCase()
        : "";
      return title.includes(searchQuery) || category.includes(searchQuery);
    });
  }, [handleCategoryFilter, pengumumans, searchQuery]);

  const sortedPengumumans = sortPengumumans(filteredPengumumans);

  const paginatedPengumumans = useMemo(() => {
    return sortedPengumumans.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize,
    );
  }, [sortedPengumumans, currentPage, pageSize]);

  return (
    <>
      <JumbotronNew
        title="️🗞️ Pengumuman"
        descColor="Pengumuman"
        descNormal="Lebih lengkap"
        subdesc="Mulai dari beasiswa sampai regulasi!"
      />
      <div className="-mt-4 bg-gradient-to-b from-[#edf1fd] to-[#f5f4f4] to-10% dark:bg-gradient-to-b dark:from-[#283257] dark:to-darkPrimary dark:to-15% dark:text-white">
        <div className="container mx-auto xl:px-48">
          <div className="flex flex-col gap-8">
            <SearchBar
              placeholder="Cari Pengumuman yang kamu butuhkan"
              value={searchQuery}
              onChange={handleSearchChange}
            />

            {selectedCategories.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 px-5 md:justify-start">
                {selectedCategories.map((category, index) => (
                  <div
                    key={index}
                    className="bg-primary-100 text-primary-700 flex items-center gap-2 rounded bg-white px-2 py-1 text-xs font-medium shadow dark:border dark:border-white dark:bg-[#1A2031]"
                  >
                    <span>📌 {category}</span>
                    <button
                      className="rounded bg-gray-200 p-1 text-lg dark:bg-[#283257]"
                      onClick={() => handleRemoveCategory(category)}
                    >
                      <IoIosClose fill="currentColor" />
                    </button>
                  </div>
                ))}
                <button
                  className="ms-2 text-xs text-gray-700 transition-all hover:text-[38BDF8] dark:text-white dark:hover:text-[38BDF8]"
                  onClick={handleClearCategoryFilter}
                >
                  Hapus Semua
                </button>
              </div>
            )}

            <div className="flex items-center justify-between gap-4 md:flex-row md:px-5">
              <p className="hidden text-sm text-gray-900 dark:text-white md:flex">
                <span className="font-bold">{filteredPengumumans.length}</span>{" "}
                Pengumuman ditemukan
              </p>

              <div className="flex flex-row gap-2">
                <label className="label">
                  <span className="label-text">{"Urutkan:"}</span>
                </label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="rounded border border-gray-300 px-2 py-1 text-sm dark:bg-[#1A2031]"
                >
                  <option>Terbaru</option>
                  <option>Terlama</option>
                </select>

                <div className="relative">
                  <button
                    className="flex items-center gap-3 rounded border border-gray-300 px-10 py-2 text-sm dark:bg-[#1A2031] md:px-2"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    {"Pilih Kategori"}
                    <IoIosArrowDown size={13} />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 top-10.5 z-10 max-h-60 w-[200px] overflow-y-auto rounded bg-white p-3 shadow dark:border dark:border-white dark:bg-[#1A2031]">
                      {uniqueCategories.map((category, index) => (
                        <div key={index} className="flex items-start">
                          <div>
                            <input
                              type="checkbox"
                              checked={selectedCategories.includes(category)}
                              onChange={() =>
                                handleCategoryFilterChange(category)
                              }
                              id={`category-${index}`}
                            />
                          </div>
                          <label
                            className="ml-2 pt-0.5 text-sm"
                            htmlFor={`category-${index}`}
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="divider"></div>

          {isLoading ? (
            <div className="flex justify-center">
              <Spinner />
            </div>
          ) : (
            <>
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {paginatedPengumumans.length > 0 ? (
                  paginatedPengumumans.map((pengumuman) => (
                    <PengumumanCard
                      key={pengumuman.id}
                      pengumuman={pengumuman}
                    />
                  ))
                ) : (
                  <p className="text-center">
                    Tidak ada pengumuman yang ditemukan.
                  </p>
                )}
              </div>

              {filteredPengumumans.length > 0 && (
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-between">
                  <div className="flex gap-2">
                    <select
                      value={pageSize}
                      onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="rounded border border-gray-300 px-2 py-1 dark:bg-[#1A2031]"
                    >
                      {[...Array(5).keys()].map((i) => {
                        const value = (i + 1) * 6;
                        if (value <= MAX_PAGE_SIZE) {
                          return (
                            <option key={value} value={value}>
                              {value}
                            </option>
                          );
                        }
                        return null;
                      })}
                    </select>
                    <label className="label">
                      <span className="label-text">
                        Menampilkan{" "}
                        {Math.min(
                          (currentPage - 1) * pageSize + 1,
                          filteredPengumumans.length,
                        )}{" "}
                        -{" "}
                        {Math.min(
                          currentPage * pageSize,
                          filteredPengumumans.length,
                        )}{" "}
                        dari {filteredPengumumans.length} Pengumuman
                      </span>
                    </label>
                  </div>

                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    pageSize={pageSize}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PengumumanSection;
