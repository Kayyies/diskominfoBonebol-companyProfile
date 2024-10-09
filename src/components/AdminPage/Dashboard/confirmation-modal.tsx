"use client";

interface ConfirmationModalProps {
  actionType: "reset" | "navigation" | "back";
  onReset: () => void;
  onNavigation: () => void;
  onBack: () => void;
  onCancel: () => void;
  setShowModal: (show: boolean) => void; // Tambahkan ini untuk menutup modal
}

export const ConfirmationModal = ({
  actionType,
  onReset,
  onNavigation,
  onBack,
  onCancel,
  setShowModal,
}: ConfirmationModalProps) => {
  // Tentukan fungsi yang tepat berdasarkan actionType
  const handleConfirm = () => {
    if (actionType === "reset") {
      onReset();
      setShowModal(false); // Tutup modal setelah reset
    } else if (actionType === "navigation") {
      onNavigation();
      setShowModal(false); // Tutup modal setelah navigasi
    } else if (actionType === "back") {
      onBack();
      setShowModal(false); // Tutup modal setelah back
    }
  };

  // Tentukan title dan message berdasarkan actionType
  const getTitle = () => {
    if (actionType === "reset") {
      return "Konfirmasi Reset";
    } else if (actionType === "back") {
      return "Konfirmasi Pindah Halaman";
    } else {
      return "Konfirmasi Navigasi";
    }
  };

  const getMessage = () => {
    if (actionType === "reset") {
      return "Ada data yang sudah tertulis, kamu yakin mau reset?";
    } else if (actionType === "back") {
      return "Ada data yang sudah tertulis, kamu yakin mau kembali?";
    } else {
      return "Ada data yang belum disimpan, kamu yakin mau meninggalkan halaman ini?";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <div className="w-full max-w-lg transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          {getTitle()}
        </h3>
        <div className="mt-2">
          <p className="text-sm text-gray-500">{getMessage()}</p>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            className="mr-3 inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:text-sm"
            onClick={onCancel}
          >
            Batal
          </button>
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-sm"
            onClick={handleConfirm} // Pastikan handleConfirm dipanggil
          >
            {actionType === "reset" ? "Reset" : "Pindah Halaman"}
          </button>
        </div>
      </div>
    </div>
  );
};
