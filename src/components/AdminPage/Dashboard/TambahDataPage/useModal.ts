// useModal.ts
import { useState } from "react";

interface UseModalReturn {
  showModal: boolean;
  modalTitle: string;
  modalMessage: string;
  modalCancel: string;
  modalConfirm: string;
  modalConfirmAction: () => void;
  handleOpenModal: (
    title: string,
    message: string,
    modalCancel: string,
    modalConfirm: string,
    onConfirm: () => void,
  ) => void;
  handleCloseModal: () => void;
}

const useModal = (): UseModalReturn => {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalCancel, setModalCancel] = useState("");
  const [modalConfirm, setModalConfirm] = useState("");
  const [modalConfirmAction, setModalConfirmAction] = useState<() => void>(
    () => {},
  );

  const handleOpenModal = (
    title: string,
    message: string,
    modalCancel: string,
    modalConfirm: string,
    onConfirm: () => void,
  ) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalCancel(modalCancel);
    setModalConfirm(modalConfirm);
    setShowModal(true);
    setModalConfirmAction(() => onConfirm);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return {
    showModal,
    modalTitle,
    modalMessage,
    modalCancel,
    modalConfirm,
    modalConfirmAction,
    handleOpenModal,
    handleCloseModal,
  };
};

export default useModal;
