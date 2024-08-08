"use client";
import { useFormStatus } from "react-dom";

export const SubmitButton = ({ label }: { label: string }) => {
  const { pending } = useFormStatus();
  return (
    <div>
      <button
        className={`mb-5 flex w-full select-none items-center justify-center gap-3 rounded-lg bg-gradient-to-tr from-blue-900 to-blue-800 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-900/10 transition-all hover:shadow-lg hover:shadow-blue-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${pending ? "cursor-progress opacity-50" : ""}`}
        type="submit"
        disabled={pending}
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
