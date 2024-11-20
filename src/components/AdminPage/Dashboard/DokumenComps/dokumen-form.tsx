"use client";

import { createDokumen, updateDokumen } from "@/lib/actions";
import { useFormState } from "react-dom";
import {
  SubmitButton,
  ButtonKembali,
  ButtonReset,
} from "@/components/AdminPage/Dashboard/button";
import {
  InputText,
  InputFile,
  InputSelect,
  InputPDF,
  InputTextArea,
} from "@/components/AdminPage/Dashboard/FormInputs";
import { ConfirmationModal } from "@/components/AdminPage/Dashboard/confirmation-modal";
import { useFormHandlers } from "@/hooks/useFormHandlers";
import { useRef, useState } from "react";
import { DokumenCategory } from "@prisma/client";

export const DokumenAdd = () => {
  const section = "dokumen";
  const [state, formAction] = useFormState(createDokumen, null); // Form POST action
  const resetFileInputRef = useRef<() => void>(null); // Ref for resetting file input

  const [formData, setFormData] = useState({
    title: "",
    image: null,
    file: null,
    category: "",
    desc: "", // Menambahkan desc di formData
  });

  // Menggunakan hooks untuk menangani logika form
  const {
    isFormDirty,
    setIsFormDirty,
    showModal,
    setShowModal,
    actionType,
    handleBack,
    confirmBack,
    handleReset,
    confirmReset,
    handleNavigation,
    confirmNavigation,
    isResetDisabled,
  } = useFormHandlers(formData, section); // Pass formData dan section

  const resetForm = () => {
    setFormData({ title: "", image: null, file: null, category: "", desc: "" }); // Tambahkan reset desc
    resetFileInputRef.current?.(); // Reset file input
    setIsFormDirty(false);
  };

  return (
    <>
      <div className="mb-5 flex flex-row items-center justify-between">
        <ButtonKembali onBack={handleBack} />
        <ButtonReset
          onReset={() => handleReset(resetForm)}
          disabled={isResetDisabled}
        />
      </div>

      <div className="relative mb-5 flex h-full w-full flex-col rounded-xl bg-white shadow-md">
        <div className="relative mx-4 mt-4 text-gray-700">
          <form action={formAction}>
            {/* Input untuk Gambar */}
            <InputFile
              name="image"
              label="Masukan Cover Dokumen"
              onFileChange={(file, preview) => {
                setFormData((prev) => ({ ...prev, image: file }));
                setIsFormDirty(true);
              }}
              resetFileInput={(callback) => {
                resetFileInputRef.current = callback;
              }}
              error={state?.error?.image}
            />

            {/* Input untuk File Dokumen */}
            <InputPDF
              name="file"
              label="Masukan File Dokumen"
              onFileChange={(file) => {
                setFormData((prev) => ({ ...prev, file: file }));
                setIsFormDirty(true);
              }}
              resetFileInput={(callback) => {
                resetFileInputRef.current = callback;
              }}
              error={state?.error?.file}
            />

            {/* Input untuk Nama Dokumen */}
            <InputText
              name="title"
              label="Nama Dokumen"
              value={formData.title}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, title: e.target.value }));
                setIsFormDirty(true);
              }}
              placeholder="Masukan Nama Dokumen"
              error={state?.error?.title}
            />

            {/* Input untuk Kategori Dokumen */}
            <InputSelect
              name="category"
              label="Kategori"
              options={DokumenCategory}
              value={formData.category}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, category: e.target.value }));
                setIsFormDirty(true);
              }}
              error={state?.error?.category}
            />

            {/* Input untuk Deskripsi Dokumen */}
            <InputTextArea
              name="desc"
              label="Masukan Deskripsi"
              value={formData.desc}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, desc: e.target.value })); // Update formData desc
                setIsFormDirty(true);
              }}
              placeholder="Masukan Deskripsi Dokumen"
              error={state?.error?.desc}
            />

            <SubmitButton label="Masukan Data" disabled={isResetDisabled} />
          </form>
        </div>
      </div>

      {/* Modal konfirmasi */}
      {showModal && (
        <ConfirmationModal
          actionType={actionType} // Kirim actionType
          onReset={resetForm} // Reset form
          onNavigation={confirmNavigation} // Konfirmasi navigasi
          onBack={confirmBack} // Konfirmasi back
          onCancel={() => setShowModal(false)} // Tutup modal
          setShowModal={setShowModal} // Pass untuk menutup modal setelah reset
        />
      )}
    </>
  );
};

export const DokumenEdit = ({ item }: { item: Dokumen }) => {
  const section = "dokumen";

  // Prisma update action bound to the specific item id
  const UpdateItemWithId = updateDokumen.bind(null, item.id);
  const [state, formAction] = useFormState(UpdateItemWithId, null);

  const [formData, setFormData] = useState({
    title: item.title, // Nama dokumen
    image: null, // Gambar baru (jika diupload)
    file: null, // File baru (jika diupload)
    category: item.category, // Kategori dokumen
    desc: item.desc, // Deskripsi dari dokumen yang ada di database
  });

  const [imagePreview, setImagePreview] = useState<string | null>(item.image); // Initial image preview
  const resetFileInputRef = useRef<() => void>(null); // Ref untuk reset file input

  // Menggunakan hooks untuk menangani logika form
  const {
    isFormDirty,
    setIsFormDirty,
    showModal,
    setShowModal,
    actionType,
    handleBack,
    confirmBack,
    handleReset,
    confirmReset,
    confirmNavigation,
    isResetDisabled,
  } = useFormHandlers(formData, section); // Pass formData dan section

  // Reset form ke state awal
  const resetForm = () => {
    setFormData({
      title: item.title,
      image: null,
      file: null,
      category: item.category,
      desc: item.desc, // Reset ke deskripsi awal
    });
    setImagePreview(item.image); // Kembali ke image awal
    resetFileInputRef.current?.(); // Reset file input
    setIsFormDirty(false);
  };

  // Callback untuk perubahan file gambar
  const handleFileChange = (file: File | null, preview: string | null) => {
    setFormData((prev) => ({ ...prev, image: file }));
    setImagePreview(preview);
    setIsFormDirty(true);
  };

  // Callback untuk perubahan file dokumen
  const handleFileChangeForDokumen = (file: File | null) => {
    setFormData((prev) => ({ ...prev, file: file }));
    setIsFormDirty(true);
  };

  // Callback untuk perubahan text input dan select input
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsFormDirty(true);
  };

  // Callback untuk perubahan text area (desc)
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, desc: e.target.value }));
    setIsFormDirty(true);
  };

  return (
    <>
      <div className="mb-5 flex flex-row items-center justify-between">
        <ButtonKembali onBack={handleBack} />
        <ButtonReset
          onReset={() => handleReset(resetForm)}
          disabled={isResetDisabled}
        />
      </div>

      <div className="relative mb-5 flex h-full w-full flex-col rounded-xl bg-white shadow-md">
        <div className="relative mx-4 mt-4 text-gray-700">
          <form action={formAction}>
            {/* Input untuk Gambar */}
            <InputFile
              name="image"
              label="Masukan Cover Dokumen"
              onFileChange={handleFileChange}
              initialImage={item.image} // Initial image from database
              resetFileInput={(callback) => {
                resetFileInputRef.current = callback;
              }}
              error={state?.error?.image}
            />

            {/* Input untuk File Dokumen */}
            <InputPDF
              name="file"
              label="Masukan File Dokumen"
              onFileChange={(file) => {
                setFormData((prev) => ({ ...prev, file: file }));
                setIsFormDirty(true);
              }}
              resetFileInput={(callback) => {
                resetFileInputRef.current = callback;
              }}
              error={state?.error?.file}
            />

            {/* Input untuk Nama Dokumen */}
            <InputText
              name="title"
              label="Nama Dokumen"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Masukan Nama Dokumen"
              error={state?.error?.title}
            />

            {/* Input untuk Kategori Dokumen */}
            <InputSelect
              name="category"
              label="Kategori"
              options={DokumenCategory}
              value={formData.category}
              onChange={handleInputChange}
              error={state?.error?.category}
            />

            {/* Input untuk Deskripsi Dokumen */}
            <InputTextArea
              name="desc"
              label="Masukan Deskripsi"
              value={formData.desc}
              onChange={handleTextAreaChange} // Menggunakan handler untuk textarea
              placeholder="Masukan Deskripsi Dokumen"
              error={state?.error?.desc}
            />

            <SubmitButton label="Perbarui Data" disabled={isResetDisabled} />
          </form>
        </div>
      </div>

      {/* Modal konfirmasi */}
      {showModal && (
        <ConfirmationModal
          actionType={actionType} // Kirim actionType
          onReset={resetForm} // Reset form
          onNavigation={confirmNavigation} // Konfirmasi navigasi
          onBack={confirmBack} // Konfirmasi back
          onCancel={() => setShowModal(false)} // Tutup modal
          setShowModal={setShowModal} // Pass untuk menutup modal setelah reset
        />
      )}
    </>
  );
};
