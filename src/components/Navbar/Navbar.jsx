"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { NavItem } from "@/data/NavItem";
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const pathName = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });

    return (
        <div className="sticky top-0 z-50">
            <div className={`bg-white w-full transition-all ${isScrolled ? "py-3 shadow-sm" : ""}`}>
                <div className="navbar container mx-auto px-6 lg:px-30 2xl:px-48">
                    <div className="navbar-start w-auto">
                        <Link href="/">
                            <Image src="/diskominfo.png" width={150} height={150} alt="logo" />
                        </Link>
                    </div>
                    <div className="navbar-end w-full">
                        <div className="dropdown dropdown-end xl:hidden">
                            <div tabIndex={0} role="button" className="btn btn-ghost">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                    />
                                </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                                >
                                {NavItem.map((item, i) => {
                                    return (
                                    <li key={i}>
                                        <Link href={item.url}>
                                            <span className={`${pathName === item.url ? "text-[0C62F7] font-bold" : ""}`}>
                                                {item.label}
                                            </span>
                                        </Link>
                                    </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className="hidden xl:flex">
                            <ul className="menu menu-horizontal px-1">
                                {NavItem.map((item, i) => {
                                return (
                                    <li key={i}>
                                        <Link href={item.url}>
                                            <span className={`${pathName === item.url ? "text-[0C62F7] font-bold" : ""}`}>
                                            {item.label}
                                            </span>
                                        </Link>
                                    </li>
                                );
                                })}
                            </ul>
                            <div className="dropdown dropdown-end">
                                <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost rounded-btn"
                                >
                                Layanan Kami <IoIosArrowDown />
                                </div>
                                <div
                                tabIndex={0}
                                className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 flex w-[1216px] flex-row flex-wrap gap-5 shadow"
                                >
                                <p>hai</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Navbar;
