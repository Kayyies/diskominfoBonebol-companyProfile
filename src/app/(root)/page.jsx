import BannerSection from "@/components/Beranda/Banner/BannerSection";
import SectionBerandaBerita from "@/components/Beranda/Berita/SectionBerandaBerita";
import Hero from "@/components/Beranda/Hero";
import HeroImage from "@/components/Beranda/HeroImage";
import LayananSection from "@/components/Beranda/LayananKami/LayananSection";
import Responsibility from "@/components/Beranda/Responsibility/Responsibility";
import JumbotronNew from "@/components/Jumbotron/JumbotronNew";
import NewsRecom from "@/components/News/NewsRecom";
import { TitleFirst, TitleLast } from "@/components/title-landingpage";
import { TugasKami } from "@/components/tugas-kami";
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
      {/* Tugas Kami */}
      <div className="mx-auto mb-20">
        <TitleFirst
          title="💼Tugas Kami"
          descNormal="Apa saja yang menjadi"
          descColor="tugas kami"
          subdesc="diskominfo bonebol membagi tugasnya menjadi tiga tugas utama:"
        />
        <div className="flex flex-row flex-nowrap space-x-5">
          <TugasKami
            title="Penyebaran"
            subtitle="Informasi Publik"
            image="/tugas-infoDark.png"
          />
          <TugasKami
            title="Pengembangan"
            subtitle="Web dan Aplikasi"
            image="/tugas-webDark.png"
          />
          <TugasKami
            title="Tanggung Jawab"
            subtitle="Jaringan dan CCTV"
            image="/tugas-jaringanDark.png"
          />
        </div>
      </div>

      {/* Informasi Publikasi */}
      <div className="container relative mx-auto items-center">
        <TitleLast
          title="📢 Informasi Publikasi"
          descColor="Sedang terjadi apa"
          descNormal="di Bone Bolango"
          subdesc="Berikut tiga berita teranyar dari kami!"
        />
        <NewsRecom />
      </div>
      <BannerSection />
      <div>
        <TitleFirst
          title="🖥️ Website & Aplikasi"
          descNormal="Seluruh daftar website"
          descColor="layanan kami"
          subdesc="sebagai wujud misi pengembangan web & aplikasi"
        />
        <LayananSection />
      </div>
      {/* Embed YouTube video */}
      <div
        className="border-darkPrimary mt-32 border-y-2 border-opacity-10 py-20 dark:border-white dark:border-opacity-10"
        style={{
          backgroundImage: "url(/gridYoutube.png)",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        {/* youtube embed */}
        <div className="container mx-auto h-[300px] w-[854px] ">
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
