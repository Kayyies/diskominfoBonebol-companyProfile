import BannerSection from "@/components/Beranda/Banner/BannerSection";
import SectionBerandaBerita from "@/components/Beranda/Berita/SectionBerandaBerita";
import Hero from "@/components/Beranda/Hero";
import HeroImage from "@/components/Beranda/HeroImage";
import LayananSection from "@/components/Beranda/LayananKami/LayananSection";
import Responsibility from "@/components/Beranda/Responsibility/Responsibility";
import TugasKami from "@/components/tugas-kami";
import { Metadata } from "next";

function page() {
  return (
    <div className="mb-40 flex flex-col gap-10 ">
      <div
        className="hero"
        style={{
          backgroundImage: "url(/grid.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
        }}
      >
        <div className="hero-content flex flex-col text-center">
          <div className="leading-3">
            <Hero />
          </div>
          <HeroImage />
        </div>
      </div>
      <Responsibility />
      <TugasKami />
      <SectionBerandaBerita />
      <BannerSection />
      <LayananSection />
      {/* Embed YouTube video */}
      <div
        className="border-darkPrimary mx-auto mt-32 border-y-2 border-opacity-10 py-20 dark:border-white dark:border-opacity-10"
        style={{
          backgroundImage: "url(/gridYoutube.png)",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        {/* youtube embed */}
        <div className="h-[240px] w-full lg:h-[480px]">
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed/XvHcaIbST_A?si=wrKDkoExECL57Mcg"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default page;
