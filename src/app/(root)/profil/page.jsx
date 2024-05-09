"use client";

// Reacts
import React, { useState } from "react";

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

  const handleAccordionClick = (sectionId) => {
    console.log(sectionId);
    setActiveSection(sectionId);

    const contentId = `content-${sectionId.split("-")[1]}`;
    const element = document.getElementById(contentId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <JumbotronNew
        title="Profil"
        desc="Cari dan pelajari semua tentang kami, Dinas Komunikasi dan Informatika Bone Bolango"
      />
      <div
        style={{
          background: "linear-gradient(#EDF1FD,#FFFFFF, #FFFFFF)",
        }}
      >
        <div className="container mx-auto px-40 ">
          <div className="mb-52 flex gap-16 pt-10">
            <div className="sticky top-0">
              {ProfileSidebar.map((item, index) => (
                <Accordion
                  key={index}
                  title={item.title}
                  subtitles={[item.subtitle1, item.subtitle2, item.subtitle3]}
                  onClick={() => handleAccordionClick(`section-${index + 1}`)}
                />
              ))}
              <Contact />
            </div>
            <div className="flex flex-col">
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
                          <p className="text-md mb-10 font-light">
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
