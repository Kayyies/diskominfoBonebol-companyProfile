import Image from "next/image";
import Link from "next/link";
import { NavItem } from "@/data/NavItem";
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
  return (
    <div className="3xl:px-[400px] container mx-auto xl:px-40">
      <div className="navbar bg-base-100">
        <div className="navbar-start ">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                    <Link href={item.url}>{item.label}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <Link href="/">
            <Image src="/diskominfo.png" width={150} height={150} alt="logo" />
          </Link>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {NavItem.map((item, i) => {
              return (
                <li key={i}>
                  <Link href={item.url}>{item.label}</Link>
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
  );
};
export default Navbar;
