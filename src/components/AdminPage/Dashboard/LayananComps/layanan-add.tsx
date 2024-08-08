"use client";

//import icons
import { createLayanan } from "@/lib/actions";
import { useFormState } from "react-dom";

import { FaTrashAlt } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { SubmitButton } from "@/components/AdminPage/Dashboard/button";

const LayananAdd = () => {
  const [state, formAction] = useFormState(createLayanan, null);
  return (
    <>
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
          <form action={formAction}>
            <div className="mb-5">
              <label htmlFor="">Logo Layanan</label>
              <input
                type="file"
                name="image"
                className="text-slate-500 mt-2 block cursor-pointer rounded-lg border-2 text-sm file:mr-4 file:border-0 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white file:transition-all hover:file:bg-gray-800 hover:file:text-white active:file:bg-gray-600 active:file:text-white"
              />
              <div aria-live="polite" aria-atomic="true">
                <p className="mt-2 text-sm text-red">{state?.error?.image}</p>
              </div>
            </div>
            <div className="mb-5">
              <label htmlFor="">Nama Layanan</label>
              <input
                type="text"
                name="title"
                placeholder="Masukan Nama Layanan"
                className="mt-2 block w-full appearance-none rounded border border-blue-gray-300 bg-white px-4 py-3 pr-8 leading-tight text-blue-gray-700 transition-all focus:border-gray-500 focus:bg-white focus:outline-none"
              />
              <div aria-live="polite" aria-atomic="true">
                <p className="mt-2 text-sm text-red">{state?.error?.title}</p>
              </div>
            </div>
            <div className="mb-5">
              <label htmlFor="">Deskripsi Layanan</label>
              <textarea
                name="desc"
                placeholder="Masukan Deskripsi Layanan"
                className="mb-5 mt-2 block w-full appearance-none rounded border border-blue-gray-300 bg-white px-4 py-3 pr-8 leading-tight text-blue-gray-700 transition-all focus:border-gray-500 focus:bg-white focus:outline-none"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="">URL Layanan</label>
              <input
                type="text"
                name="link"
                placeholder="Masukan URL Layanan"
                className="mb-5 mt-2 block w-full appearance-none rounded border border-blue-gray-300 bg-white px-4 py-3 pr-8 leading-tight text-blue-gray-700 transition-all focus:border-gray-500 focus:bg-white focus:outline-none"
              />
            </div>
            <SubmitButton label="Masukan Data" />
          </form>
        </div>
      </div>
    </>
  );
};

export default LayananAdd;
