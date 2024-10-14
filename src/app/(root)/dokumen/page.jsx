"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { PublikasiData } from "@/data/PublikasiData";
import JumbotronNew from "@/components/Jumbotron/JumbotronNew";
import PublikasiCard from "@/components/PublikasiCard";
import Pagination from "@/components/Pagination"; // Komponen pagination
import Spinner from "@/components/Spinner"; // Komponen spinner
import { IoIosArrowDown, IoIosClose } from "react-icons/io";

const DEFAULT_PAGE_SIZE = 6; // Ukuran halaman default
const MAX_PAGE_SIZE = 30; // Ukuran halaman maksimum

const DokumenPage = () => {
    const [dokumens, setDokumens] = useState([]); // Inisialisasi dengan array kosong
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true); // State untuk loading
    const [searchQuery, setSearchQuery] = useState(""); // State untuk pencarian
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE); // Ukuran halaman saat ini
    const [sortOrder, setSortOrder] = useState("Terbaru"); // Urutan default
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State untuk membuka/tutup dropdown

    // Fetch dokumen dari data lokal (PublikasiData)
    useEffect(() => {
        const fetchDokumens = async () => {
            setIsLoading(true); // Set loading ke true sebelum fetching

            try {
                // Ambil data dari PublikasiData.js
                const data = PublikasiData;

                setDokumens(data); // Set dokumens ke data
                // Total pages akan dihitung di useEffect berikutnya
            } catch (error) {
                console.error("Failed to fetch dokumens:", error);
                setDokumens([]); // Set default ke array kosong jika terjadi error
                setTotalPages(0); // Set total pages ke 0
            } finally {
                setIsLoading(false); // Set loading ke false setelah fetching selesai
            }
        };

        fetchDokumens();
    }, []);

    // Memoize handleCategoryFilter untuk menghindari pembuatan ulang fungsi setiap render
    const handleCategoryFilter = useCallback(
        (dokumensList) => {
            if (selectedCategories.length === 0) {
                return dokumensList;
            }
            return dokumensList.filter((dokumen) =>
                selectedCategories.includes(dokumen.category)
            );
        },
        [selectedCategories]
    );

    // Update totalPages dan reset currentPage ketika dokumen, selectedCategories, pageSize, atau searchQuery berubah
    useEffect(() => {
        const filteredArticles = handleCategoryFilter(dokumens).filter((dokumen) => {
            const title = dokumen.title ? dokumen.title.toLowerCase() : "";
            const category = dokumen.category ? dokumen.category.toLowerCase() : "";
            return title.includes(searchQuery) || category.includes(searchQuery);
        });
        setTotalPages(Math.ceil(filteredArticles.length / pageSize));
        setCurrentPage(1); // Reset ke halaman pertama saat filter berubah
    }, [handleCategoryFilter, pageSize, dokumens, searchQuery]);

    // Fungsi untuk mengurutkan dokumen
    const sortDokumens = (dokumensList) => {
        switch (sortOrder) {
            case "Terbaru":
                return [...dokumensList].sort((a, b) => new Date(b.date) - new Date(a.date));
            case "Terlama":
                return [...dokumensList].sort((a, b) => new Date(a.date) - new Date(b.date));
            default:
                return dokumensList;
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

    // Handle perubahan filter kategori
    const handleCategoryFilterChange = (categoryName) => {
        if (selectedCategories.includes(categoryName)) {
            setSelectedCategories(selectedCategories.filter((category) => category !== categoryName));
        } else {
            setSelectedCategories([...selectedCategories, categoryName]);
        }
    };

    // Handle menghapus kategori secara spesifik
    const handleRemoveCategory = (categoryName) => {
        setSelectedCategories(selectedCategories.filter((category) => category !== categoryName));
    };

    // Handle menghapus semua kategori
    const handleClearCategoryFilter = () => {
        setSelectedCategories([]);
    };

    // Menggunakan useMemo untuk menghitung filteredDokumens agar tidak dihitung ulang setiap render kecuali dependensi berubah
    const filteredDokumens = useMemo(() => {
        return handleCategoryFilter(dokumens).filter((dokumen) => {
            const title = dokumen.title ? dokumen.title.toLowerCase() : "";
            const category = dokumen.category ? dokumen.category.toLowerCase() : "";
            return title.includes(searchQuery) || category.includes(searchQuery);
        });
    }, [handleCategoryFilter, dokumens, searchQuery]);

    // Mengurutkan dokumen yang telah difilter
    const sortedDokumens = sortDokumens(filteredDokumens);

    // Mengambil dokumen untuk halaman saat ini
    const paginatedDokumens = useMemo(() => {
        return sortedDokumens.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
        );
    }, [sortedDokumens, currentPage, pageSize]);

    // Menggunakan useMemo untuk mendapatkan kategori unik
    const uniqueCategories = useMemo(() => {
        return [...new Set(dokumens.map((dokumen) => dokumen.category))];
    }, [dokumens]);

    return (
        <div className="bg-base-100">
            <JumbotronNew
                title="️📁 Dokumen"
                descColor="Cari Dokumen"
                descNormal="yang kamu butuhkan di sini!"
                subdesc="Kamu bisa temukan SK Bupati, SK Gubernur, dan dokumen lain seputar Bone Bolango di sini!"
            />
            <div className="dark:to-darkPrimary -mt-4 bg-gradient-to-b from-[#edf1fd] to-[#f5f4f4] to-10% dark:bg-gradient-to-b dark:from-[#283257] dark:to-15% dark:text-white">
                <div className="container mx-auto px-6 lg:px-30 2xl:px-48">
                    <div className="flex flex-col gap-8">
                        {/* Pencarian */}
                        <div className="form-control">
                            <input
                                type="text"
                                placeholder="Cari Dokumen yang kamu butuhkan!"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="input input-bordered w-full rounded md:w-auto"
                            />
                        </div>

                        {/* Tag Kategori yang Dipilih */}
                        {selectedCategories.length > 0 && (
                            <div className="flex flex-wrap justify-center md:justify-start gap-2 px-5">
                                {selectedCategories.map((category, index) => (
                                    <div
                                        key={index}
                                        className="rounded shadow bg-white dark:border dark:border-white dark:bg-[#1A2031] bg-primary-100 px-2 py-1 text-xs font-medium text-primary-700 flex items-center gap-2"
                                    >
                                        <span>📌 {category}</span>

                                        {/* Hapus Tag */}
                                        <button
                                            className="text-lg bg-gray-200 dark:bg-[#283257] rounded p-1"
                                            onClick={() => handleRemoveCategory(category)}
                                        >
                                            <IoIosClose fill="currentColor" />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    className="ms-2 text-xs text-gray-700 hover:text-[38BDF8] dark:text-white dark:hover:text-[38BDF8] transition-all"
                                    onClick={handleClearCategoryFilter}
                                >
                                    Hapus Semua
                                </button>
                            </div>
                        )}

                        {/* Filter dan Urutkan */}
                        <div className="flex flex-col-reverse gap-4 md:flex-row items-center justify-between px-5">
                            <p className="text-sm text-gray-900 dark:text-white">
                                <span className="font-bold">{filteredDokumens.length}</span>{" "}
                                Dokumen ditemukan
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

                                {/* Dropdown Filter Kategori */}
                                <div className="relative">
                                    <button
                                        className="flex items-center gap-3 rounded border border-gray-300 px-2 py-2 text-sm dark:bg-[#1A2031]"
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown
                                    >
                                        {"Pilih Kategori"}
                                        <IoIosArrowDown size={13} />
                                    </button>
                                    {isDropdownOpen && (
                                        <div className="absolute top-10.5 right-0 bg-white dark:bg-[#1A2031] dark:border dark:border-white shadow z-10 p-3 w-[200px] max-h-60 rounded overflow-y-auto">
                                            {uniqueCategories.map((category, index) => (
                                                <div key={index} className="flex items-start">
                                                    <div>
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedCategories.includes(category)}
                                                            onChange={() => handleCategoryFilterChange(category)}
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

                    {/* Render loading spinner jika sedang fetching */}
                    {isLoading ? (
                        <div className="flex justify-center">
                            <Spinner /> {/* Komponen spinner */}
                        </div>
                    ) : (
                        <>
                            {/* Render dokumen */}
                            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                                {paginatedDokumens.length > 0 ? (
                                    paginatedDokumens.map((publikasi, index) => (
                                        <PublikasiCard key={index} publikasi={publikasi} />
                                    ))
                                ) : (
                                    <p className="text-center">
                                        Tidak ada dokumen yang ditemukan.
                                    </p>
                                )}
                            </div>

                            {/* Pagination */}
                            {filteredDokumens.length > 0 && (
                                <div className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-between">
                                    {/* Dropdown untuk menentukan ukuran halaman */}
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

                                        {/* Label untuk menampilkan jumlah dokumen yang sedang ditampilkan */}
                                        <label className="label">
                                            <span className="label-text">
                                                Menampilkan{" "}
                                                {Math.min(
                                                    (currentPage - 1) * pageSize + 1,
                                                    filteredDokumens.length
                                                )}{" "}
                                                -{" "}
                                                {Math.min(
                                                    currentPage * pageSize,
                                                    filteredDokumens.length
                                                )}{" "}
                                                dari {filteredDokumens.length} Dokumen
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
};

export default DokumenPage;
