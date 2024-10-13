"use client";

import React, { useEffect, useState } from "react";
import JumbotronNew from "@/components/Jumbotron/JumbotronNew";
import NewsCard from "@/components/News/NewsCard";
import Pagination from "@/components/Pagination"; // Komponen pagination
import Spinner from "@/components/Spinner"; // Komponen spinner

const DEFAULT_PAGE_SIZE = 6; // Ukuran halaman default
const MAX_PAGE_SIZE = 30; // Ukuran halaman maksimum

function BeritaPage() {
  const [news, setNews] = useState([]); // Inisialisasi dengan array kosong
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // State untuk loading
  const [searchQuery, setSearchQuery] = useState(""); // State untuk pencarian
  const [filteredNews, setFilteredNews] = useState([]); // State untuk berita yang difilter
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE); // Ukuran halaman saat ini
  const [sortOrder, setSortOrder] = useState("Terbaru"); // Urutan default

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true); // Set loading ke true sebelum fetching
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=indonesia&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`,
        );
        const data = await response.json();

        if (data.articles) {
          // Filter berita yang ditandai "[Removed]"
          const filteredArticles = data.articles.filter(
            (article) => !article.title.startsWith("[Removed]"),
          );

          setNews(filteredArticles); // Set berita
          setFilteredNews(filteredArticles); // Set filtered news ke data awal
          setTotalPages(Math.ceil(filteredArticles.length / pageSize));
        } else {
          console.error("No articles found in the response.");
          setNews([]); // Set default ke array kosong jika tidak ada articles
          setFilteredNews([]); // Kosongkan filteredNews juga
        }
      } catch (error) {
        console.error("Failed to fetch news:", error);
        setNews([]); // Set default ke array kosong jika terjadi error
        setFilteredNews([]); // Kosongkan filteredNews
      } finally {
        setIsLoading(false); // Set loading ke false setelah fetching selesai
      }
    };

    fetchNews();
  }, [pageSize]);

  // Fungsi untuk mengurutkan berita
  const sortNews = (newsList) => {
    switch (sortOrder) {
      case "Terbaru":
        return newsList.sort(
          (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt),
        );
      case "Populer":
        // Misalkan Anda ingin mengurutkan berdasarkan jumlah tampilan atau interaksi
        return newsList.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0)); // Tambahkan field viewCount jika ada
      case "Terlama":
        return newsList.sort(
          (a, b) => new Date(a.publishedAt) - new Date(b.publishedAt),
        );
      default:
        return newsList;
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter berita berdasarkan judul atau deskripsi yang mengandung query
    const filtered = news.filter((article) => {
      const title = article.title ? article.title.toLowerCase() : "";
      const description = article.description
        ? article.description.toLowerCase()
        : "";
      return title.includes(query) || description.includes(query);
    });

    setFilteredNews(filtered);
    setTotalPages(Math.ceil(filtered.length / pageSize));
    setCurrentPage(1); // Reset ke halaman 1 setiap kali pencarian berubah
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const paginatedNews = sortNews(filteredNews).slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <div className="bg-base-100">
      <JumbotronNew
        title="️📰️ Artikel"
        descColor="Sedang terjadi apa"
        descNormal="di Bone Bolango?"
        subdesc="Mulai dari berita, kabar, informasi dan lain-lain!"
      />
      <div className="dark:to-darkPrimary -mt-4 bg-gradient-to-b from-[#edf1fd] to-[#f5f4f4] to-10% dark:bg-gradient-to-b dark:from-[#283257] dark:to-15% dark:text-white">
        <div className="container mx-auto px-6 xl:px-48">
          <div className="flex flex-col gap-8">
            <div className="form-control">
              <input
                type="text"
                placeholder="Cari Berita yang kamu kepo!"
                value={searchQuery}
                onChange={handleSearchChange}
                className="input input-bordered w-full rounded md:w-auto"
              />
            </div>

            <div className="flex items-center justify-between px-5">
              <p className="text-darkPrimary text-sm dark:text-white">
                <span className="font-bold">{filteredNews.length}</span> Artikel
                ditemukan
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
              </div>
            </div>
          </div>

          <div className="divider"></div>

          {/* Render loading spinner jika sedang fetching */}
          {isLoading ? (
            <div className="flex justify-center">
              <Spinner /> {/* Komponen spinner */}
            </div>
          ) : (
            <>
              {/* Render berita */}
              <div className="grid grid-cols-1 gap-1 xl:gap-4">
                {paginatedNews.length > 0 ? (
                  paginatedNews.map((article, index) => (
                    <NewsCard key={index} article={article} />
                  ))
                ) : (
                  <p className="text-center">
                    Tidak ada berita yang ditemukan.
                  </p>
                )}
              </div>

              {filteredNews.length > 0 && (
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-between">
                  {/* Dropdown untuk menentukan ukuran halaman */}
                  <div className="flex gap-2">
                    <select
                      value={pageSize}
                      onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setCurrentPage(1); // Reset ke halaman 1 saat mengubah ukuran halaman
                      }}
                      className="rounded border border-gray-300 px-2 py-1"
                    >
                      {[...Array(5).keys()].map((i) => {
                        const value = (i + 1) * 6; // Menghasilkan 6, 12, 18, 24, 30
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

                    {/* Label untuk menampilkan jumlah artikel yang sedang ditampilkan */}
                    <label className="label">
                      <span className="label-text">
                        Menampilkan{" "}
                        {Math.min(
                          (currentPage - 1) * pageSize + 1,
                          filteredNews.length,
                        )}{" "}
                        -{" "}
                        {Math.min(currentPage * pageSize, filteredNews.length)}{" "}
                        dari {filteredNews.length} Artikel
                      </span>
                    </label>
                  </div>

                  {/* Pagination */}
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
    </div>
  );
}

export default BeritaPage;
