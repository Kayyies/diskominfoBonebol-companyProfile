"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";

export const ModalInfo = ({}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onOpen = () => setIsModalOpen(true);
  const onClose = () => setIsModalOpen(false);

  useEffect(() => {
    onOpen();
  }, []);
  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay for blurring and darkening the background */}
          <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"></div>

          {/* Modal container */}
          <div className="border-darkPrimary relative z-10 w-[800px] rounded-lg border bg-white">
            {/* Top section with close button */}
            <div className="relative flex h-13 items-center justify-end">
              <button
                onClick={onClose}
                className="absolute right-5 cursor-pointer text-3xl text-red"
              >
                <IoIosCloseCircle />
              </button>
            </div>

            {/* Content section */}
            <div>
              <Image
                width={500}
                height={500}
                alt="informasi"
                src="/assets/informasi.png"
                className="h-auto w-full object-cover"
              />
            </div>

            {/* Info button */}
            <div className="flex h-20 items-center justify-center">
              <p className="bg-textAccent rounded-lg px-5 py-3 text-xs font-bold text-white">
                Informasi Selengkapnya
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
