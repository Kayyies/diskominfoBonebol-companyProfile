"use client";

import { createBeritaHoax, updateBeritaHoax } from "@/lib/actions"; // Fungsi untuk handle create berita hoax
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
} from "@/components/AdminPage/Dashboard/FormInputs";
import { ConfirmationModal } from "@/components/AdminPage/Dashboard/confirmation-modal";
import { useFormHandlers } from "@/hooks/useFormHandlers";
import { useRef, useState } from "react";
import { KategoriBerita } from "@prisma/client"; // Enum kategori
import Tiptap from "../../wysiwyg/Tiptap"; // Tiptap editor component

export const BeritaHoaxAdd = () => {
  const section = "beritahoax";
  const editorRef = useRef<Editor | null>(null); // Referensi untuk editor Tiptap
  const [state, formAction] = useFormState(createBeritaHoax, null);
  const resetFileInputRef = useRef<() => void>(null);

  const [formData, setFormData] = useState({
    title: "",
    image: null,
    category: "",
    content: "",
  });

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
  } = useFormHandlers(formData, section);

  // Fungsi untuk mereset form
  const resetForm = () => {
    setFormData({
      title: "",
      image: null,
      category: "",
      content: "",
    });
    resetFileInputRef.current?.();
    editorRef.current?.commands.clearContent();
    setIsFormDirty(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ambil content dari Tiptap
    const content = editorRef.current?.getHTML() || "";
    setFormData((prev) => ({ ...prev, content }));

    const finalFormData = new FormData();
    finalFormData.append("title", formData.title);
    finalFormData.append("content", content); // Tambahkan content
    finalFormData.append("category", formData.category);

    if (formData.image) {
      finalFormData.append("image", formData.image);
    }

    await formAction(finalFormData);
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
          <form onSubmit={handleSubmit}>
            {/* Input untuk Gambar */}
            <InputFile
              name="image"
              label="Masukan Gambar Berita Hoax"
              onFileChange={(file, preview) => {
                setFormData((prev) => ({ ...prev, image: file }));
                setIsFormDirty(true);
              }}
              resetFileInput={(callback) => {
                resetFileInputRef.current = callback;
              }}
              error={state?.error?.image}
            />

            {/* Input untuk title */}
            <InputText
              name="title"
              label="title Berita Hoax"
              value={formData.title}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, title: e.target.value }));
                setIsFormDirty(true);
              }}
              placeholder="Masukan title Berita Hoax"
              error={state?.error?.title}
            />

            {/* Input untuk category */}
            <InputSelect
              name="category"
              label="category Berita"
              options={KategoriBerita}
              value={formData.category}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, category: e.target.value }));
                setIsFormDirty(true);
              }}
              error={state?.error?.category}
            />

            {/* content Berita Hoax menggunakan Tiptap */}
            <Tiptap
              editorRef={editorRef}
              onChange={(html) => {
                setFormData((prev) => ({ ...prev, content: html }));
                setIsFormDirty(true);
              }}
            />

            {/* Tombol Submit */}
            <SubmitButton
              label="Masukkan Berita Hoax"
              disabled={isResetDisabled}
            />
          </form>
        </div>
      </div>

      {/* Modal Konfirmasi */}
      {showModal && (
        <ConfirmationModal
          actionType={actionType}
          onReset={resetForm}
          onNavigation={confirmNavigation}
          onBack={confirmBack}
          onCancel={() => setShowModal(false)}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
};

export const BeritaHoaxUpdate = ({ item }: { item: BeritaHoax }) => {
  const section = "beritahoax";
  const editorRef = useRef<Editor | null>(null); // Referensi untuk editor Tiptap
  const [state, formAction] = useFormState(
    updateBeritaHoax.bind(null, item.id),
    null,
  );
  const resetFileInputRef = useRef<() => void>(null);

  const [formData, setFormData] = useState({
    title: item.title,
    image: null,
    category: item.category,
    content: item.content || "",
  });

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
  } = useFormHandlers(formData, section);

  // Fungsi untuk mereset form
  const resetForm = () => {
    setFormData({
      title: item.title,
      image: null,
      category: item.category,
      content: item.content || "",
    });
    resetFileInputRef.current?.();
    editorRef.current?.commands.setContent(item.content || "");
    setIsFormDirty(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ambil content dari Tiptap
    const content = editorRef.current?.getHTML() || "";
    setFormData((prev) => ({ ...prev, content }));

    const finalFormData = new FormData();
    finalFormData.append("title", formData.title);
    finalFormData.append("content", content); // Tambahkan content
    finalFormData.append("category", formData.category);

    if (formData.image) {
      finalFormData.append("image", formData.image);
    }

    await formAction(finalFormData);
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
          <form onSubmit={handleSubmit}>
            {/* Input untuk Gambar */}
            <InputFile
              name="image"
              label="Masukan Gambar Berita Hoax"
              onFileChange={(file, preview) => {
                setFormData((prev) => ({ ...prev, image: file }));
                setIsFormDirty(true);
              }}
              resetFileInput={(callback) => {
                resetFileInputRef.current = callback;
              }}
              error={state?.error?.image}
              initialImage={item.image} // Menampilkan gambar yang sudah ada di database
            />

            {/* Input untuk title */}
            <InputText
              name="title"
              label="title Berita Hoax"
              value={formData.title}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, title: e.target.value }));
                setIsFormDirty(true);
              }}
              placeholder="Masukan title Berita Hoax"
              error={state?.error?.title}
            />

            {/* Input untuk category */}
            <InputSelect
              name="category"
              label="category Berita"
              options={categoryBerita}
              value={formData.category}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, category: e.target.value }));
                setIsFormDirty(true);
              }}
              error={state?.error?.category}
            />

            {/* content Berita Hoax menggunakan Tiptap */}
            <Tiptap
              editorRef={editorRef}
              onChange={(html) => {
                setFormData((prev) => ({ ...prev, content: html }));
                setIsFormDirty(true);
              }}
              content={formData.content}
            />

            {/* Tombol Submit */}
            <SubmitButton
              label="Perbarui Berita Hoax"
              disabled={isResetDisabled}
            />
          </form>
        </div>
      </div>

      {/* Modal Konfirmasi */}
      {showModal && (
        <ConfirmationModal
          actionType={actionType}
          onReset={resetForm}
          onNavigation={confirmNavigation}
          onBack={confirmBack}
          onCancel={() => setShowModal(false)}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
};
