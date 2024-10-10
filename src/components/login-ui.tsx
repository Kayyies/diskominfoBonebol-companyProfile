"use client";

import Image from "next/image";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { InputPassword, InputUsername } from "./login-input";
import { useRouter } from "next/navigation";

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
            src="/langit.png"
            width={500}
            height={500}
            className="h-[600px] w-full  rounded-md object-cover"
            alt="Background image"
          />
          <div className="absolute bottom-5 left-5 text-white">
            <h1 className="text-2xl font-semibold">
              Capturing Moments, Creating Memories
            </h1>
          </div>
        </div>

        {/* Bagian kanan: form login */}
        <div className="flex w-full flex-col justify-center lg:w-1/2">
          <h1 className="mb-10 text-4xl font-bold text-white">
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

          {/* Bagian tambahan: Tombol untuk media sosial */}
          <div className="mt-10 text-center text-white">
            <p className="mb-5">Media Sosial Diskominfo</p>
            <div className="flex justify-center gap-4">
              <button className="flex items-center gap-2 rounded-md border border-gray-500 px-6 py-3 text-white">
                <Image
                  src="/google-icon.png"
                  alt="Google"
                  width={24}
                  height={24}
                />
                <span>Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
