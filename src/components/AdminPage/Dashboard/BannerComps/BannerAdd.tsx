"use react";

import React from "react";
import TambahDataPage from "../TambahDataPage/TambahDataPage";

const BannerAdd: React.FC = () => {
  const inputFields = [
    { type: "file", label: "Image" },
    { type: "text", label: "Deskripsi", placeholder: "masukan deskripsi" },
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

export default BannerAdd;
