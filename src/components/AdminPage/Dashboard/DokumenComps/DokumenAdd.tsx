import React from "react";
import TambahDataPage from "../TambahDataPage/TambahDataPage";

const DokumenAdd: React.FC = () => {
  const inputFields = [
    { type: "text", label: "Date" },
    { type: "text", label: "Image", placeholder: "masukan gambar" },
    { type: "text", label: "Title", placeholder: "masukan gambar" },
    { type: "text", label: "Category", placeholder: "masukan gambar" },
  ];

  const showTextEditor = false;

  return (
    <>
      <TambahDataPage
        inputFields={inputFields}
        showTextEditor={showTextEditor}
      />
    </>
  );
};

export default DokumenAdd;
