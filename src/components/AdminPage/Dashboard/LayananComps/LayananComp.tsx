"use client";

//import pages
import React, { useState } from "react";
import Breadcrumb from "../../Breadcrumbs/Breadcrumb";
import TableDashboard from "../TableDashboard/TableDashboard";
import useRefreshData from "@/hooks/useRefreshData";

const fetchData = async () => {
  try {
    const response = await fetch("/api/layanan");
    const data = await response.json();
    return data.map((item) => ({
      ...item,
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const LayananComp: React.FC = () => {
  //inisiasi table headers
  const headers = ["Logo", "Title", "Description", "Link", "Action"];

  const [datas, isLoading, refreshData] = useRefreshData([], fetchData);

  //fungsi mengatur kapan harus ada icon sortable
  const sortableIcon = (
    index: number,
    isSorted: boolean,
    sortDirection: "asc" | "desc",
  ) => {
    if (index === 1) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          aria-hidden="true"
          className={`h-4 w-4 ${isSorted ? (sortDirection === "asc" ? "rotate-180" : "") : ""}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
          />
        </svg>
      );
    }
    return null;
  };

  return (
    <>
      <Breadcrumb pageName="Layanan Kami" />
      <div className="relative flex h-full w-full flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <TableDashboard
          datas={datas}
          headers={headers}
          sortableIcon={sortableIcon}
          onRefresh={refreshData}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default LayananComp;
