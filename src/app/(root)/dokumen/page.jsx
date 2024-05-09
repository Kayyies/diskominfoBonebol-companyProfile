"use client";

import { useState } from "react";
import JumbotronNew from "@/components/Jumbotron/JumbotronNew";
import PublikasiCard from "@/components/PublikasiCard";
import Simak from "@/components/Simak";

const DokumenPage = () => {
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
        title="Publikasi"
        desc="Temukan kumpulan publikasi dokumen perencanaan, Daerah dalam
              Angka, dan publikasi lainnya dari pemerintah untuk memberikan
              gambaran tentang situasi dan kondisi terkini."
      />
      <div
        style={{
          background: "linear-gradient(#EDF1FD,#EDF1FD, #FFFFFF)",
        }}
      >
        <div className="container mx-auto px-48 pb-40">
          <PublikasiCard />
        </div>
      </div>
      <Simak />
    </div>
  );
};
export default DokumenPage;
