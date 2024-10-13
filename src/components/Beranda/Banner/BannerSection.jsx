"use client";

import { useEffect, useState } from "react";
import Banner from "./Banner";

function BannerSection() {
  const [backgroundImage, setBackgroundImage] = useState("karawoLight.png");

  // Function to update background image based on theme
  const updateBackgroundImage = () => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setBackgroundImage(isDarkMode ? "karawoDark.png" : "karawoLight.png");
  };

  // UseEffect to handle initial load and theme changes
  useEffect(() => {
    // Set the initial background based on the current theme
    updateBackgroundImage();

    // Listen for theme change events
    window.addEventListener("themeChange", updateBackgroundImage);

    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener("themeChange", updateBackgroundImage);
    };
  }, []);

  return (
    <div className="relative mb-40">
      <div
        className="relative mb-20 mt-20 bg-[#2563EB] pb-40 pt-[71px] dark:bg-[#202848] md:pt-10"
        style={{
          backgroundImage: `url(${backgroundImage})`, // Dynamically adjust background image
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
        }}
      >
        <div className="container relative z-10 mx-auto px-40 py-20">
          <Banner />
        </div>
      </div>
    </div>
  );
}

export default BannerSection;
