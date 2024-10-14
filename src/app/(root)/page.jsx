"use client";

import BannerSection from "@/components/Beranda/Banner/BannerSection";
import Hero from "@/components/Beranda/Hero";
import HeroImage from "@/components/Beranda/HeroImage";
import LayananSection from "@/components/Beranda/LayananKami/LayananSection";
import NewsRecom from "@/components/News/NewsRecom";
import { TitleFirst, TitleLast } from "@/components/title-landingpage";
import { TugasKami } from "@/components/tugas-kami";
import TugasKamiSection from "@/components/TugasKamiSection";

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
      <TugasKamiSection />

      {/* Sambutan Kepala dinas */}
      <div className="mx-auto mb-20 flex w-[1400px] flex-col gap-10">
        {/* image */}
        <div className="h-[500px] rounded-lg bg-[url(/assets/kadis.png)] bg-cover bg-center">
          <div className="h-[500px] bg-gradient-to-r from-[#0C1124]/60 from-45% to-[#0C1124]/80">
            <div className="h-[500px] bg-[url(/assets/gridSambutan.png)] bg-cover bg-center"></div>
          </div>
        </div>
        {/* text */}
        <div className="text-darkPrimary mx-auto flex w-[1150px] flex-row gap-10 leading-loose tracking-wide dark:text-white">
          {/* text kiri */}
          <p className="w-3/12 pt-5 font-light">
            <span className="text-textAccent font-bold">
              Misnawaty Wantogia, SE, MM.{" "}
            </span>
            Kepala Dinas Komunikasi dan Informatika Kabupaten Bone Bolango 2021
            - Sekarang
          </p>
          {/* text kanan */}
          <h1 className="w-9/12 text-4xl font-extralight leading-loose tracking-wide">
            Dengan menyebut nama Tuhan yang Maha Esa, saya sebagai{" "}
            <span className="text-textAccent font-bold">Kepala Dinas</span>,
            mewakili jajaran Dinas Komunikasi dan Informatika Bone Bolango{" "}
            <span className="text-textAccent font-bold">
              menyambut teman-teman pada halaman resmi kami.
            </span>{" "}
            Semoga segala informasi seputar dinas kami tersampaikan dengan
            tuntas kepada teman-teman 🙏🏻
          </h1>
        </div>
        <div className="border-darkPrimary/20 rounded-lg border border-black/30 dark:border-white/30"></div>
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
      <div className="bg-[url('/mesh-for-layananLight.png')] bg-contain bg-left-bottom bg-no-repeat dark:bg-[url('/mesh-for-layananDark.png')]">
        <div className="container relative mx-auto -mt-20 px-6 lg:px-30 2xl:px-48">
          <TitleFirst
            title="🖥️ Website & Aplikasi"
            descNormal="Seluruh daftar website"
            descColor="layanan kami"
            subdesc="sebagai wujud misi pengembangan web & aplikasi"
          />
          <LayananSection />
        </div>
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
