import React from "react";
import TambahDataPage from "../TambahDataPage/TambahDataPage";

const ProfilAdd: React.FC = () => {
  const inputFields = [
    {
      type: "select",
      label: "Category",
      placeholder: "Enter Description",
      options: [
        "Diskominfo Bone Bolango",
        "Sejarah Diskominfo Bone Bolango",
        "Jajaran Diskominfo Bone Bolango",
      ],
    },
    { type: "text", label: "Title", placeholder: "Enter Profil Title" },
  ];

  const showTextEditor = true;
  const apiEndpoint = "/api/profil";

  return (
    <>
      <TambahDataPage
        inputFields={inputFields}
        showTextEditor={showTextEditor}
        apiEndpoint={apiEndpoint}
      />
    </>
  );
};

export default ProfilAdd;
