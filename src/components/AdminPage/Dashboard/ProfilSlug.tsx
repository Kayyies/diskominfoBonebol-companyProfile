"use client";
import React from "react";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { Select, Option, Button } from "@material-tailwind/react";
import { TextEditorReact } from "../wysiwyg/WYSIWYG";
import Link from "next/link";

const category = [
  "Diskominfo Bone Bolango",
  "Sejarah Diskominfo Bone Bolango",
  "Jajaran Diskominfo Bone Bolango",
];

const ProfilSlug: React.FC = () => {
  return (
    <>
      <Link
        variant="text"
        className="mb-5 flex w-max items-center gap-2 transition-all hover:text-blue-400"
        href="/admin/profil"
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
        Kembali ke Profil
      </Link>

      {/* Input Card Section */}
      <div className="relative flex h-full w-full flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="relative mx-4 mt-4 overflow-hidden rounded-none bg-white bg-clip-border text-gray-700">
          {/* category */}
          <p className="mb-3">Category</p>
          <select className="mb-5 block w-full appearance-none rounded border border-blue-gray-300 bg-white px-4 py-3 pr-8 leading-tight text-blue-gray-700 transition-all focus:border-gray-500 focus:bg-white focus:outline-none">
            {category.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          {/* input */}
          <p className="mb-3">Title</p>
          <div className="mb-8 flex items-center justify-between gap-8">
            <div className="relative h-10 w-full min-w-[200px]">
              <input
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mr-1 before:mt-[6.5px] before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-l before:border-t before:border-blue-gray-200 before:transition-all after:pointer-events-none after:ml-1 after:mt-[6.5px] after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-r after:border-t after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-l-2 peer-focus:before:border-t-2 peer-focus:before:!border-blue-500 peer-focus:after:border-r-2 peer-focus:after:border-t-2 peer-focus:after:!border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Title
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Text Area Section */}
      <div className="relative flex h-full w-full flex-col rounded-xl text-gray-700 ">
        <TextEditorReact />
      </div>

      {/* Input Button */}
      <Link
        href="#"
        className="flex select-none items-center justify-center gap-3 rounded-lg bg-gradient-to-tr from-blue-900 to-blue-800 px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-900/10 transition-all hover:shadow-lg hover:shadow-blue-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
      >
        Masukan
      </Link>
    </>
  );
};
export default ProfilSlug;
