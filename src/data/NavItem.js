import { IoMdHome, IoIosMegaphone } from "react-icons/io";
import { FaNewspaper, FaInbox } from "react-icons/fa6";
import { HiUserGroup } from "react-icons/hi";

export const NavItem = [
  {
    label: "Beranda",
    mobileLabel: "Beranda",
    url: "/",
    icon: <IoMdHome />,
  },
  {
    label: "Profil",
    mobileLabel: "Profil",
    url: "/profil",
    icon: <HiUserGroup />,
  },
  {
    label: "Berita & Pengumuman",
    mobileLabel: "Berita",
    url: "/berita",
    icon: <FaNewspaper />,
  },
  {
    label: "Dokumen & Infografis",
    mobileLabel: "Infografis",
    url: "/dokumen",
    icon: <FaInbox />,
  },
  {
    label: "Pengumuman",
    mobileLabel: "Pengumuman",
    url: "/berita/pengumuman",
    icon: <IoIosMegaphone />,
  },
];
