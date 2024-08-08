"use client";

import { useFormState } from "react-dom";

import { FaTrashAlt } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { SubmitButton } from "@/components/AdminPage/Dashboard/button";
import Tiptap from "../../wysiwyg/Tiptap";

const profilCategory = {
  DISKOMINFO_BONE_BOLANGO: "DISKOMINFO_BONE_BOLANGO",
  SEJARAH_DISKOMINFO_BONE_BOLANGO: "SEJARAH_DISKOMINFO_BONE_BOLANGO",
  JAJARAN_DISKOMINFO_BONE_BOLANGO: "JAJARAN_DISKOMINFO_BONE_BOLANGO",
};

export const ProfilAdd = () => {
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

      <div className="relative mb-5 flex h-full w-full flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="relative mx-4 mt-4 overflow-hidden rounded-none bg-white bg-clip-border text-gray-700">
          <form action="">
            {/* category */}
            <div className="mb-5">
              <label htmlFor="">Category</label>
              <select
                className="mb-5 block w-full appearance-none rounded border border-blue-gray-300 bg-white px-4 py-3 pr-8 leading-tight text-blue-gray-700 transition-all focus:border-gray-500 focus:bg-white focus:outline-none"
                name="category"
              >
                <option hidden>--PILIH DATA--</option>
                {Object.entries(profilCategory).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
            </div>

            {/* title */}
            <div className="mb-5">
              <label htmlFor="">Title</label>
              <input
                type="text"
                name="title"
                placeholder="Masukan Title"
                className="mt-2 block w-full appearance-none rounded border border-blue-gray-300 bg-white px-4 py-3 pr-8 leading-tight text-blue-gray-700 transition-all focus:border-gray-500 focus:bg-white focus:outline-none"
              />
            </div>
            <div className="relative flex h-full w-full flex-col rounded-xl text-gray-700">
              <Tiptap />
            </div>
            <SubmitButton label="Masukan Data" />
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfilAdd;
