"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { NavItem } from "@/data/NavItem";
import { RiMoonClearLine, RiSunLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { NavMenuItem } from "./NavItem";

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
    <div className="sticky top-3 z-50">
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
                {NavItem.map((item, i) => (
                  <li key={i}>
                    <Link href={item.url}>
                      <span
                        className={`${
                          pathName === item.url ? "font-bold text-[0C62F7]" : ""
                        }`}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Layanan Kami Dropdown with Hover */}
              <div
                className="group relative ml-6"
                onMouseEnter={openMenu}
                onMouseLeave={closeMenuWithDelay}
              >
                <button className="btn btn-ghost">
                  Layanan Kami <IoIosArrowDown />
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
                {isDarkMode ? <RiSunLine /> : <RiMoonClearLine />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
