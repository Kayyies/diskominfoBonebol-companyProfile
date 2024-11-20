"use client";

import React, { useState, useMemo, useEffect } from "react";
import JumbotronNew from "@/components/Jumbotron/JumbotronNew";
import { PengumumanCard } from "../News/NewsCard";
import { Pagination, SearchBar } from "@/components/Pagination";
import Spinner from "@/components/Spinner";
import pengumumanData from "@/data/pengumumanData";

const DEFAULT_PAGE_SIZE = 6; // Ukuran halaman default
const MAX_PAGE_SIZE = 30; // Ukuran halaman maksimum

const PengumumanSection = () => {
    const [pengumumans, setPengumumans] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("Terbaru");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch pengumuman dari data lokal
    useEffect(() => {
        const fetchPengumumans = () => {
            setIsLoading(true);
            if (Array.isArray(pengumumanData)) {
                setPengumumans(pengumumanData);
                console.log("Data pengumuman:", pengumumanData);
            } else {
                console.error("Data tidak valid");
                setPengumumans([]);
            }
            setIsLoading(false);
        };

        fetchPengumumans();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedCategories]);

    // Filter data berdasarkan kategori dan pencarian
    const filteredPengumumans = useMemo(() => {
        const search = searchQuery.toLowerCase();
        return pengumumans
            .filter((pengumuman) =>
                selectedCategories.length
                    ? selectedCategories.includes(pengumuman.category)
                    : true
            )
            .filter(
                (pengumuman) =>
                    pengumuman.title.toLowerCase().includes(search) ||
                    pengumuman.category.toLowerCase().includes(search)
            );
    }, [pengumumans, searchQuery, selectedCategories]);

    // Urutkan data berdasarkan pilihan pengguna
    const sortedPengumumans = useMemo(() => {
        const sorted = [...filteredPengumumans];
        return sortOrder === "Terbaru"
            ? sorted.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
            : sorted.sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0));
    }, [filteredPengumumans, sortOrder]);

    // Paginasi data
    const paginatedPengumumans = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return sortedPengumumans.slice(startIndex, endIndex);
    }, [sortedPengumumans, currentPage, pageSize]);

    const totalPages = Math.ceil(filteredPengumumans.length / pageSize);

    const handleSearchChange = (e) => setSearchQuery(e.target.value);

    const handleCategoryFilterChange = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((cat) => cat !== category)
                : [...prev, category]
        );
    };

    const handleClearCategoryFilter = () => setSelectedCategories([]);

    const handlePageChange = (page) => setCurrentPage(page);

    return (
        <>
            <JumbotronNew
                title="️🗞️ Pengumuman"
                descColor="Pengumuman"
                descNormal="Lebih lengkap"
                subdesc="Mulai dari beasiswa sampai regulasi!"
            />
            <div className="container mx-auto px-4">
                <div className="flex flex-col gap-8">
                    <SearchBar
                        placeholder="Cari Pengumuman yang kamu butuhkan"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />

                    <div className="flex justify-between items-center mb-4">
                        <p className="hidden text-sm text-gray-900 dark:text-white md:flex gap-1">
                            <span className="font-bold">{filteredPengumumans.length}</span>
                            Pengumuman ditemukan
                        </p>
                        <div className="flex flex-row gap-2">
                            <label className="label">
                                <span className="label-text dark:text-white">{"Urutkan:"}</span>
                            </label>
                            <select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                                className="rounded border border-gray-300 px-2 py-1 text-sm dark:text-white dark:bg-[#1A2031]"
                            >
                                <option value="Terbaru">Terbaru</option>
                                <option value="Terlama">Terlama</option>
                            </select>
                        </div>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center">
                        <Spinner />
                    </div>
                ) : (
                    <>
                        <div className="grid gap-4 grid-cols-1">
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

                            {/* Pagination */}
                            {filteredPengumumans.length > 0 && (
                                <div className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-between">
                                    {/* Dropdown untuk menentukan ukuran halaman */}
                                    <div className="flex gap-2">
                                        <select
                                            value={pageSize}
                                            onChange={(e) => {
                                                setPageSize(Number(e.target.value));
                                                setCurrentPage(1); // Reset ke halaman pertama saat mengubah ukuran halaman
                                            }}
                                            className="rounded border border-gray-300 px-2 py-1 dark:text-white dark:bg-[#1A2031]"
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
                                            <span className="label-text dark:text-white">
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
                                                dari {filteredPengumumans.length} Dokumen
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
        </>
    );
};

export default PengumumanSection;
