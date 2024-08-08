"use client";

//import icons
import { FaTrashAlt } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";

import { createDokumen } from "@/lib/actions";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/components/AdminPage/Dashboard/button";

const dokumenCategory = {
  SK_GUBERNUR: "SK_GUBERNUR",
  SK_BUPATI: "SK_BUPATI",
  BONEBOL_SEPEKAN: "BONEBOL_SEPEKAN",
};

export const DokumenAdd = () => {
  const [state, formAction] = useFormState(createDokumen, null);

  return (
    <>
      {/* kembali and reset button  */}
      <div className="mb-5 flex flex-row items-center justify-between align-middle">
        <button className="flex w-max items-center gap-2 transition-all hover:text-blue-400">
          <FaArrowLeftLong />
          Kembali
        </button>
        <button className="flex select-none items-center gap-3 rounded-lg border border-gray-900 px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
          Reset
          <FaTrashAlt />
        </button>
      </div>

      {/* add page body */}
      <div className="relative mb-5 flex h-full w-full flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="relative mx-4 mt-4 overflow-hidden rounded-none bg-white bg-clip-border text-gray-700">
          <form action={formAction}>
            {/* image */}
            <div className="mb-5">
              <label htmlFor="">Document Image Cover</label>
              <input
                type="file"
                name="image"
                className="text-slate-500 mt-2 block cursor-pointer rounded-lg border-2 text-sm file:mr-4 file:border-0 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white file:transition-all hover:file:bg-gray-800 hover:file:text-white active:file:bg-gray-600 active:file:text-white"
              />
              <div aria-live="polite" aria-atomic="true">
                <p className="mt-2 text-sm text-red">{state?.error?.file}</p>
              </div>
            </div>
            {/* file */}
            <div className="mb-5">
              <label htmlFor="">Document File</label>
              <input
                type="file"
                name="file"
                className="text-slate-500 mt-2 block cursor-pointer rounded-lg border-2 text-sm file:mr-4 file:border-0 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white file:transition-all hover:file:bg-gray-800 hover:file:text-white active:file:bg-gray-600 active:file:text-white"
              />
              <div aria-live="polite" aria-atomic="true">
                <p className="mt-2 text-sm text-red">{state?.error?.file}</p>
              </div>
            </div>
            {/* title */}
            <div className="mb-5">
              <label htmlFor="">Nama Dokumen</label>
              <input
                type="text"
                name="title"
                placeholder="Masukan Nama Dokumen"
                className="mt-2 block w-full appearance-none rounded border border-blue-gray-300 bg-white px-4 py-3 pr-8 leading-tight text-blue-gray-700 transition-all focus:border-gray-500 focus:bg-white focus:outline-none"
              />
              <div aria-live="polite" aria-atomic="true">
                <p className="mt-2 text-sm text-red">{state?.error?.title}</p>
              </div>
            </div>
            {/* category */}
            <div className="mb-5">
              <label htmlFor="">Category</label>
              <select
                className="mb-5 block w-full appearance-none rounded border border-blue-gray-300 bg-white px-4 py-3 pr-8 leading-tight text-blue-gray-700 transition-all focus:border-gray-500 focus:bg-white focus:outline-none"
                name="category"
              >
                <option hidden>--PILIH DATA--</option>
                {Object.entries(dokumenCategory).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
            </div>
            <SubmitButton label="Masukan Data" />
          </form>
        </div>
      </div>
    </>
  );
};

export default DokumenAdd;
