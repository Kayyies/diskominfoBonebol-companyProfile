"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface DataItem {
  category?: string;
  title?: string;
  createdAt?: string;
  desc?: string;
  slugLink?: URL;
  logo?: string;
}

interface Props {
  datas: DataItem[];
  headers: string[];
  sortableIcon: (index: number) => boolean;
}

const TableDashboard: React.FC<Props> = ({ datas, headers, sortableIcon }) => {
  const pathname = usePathname();
  const tambahData = `${pathname}/tambahdata`;
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
            {/* Refresh Button */}
            <Link
              className="flex select-none items-center gap-3 rounded-lg border border-gray-900 px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              href="#"
            >
              Refresh
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                ></path>
              </svg>
            </Link>

            {/* Tambah Data Button */}
            <Link
              className="flex select-none items-center gap-3 rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              href={tambahData}
            >
              Tambah Data
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                ></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <div className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          {/* Category Table Header */}
          <thead>
            <tr>
              {/* Category Header */}
              {headers.map((header, index) => (
                <th
                  key={index}
                  className={`border-blue-gray-100 bg-blue-gray-50/50 ${
                    sortableIcon(index)
                      ? "cursor-pointer hover:bg-blue-gray-50"
                      : ""
                  } border-y p-4 transition-colors`}
                >
                  <p className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-blue-gray-900 antialiased opacity-70">
                    {header}
                    {sortableIcon}
                  </p>
                </th>
              ))}
            </tr>
          </thead>

          {/* Category Table Body */}
          <tbody>
            {datas.map((data, index) => (
              <tr key={index}>
                {Object.keys(data).map((key, dataIndex) => (
                  <td key={dataIndex} className="p-4">
                    <div className="flex max-h-10 max-w-50 flex-col overflow-hidden">
                      {/* Special handling for the 'slugLink' property */}
                      {key === "slugLink" ? (
                        <Link
                          className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          type="button"
                          href={data[key]}
                        >
                          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                              className="h-4 w-4"
                            >
                              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                            </svg>
                          </span>
                        </Link>
                      ) : key === "image" ? (
                        <img src={data[key]} alt="Logo" className="h-10 w-10" />
                      ) : key === "link" ? (
                        <Link
                          className="relative h-10 max-h-[40px] w-10 max-w-[40px] text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:text-blue-500"
                          type="button"
                          href={data[key]}
                        >
                          {data[key]}
                        </Link>
                      ) : (
                        <p className="block font-sans text-sm font-normal leading-normal text-blue-gray-900 antialiased">
                          {data[key]}
                        </p>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* footer */}
      <div className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <p className="block font-sans text-sm font-normal leading-normal text-blue-gray-900 antialiased">
          Page 1 of 10
        </p>
        <div className="flex gap-2">
          <button
            className="select-none rounded-lg border border-gray-900 px-4 py-2 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            Previous
          </button>
          <button
            className="select-none rounded-lg border border-gray-900 px-4 py-2 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default TableDashboard;
