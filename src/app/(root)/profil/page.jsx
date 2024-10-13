"use client";

// Reacts
import React, { useState, useRef } from "react";

// Components
import JumbotronNew from "@/components/Jumbotron/JumbotronNew";
import Accordion from "@/components/Accordion/Accordion";
import Contact from "@/components/Contact/Contact";

// datas
import { ProfileSidebar } from "@/data/ProfilSidebar";
import { ProfilText } from "@/data/ProfilText";
import Simak from "@/components/Simak";

//dynamic accordion
const ProfilPage = () => {
  const [activeSection, setActiveSection] = useState("section-1");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State untuk sidebar
  const navbarRef = useRef(null); // Reference untuk navbar

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
      <div className="dark:to-darkPrimary -mt-4 bg-gradient-to-b from-[#edf1fd] to-[#f5f4f4] to-10% dark:bg-gradient-to-b dark:from-[#283257] dark:to-15% dark:text-white">
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
              {ProfilText.map((section, i) => (
                <div key={i} id={section.id}>
                  {section.id === activeSection && (
                    <>
                      <h1 className="mb-10 text-3xl font-bold">
                        {section.title}
                      </h1>
                      {section.content.map((content, contentIndex) => (
                        <div
                          key={contentIndex}
                          id={content.id}
                          className="flex flex-col gap-3"
                        >
                          <h2 className="text-xl font-bold">
                            {content.heading}
                          </h2>
                          <p
                            className="text-md mb-10 font-light"
                            id={`content-${i + 1}`}
                          >
                            {content.text}
                          </p>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Simak />
    </div>
  );
};

export default ProfilPage;
