"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoginUI } from "@/components/login-ui";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
      callbackUrl: "/admin", // Halaman setelah login
    });

    if (res.ok) {
      router.push(res.url || "/admin");
    } else {
      alert("Login gagal");
      setError("Login gagal. Silakan periksa kredensial Anda.");
    }
  };

  return (
    <>
      <LoginUI
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}
