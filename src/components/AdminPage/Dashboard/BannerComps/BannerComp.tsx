"use client";

//import pages
import React from "react";
import Breadcrumb from "../../Breadcrumbs/Breadcrumb";
import TableDashboard from "../TableDashboard/TableDashboard";
import useRefreshData from "@/hooks/useRefreshData";

const fetchData = async () => {
  try {
    const response = await fetch("/api/banner");
    const data = await response.json();
    return data.map((item) => ({
      ...item,
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const BannerAdmin: React.FC = () => {
  //inisiasi table headers
  const headers = ["Image", "Description", "Action"];

  const [datas, isLoading, refreshData] = useRefreshData([], fetchData);

  //fungsi mengatur kapan harus ada icon sortable
  const sortableIcon = (index: number) => {
    if (index === 0) {
      return false;
    }
    return false;
  };

  //fungsi implement icon sortable based on logic operation above
  const modifiedHeaders = headers.map((header, index) => {
    if (sortableIcon(index)) {
      //include icon svg for the column
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
    //return the header without the icon SVG
    return header;
  });

  return (
    <>
      <Breadcrumb pageName="Banner" />
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
export default BannerAdmin;
