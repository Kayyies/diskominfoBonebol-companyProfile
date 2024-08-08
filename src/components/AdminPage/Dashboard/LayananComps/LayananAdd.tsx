import React from "react";
import TambahDataPage from "../TambahDataPage/TambahDataPage";

const LayananAdd: React.FC = () => {
  const inputFields = [
    { type: "file", label: "Logo", placeholder: "Enter logo URL" },
    { type: "text", label: "Title", placeholder: "Enter title" },
    {
      type: "textArea",
      label: "Description",
      placeholder: "Enter description",
    },
    { type: "text", label: "Link", placeholder: "Enter the URL" },
  ];

  const showTextEditor = true; // Set this to true or false as needed
  const apiEndpoint = "/api/layanan";

  return (
    <>
      <TambahDataPage inputFields={inputFields} apiEndpoint={apiEndpoint} />
    </>
  );
};

export default LayananAdd;
