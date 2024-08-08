"use client";

import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import Tiptap from "../../wysiwyg/Tiptap";
import useModal from "./useModal";
import useForm from "./useForm";
import useNavigation from "./useNavigation";
import { InputField, Props } from "./types";

//import icons
import { FaTrashAlt } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";

const TambahDataPage: React.FC<Props> = ({
  inputFields = [],
  showTextEditor = false,
  apiEndpoint,
}) => {
  console.log("inputFields:", inputFields); // Debugging line

  const { inputValues, handleChange, handleReset } = useForm(inputFields);
  const {
    showModal,
    modalTitle,
    modalMessage,
    modalCancel,
    modalConfirm,
    modalConfirmAction,
    handleOpenModal,
    handleCloseModal,
  } = useModal();
  const { handleKembali, previousPath } = useNavigation();

  const [resetEditor, setResetEditor] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    setResetEditor(false);
  }, [resetEditor]);

  const isFormFilled = () => {
    const isTextFieldsFilled = Object.entries(inputValues).some(
      ([key, value]) => key !== "Date" && value !== "",
    );
    return isTextFieldsFilled || selectedFile !== null;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    Object.entries(inputValues).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      // Handle successful submission (e.g., redirect or show a success message)
      alert("Data submitted successfully!");
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Error submitting data");
    }
  };

  return (
    <>
      {/* Headbar */}
      <div className="mb-5 flex flex-row items-center justify-between align-middle">
        {/* Kembali Button */}
        <button
          className="flex w-max items-center gap-2 transition-all hover:text-blue-400"
          onClick={() => {
            if (isFormFilled()) {
              handleOpenModal(
                "Yakin ingin pindah halaman?",
                "Data yang kamu input belum tersimpan, lanjutkan keluar dari halaman?",
                "Batalkan",
                "Kembali ke halaman sebelumnya",
                handleKembali,
              );
            } else {
              handleKembali();
            }
          }}
        >
          <FaArrowLeftLong />
          Kembali
        </button>

        {/* Reset Button */}
        <button
          className="flex select-none items-center gap-3 rounded-lg border border-gray-900 px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={() => {
            if (isFormFilled()) {
              handleOpenModal(
                "Yakin mau reset input?",
                "Data yang kamu input belum tersimpan, lanjutkan mereset input data?",
                "Batalkan",
                "Reset Form",
                handleReset,
              );
            } else {
              handleReset();
            }
          }}
        >
          Reset
          <FaTrashAlt />
        </button>
      </div>

      <div className="relative mb-5 flex h-full w-full flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="relative mx-4 mt-4 overflow-hidden rounded-none bg-white bg-clip-border text-gray-700">
          <form onSubmit={handleSubmit}>
            {inputFields.map((field, index) => (
              <div key={index} className="mb-5">
                <p className="mb-3">{field.label}</p>
                {field.type === "text" ? (
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    className={`mb-5 block w-full appearance-none rounded border border-blue-gray-300 bg-white px-4 py-3 pr-8 leading-tight text-blue-gray-700 transition-all focus:border-gray-500 focus:bg-white focus:outline-none 
                    ${
                      field.label === "Date"
                        ? "cursor-not-allowed bg-gray-200"
                        : ""
                    }`}
                    value={inputValues[field.label]}
                    onChange={(e) => handleChange(field.label, e.target.value)}
                    disabled={field.label === "Date"}
                  />
                ) : field.type === "select" && field.options ? (
                  <select
                    className="mb-5 block w-full appearance-none rounded border border-blue-gray-300 bg-white px-4 py-3 pr-8 leading-tight text-blue-gray-700 transition-all focus:border-gray-500 focus:bg-white focus:outline-none"
                    defaultValue=""
                    onChange={(e) => handleChange(field.label, e.target.value)}
                  >
                    <option value="" disabled hidden>
                      --Pilih Data--
                    </option>
                    {field.options.map((option, optionIndex) => (
                      <option key={optionIndex} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : field.type === "file" ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      id="fileInput"
                      className="text-slate-500 block cursor-pointer rounded-lg border-2 text-sm file:mr-4 file:border-0 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white file:transition-all hover:file:bg-gray-800 hover:file:text-white active:file:bg-gray-600 active:file:text-white"
                      onChange={handleFileChange}
                    />
                    {selectedFile && (
                      <button
                        type="button"
                        className="flex items-center justify-center"
                        onClick={handleClearFile}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="h-5 w-5 text-gray-900"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                ) : field.type === "textArea" ? (
                  <textarea
                    placeholder={field.placeholder}
                    className="mb-5 block w-full appearance-none rounded border border-blue-gray-300 bg-white px-4 py-3 pr-8 leading-tight text-blue-gray-700 transition-all focus:border-gray-500 focus:bg-white focus:outline-none"
                    value={inputValues[field.label]}
                    onChange={(e) => handleChange(field.label, e.target.value)}
                  />
                ) : null}
              </div>
            ))}
            {showTextEditor && (
              <div className="relative flex h-full w-full flex-col rounded-xl text-gray-700">
                <Tiptap />
              </div>
            )}

            <button
              type="submit"
              className="flex w-full select-none items-center justify-center gap-3 rounded-lg bg-gradient-to-tr from-blue-900 to-blue-800 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-900/10 transition-all hover:shadow-lg hover:shadow-blue-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              Masukan Data
            </button>
          </form>
        </div>
      </div>

      {showModal && (
        <Modal
          isOpen={showModal}
          title={modalTitle}
          message={modalMessage}
          modalCancel={modalCancel}
          modalConfirm={modalConfirm}
          onCancel={handleCloseModal}
          onConfirm={modalConfirmAction}
        />
      )}
    </>
  );
};

export default TambahDataPage;
