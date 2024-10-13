"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { NavItem } from "@/data/NavItem";
import { IoIosArrowDown } from "react-icons/io";
import { FaMoon, FaSun } from "react-icons/fa6"; // Import moon and sun icons for dark mode
import { RiMoonClearLine, RiSunLine } from "react-icons/ri";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
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
                {NavItem.map((item, i) => {
                  return (
                    <li key={i}>
                      <Link href={item.url}>
                        <span
                          className={`${
                            pathName === item.url
                              ? "font-bold text-[0C62F7]"
                              : ""
                          }`}
                        >
                          {item.label}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Layanan Kami Dropdown */}
              <div className="dropdown dropdown-end ml-6">
                <div tabIndex={0} role="button" className="btn btn-ghost">
                  Layanan Kami <IoIosArrowDown />
                </div>
                <div
                  tabIndex={0}
                  className="menu dropdown-content z-[1] mt-4 flex w-[1216px] flex-row flex-wrap gap-5 rounded-box bg-base-100 shadow"
                >
                  <p>hai</p>
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
  );
};

export default Navbar;
