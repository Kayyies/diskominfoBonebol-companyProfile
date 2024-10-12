"use client";

import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", newTheme); // Simpan preferensi pengguna

    // Dispatch custom event to notify theme change
    window.dispatchEvent(new Event("themeChange"));
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed bottom-10 right-10 rounded-full bg-gray-800 p-3 text-white"
    >
      {isDarkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
