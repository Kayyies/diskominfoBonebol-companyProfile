"use client";
import React from "react";
import Breadcrumb from "../../Breadcrumbs/Breadcrumb";
import TableDashboard from "../TableDashboard/TableDashboard";
import useRefreshData from "@/hooks/useRefreshData";

// Define the mapping object for ProfilCategory
const profilCategoryMapping: { [key in ProfilCategory]: string } = {
  DISKOMINFO_BONE_BOLANGO: "Diskominfo Bone Bolango",
  SEJARAH_DISKOMINFO_BONE_BOLANGO: "Sejarah Diskominfo Bone Bolango",
  JAJARAN_DISKOMINFO_BONE_BOLANGO: "Jajaran Diskominfo Bone Bolango",
};

// Function to fetch data from the API
const fetchData = async () => {
  try {
    const response = await fetch("/api/profil"); // Fetch data from the API
    const data = await response.json(); // Parse the response JSON
    // Map the category field to the human-readable format
    return data.map((item) => ({
      ...item,
      category: profilCategoryMapping[item.category as ProfilCategory],
    }));
  } catch (error) {
    console.error("Error fetching data:", error); // Log any errors
    return [];
  }
};

const Profil: React.FC = () => {
  // Use the useRefreshData hook to manage data and loading state
  const [datas, isLoading, refreshData] = useRefreshData([], fetchData);

  const headers = ["Category", "Title", "Description", "Action"];

  const sortableIcon = (index: number) => {
    if (index === 0) {
      return true;
    }
    return false;
  };

  const modifiedHeaders = headers.map((header, index) => {
    if (sortableIcon(index)) {
      return (
        <>
          {header}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
            />
          </svg>
        </>
      );
    }
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
          onRefresh={refreshData} // Pass the refreshData function directly
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default Profil;
