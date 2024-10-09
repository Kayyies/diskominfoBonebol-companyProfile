"use client";

import { useRef, useState } from "react";
import { ProfilCategory } from "@prisma/client";
import { FaTrashAlt } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import {
  SubmitButton,
  ButtonReset,
  ButtonKembali,
} from "@/components/AdminPage/Dashboard/button";
import {
  InputText,
  InputSelect,
} from "@/components/AdminPage/Dashboard/FormInputs";
import { createProfil } from "@/lib/actions";
import { useFormState } from "react-dom";
import Tiptap from "../../wysiwyg/Tiptap";
import { useFormHandlers } from "@/hooks/useFormHandlers";
import { ConfirmationModal } from "@/components/AdminPage/Dashboard/confirmation-modal";

export const ProfilAdd = () => {
  const section = "profil";
  const editorRef = useRef<Editor | null>(null);

  // State untuk form data
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    content: "",
  });

  const [state, formAction] = useFormState(createProfil, null);

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
  } = useFormHandlers(formData, section);

  const resetForm = () => {
    setFormData({ category: "", title: "", content: "" });
    editorRef.current?.commands.clearContent(); // Reset editor content
    setIsFormDirty(false);
  };

  // Fungsi untuk meng-handle submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ambil konten dari Tiptap dan simpan ke dalam formData
    const content = editorRef.current?.getHTML() || "";
    setFormData((prev) => ({ ...prev, content }));

    // Validasi formData yang sudah lengkap sebelum submit
    const finalFormData = new FormData();
    finalFormData.append("category", formData.category);
    finalFormData.append("title", formData.title);
    finalFormData.append("content", content);

    await formAction(finalFormData); // Mengirim form data yang sudah lengkap
  };

  return (
    <>
      <div className="mb-5 flex flex-row items-center justify-between align-middle">
        <ButtonKembali onBack={handleBack} />
        <ButtonReset
          onReset={() => handleReset(resetForm)}
          disabled={isResetDisabled}
        />
      </div>

      <div className="relative mb-5 flex h-full w-full flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="relative mx-4 mt-4 overflow-hidden rounded-none bg-white bg-clip-border text-gray-700">
          <form onSubmit={handleSubmit}>
            <InputText
              name="title"
              label="Nama Profil"
              value={formData.title}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, title: e.target.value }));
                setIsFormDirty(true);
              }}
              placeholder="Masukan Nama Profil"
              error={state?.error?.title}
            />

            <InputSelect
              name="category"
              label="Kategori Profil"
              options={ProfilCategory}
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
                setIsFormDirty(true); // Tandai form sebagai "dirty"
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
