"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import JumbotronNew from "@/components/Jumbotron/JumbotronNew";
import { NewsCard, ListPengumumanCard } from "@/components/News/NewsCard";
import { Pagination, SearchBar } from "@/components/Pagination";
import Spinner from "@/components/Spinner";
import {
  IoIosArrowDown,
  IoIosClose,
  IoMdDownload,
  IoMdShare,
} from "react-icons/io";
import Link from "next/link";
import { BeritaBaru } from "@/components/News/NewsRecom";

const DEFAULT_PAGE_SIZE = 6;
const MAX_PAGE_SIZE = 30;

function BeritaPage() {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [sortOrder, setSortOrder] = useState("Terbaru");
  const [selectedSources, setSelectedSources] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State untuk membuka/tutup dropdown

  const beritaHoaxCategoryMapping = {
    UMUM: "Umum",
  };

  // Fetch berita dari API
  useEffect(() => {
    const fetchBeritaHoax = async () => {
      setIsLoading(true); // Set loading ke true sebelum fetching

      try {
        // Ambil data dari PublikasiData.js
        const response = await fetch("/api/beritahoax");
        const data = await response.json();

        const mappedData = data.map((item) => ({
          ...item,
          category: beritaHoaxCategoryMapping[item.category], // Map kategori dokumen
          date: new Date(item.createdAt).toISOString().split("T")[0], // Format tanggal
        }));
        setNews(mappedData);
        // Total pages akan dihitung di useEffect berikutnya
      } catch (error) {
        console.error("Failed to fetch berita hoax:", error);
        setNews([]); // Set default ke array kosong jika terjadi error
        setTotalPages(0); // Set total pages ke 0
      } finally {
        setIsLoading(false); // Set loading ke false setelah fetching selesai
      }
    };

    fetchBeritaHoax();
  }, []);

  // Memoize handleSourceFilter untuk menghindari pembuatan ulang fungsi setiap render
  const handleSourceFilter = useCallback(
    (newsList) => {
      if (selectedSources.length === 0) {
        return newsList;
      }
      return newsList.filter((article) =>
        selectedSources.includes(article.category),
      );
    },
    [selectedSources],
  );

  // Update totalPages dan reset currentPage ketika news, selectedSources, pageSize, atau searchQuery berubah
  useEffect(() => {
    const filteredArticles = handleSourceFilter(news).filter((article) => {
      const title = article.title ? article.title.toLowerCase() : "";
      return title.includes(searchQuery);
    });
    setTotalPages(Math.ceil(filteredArticles.length / pageSize));
    setCurrentPage(1); // Reset ke halaman pertama saat filter berubah
  }, [handleSourceFilter, pageSize, news, searchQuery]);

  // Fungsi untuk mengurutkan berita
  const sortNews = (newsList) => {
    switch (sortOrder) {
      case "Terbaru":
        return [...newsList].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
      case "Populer":
        return [...newsList].sort(
          (a, b) => (b.viewCount || 0) - (a.viewCount || 0),
        );
      case "Terlama":
        return [...newsList].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        );
      default:
        return newsList;
    }
  };

  // Handle perubahan pencarian
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };

  // Handle perubahan halaman
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Handle perubahan filter sumber
  const handleSourceFilterChange = (sourceName) => {
    if (selectedSources.includes(sourceName)) {
      setSelectedSources(
        selectedSources.filter((source) => source !== sourceName),
      );
    } else {
      setSelectedSources([...selectedSources, sourceName]);
    }
  };

  // Handle menghapus sumber secara spesifik
  const handleRemoveSource = (sourceName) => {
    setSelectedSources(
      selectedSources.filter((source) => source !== sourceName),
    );
  };

  // Handle menghapus semua sumber
  const handleClearSourceFilter = () => {
    setSelectedSources([]);
  };

  // Menggunakan useMemo untuk menghitung filteredNews agar tidak dihitung ulang setiap render kecuali dependensi berubah
  const filteredNews = useMemo(() => {
    return handleSourceFilter(news).filter((article) => {
      const title = article.title ? article.title.toLowerCase() : "";
      return title.includes(searchQuery);
    });
  }, [handleSourceFilter, news, searchQuery]);

  // Mengurutkan berita yang telah difilter
  const sortedNews = sortNews(filteredNews);

  // Mengambil berita untuk halaman saat ini
  const paginatedNews = useMemo(() => {
    return sortedNews.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize,
    );
  }, [sortedNews, currentPage, pageSize]);

  // Menggunakan useMemo untuk mendapatkan sumber unik
  const uniqueSources = useMemo(() => {
    return [...new Set(news.map((article) => article.category))];
  }, [news]);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const triggerPosition = window.scrollY + window.innerHeight - 400;
      const element = document.getElementById("beritaBaru-circle");
      const elementPosition =
        element?.getBoundingClientRect().top + window.scrollY;

      if (triggerPosition > elementPosition) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bg-base-100">
      <JumbotronNew
        title="️📰️ Berita & Pengumuman"
        descColor="Ada berita baru apa"
        descNormal="di Bone Bolango?"
        subdesc="Mulai dari berita, kabar, informasi dan lain-lain!"
      />
      <div className="-mt-4 bg-gradient-to-b from-[#edf1fd] to-[#f5f4f4] to-10% dark:bg-gradient-to-b dark:from-[#283257] dark:to-darkPrimary dark:to-15% dark:text-white">
        <div className="container mx-auto xl:px-48">
          <BeritaBaru id="beritaBaru-circle" isVisible={isVisible} />
          <div className="flex flex-col gap-8">
            {/* Pencarian */}
            <SearchBar
              placeholder="Cari Berita Hoax!"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          <div className="divider"></div>

          {/* Loading Spinner */}
          {isLoading ? (
            <div className="flex justify-center">
              <Spinner />
            </div>
          ) : (
            <>
              {/* Daftar Berita */}
              <div className="flex flex-row gap-5">
                <div className="mb-22 grid grid-cols-1 gap-1 md:mb-0 md:w-2/3 xl:gap-4">
                  {/* total artikel dan filter */}
                  <div>
                    {/* Filter dan Urutkan */}
                    <div className="flex items-center justify-between gap-4 md:flex-row">
                      <p className="hidden gap-1 text-sm text-darkPrimary dark:text-white md:flex">
                        <span className="font-bold">{filteredNews.length}</span>{" "}
                        Berita Hoax ditemukan
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
                          <option>Populer</option>
                          <option>Terlama</option>
                        </select>

                        {/* Dropdown Filter Sumber */}
                        <div className="relative">
                          <button
                            className="flex items-center gap-3 rounded border border-gray-300 px-7 py-2 text-sm dark:bg-[#1A2031] md:px-2"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown
                          >
                            {"Pilih Kategori"}
                            <IoIosArrowDown size={13} />
                          </button>
                          {isDropdownOpen && (
                            <div className="absolute right-0 top-10.5 z-10 max-h-60 w-[200px] overflow-y-auto rounded bg-white p-3 shadow dark:border dark:border-white dark:bg-[#1A2031]">
                              {uniqueSources.map((source, index) => (
                                <div key={index} className="flex items-start">
                                  <div>
                                    <input
                                      type="checkbox"
                                      checked={selectedSources.includes(source)}
                                      onChange={() =>
                                        handleSourceFilterChange(source)
                                      }
                                      id={`source-${index}`}
                                    />
                                  </div>
                                  <label
                                    className="ml-2 pt-0.5 text-sm"
                                    htmlFor={`source-${index}`}
                                  >
                                    {source}
                                  </label>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Tag Sumber yang Dipilih */}
                  {selectedSources.length > 0 && (
                    <div className="mt-5 flex flex-wrap items-center justify-start gap-2 md:mt-0">
                      {selectedSources.map((source, index) => (
                        <div
                          key={index}
                          className="bg-primary-100 text-primary-700 flex items-center gap-2 rounded bg-white px-2 py-1 text-xs font-medium shadow dark:border dark:border-white dark:bg-[#1A2031]"
                        >
                          <span>📌 {source}</span>

                          {/* Hapus Tag */}
                          <button
                            className="rounded bg-gray-200 p-1 text-lg dark:bg-[#283257]"
                            onClick={() => handleRemoveSource(source)}
                          >
                            <IoIosClose fill="currentColor" />
                          </button>
                        </div>
                      ))}
                      <button
                        className="ms-2 text-xs text-gray-700 transition-all hover:text-[38BDF8] dark:text-white dark:hover:text-[38BDF8]"
                        onClick={handleClearSourceFilter}
                      >
                        Hapus Semua
                      </button>
                    </div>
                  )}
                  {/* berita baru*/}
                  <div className="flex items-end justify-between">
                    <div className="mt-10 h-10 w-52 bg-[url(/assets/beritabonebolfull-dark.png)] bg-no-repeat dark:bg-[url(/assets/beritabonebolfull.png)] dark:bg-no-repeat md:mt-0"></div>
                    <Link
                      href="https://berita.bonebolangokab.go.id/"
                      className="transition-color text-sm font-medium duration-100 hover:text-textAccent"
                    >
                      Lihat semua
                    </Link>
                  </div>
                  {paginatedNews.length > 0 ? (
                    paginatedNews.map((article, index) => (
                      <>
                        <NewsCard key={index} article={article} />
                      </>
                    ))
                  ) : (
                    <p className="text-center dark:text-white">
                      Tidak ada berita hoax yang ditemukan.
                    </p>
                  )}
                  {/* Pagination */}
                  {filteredNews.length > 0 && (
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-between">
                      <div className="flex gap-2">
                        <select
                          value={pageSize}
                          onChange={(e) => {
                            setPageSize(Number(e.target.value));
                            setCurrentPage(1); // Reset ke halaman pertama saat mengubah ukuran halaman
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
                              filteredNews.length,
                            )}{" "}
                            -{" "}
                            {Math.min(
                              currentPage * pageSize,
                              filteredNews.length,
                            )}{" "}
                            dari {filteredNews.length} Artikel
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
                </div>
                {/* pengumuman */}
                <div className="hidden w-1/3 flex-col gap-2 md:flex ">
                  <div className="mb-2 flex items-end justify-between">
                    <h1 className="text-lg font-bold">Pengumuman</h1>
                    <Link
                      href="/berita/pengumuman"
                      className="transition-color text-sm font-medium duration-100 hover:text-textAccent"
                    >
                      Lihat Semua
                    </Link>
                  </div>
                  <ListPengumumanCard />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default BeritaPage;
