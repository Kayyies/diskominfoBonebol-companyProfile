"use client";

import { FaRegEye, FaRegEyeSlash, FaUser } from "react-icons/fa";
import { useState } from "react";

// ====== Username ======================================

interface InputUsernameProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputUsername: React.FC<InputUsernameProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor="username">Masukan Username</label>
      <div className="relative">
        {/* Icon FaUser di sebelah kiri */}
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <FaUser />
        </span>
        {/* Garis vertikal setelah ikon */}
        <span className="absolute left-12 top-1/2 h-6 w-[1px] -translate-y-1/2 bg-gray-500"></span>
        {/* Input field */}
        <input
          type="text"
          id="username"
          placeholder="Username"
          value={value}
          onChange={onChange}
          className="w-full rounded-md bg-gray-800 px-14 py-4 text-white placeholder-gray-400" // Menambah padding kiri untuk ikon
        />
      </div>
    </div>
  );
};

// ====== Password ======================================
interface InputPasswordProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputPassword: React.FC<InputPasswordProps> = ({
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col gap-3">
      <label htmlFor="password">Masukan Password</label>
      <div className="relative">
        {/* Icon FaRegEye di sebelah kiri */}
        <span className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400">
          {showPassword ? (
            <FaRegEyeSlash onClick={togglePasswordVisibility} />
          ) : (
            <FaRegEye onClick={togglePasswordVisibility} />
          )}
        </span>
        {/* Garis vertikal setelah ikon */}
        <span className="absolute left-12 top-1/2 h-6 w-[1px] -translate-y-1/2 bg-gray-500"></span>
        {/* Input field */}
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          placeholder="Enter your password"
          value={value}
          onChange={onChange}
          className="w-full rounded-md bg-gray-800 px-14 py-4 text-white placeholder-gray-400" // Menambah padding kiri untuk ikon
        />
      </div>
    </div>
  );
};
