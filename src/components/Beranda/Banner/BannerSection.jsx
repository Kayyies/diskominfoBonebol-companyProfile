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
                className="relative my-20 bg-[#2563EB] dark:bg-[#202848] py-1 md:py-20 md:pt-[10px] lg:py-40 lg:pt-[71px]"
                style={{
                    backgroundImage: `url(${backgroundImage})`, // Dynamically adjust background image
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                }}
            >
                <div className="container relative z-10 mx-auto px-6 lg:px-30 2xl:px-48 my-10 md:my-0 md:mt-20">
                    <Banner />
                </div>
            </div>
        </div>
    );
}

export default BannerSection;
