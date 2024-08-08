// TableDashboard.tsx
"use client";

//import Default
import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

//import file components
import usePagination from "./usePagination";
import useSorting from "./useSorting";
import SortableHeader from "./SortableHeader";
import PaginationControls from "./PaginationControls";
import DataCell from "./DataCell";
import { DataItem, Props } from "./types";

//import icons
import { FaPlus } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";

const TableDashboard: React.FC<Props> = ({
  datas,
  headers,
  sortableIcon,
  onRefresh,
  isLoading,
}) => {
  const pathname = usePathname();
  const tambahData = `${pathname}/tambahdata`;

  const { sortedData, sortColumn, sortDirection, handleSort } =
    useSorting(datas);
  const {
    currentPage,
    totalPages,
    paginatedData,
    handleNextPage,
    handlePreviousPage,
    handleGoToPage,
    setCurrentPage,
  } = usePagination(sortedData, 10);

  useEffect(() => {
    setCurrentPage(1);
  }, [datas, setCurrentPage]);

  return (
    <>
      <div className="relative mx-4 mt-4 overflow-hidden rounded-none bg-white bg-clip-border text-gray-700">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <h5 className="block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              Table Dashboard
            </h5>
            <p className="mt-1 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
              Rubahlah data sesuai kebutuhan anda.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <button
              className="flex select-none items-center gap-3 rounded-lg border border-gray-900 px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={onRefresh}
              disabled={isLoading}
            >
              Refresh
              <FiRefreshCw />
            </button>
            <Link
              className="flex select-none items-center gap-3 rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              href={tambahData}
            >
              Tambah Data
              <FaPlus />
            </Link>
          </div>
        </div>
      </div>
      <div className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <SortableHeader
                  key={index}
                  header={header}
                  index={index}
                  isSorted={sortColumn === header}
                  sortDirection={sortDirection}
                  onSort={() => handleSort(header)}
                  sortableIcon={sortableIcon}
                />
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((data, index) => (
              <tr key={index}>
                <DataCell data={data} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
        onGoToPage={handleGoToPage}
      />
    </>
  );
};

export default TableDashboard;
