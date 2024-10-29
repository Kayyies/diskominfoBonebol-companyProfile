"use client";

// Reacts
import React, { useState, useRef, useEffect } from "react";

// Components
import JumbotronNew from "@/components/Jumbotron/JumbotronNew";
import Accordion from "@/components/Accordion/Accordion";
import Contact from "@/components/Contact/Contact";

// datas
import { ProfileSidebar } from "@/data/ProfilSidebar";
import { ProfilText } from "@/data/ProfilText";
import Simak from "@/components/Simak";
import { useRouter, useSearchParams } from "next/navigation";

//dynamic accordion
const ProfilPage = () => {
  const [activeSection, setActiveSection] = useState("section-1");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State untuk sidebar
  const navbarRef = useRef(null); // Reference untuk navbar
  const router = useRouter();
  const [activeHash, setActiveHash] = useState("");
  const searchParams = useSearchParams();
  const topic = searchParams.get("topic") || "dinas";
  const section = searchParams.get("section");

  const handleAccordionClick = (sectionId) => {
    console.log(sectionId);
    setActiveSection(sectionId);

    const contentId = `content-${sectionId.split("-")[1]}`;
    const element = document.getElementById(contentId);
    if (element) {
      const navbarHeight = navbarRef.current
        ? navbarRef.current.offsetHeight
        : 0;
      const topPosition =
        element.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({ top: topPosition, behavior: "smooth" });
    }

    // Tutup sidebar setelah memilih section
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    if (section) {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    }
  }, [section]);

  const handleSubtitleClick = (topic, subtitle) => {
    const sectionId = subtitle
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[?]/g, "");
    const newUrl = `/profil?topic=${topic}#${sectionId}`; // Construct the new URL
    // Use history.pushState to update the URL without causing a page reload
    window.history.pushState({}, "", newUrl);

    // Now trigger the smooth scroll after updating the URL
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 100; // Adjust for any navbar or header height
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 100); // Short delay to ensure URL is updated first
  };

  const filteredContent = ProfilText.find((item) => item.topic === topic);

  return (
    <div className="dark:bg-darkPrimary">
      <div ref={navbarRef}>
        <JumbotronNew
          title="🙆🏻‍♂️ Profil"
          descColor="Kenalan"
          descNormal="sama Diskominfo Bonebol kuy!"
          subdesc="*kuy adalah slang/bahasa gaul dari ‘yuk’"
        />
      </div>
      <div className="-mt-4 bg-gradient-to-b from-[#edf1fd] to-[#f5f4f4] to-10% dark:bg-gradient-to-b dark:from-[#283257] dark:to-darkPrimary dark:to-15% dark:text-white">
        <div className="container relative mx-auto px-10 lg:px-40 xl:py-10">
          <div className="mb-52 flex flex-col gap-16 xl:flex-row">
            {/* Tombol untuk membuka sidebar pada mobile */}
            <button
              className="absolute left-0 top-[120px] block -translate-x-10 rotate-90 transform rounded bg-[0C62F7] px-2 py-1 text-xs text-white lg:-translate-x-13 lg:px-4 lg:py-2 xl:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              Buka Navigasi
            </button>

            {/* Sidebar */}
            <div className="hidden xl:block">
              <div className="sticky top-20 z-50">
                {ProfileSidebar.map((item, index) => (
                  <Accordion
                    key={index}
                    topic={item.topic}
                    title={item.title}
                    subtitles={item.subtitles}
                    onClick={handleSubtitleClick}
                    isActive={topic === item.title.toLowerCase()}
                  />
                ))}
                <Contact />
              </div>
            </div>

            <div
              className={`fixed bottom-0 left-0 z-50 transform rounded-tr-lg bg-white transition-transform ${isSidebarOpen ? "translate-y-0" : "translate-y-full"} xl:relative xl:bottom-auto xl:hidden xl:h-full xl:w-1/4 xl:translate-y-0`}
            >
              <div className="p-4 shadow-lg">
                {ProfileSidebar.map((item, index) => (
                  <Accordion
                    key={index}
                    title={item.title}
                    subtitles={[item.subtitle1, item.subtitle2, item.subtitle3]}
                    onClick={() => handleAccordionClick(`section-${index + 1}`)}
                    isActive={activeSection === `section-${index + 1}`}
                  />
                ))}
                <Contact />

                {/* Tombol untuk menutup sidebar */}
                <button
                  className="mt-4 block w-full rounded bg-[0C62F7] px-4 py-2 text-white"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Tutup Navigasi
                </button>
              </div>
            </div>

            {/* Konten utama */}
            <div className="mt-2 flex flex-col">
              {filteredContent?.content.map((section, i) => {
                const sectionId = section.heading
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                  .replace(/[?]/g, ""); // Generate section id
                return (
                  <div key={i} id={sectionId}>
                    <h2 className="text-xl font-bold">{section.heading}</h2>
                    <p className="text-md mb-10 font-light">{section.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Simak />
    </div>
  );
};

export default ProfilPage;
