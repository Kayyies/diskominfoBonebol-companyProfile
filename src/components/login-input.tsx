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
      <label htmlFor="">Username</label>
      <div>
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <FaUser className="text-gray-400" />
          <div className="mx-3 h-6 w-[1px] bg-gray-600"></div>{" "}
        </span>
        <input
          type="text"
          placeholder="Username"
          value={value}
          onChange={onChange}
          className="rounded-md bg-gray-800 px-8 py-4 text-white placeholder-gray-400"
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
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={value}
          onChange={onChange}
          className="w-full rounded-md bg-gray-800 px-8 py-4 text-white placeholder-gray-400"
        />
        <span
          className="absolute right-4 top-4 cursor-pointer text-gray-400"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
        </span>
      </div>
    </div>
  );
};
