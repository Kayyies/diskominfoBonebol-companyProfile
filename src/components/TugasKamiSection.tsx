"use client";

import { useState, useEffect } from "react";
import { TitleFirst } from "./title-landingpage";
import { TugasKami } from "./tugas-kami";

function TugasKamiSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const triggerPosition = window.scrollY + window.innerHeight - 400;
      const element = document.getElementById("tugas-kami");
      const elementPosition =
        element?.getBoundingClientRect().top + window.scrollY;

      if (triggerPosition > elementPosition) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="mx-auto mb-20" id="tugas-kami">
      <TitleFirst
        title="💼Tugas Kami"
        descNormal="Apa saja yang menjadi"
        descColor="tugas kami"
        subdesc="diskominfo bonebol membagi tugasnya menjadi tiga tugas utama:"
      />

      <div className="flex flex-row flex-nowrap space-x-5">
        {/* Tugas Kami 1 */}
        <div
          className={`w-1/3 transform transition-all duration-500 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-50 opacity-0"
          }`}
        >
          <TugasKami
            title="Penyebaran"
            subtitle="Informasi Publik"
            image="/tugas-infoDark.png"
          />
        </div>

        {/* Tugas Kami 2 */}
        <div
          className={`w-1/3 transform transition-all duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-50 opacity-0"
          }`}
        >
          <TugasKami
            title="Pengembangan"
            subtitle="Web dan Aplikasi"
            image="/tugas-webDark.png"
          />
        </div>

        {/* Tugas Kami 3 */}
        <div
          className={`w-1/3 transform transition-all duration-1000 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-50 opacity-0"
          }`}
        >
          <TugasKami
            title="Tanggung Jawab"
            subtitle="Jaringan dan CCTV"
            image="/tugas-jaringanDark.png"
          />
        </div>
      </div>
    </div>
  );
}

export default TugasKamiSection;
