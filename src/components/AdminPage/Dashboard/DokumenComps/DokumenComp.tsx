"use client";
import React from "react";
import Breadcrumb from "../../Breadcrumbs/Breadcrumb";
import TableDashboard from "../TableDashboard/TableDashboard";
import useRefreshData from "@/hooks/useRefreshData";
import { DokumenCategory } from "@prisma/client";

const dokumenCategoryMapping: { [key in DokumenCategory]: string } = {
  SK_GUBERNUR: "SK Gubernur",
  SK_BUPATI: "SK Bupati",
  BONEBOL_SEPEKAN: "Bonebol Sepekan",
};

const fetchData = async () => {
  try {
    const response = await fetch("/api/dokumen");
    const data = await response.json();
    return data.map((item) => ({
      ...item,
      createdAt: new Date(item.createdAt).toISOString().split("T")[0],
      category: dokumenCategoryMapping[item.category as DokumenCategory],
    }));
  } catch (error) {
    console.error("Eror fetching data:", error);
    return [];
  }
};

const Profil: React.FC = () => {
  // inisiasi table headers
  const headers = ["Date", "Document Cover", "Title", "Category", "Action"];
  const [datas, isLoading, refreshData] = useRefreshData([], fetchData);

  // fungsi mengatur kapan harus ada icon sortable
  const sortableIcon = (index: number) => {
    if (index === 0 || index === 2 || index === 3) {
      return true;
    }
    return false;
  };

  // fungsi implement icon sortable based on logic operation above
  const modifiedHeaders = headers.map((header, index) => {
    if (sortableIcon(index)) {
      // Include icon SVG for the column
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
    // Return the header without the icon SVG
    return header;
  });

  return (
    <>
      <Breadcrumb pageName="Dokumen" />
      <div className="relative flex h-full w-full flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <TableDashboard
          datas={datas}
          headers={modifiedHeaders}
          sortableIcon={sortableIcon}
          onRefresh={refreshData}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default Profil;
