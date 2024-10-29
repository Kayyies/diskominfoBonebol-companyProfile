"use client";

import { useState } from "react";

export const useModalState = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onOpen = () => setIsModalOpen(true);
  const onClose = () => setIsModalOpen(false);

  return {
    isModalOpen,
    onOpen,
    onClose,
  };
};
