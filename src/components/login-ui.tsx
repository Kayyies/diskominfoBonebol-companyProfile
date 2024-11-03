"use client";

import Image from "next/image";
import { InputPassword, InputUsername } from "./login-input";
import { useRouter } from "next/navigation";

//icons
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import Link from "next/link";

interface LoginUIProps {
  handleLogin: (e: React.FormEvent) => void;
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
}

export const LoginUI: React.FC<LoginUIProps> = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  const router = useRouter();

  const handleBack = () => {
    router.push("/");
  };

  return (
    <div className="container mx-auto mt-10 max-w-7xl p-5">
      <div className="flex flex-col gap-10 lg:flex-row lg:gap-20">
        {/* Bagian kiri: gambar dan tombol kembali */}
        <div className="relative w-full lg:w-1/2">
          <button
            className="absolute left-5 top-5 flex flex-row items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm text-white transition-opacity duration-1000 ease-in-out hover:bg-white/50"
            onClick={handleBack}
          >
            <FaLongArrowAltLeft />
            <p className="text-sm">Back to website</p>
          </button>
          <Image
            src="/diskomdigi-login.png"
            width={500}
            height={500}
            className="h-[600px] w-full  rounded-md object-cover"
            alt="Background image"
          />
          <div className="absolute bottom-5 left-5 text-white">
            <h1 className="text-2xl font-semibold">
              Diskomdigi, melayani sepenuh hati 🫶🏻
            </h1>
          </div>
        </div>

        {/* Bagian kanan: form login */}
        <div className="flex w-full flex-col justify-center gap-10 lg:w-1/2">
          <h1 className="text-4xl font-bold text-white">
            Selamat Datang Kembali!
          </h1>
          <form className="flex flex-col gap-5" onSubmit={handleLogin}>
            {/* Menggunakan komponen InputUsername */}
            <InputUsername
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            {/* Menggunakan komponen InputPassword */}
            <InputPassword
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="rounded-md bg-[#6E54B5] py-4 text-white">
              Masuk
            </button>
          </form>

          {/* divider */}
          <div className="grid grid-cols-3 items-center gap-5">
            <div className="h-0 w-full border border-white/30" />
            <p className="text-center text-white">Media Sosial Diskominfo</p>
            <div className="h-0 w-full border border-white/30" />
          </div>

          {/* Media sosial */}
          <div className="grid grid-cols-3 gap-5 text-white">
            <Link
              className="flex items-center justify-center gap-2 rounded-md border-2 border-gray-500 py-3 text-white"
              href="https://www.instagram.com/diskominfobonebol/"
            >
              <FaInstagram />
              <span>Instagram</span>
            </Link>
            <Link
              className="flex items-center justify-center gap-2 rounded-md border-2 border-gray-500 py-3 text-white"
              href="https://www.instagram.com/diskominfobonebol/"
            >
              <FaInstagram />
              <span>Instagram</span>
            </Link>
            <Link
              className="flex items-center justify-center gap-2 rounded-md border-2 border-gray-500 py-3 text-white"
              href="https://www.instagram.com/diskominfobonebol/"
            >
              <FaInstagram />
              <span>Instagram</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
