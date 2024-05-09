"use client";
import React from "react";
import Breadcrumb from "../../Breadcrumbs/Breadcrumb";
import TableDashboard from "../TableDashboard";

const Profil: React.FC = () => {
  // inisiasi table headers
  const headers = ["Date", "Title", "Category", "Action"];

  // inisiasi table body
  const datas = [
    {
      createdAt: "24 Feburari 2024",
      title: `Bonebol Sepekan - Januari pekan 3`,
      category: "Bonebol Sepekan",
      slugLink: "/admin/profil/aba",
    },
    {
      createdAt: "23 Feburari 2024",
      title: `SK Gubernur 28/001/XXI`,
      category: "SK Gubernur",
      slugLink: "/admin/profil/aba",
    },
    {
      createdAt: "22 Februari 2024",
      title: `Bonebol Sepekan - Januari pekan 2`,
      category: "Bonebol Sepekan",
      slugLink: "/admin/profil/aba",
    },
    {
      createdAt: "21 Februari 2024",
      title: `Bonebol Sepekan - Januari pekan 1`,
      category: "Bonebol Sepekan",
      slugLink: "/admin/profil/aba",
    },
    {
      createdAt: "20 Feburuari 2024",
      title: `SK Bupati 28/001/XXI`,
      category: "SK Bupati",
      slugLink: "/admin/profil/aba",
    },
  ];

  // fungsi mengatur kapan harus ada icon sortable
  const sortableIcon = (index: number) => {
    if (index === 0 || index === 2) {
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
        />
      </div>
    </>
  );
};

export default Profil;
