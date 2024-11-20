// BeritaHoaxComp.tsx
"use client";
import React from "react";
import Breadcrumb from "../../Breadcrumbs/Breadcrumb";
import TableDashboard from "../TableDashboard/TableDashboard";
import useRefreshData from "@/hooks/useRefreshData";
import { KategoriBerita } from "@prisma/client"; // Pastikan KategoriBerita sudah ada

// Mapping kategori untuk menampilkan string kategori
const beritaHoaxCategoryMapping: { [key in KategoriBerita]: string } = {
  POLITIK: "Politik",
  EKONOMI: "Ekonomi",
  SOSIAL: "Sosial",
  KEBUDAYAAN: "Kebudayaan",
  KESEHATAN: "Kesehatan",
  TEKNOLOGI: "Teknologi",
  LINGKUNGAN: "Lingkungan",
  LOKAL: "Lokal",
};

// Fungsi untuk mengambil data dari API
const fetchData = async () => {
  try {
    const response = await fetch("/api/beritahoax"); // Endpoint API untuk berita hoax
    const data = await response.json();
    return data.map((item) => ({
      ...item,
      createdAt: new Date(item.createdAt).toISOString().split("T")[0], // Format tanggal
      kategori: beritaHoaxCategoryMapping[item.kategori as KategoriBerita],
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

// Komponen utama untuk menampilkan data BeritaHoax
const BeritaHoaxComp: React.FC = () => {
  // Kolom-kolom tabel
  const headers = ["Date", "Title", "Category", "Action"];
  const [datas, isLoading, refreshData] = useRefreshData([], fetchData);

  // Fungsi untuk menentukan apakah kolom dapat diurutkan
  const sortableIcon = (index: number) => {
    if (index === 0 || index === 1 || index === 2) {
      return true;
    }
    return false;
  };

  // Menambahkan ikon sortable ke kolom yang bisa diurutkan
  const modifiedHeaders = headers.map((header, index) => {
    if (sortableIcon(index)) {
      return (
        <>
          {header}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            aria-hidden="true"
            className="h-4 w-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
            ></path>
          </svg>
        </>
      );
    }
    return header;
  });

  return (
    <>
      <Breadcrumb pageName="Berita Hoax" />
      <div className="relative flex h-full w-full flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <TableDashboard
          datas={datas}
          headers={modifiedHeaders}
          sortableIcon={sortableIcon}
          onRefresh={refreshData}
          isLoading={isLoading}
          section="beritahoax"
        />
      </div>
    </>
  );
};

export default BeritaHoaxComp;
