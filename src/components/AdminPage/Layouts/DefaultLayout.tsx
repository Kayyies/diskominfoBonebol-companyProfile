"use client";
import React, { useState } from "react";
import Sidebar from "@/components/AdminPage/Sidebar";
import Header from "@/components/AdminPage/Header";
import { useRouter } from "next/navigation";
import { ConfirmationModal } from "@/components/AdminPage/Dashboard/confirmation-modal";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(
    null,
  );
  const router = useRouter();
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const confirmNavigation = (path: string) => {
    setShowModal(false);
    setIsFormDirty(false);
    router.push(path); // Lanjutkan navigasi setelah konfirmasi
  };

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          isFormDirty={isFormDirty}
          setIsFormDirty={setIsFormDirty} // Tambahkan ini
          setShowModal={setShowModal}
          confirmNavigation={confirmNavigation}
        />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Modal Konfirmasi */}
      {showModal && (
        <ConfirmationModal
          title="Konfirmasi Pindah Halaman"
          message="Ada data yang belum disimpan, apakah Anda yakin ingin berpindah halaman?"
          confirm="Ya, Pindah"
          onConfirm={() => confirmNavigation(pendingNavigation || "/")} // Path default jika tidak ada pending navigation
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
}
