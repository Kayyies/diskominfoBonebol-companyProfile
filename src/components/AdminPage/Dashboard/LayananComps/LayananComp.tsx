"use client";

//import pages
import React, { useState } from "react";
import Breadcrumb from "../../Breadcrumbs/Breadcrumb";
import TableDashboard from "../TableDashboard";

//import image [del soon]

const LayananComp: React.FC = () => {
  //inisiasi table headers
  const headers = ["id", "Logo", "Title", "Description", "Link", "Action"];

  //inisiasi table data
  const initialData = [
    {
      id: 123,
      image: "/beritabonebol.svg",
      title: "Berita Bone Bolango",
      desc: "Open Data Bone Bolango adalah portal terintegrasi untuk pengelolaan, keterbukaan, dan kemudahan akses data bagi warga dan pemerintah Bone Bolango. Jenis data yang disajikan yakni dataset, visualisasi, dan indikator kinerja.",
      link: "https://berita.bonebolangokab.go.id/",
      slugLink: "/admin/profil/aba",
    },
    {
      id: 124,
      image: "/opendatabonebol.svg",
      title: "Open Data Bone Bolango",
      desc: "Open Data Bone Bolango adalah portal terintegrasi untuk pengelolaan, keterbukaan, dan kemudahan akses data bagi warga dan pemerintah Bone Bolango. Jenis data yang disajikan yakni dataset, visualisasi, dan indikator kinerja.",
      link: "https://berita.bonebolangokab.go.id/",
      slugLink: "/admin/profil/aba",
    },
    {
      id: 125,
      image: "/cloudbonebol.svg",
      title: "Cloud Bone Bolango",
      desc: "Open Data Bone Bolango adalah portal terintegrasi untuk pengelolaan, keterbukaan, dan kemudahan akses data bagi warga dan pemerintah Bone Bolango. Jenis data yang disajikan yakni dataset, visualisasi, dan indikator kinerja.",
      link: "https://berita.bonebolangokab.go.id/",
      slugLink: "/admin/profil/aba",
    },
  ];

  const [datas, setDatas] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);

  //fungsi refresh data
  const refreshData = () => {
    setIsLoading(true);
    console.log("Menekan tombol refresh, mulai Refresh Data...");
    setDatas([]);

    //harusnya fetching logic dari database atau API
    //tapi di sini pakai data lokal dulu
    setTimeout(() => {
      setIsLoading(false);
      setDatas(initialData);
      console.log("Refresh data berhasil!");
    }, 1000);
  };

  //fungsi mengatur kapan harus ada icon sortable
  const sortableIcon = (index: number) => {
    if (index === 0 || index === 2) {
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
      <Breadcrumb pageName="Layanan Kami" />
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
export default LayananComp;
