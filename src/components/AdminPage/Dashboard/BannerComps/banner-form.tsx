//banner-add.tsx
"use client";

import { Banner } from "@prisma/client";
import { createBanner, updateBanner } from "@/lib/actions";
import { useFormState } from "react-dom";
import { useRef, useState } from "react";
import {
  SubmitButton,
  ButtonKembali,
  ButtonReset,
} from "@/components/AdminPage/Dashboard/button";
import {
  InputFile,
  InputTextArea,
} from "@/components/AdminPage/Dashboard/FormInputs";
import { ConfirmationModal } from "@/components/AdminPage/Dashboard/confirmation-modal";
import { useFormHandlers } from "@/hooks/useFormHandlers";

export const BannerAdd = () => {
  const section = "banner";
  const [state, formAction] = useFormState(createBanner, null);
  const resetFileInputRef = useRef<() => void>(null);
  const [formData, setFormData] = useState<{
    desc: string;
    image: File | null;
  }>({
    desc: "",
    image: null,
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
  } = useFormHandlers(formData, section); // Pass formData and section

  const resetForm = () => {
    setFormData({ desc: "", image: null });
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
            <InputFile
              name="image"
              label="Masukan gambar"
              onFileChange={(file, preview) => {
                setFormData((prev) => ({ ...prev, image: file }));
                setIsFormDirty(true);
              }}
              resetFileInput={(callback) => {
                resetFileInputRef.current = callback;
              }}
              error={state?.error?.image}
            />

            <InputTextArea
              name="desc"
              label="Masukan file"
              value={formData.desc}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, desc: e.target.value }));
                setIsFormDirty(true);
              }}
              placeholder="Masukan Deskripsi Layanan"
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

export const BannerEdit = ({ item }: { item: Banner }) => {
  const section = "banner";
  const UpdateItemWithId = updateBanner.bind(null, item.id); // Bind updateBanner ke item ID
  const [state, formAction] = useFormState(UpdateItemWithId, null);

  const resetFileInputRef = useRef<() => void>(null); // Ref untuk reset file input

  const [formData, setFormData] = useState<{
    desc: string;
    image: File | null;
  }>({ desc: item.desc, image: null });

  const [imagePreview, setImagePreview] = useState<string | null>(item.image);

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
  } = useFormHandlers(formData, section, {
    desc: item.desc,
    image: item.image,
  });

  const resetForm = () => {
    setFormData({ desc: item.desc, image: null });
    setImagePreview(item.image);
    resetFileInputRef.current?.();
    setIsFormDirty(false);
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

      <div className="relative mb-5 flex h-full w-full flex-col rounded-xl bg-white shadow-md">
        <div className="relative mx-4 mt-4 text-gray-700">
          <form action={formAction}>
            <InputFile
              name="image"
              label="Perbarui gambar"
              onFileChange={(file, preview) => {
                setFormData((prev) => ({ ...prev, image: file }));
                setImagePreview(preview);
                setIsFormDirty(true);
              }}
              initialImage={item.image}
              resetFileInput={(callback) => {
                resetFileInputRef.current = callback;
              }}
              error={state?.error?.image}
            />

            <InputTextArea
              name="desc"
              label="Perbarui Deskripsi"
              value={formData.desc}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, desc: e.target.value }));
                setIsFormDirty(true);
              }}
              placeholder="Perbarui Deskripsi Banner"
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
