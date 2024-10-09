"use client";

import {
  MdHome,
  MdPerson,
  MdDocumentScanner,
  MdApps,
  MdFilterFrames,
  MdBuild,
  MdAdminPanelSettings,
} from "react-icons/md";

import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
  isFormDirty: boolean;
  setIsFormDirty: (value: boolean) => void; // Tambahkan ini
  setShowModal: (value: boolean) => void;
  confirmNavigation: (path: string) => void;
}

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  isFormDirty,
  setShowModal,
  confirmNavigation,
}: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(
    null,
  );
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(true);

  // Handle klik navigasi
  const handleNavigation = (path: string) => {
    if (isFormDirty) {
      setPendingNavigation(path); // Simpan rute yang ingin dinavigasi
      setShowModal(true); // Tampilkan modal konfirmasi
    } else {
      router.push(path); // Jika tidak ada perubahan di form, langsung navigasi
    }
  };

  const confirmNavigationHandler = () => {
    if (pendingNavigation) {
      confirmNavigation(pendingNavigation); // Lanjutkan navigasi
      setPendingNavigation(null);
      setIsFormDirty(false); // Reset form dirty setelah konfirmasi
    }
  };

  // Close sidebar saat klik di luar
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // Close jika ESC ditekan
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <>
      <aside
        ref={sidebar}
        className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
          <button onClick={() => handleNavigation("/")}>
            <Image
              width={176}
              height={32}
              src={"/diskominfo.png"}
              alt="Logo"
              priority
            />
          </button>

          <button
            ref={trigger}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
            className="block lg:hidden"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>
        </div>

        {/* Sidebar Menu */}
        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
            <div>
              <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                MENU
              </h3>

              <ul className="mb-6 flex flex-col gap-1.5">
                {/* Menu Item Home */}
                <li>
                  <button
                    onClick={() => handleNavigation("/admin")}
                    className={`hover:bg-graydark group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out dark:hover:bg-meta-4 ${
                      pathname === "/admin" && "bg-graydark dark:bg-meta-4"
                    }`}
                  >
                    <MdHome />
                    Home
                  </button>
                </li>

                {/* Menu Item Profil */}
                <li>
                  <button
                    onClick={() => handleNavigation("/admin/profil")}
                    className={`hover:bg-graydark group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out dark:hover:bg-meta-4 ${
                      pathname === "/admin/profil" &&
                      "bg-graydark dark:bg-meta-4"
                    }`}
                  >
                    <MdPerson />
                    Profil
                  </button>
                </li>

                {/* Menu Item Dokumen */}
                <li>
                  <button
                    onClick={() => handleNavigation("/admin/dokumen")}
                    className={`hover:bg-graydark group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out dark:hover:bg-meta-4 ${
                      pathname === "/admin/dokumen" &&
                      "bg-graydark dark:bg-meta-4"
                    }`}
                  >
                    <MdDocumentScanner />
                    Dokumen
                  </button>
                </li>

                {/* Menu Item Layanan Kami */}
                <li>
                  <button
                    onClick={() => handleNavigation("/admin/layanan")}
                    className={`hover:bg-graydark group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out dark:hover:bg-meta-4 ${
                      pathname === "/admin/layanan" &&
                      "bg-graydark dark:bg-meta-4"
                    }`}
                  >
                    <MdApps />
                    Layanan Kami
                  </button>
                </li>

                {/* Menu Item Banner */}
                <li>
                  <button
                    onClick={() => handleNavigation("/admin/banner")}
                    className={`hover:bg-graydark group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out dark:hover:bg-meta-4 ${
                      pathname === "/admin/banner" &&
                      "bg-graydark dark:bg-meta-4"
                    }`}
                  >
                    <MdFilterFrames />
                    Banner
                  </button>
                </li>

                {/* Menu Item Settings */}
                <li>
                  <button
                    onClick={() => handleNavigation("/admin/settings")}
                    className={`hover:bg-graydark group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out dark:hover:bg-meta-4 ${
                      pathname === "/admin/settings" &&
                      "bg-graydark dark:bg-meta-4"
                    }`}
                  >
                    <MdBuild />
                    Settings
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                Akun
              </h3>

              <ul className="mb-6 flex flex-col gap-1.5">
                <li>
                  <button
                    onClick={() => handleNavigation("/admin/chart")}
                    className={`hover:bg-graydark group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out dark:hover:bg-meta-4 ${
                      pathname === "/admin/chart" &&
                      "bg-graydark dark:bg-meta-4"
                    }`}
                  >
                    <MdAdminPanelSettings />
                    Admin
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
