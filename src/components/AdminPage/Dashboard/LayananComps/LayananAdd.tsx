import React from "react";
import TambahDataPage from "../TambahDataPage/TambahDataPage";

const LayananAdd: React.FC = () => {
  const inputFields = [
    { type: "text", label: "Logo", placeholder: "Enter logo URL" },
    { type: "text", label: "Title", placeholder: "Enter title" },
    { type: "text", label: "Description", placeholder: "Enter description" },
    {
      type: "select",
      label: "Description",
      placeholder: "Enter description",
      options: ["diskominfo", "diskiminfi", "duskumunfu"],
    },
    // Add more input fields as needed
  ];

  const showTextEditor = true; // Set this to true or false as needed

  return (
    <>
      <TambahDataPage
        inputFields={inputFields}
        showTextEditor={showTextEditor}
        upperRootPageUrl="/admin/layanan"
      />
    </>
  );
};

export default LayananAdd;
