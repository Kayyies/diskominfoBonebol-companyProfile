"use client";
import React from "react";
import Breadcrumb from "../../Breadcrumbs/Breadcrumb";
import TableDashboard from "../TableDashboard";

const Profil: React.FC = () => {
  // inisiasi table headers
  const headers = ["Category", "Title", "Description", "Action"];

  // inisiasi table body
  const datas = [
    {
      category: "Diskominfo Bone Bolango",
      title: `Tugas dan Tanggung jawab dinas komunikasi dan informatika kabupaten bone bolango`,
      desc: "Open Data Jabar merupakan portal resmi data terbuka milik Pemdaprov Jawa Barat yang berisikan data-data dari Perangkat Daerah di lingkungan Pemdaprov Jawa Barat guna memenuhi kebutuhan masyarakat untuk akses data dan informasi yang akurat dan akuntabel dengan cepat.",
      slugLink: "/admin/profil/aba",
    },
    {
      category: "Sejarah Diskominfo Bone Bolango",
      title: `Jan 13,2023`,
      desc: "Open Data Jabar merupakan portal resmi data terbuka milik Pemdaprov Jawa Barat yang berisikan data-data dari Perangkat Daerah di lingkungan Pemdaprov Jawa Barat guna memenuhi kebutuhan masyarakat untuk akses data dan informasi yang akurat dan akuntabel dengan cepat.",
      slugLink: "/admin/profil/aba",
    },
    {
      category: "Jajaran Diskominfo Bone Bolango",
      title: `Jan 13,2023`,
      desc: "Open Data Jabar merupakan portal resmi data terbuka milik Pemdaprov Jawa Barat yang berisikan data-data dari Perangkat Daerah di lingkungan Pemdaprov Jawa Barat guna memenuhi kebutuhan masyarakat untuk akses data dan informasi yang akurat dan akuntabel dengan cepat.",
      slugLink: "/admin/profil/aba",
    },
    {
      category: "Jajaran Diskominfo Bone Bolango",
      title: `Jan 13,2023`,
      desc: "Open Data Jabar merupakan portal resmi data terbuka milik Pemdaprov Jawa Barat yang berisikan data-data dari Perangkat Daerah di lingkungan Pemdaprov Jawa Barat guna memenuhi kebutuhan masyarakat untuk akses data dan informasi yang akurat dan akuntabel dengan cepat.",
      slugLink: "/admin/profil/aba",
    },
    {
      category: "Jajaran Diskominfo Bone Bolango",
      title: `Jan 13,2023`,
      desc: "Open Data Jabar merupakan portal resmi data terbuka milik Pemdaprov Jawa Barat yang berisikan data-data dari Perangkat Daerah di lingkungan Pemdaprov Jawa Barat guna memenuhi kebutuhan masyarakat untuk akses data dan informasi yang akurat dan akuntabel dengan cepat.",
      slugLink: "/admin/profil/aba",
    },
  ];

  // fungsi mengatur kapan harus ada icon sortable
  const sortableIcon = (index: number) => {
    if (index === 0) {
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
      <Breadcrumb pageName="Profil" />
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
