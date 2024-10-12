import Image from "next/image";
import Link from "next/link";
import { NavItem } from "@/data/NavItem";
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
  return (
    <div className="container mx-auto xl:px-40 3xl:px-[400px]">
      <nav className="flex items-center justify-between py-4">
        {/* Navbar Start - Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image src="/diskominfo.png" width={150} height={150} alt="logo" />
          </Link>
        </div>

        {/* Navbar Menu - Hidden on small screens */}
        <div className="hidden items-center lg:flex">
          <ul className="flex space-x-6 text-[#070404] dark:text-white">
            {NavItem.map((item, i) => (
              <li key={i}>
                <Link href={item.url} className="hover:text-gray-400">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Dropdown Layanan Kami */}
          <div className="group relative ml-6">
            <button className="flex items-center text-[#070404] hover:text-gray-400 focus:outline-none dark:text-white">
              Layanan Kami <IoIosArrowDown className="ml-1" />
            </button>

            {/* Dropdown Content */}
            <div className="absolute left-0 top-full mt-2 hidden w-48 rounded-md bg-white shadow-lg group-hover:block">
              <ul className="py-2 text-black">
                {/* Dropdown item */}
                <li className="px-4 py-2 hover:bg-gray-200">
                  <Link href="/layanan1">Layanan 1</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200">
                  <Link href="/layanan2">Layanan 2</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200">
                  <Link href="/layanan3">Layanan 3</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Visible on small screens */}
        <div className="flex items-center lg:hidden">
          <button className="text-white focus:outline-none">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
