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
} from "@/components/AdminPage/Dashboard/FormInputs";
import { ConfirmationModal } from "@/components/AdminPage/Dashboard/confirmation-modal";
import { useFormHandlers } from "@/hooks/useFormHandlers";
import { useRef, useState, useEffect } from "react";
import { DokumenCategory } from "@prisma/client";
import Tiptap from "../../wysiwyg/Tiptap";

export const DokumenAdd = () => {
  const section = "dokumen";
  const editorRef = useRef<Editor | null>(null);
  const [state, formAction] = useFormState(createDokumen, null);
  const resetFileInputRef = useRef<() => void>(null);

  const [formData, setFormData] = useState({
    title: "",
    image: null,
    file: null,
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

  const resetForm = () => {
    setFormData({
      title: "",
      image: null,
      file: null,
      category: "",
      content: "",
    });
    resetFileInputRef.current?.();
    editorRef.current?.commands.clearContent();
    setIsFormDirty(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ambil konten dari Tiptap
    const content = editorRef.current?.getHTML() || "";
    setFormData((prev) => ({ ...prev, content }));

    const finalFormData = new FormData();
    finalFormData.append("title", formData.title);
    finalFormData.append("content", content); // Tambahkan content
    finalFormData.append("category", formData.category);

    if (formData.image) {
      finalFormData.append("image", formData.image);
    }

    if (formData.file) {
      finalFormData.append("file", formData.file);
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

            <Tiptap
              editorRef={editorRef}
              onChange={(html) => {
                setFormData((prev) => ({ ...prev, content: html }));
                setIsFormDirty(true);
              }}
            />

            <SubmitButton label="Masukan Data" disabled={isResetDisabled} />
          </form>
        </div>
      </div>

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
    content: item.content || "", // Konten dari database
  });

  const [imagePreview, setImagePreview] = useState<string | null>(item.image); // Initial image preview
  const resetFileInputRef = useRef<() => void>(null); // Ref untuk reset file input

  const editorRef = useRef(null); // Ref untuk editor Tiptap

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
      content: item.content || "", // Reset ke konten awal
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

  // Callback untuk perubahan konten text (Tiptap)
  const handleTiptapChange = (html: string) => {
    setFormData((prev) => ({ ...prev, content: html }));
    setIsFormDirty(true);
  };

  // Menggunakan useEffect untuk menginisialisasi konten Tiptap saat halaman dimuat
  useEffect(() => {
    if (editorRef.current && formData.content) {
      // Set konten yang diambil dari database ke Tiptap
      editorRef.current.commands.setContent(formData.content);
    }
  }, [formData.content]); // Dependensi pada formData.content

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Kirim formData termasuk konten dari Tiptap
    const content = editorRef.current?.getHTML() || "";
    setFormData((prev) => ({ ...prev, content }));

    const finalFormData = new FormData();
    finalFormData.append("title", formData.title);
    finalFormData.append("content", content); // Tambahkan content
    finalFormData.append("category", formData.category);

    if (formData.image) {
      finalFormData.append("image", formData.image);
    }

    if (formData.file) {
      finalFormData.append("file", formData.file);
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

            {/* Input untuk Konten Dokumen (menggunakan Tiptap) */}
            <Tiptap
              editorRef={editorRef}
              content={formData.content}
              onChange={handleTiptapChange} // Menggunakan handler untuk konten Tiptap
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
