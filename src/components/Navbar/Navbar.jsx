"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { NavItem } from "@/data/NavItem";
import { RiMoonClearLine, RiSunLine } from "react-icons/ri";
import { IoIosArrowDown, IoMdHome } from "react-icons/io";
import { RiMenu2Fill } from "react-icons/ri";
import { NavMenuItem } from "./NavMenuItem";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  let menuCloseTimeout; // Timeout untuk delay penutupan mega menu
  const pathName = usePathname();

  useEffect(() => {
    // Handle scroll for navbar
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Set initial theme from local storage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle dark mode toggle
  const toggleDarkMode = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", newTheme);
    window.dispatchEvent(new Event("themeChange"));
  };

  // Fungsi untuk membuka menu
  const openMenu = () => {
    clearTimeout(menuCloseTimeout); // Hapus timeout jika ada
    setIsMenuOpen(true); // Tampilkan menu
  };

  // Fungsi untuk menutup menu dengan delay 1 detik
  const closeMenuWithDelay = () => {
    menuCloseTimeout = setTimeout(() => {
      setIsMenuOpen(false); // Sembunyikan menu setelah delay 1 detik
    }, 100); // Delay 1 detik (1000ms)
  };

  // Hapus timeout saat unmount komponen agar tidak ada memory leak
  useEffect(() => {
    return () => {
      clearTimeout(menuCloseTimeout);
    };
  }, []);

  return (
    <>
      {/* desktop */}
      <div className="sticky top-3 z-50 hidden md:block">
        <div
          className={`mx-auto w-[1200px] rounded-2xl transition-all ${
            isScrolled ? "bg-white/10 shadow-md backdrop-blur-lg" : ""
          }`}
        >
          <div className="container navbar mx-auto px-8">
            <div className="navbar-start w-auto">
              <Link href="/">
                <Image
                  src="/diskominfo.png"
                  width={150}
                  height={150}
                  alt="logo"
                />
              </Link>
            </div>

            <div className="navbar-end flex w-full items-center dark:text-white">
              <div className="hidden xl:flex">
                <ul className="menu menu-horizontal px-1">
                  {NavItem.slice(0, 4).map((item, i) => (
                    <li key={i} className="relative">
                      <Link href={item.url}>
                        <span
                          className={`relative transition-colors duration-300 ease-in-out hover:text-textAccent ${
                            pathName === item.url
                              ? "font-bold text-blue-700 dark:text-textAccent"
                              : ""
                          }`}
                        >
                          {item.label}
                          {/* Border Bottom */}
                          <span
                            className={`absolute -bottom-2 left-0 h-[2px] w-full bg-gray-500 transition-all duration-300 ease-in-out dark:bg-textAccent ${
                              pathName === item.url
                                ? "scale-x-100 "
                                : "scale-x-0"
                            }`}
                            style={{
                              transformOrigin:
                                pathName === item.url ? "left" : "right",
                            }}
                          />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Layanan Kami Dropdown with Hover */}
                <div
                  className="group relative"
                  onMouseEnter={openMenu}
                  onMouseLeave={closeMenuWithDelay}
                >
                  <button className="transition-color group btn btn-ghost font-medium duration-300 ease-in-out group-hover:text-textAccent">
                    Layanan Kami
                    <span className="transition-transform duration-300 ease-in-out group-hover:rotate-180">
                      <IoIosArrowDown />
                    </span>
                  </button>

                  {/* Mega Menu */}
                  <div
                    className={`
                    pointer-events-none absolute right-5 z-50 mt-3 w-[1060px] scale-95 transform rounded-lg
                    p-6 opacity-0 shadow-lg transition-all duration-300 ease-in-out
                    ${isMenuOpen ? "pointer-events-auto scale-100 opacity-100" : ""}
                    bg-white/10 shadow-md backdrop-blur-lg
                  `}
                  >
                    <div className="relative flex flex-row flex-wrap items-center gap-x-2 gap-y-5">
                      {/* Example Items */}
                      <NavMenuItem
                        title="Berita Bone Bolango"
                        desc="Berita akurat seputar bone bolango"
                        href="https://berita.bonebolangokab.go.id/"
                        image="beritabonebol"
                      />
                      <NavMenuItem
                        title="Cloud Bone Bolango"
                        desc="Penyimpanan Cloud Bone Bolango"
                        href=""
                        image="cloudbonebol"
                      />
                      <NavMenuItem
                        title="Email Bone Bolango"
                        desc="Email resmi OPD Bone Bolango"
                        href=""
                        image="emailbonebol"
                      />
                      <NavMenuItem
                        title="Open Data Bone Bolango"
                        desc="Data resmi OPD Bone Bolango"
                        href=""
                        image="opendatabonebol"
                      />
                      <NavMenuItem
                        title="PPID Bone Bolango"
                        desc="Portal data terbuka resmi bone bolango"
                        href=""
                        image="ppidbonebol"
                      />
                      <NavMenuItem
                        title="GIS Bone Bolango"
                        desc="Sistem Informasi Geografis Bonebol"
                        href=""
                        image="gisbonebol"
                      />
                    </div>
                  </div>
                </div>

                {/* Dark Mode Toggle Button */}
                <button
                  onClick={toggleDarkMode}
                  className="ml-4 rounded-full text-[#38BDF8]"
                >
                  {isDarkMode ? <RiMoonClearLine /> : <RiSunLine />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* mobile */}
      <div>
        <div className="fixed top-0 z-50 w-full md:hidden">
          <div className="flex h-12 items-center justify-between bg-white shadow-lg dark:bg-[#1A2031]">
            <div className="ml-4 flex items-center gap-4">
              {/* <RiMenu2Fill className="text-lg font-bold text-darkPrimary dark:text-gray-300" /> */}
              <Link href="/" className="">
                <Image
                  src="/diskominfo.png"
                  width={150}
                  height={150}
                  alt="logo diskomdigi"
                  className="h-9 w-auto"
                />
              </Link>
            </div>
            <button
              onClick={toggleDarkMode}
              className="ml-4 mr-4 rounded-full text-[#38BDF8]"
            >
              {isDarkMode ? <RiMoonClearLine /> : <RiSunLine />}
            </button>
          </div>
        </div>
        <div className="fixed bottom-0 z-50 w-full md:hidden">
          <div className="flex h-16 items-center justify-around bg-white shadow-lg dark:bg-[#1A2031]">
            {NavItem.slice(0, 5).map((item, i) => (
              <Link
                key={i}
                href={item.url}
                className="flex w-22 flex-col items-center gap-2 gap-y-1 "
              >
                <span className="text-2xl text-gray-600 dark:text-white">
                  {item.icon}
                </span>{" "}
                <span className="flex flex-wrap text-center text-[9px] text-gray-600 dark:text-white">
                  {item.mobileLabel}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
