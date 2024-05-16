import React from "react";
import Link from "next/link";

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
  return (
    <>
      {isOpen && (
        <dialog className="modal bg-black/30" open={isOpen}>
          <div className="modal-box bg-white">
            <h3 className="text-lg font-bold text-black-2">{title}</h3>
            <p className="py-4">{message}</p>
            <div className="modal-action">
              <form method="dialog">
                <div className="flex flex-row gap-2">
                  <button
                    className="btn border-gray-700 bg-transparent text-black hover:bg-black/10"
                    onClick={onCancel}
                  >
                    {modalCancel}
                  </button>
                  {modalConfirm === "Reset Form" ? (
                    <button
                      className="btn text-white hover:bg-black"
                      onClick={onConfirm}
                    >
                      {modalConfirm}
                    </button>
                  ) : (
                    <Link
                      className="btn text-white hover:bg-black"
                      href={modalConfirm}
                      onClick={(e) => {
                        e.preventDefault();
                        onConfirm();
                      }}
                    >
                      {modalConfirm}
                    </Link>
                  )}
                </div>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default Modal;
