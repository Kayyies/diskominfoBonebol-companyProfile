"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { TextEditorReact } from "../../wysiwyg/WYSIWYG";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import Modal from "./Modal";

interface InputField {
  type: "text" | "select";
  label: String;
  placeholder: String;
  options?: String[];
}

interface Props {
  inputFields: InputField[];
  showTextEditor?: boolean;
}

const TambahDataPage: React.FC<Props> = ({
  inputFields,
  showTextEditor = false,
}) => {
  //useState untuk form input
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>(
    Object.fromEntries(inputFields.map((field) => [field.label, ""])),
  );

  //handler untuk controlled input
  const handleChange = (label: string, value: string) => {
    setInputValues({ ...inputValues, [label]: value });
  };

  //Modal State
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalCancel, setModalCancel] = useState("");
  const [modalConfirm, setModalConfirm] = useState("");
  const [previousPath, setPreviousPath] = useState("");

  //handle open modal
  const handleOpenModal = (
    title: string,
    message: string,
    modalCancel: string,
    modalConfrim: string,
    previousPath: string,
    onConfirm: () => void,
  ) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalCancel(modalCancel);
    setModalConfirm(modalConfrim);
    setShowModal(true);
    setModalConfirmAction(onConfirm);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  //handler untk clear form input
  const handleReset = () => {
    console.log("data cleared");
    setInputValues(
      Object.fromEntries(inputFields.map((field) => [field.label, ""])),
    );
    const selectElements = document.querySelectorAll("select"); // Get all select elements
    selectElements.forEach((select) => {
      select.value = ""; // Reset each select element to its default value
    });
    setShowModal(false);
  };

  // Kalkulasi previous path using usePathname
  const pathName = usePathname();
  useEffect(() => {
    const finalSlashIndex = pathName.lastIndexOf("/");
    setPreviousPath(pathName.slice(0, finalSlashIndex));
  }, [pathName]);

  // Check is form is filled
  const isFormFilled = () => {
    return Object.values(inputValues).some((value) => value != "");
  };

  // handler untuk kembali
  const handleKembali = () => {
    console.log("Kembali ke halaman:", previousPath);
    window.location.href = previousPath; // Navigate to previous path
  };

  const [modalConfirmAction, setModalConfirmAction] = useState<() => void>(
    () => {},
  );
  return (
    <>
      {/* Kembali Button and Reset Button */}
      <div className="mb-5 flex flex-row items-center justify-between align-middle">
        {/* Tombol Kembali ke Halaman Sebelumnya */}
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5 scale-x-[-1] transform"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
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
          <svg
            className="h-[16px] w-[16px] text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Form Input */}
      <div className="relative mb-5 flex h-full w-full flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="relative mx-4 mt-4 overflow-hidden rounded-none bg-white bg-clip-border text-gray-700">
          {inputFields.map((field, index) => (
            <div key={index} className="mb-5">
              <p className="mb-3">{field.label}</p>
              {field.type === "text" ? (
                <input
                  type="text"
                  placeholder={field.placeholder}
                  className="mb-5 block w-full appearance-none rounded border border-blue-gray-300 bg-white px-4 py-3 pr-8 leading-tight text-blue-gray-700 transition-all focus:border-gray-500 focus:bg-white focus:outline-none"
                  value={inputValues[field.label]}
                  onChange={(e) => handleChange(field.label, e.target.value)}
                />
              ) : field.type === "select" && field.options ? (
                <select
                  className="mb-5 block w-full appearance-none rounded border border-blue-gray-300 bg-white px-4 py-3 pr-8 leading-tight text-blue-gray-700 transition-all focus:border-gray-500 focus:bg-white focus:outline-none"
                  label=""
                  defaultValue=""
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
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {/* Text editor */}
      {showTextEditor && (
        <div className="relative flex h-full w-full flex-col rounded-xl text-gray-700 ">
          <TextEditorReact />
        </div>
      )}

      {/* Button Masukan Data */}
      <Link
        href="#"
        className="flex select-none items-center justify-center gap-3 rounded-lg bg-gradient-to-tr from-blue-900 to-blue-800 px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-900/10 transition-all hover:shadow-lg hover:shadow-blue-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
      >
        Masukan Data
      </Link>

      {showModal && (
        <Modal
          isOpen={showModal}
          title={modalTitle}
          message={modalMessage}
          modalCancel={modalCancel}
          modalConfirm={modalConfirm}
          onCancel={handleCloseModal}
          onConfirm={
            modalConfirm === "Reset Form" ? handleReset : handleKembali
          }
        />
      )}
    </>
  );
};

export default TambahDataPage;
