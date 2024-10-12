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
        <div>
            <div ref={navbarRef}>
                <JumbotronNew
                    title="🙆🏻‍♂️ Profil"
                    descColor="Kenalan"
                    descNormal="sama Diskominfo Bonebol kuy!"
                    subdesc="*kuy adalah slang/bahasa gaul dari ‘yuk’"
                />
            </div>
            <div
                className="-mt-1"
                style={{
                    background: "linear-gradient(#EDF1FD, #F0F3FD, #F9F9F9, #FFFFFF)",
                }}
            >
                <div className="container relative mx-auto px-10 lg:px-40 xl:py-10">
                    <div className="mb-52 flex flex-col xl:flex-row gap-16">
                        {/* Tombol untuk membuka sidebar pada mobile */}
                        <button
                            className="absolute top-[120px] left-0 -translate-x-10 lg:-translate-x-13 block xl:hidden px-2 py-1 lg:px-4 lg:py-2 bg-[0C62F7] text-xs text-white rounded transform rotate-90"
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
                        
                        <div className={`fixed left-0 bottom-0 bg-white z-50 transition-transform transform rounded-tr-lg ${isSidebarOpen ? "translate-y-0" : "translate-y-full"} xl:relative xl:translate-y-0 xl:w-1/4 xl:h-full xl:bottom-auto xl:hidden`}>
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
                                    className="block w-full mt-4 px-4 py-2 bg-[0C62F7] text-white rounded"
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
                                                    <p className="text-md mb-10 font-light" id={`content-${i + 1}`}>
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
