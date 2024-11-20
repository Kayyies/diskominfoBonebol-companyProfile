"use client";

import { useState, useEffect } from "react";
import { TitleFirst } from "./title-landingpage";
import { TugasKami } from "./tugas-kami";

const tugaskamiData = [
  {
    id: "1",
    title: "Penyebaran",
    subtitle: "Informasi Publik",
    image: "/tugas-infoDark.png",
  },
  {
    id: "2",
    title: "Pengembangan",
    subtitle: "Web dan Alikasi",
    image: "/tugas-webDark.png",
  },
  {
    id: "3",
    title: "Tanggung Jawab",
    subtitle: "Jaringan dan CCTV",
    image: "/tugas-jaringanDark.png",
  },
];

function TugasKamiSection() {
  const datas = tugaskamiData;
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
    <div className="mx-auto lg:mb-20" id="tugas-kami">
      <div className="mb-5 lg:mb-0">
        <TitleFirst
          title="💼Tugas Kami"
          descNormal="Apa saja yang menjadi"
          descColor="tugas kami"
          subdesc="Diskomdigi Bonebol membaginya menjadi 3 tugas utama:"
        />
      </div>
      <div className="mx-auto flex flex-col lg:flex-row lg:space-x-5">
        {datas.map((data) => (
          <div
            className={`transform transition-all duration-500 ease-out lg:w-1/3 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-50 opacity-0"
            }`}
            key={data.id}
          >
            <TugasKami
              title={data.title}
              subtitle={data.subtitle}
              image={data.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TugasKamiSection;
