"use client";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { MdDeleteForever } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { FaTrashAlt } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";

export const SubmitButton = ({
  label,
  disabled,
}: {
  label: string;
  disabled?: boolean;
}) => {
  const { pending } = useFormStatus();
  return (
    <div>
      <button
        className={`mb-5 flex w-full select-none items-center justify-center gap-3 rounded-lg bg-gradient-to-tr from-blue-900 to-blue-800 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-900/10 transition-all hover:shadow-lg hover:shadow-blue-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${pending ? "cursor-progress opacity-50" : ""}`}
        type="submit"
        disabled={disabled || pending} // Disable jika prop disabled true atau pending
      >
        {label === "Masukan Data" ? (
          <p>{pending ? "Memasukan Data..." : "Masukan Data"}</p>
        ) : (
          <p>{pending ? "Memperbarui Data..." : "Perbarui Data"}</p>
        )}
      </button>
    </div>
  );
};

export const ButtonReset = ({
  onReset,
  disabled,
}: {
  onReset: () => void;
  disabled: boolean;
}) => {
  return (
    <button
      onClick={onReset} // Panggil fungsi reset saat tombol diklik
      type="button" // Agar tombol ini tidak submit form
      className="flex select-none items-center gap-3 rounded-lg border border-gray-900 px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      disabled={disabled}
    >
      Bersihkan
      <GrClearOption />
    </button>
  );
};

export const ButtonKembali = ({ onBack }: { onBack: () => void }) => {
  return (
    <button
      className="flex w-max items-center gap-2 transition-all hover:text-blue-400"
      onClick={onBack}
    >
      <FaArrowLeftLong />
      Kembali
    </button>
  );
};
