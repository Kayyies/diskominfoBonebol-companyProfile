"use client";

import React, { useEffect, useState } from "react";
import { PublikasiData } from "@/data/PublikasiData";
import JumbotronNew from "@/components/Jumbotron/JumbotronNew";
import PublikasiCard from "@/components/PublikasiCard";
import Pagination from "@/components/Pagination"; // Komponen pagination
import Spinner from "@/components/Spinner"; // Komponen spinner

const DEFAULT_PAGE_SIZE = 6; // Ukuran halaman default
const MAX_PAGE_SIZE = 30; // Ukuran halaman maksimum

const DokumenPage = () => {
    const [dokumens, setDokumens] = useState([]); // Inisialisasi dengan array kosong
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true); // State untuk loading
    const [searchQuery, setSearchQuery] = useState(""); // State untuk pencarian
    const [filteredDokumens, setFilteredDokumens] = useState([]); // State untuk berita yang difilter
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE); // Ukuran halaman saat ini
    const [sortOrder, setSortOrder] = useState("Terbaru"); // Urutan default

    useEffect(() => {
        const fetchDokumens = async () => {
            setIsLoading(true); // Set loading ke true sebelum fetching

            try {
                // ambil data dari PublikasiData.js
                const data = PublikasiData;

                setDokumens(data); // Set dokumens ke data
                setFilteredDokumens(data); // Set filteredDokumens ke data
                setTotalPages(Math.ceil(data.length / pageSize));
            } catch (error) {
                console.error("Failed to fetch dokumens:", error);
                setDokumens([]); // Set default ke array kosong jika terjadi error
                setFilteredDokumens([]); // Kosongkan filteredDokumens
            } finally {
                setIsLoading(false); // Set loading ke false setelah fetching selesai
            }
        };

        fetchDokumens();
    }, [pageSize]);

    const sortDokumens = (dokumensList) => {
        switch (sortOrder) {
            case "Terbaru":
                return dokumensList.sort(
                    (a, b) => new Date(b.date) - new Date(a.date),
                );
            case "Terlama":
                return dokumensList.sort(
                    (a, b) => new Date(a.date) - new Date(b.date),
                );
            default:
                return dokumensList;
        }
    };

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = dokumens.filter((dokumen) => {
            const title = dokumen.title ? dokumen.title.toLowerCase() : "";
            const category = dokumen.category
                ? dokumen.category.toLowerCase()
                : "";
            return title.includes(query) || category.includes(query);
        });

        setFilteredDokumens(filtered);
        setTotalPages(Math.ceil(filtered.length / pageSize));
        setCurrentPage(1);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const paginatedDokumens = sortDokumens(filteredDokumens).slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize,
    );

    return (
        <div className="bg-base-100">
            <JumbotronNew
                title="️📁 Dokumen"
                descColor="Cari Dokumen"
                descNormal="yang kamu butuhkan di sini!"
                subdesc="Kamu bisa temukan SK Bupati, SK Gubernur, dan dokumen lain seputar Bone Bolango di sini!"
            />
            <div
                className="-mt-1 pb-10"
                style={{
                    background: "linear-gradient(#EDF1FD,#EDF1FD, #FFFFFF)",
                }}
            >
                <div className="container mx-auto px-6 lg:px-30 2xl:px-48">
                    <div className="flex flex-col gap-8">
                        <div className="form-control">
                            <input
                                type="text"
                                placeholder="Cari Dokumen yang kamu butuhkan!"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="input input-bordered rounded w-full md:w-auto"
                            />
                        </div>

                        <div className="flex items-center justify-between px-5">
                            <p className="text-sm text-gray-900">
                                <span className="font-bold">{filteredDokumens.length}</span> Dokumen ditemukan
                            </p>

                            <div className="flex flex-row gap-2">
                                <label className="label">
                                    <span className="label-text">{"Urutkan:"}</span>
                                </label>
                                <select
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                    className="rounded border border-gray-300 px-2 py-1 text-sm"
                                >
                                    <option>Terbaru</option>
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
                            {/* Render dokumen */}
                            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
                                {paginatedDokumens.length > 0 ? (
                                    paginatedDokumens.map((publikasi, index) => (
                                        <PublikasiCard key={index} publikasi={publikasi} />
                                    ))
                                ) : (
                                    <p className="text-center">
                                        Tidak ada berita yang ditemukan.
                                    </p>
                                )}
                            </div>

                            {filteredDokumens.length > 0 && (
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
                                                    filteredDokumens.length,
                                                )}{" "}
                                                -{" "}
                                                {Math.min(currentPage * pageSize, filteredDokumens.length)}{" "}
                                                dari {filteredDokumens.length} Artikel
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
