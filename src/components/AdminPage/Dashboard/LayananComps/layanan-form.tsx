"use client";

import { Layanan } from "@prisma/client";
import { createLayanan, updateLayanan } from "@/lib/actions";
import { useFormState } from "react-dom";
import {
  SubmitButton,
  ButtonKembali,
  ButtonReset,
} from "@/components/AdminPage/Dashboard/button";
import {
  InputText,
  InputTextArea,
  InputFile,
} from "@/components/AdminPage/Dashboard/FormInputs";
import { ConfirmationModal } from "@/components/AdminPage/Dashboard/confirmation-modal";
import { useFormHandlers } from "@/hooks/useFormHandlers";
import { useRef, useState } from "react";

export const LayananAdd = () => {
  const section = "layanan";
  const [state, formAction] = useFormState(createLayanan, null); // Form POST action
  const resetFileInputRef = useRef<() => void>(null); // Ref for resetting file input

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    image: null,
    link: "",
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
    setFormData({ title: "", desc: "", image: null, link: "" });
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
            {/* Input untuk Logo */}
            <InputFile
              name="image"
              label="Masukan Logo Layanan"
              onFileChange={(file, preview) => {
                setFormData((prev) => ({ ...prev, image: file }));
                setIsFormDirty(true);
              }}
              resetFileInput={(callback) => {
                resetFileInputRef.current = callback;
              }}
              error={state?.error?.image}
            />

            {/* Input untuk Nama Layanan */}
            <InputText
              name="title"
              label="Nama Layanan"
              value={formData.title}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, title: e.target.value }));
                setIsFormDirty(true);
              }}
              placeholder="Masukan Nama Layanan"
              error={state?.error?.title}
            />

            {/* Input untuk Deskripsi Layanan */}
            <InputTextArea
              name="desc"
              label="Deskripsi Layanan"
              value={formData.desc}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, desc: e.target.value }));
                setIsFormDirty(true);
              }}
              placeholder="Masukan Deskripsi Layanan"
              error={state?.error?.desc}
            />

            {/* Input untuk URL Layanan */}
            <InputText
              name="url"
              label="URL Layanan"
              value={formData.link}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, link: e.target.value }));
                setIsFormDirty(true);
              }}
              placeholder="Masukan URL Layanan"
              error={state?.error?.link}
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

export const LayananEdit = ({ item }: { item: Layanan }) => {
  const section = "layanan";

  // Prisma update action bound to the specific item id
  const UpdateItemWithId = updateLayanan.bind(null, item.id);
  const [state, formAction] = useFormState(UpdateItemWithId, null);

  // State untuk form inputan
  const [formData, setFormData] = useState({
    title: item.title, // Nama layanan
    desc: item.desc, // Deskripsi layanan
    image: null, // Gambar layanan baru
    link: item.link, // URL layanan
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
    handleNavigation,
    confirmNavigation,
    isResetDisabled,
  } = useFormHandlers(formData, section);

  // Reset form ke state awal
  const resetForm = () => {
    setFormData({
      title: item.title,
      desc: item.desc,
      image: null,
      link: item.link,
    });
    setImagePreview(item.image);
    resetFileInputRef.current?.(); // Reset file input
    setIsFormDirty(false);
  };

  // Callback untuk perubahan file gambar
  const handleFileChange = (file: File | null, preview: string | null) => {
    setFormData((prev) => ({ ...prev, image: file }));
    setImagePreview(preview);
    setIsFormDirty(true);
  };

  // Callback untuk perubahan text input dan textarea
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
            {/* Input untuk Logo */}
            <InputFile
              name="image"
              label="Masukan Logo Layanan"
              onFileChange={handleFileChange}
              initialImage={item.image} // Initial image from database
              resetFileInput={(callback) => {
                resetFileInputRef.current = callback;
              }}
              error={state?.error?.image}
            />

            {/* Input untuk Nama Layanan */}
            <InputText
              name="title"
              label="Nama Layanan"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Masukan Nama Layanan"
              name="title"
              error={state?.error?.title}
            />

            {/* Input untuk Deskripsi Layanan */}
            <InputTextArea
              name="desc"
              label="Deskripsi Layanan"
              value={formData.desc}
              onChange={handleInputChange}
              placeholder="Masukan Deskripsi Layanan"
              error={state?.error?.desc}
            />

            {/* Input untuk URL Layanan */}
            <InputText
              name="url"
              label="URL Layanan"
              value={formData.link}
              onChange={handleInputChange}
              placeholder="Masukan URL Layanan"
              name="link"
              error={state?.error?.link}
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
