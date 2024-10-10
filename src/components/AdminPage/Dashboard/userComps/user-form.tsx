//user-form.tsx
"use client";

import { User } from "@prisma/client";
import { createUser, updateUser } from "@/lib/actions";
import { useFormState } from "react-dom";
import { useRef, useState } from "react";
import {
  SubmitButton,
  ButtonKembali,
  ButtonReset,
} from "@/components/AdminPage/Dashboard/button";
import {
  InputText,
  InputSelect,
} from "@/components/AdminPage/Dashboard/FormInputs";
import { ConfirmationModal } from "@/components/AdminPage/Dashboard/confirmation-modal";
import { useFormHandlers } from "@/hooks/useFormHandlers";
import { Role } from "@prisma/client";

export const UserAdd = () => {
  const section = "user";
  const [state, formAction] = useFormState(createUser, null);
  const resetFileInputRef = useRef<() => void>(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
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
    setFormData({ username: "", password: "", role: "" });
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
            <InputText
              name="username"
              label="Masukan Username"
              value={formData.username}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, username: e.target.value }));
                setIsFormDirty(true);
              }}
              placeholder="Masukan Username"
              error={state?.error?.username}
            />
            <InputText
              name="password"
              label="Masukan Password"
              value={formData.password}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, password: e.target.value }));
                setIsFormDirty(true);
              }}
              placeholder="Masukan Password"
              error={state?.error?.password}
            />
            <InputSelect
              name="role"
              label="Pilih Role"
              options={Role}
              value={formData.role}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, role: e.target.value }));
                setIsFormDirty(true);
              }}
              error={state?.error?.role}
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

export const UserEdit = ({ item }: { item: User }) => {
  const section = "user";
  const UpdateItemWithId = updateUser.bind(null, item.id); // Menggunakan ID user untuk update
  const [state, formAction] = useFormState(UpdateItemWithId, null);
  const resetFileInputRef = useRef<() => void>(null);
  const [formData, setFormData] = useState({
    username: item.username || "",
    password: "", // Password harus di-reset saat diedit untuk keamanan
    role: item.role || "",
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
  } = useFormHandlers(formData, section); // Pass formData dan section

  const resetForm = () => {
    setFormData({
      username: item.username || "",
      password: item.password || "",
      role: item.role || "",
    });
    setIsFormDirty(false);
  };

  if (!item) {
    return <p>Data tidak ditemukan.</p>; // Handling untuk item null
  }

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
            {/* Input Username */}
            <InputText
              name="username"
              label="Username"
              value={formData.username}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, username: e.target.value }));
                setIsFormDirty(true);
              }}
              placeholder="Masukan Username"
              error={state?.error?.username}
            />

            {/* Input Password */}
            <InputText
              name="password"
              label="Password"
              value={formData.password}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, password: e.target.value }));
                setIsFormDirty(true);
              }}
              placeholder="Masukan Password"
              error={state?.error?.password}
            />

            {/* Input Role */}
            <InputSelect
              name="role"
              label="Role"
              options={Object.values(Role)} // Enum role dari prisma
              value={formData.role}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, role: e.target.value }));
                setIsFormDirty(true);
              }}
              error={state?.error?.role}
            />

            <SubmitButton label="Update Data" disabled={isResetDisabled} />
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
