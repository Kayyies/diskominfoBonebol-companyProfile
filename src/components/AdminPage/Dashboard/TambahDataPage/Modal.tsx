// Modal.tsx
import React from "react";

interface ModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  modalCancel: string;
  modalConfirm: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  message,
  modalCancel,
  modalConfirm,
  onCancel,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <div className="w-full max-w-lg transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all">
        <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
        <div className="mt-2">
          <p className="text-sm text-gray-500">{message}</p>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            className="mr-3 inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:text-sm"
            onClick={onCancel}
          >
            {modalCancel}
          </button>
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-sm"
            onClick={onConfirm}
          >
            {modalConfirm}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
