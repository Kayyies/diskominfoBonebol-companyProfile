"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import JumbotronNew from "@/components/Jumbotron/JumbotronNew";
import NewsCard from "@/components/News/NewsCard";
import Pagination from "@/components/Pagination";
import Spinner from "@/components/Spinner";
import { IoIosArrowDown, IoIosClose } from "react-icons/io";

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

    // Fetch berita dari API
    useEffect(() => {
        const fetchNews = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(
                    `https://newsapi.org/v2/everything?q=indonesia&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`,
                );
                const data = await response.json();

                if (data.articles) {
                    const filteredArticles = data.articles.filter(
                        (article) => !article.title.startsWith("[Removed]"),
                    );

                    setNews(filteredArticles);
                    // Total pages akan dihitung di useEffect berikutnya
                } else {
                    console.error("No articles found in the response.");
                    setNews([]);
                    setTotalPages(0);
                }
            } catch (error) {
                console.error("Failed to fetch news:", error);
                setNews([]);
                setTotalPages(0);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNews();
    }, [pageSize]);

    // Memoize handleSourceFilter untuk menghindari pembuatan ulang fungsi setiap render
    const handleSourceFilter = useCallback(
        (newsList) => {
            if (selectedSources.length === 0) {
                return newsList;
            }
            return newsList.filter((article) =>
                selectedSources.includes(article.source.name)
            );
        },
        [selectedSources]
    );

    // Update totalPages dan reset currentPage ketika news, selectedSources, pageSize, atau searchQuery berubah
    useEffect(() => {
        const filteredArticles = handleSourceFilter(news).filter(article => {
            const title = article.title ? article.title.toLowerCase() : "";
            const description = article.description ? article.description.toLowerCase() : "";
            return title.includes(searchQuery) || description.includes(searchQuery);
        });
        setTotalPages(Math.ceil(filteredArticles.length / pageSize));
        setCurrentPage(1); // Reset ke halaman pertama saat filter berubah
    }, [handleSourceFilter, pageSize, news, searchQuery]);

    // Fungsi untuk mengurutkan berita
    const sortNews = (newsList) => {
        switch (sortOrder) {
            case "Terbaru":
                return [...newsList].sort(
                    (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt),
                );
            case "Populer":
                return [...newsList].sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
            case "Terlama":
                return [...newsList].sort(
                    (a, b) => new Date(a.publishedAt) - new Date(b.publishedAt),
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
            setSelectedSources(selectedSources.filter((source) => source !== sourceName));
        } else {
            setSelectedSources([...selectedSources, sourceName]);
        }
    };

    // Handle menghapus sumber secara spesifik
    const handleRemoveSource = (sourceName) => {
        setSelectedSources(selectedSources.filter((source) => source !== sourceName));
    };

    // Handle menghapus semua sumber
    const handleClearSourceFilter = () => {
        setSelectedSources([]);
    };

    // Menggunakan useMemo untuk menghitung filteredNews agar tidak dihitung ulang setiap render kecuali dependensi berubah
    const filteredNews = useMemo(() => {
        return handleSourceFilter(news).filter(article => {
            const title = article.title ? article.title.toLowerCase() : "";
            const description = article.description ? article.description.toLowerCase() : "";
            return title.includes(searchQuery) || description.includes(searchQuery);
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
        return [...new Set(news.map(article => article.source.name))];
    }, [news]);

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
                        {/* Pencarian */}
                        <div className="form-control">
                            <input
                                type="text"
                                placeholder="Cari Berita yang kamu kepo!"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="input input-bordered w-full rounded md:w-auto"
                            />
                        </div>

                        {/* Tag Sumber yang Dipilih */}
                        {selectedSources.length > 0 && (
                            <div className="flex flex-wrap justify-center md:justify-start gap-2 px-5">
                                {selectedSources.map((source, index) => (
                                    <div
                                        key={index}
                                        className="rounded shadow bg-white dark:border dark:border-white dark:bg-[#1A2031] bg-primary-100 px-2 py-1 text-xs font-medium text-primary-700 flex items-center gap-2"
                                    >
                                        <span>📌 {source}</span>

                                        {/* Hapus Tag */}
                                        <button
                                            className="text-lg bg-gray-200 dark:bg-[#283257] rounded p-1"
                                            onClick={() => handleRemoveSource(source)}
                                        >
                                            <IoIosClose fill="currentColor" />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    className="ms-2 text-xs text-gray-700 hover:text-[38BDF8] dark:text-white dark:hover:text-[38BDF8] transition-all"
                                    onClick={handleClearSourceFilter}
                                >
                                    Hapus Semua
                                </button>
                            </div>
                        )}

                        {/* Filter dan Urutkan */}
                        <div className="flex flex-col-reverse gap-4 md:flex-row items-center justify-between px-5">
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

                                {/* Dropdown Filter Sumber */}
                                <div className="relative">
                                    <button
                                        className="flex items-center gap-3 rounded border border-gray-300 px-2 py-2 text-sm dark:bg-[#1A2031]"
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown
                                    >
                                        {"Pilih Source Name"}
                                        <IoIosArrowDown size={13} />
                                    </button>
                                    {isDropdownOpen && (
                                        <div className="absolute top-10.5 right-0 bg-white dark:bg-[#1A2031] dark:border dark:border-white shadow z-10 p-3 w-[200px] max-h-60 rounded overflow-y-auto">
                                            {uniqueSources.map((source, index) => (
                                                <div key={index} className="flex items-start">
                                                    <div>
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedSources.includes(source)}
                                                            onChange={() => handleSourceFilterChange(source)}
                                                            id={`source-${index}`}
                                                        />
                                                    </div>
                                                    <label className="ml-2 pt-0.5 text-sm" htmlFor={`source-${index}`}>{source}</label>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
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
                                            className="rounded border border-gray-300 dark:bg-[#1A2031] px-2 py-1"
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
                                                {Math.min(currentPage * pageSize, filteredNews.length)}{" "}
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
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BeritaPage;
