"use client";

//import pages
import React from "react";
import Breadcrumb from "../../Breadcrumbs/Breadcrumb";
import TableDashboard from "../TableDashboard";

//import image [del soon]

const BannerAdmin: React.FC = () => {
  //inisiasi table headers
  const headers = ["Id", "Image", "Description", "Action"];

  //inisiasi table body
  const datas = [
    {
      id: 123,
      image: "/beritabonebol.svg",
      desc: "gambar banner tentang makan",
      slugLink: "/admin/profil/aba",
    },
  ];

  //fungsi mengatur kapan harus ada icon sortable
  const sortableIcon = (index: number) => {
    if (index === 0) {
      return true;
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
        />
      </div>
    </>
  );
};
export default BannerAdmin;
