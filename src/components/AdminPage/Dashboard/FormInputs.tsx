"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MdDeleteForever } from "react-icons/md";

//=============== Text Area ===============
interface InputTextAreaProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  error?: string;
}

export const InputTextArea = ({
  name,
  label,
  value,
  onChange,
  placeholder,
  error,
}: InputTextAreaProps) => {
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mb-5 mt-2 block w-full appearance-none rounded border border-blue-gray-300 bg-white px-4 py-3 pr-8 leading-tight text-blue-gray-700 transition-all focus:border-gray-500 focus:bg-white focus:outline-none"
      />
      {error && (
        <div aria-live="polite" aria-atomic="true">
          <p className="mt-2 text-sm text-red">{error}</p>
        </div>
      )}
    </div>
  );
};

//=============== Input Text ===============
interface InputTextProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
}

export const InputText = ({
  name,
  label,
  value,
  onChange,
  placeholder,
  error,
}: InputTextProps) => {
  return (
    <div>
      <div className="mb-5">
        <label htmlFor="">{label}</label>
        <input
          name={name}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="mt-2 block w-full appearance-none rounded border border-blue-gray-300 bg-white px-4 py-3 pr-8 leading-tight text-blue-gray-700 transition-all focus:border-gray-500 focus:bg-white focus:outline-none"
        />
      </div>
    </div>
  );
};

//=============== Input Select ===============
interface InputSelectProps {
  name: string;
  label: string;
  options: { [key: string]: string };
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}

export const InputSelect = ({
  name,
  label,
  options,
  value,
  onChange,
  error = "",
}: InputSelectProps) => {
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="mb-5 block w-full appearance-none rounded border border-blue-gray-300 bg-white px-4 py-3 pr-8 leading-tight text-blue-gray-700 transition-all focus:border-gray-500 focus:bg-white focus:outline-none"
      >
        <option hidden>--PILIH DATA--</option>
        {Object.entries(options).map(([key, val]) => (
          <option key={key} value={key}>
            {val.replace(/_/g, " ")}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </div>
  );
};

interface InputFileProps {
  name: string;
  label: string;
  onFileChange: (file: File | null, preview: string | null) => void;
  initialImage?: string;
  resetFileInput?: (callback: () => void) => void;
  error?: string;
}

export const InputFile = ({
  name,
  label,
  onFileChange,
  initialImage,
  resetFileInput,
  error,
}: InputFileProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Set initial image preview jika ada gambar dari database
  useEffect(() => {
    if (initialImage) {
      setImagePreview(initialImage); // Jika ada gambar dari database (BannerEdit)
    }
  }, [initialImage]);

  // Handle perubahan file
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedImage(file);

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      onFileChange(file, imageUrl);
    } else {
      setImagePreview(initialImage || null); // Kembali ke initial image
      onFileChange(null, initialImage || null);
    }
  };

  // Fungsi untuk menghapus gambar
  const handleRemoveImage = () => {
    setSelectedImage(null);

    if (initialImage) {
      // Jika di BannerEdit, kembali ke initialImage
      setImagePreview(initialImage);
      onFileChange(null, initialImage);
    } else {
      // Jika di BannerAdd, kosongkan preview
      setImagePreview(null);
      onFileChange(null, null);
    }

    if (inputRef.current) {
      inputRef.current.value = ""; // Reset nilai input file
    }
  };

  // Callback untuk reset file input saat dipanggil dari luar
  useEffect(() => {
    if (resetFileInput) {
      resetFileInput(handleRemoveImage); // Set callback reset untuk dipanggil dari luar
    }
  }, [resetFileInput]);

  return (
    <>
      <label htmlFor="image">{label}</label>
      <div className="flex items-center gap-4">
        <input
          type="file"
          name={name}
          ref={inputRef}
          className="text-slate-500 block cursor-pointer rounded-lg border-2 text-sm file:mr-4 file:border-0 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white file:transition-all hover:file:bg-gray-800 hover:file:text-white active:file:bg-gray-600 active:file:text-white"
          onChange={handleImageChange}
        />
        {/* Tombol hapus hanya muncul jika ada selectedImage (gambar baru) */}
        {selectedImage && (
          <button
            className="rounded-md bg-red p-2 text-white"
            onClick={handleRemoveImage}
          >
            <MdDeleteForever />
          </button>
        )}
        {error && (
          <div aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red">{error}</p>
          </div>
        )}
      </div>

      {imagePreview && (
        <div>
          <Image
            src={imagePreview}
            alt="Preview"
            width={200}
            height={200}
            style={{ objectFit: "contain" }}
          />
        </div>
      )}
    </>
  );
};
