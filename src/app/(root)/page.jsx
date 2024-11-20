import BannerSection from "@/components/Beranda/Banner/BannerSection";
import Hero from "@/components/Beranda/Hero";
import LayananSection from "@/components/Beranda/LayananKami/LayananSection";
import { ModalInfo } from "@/components/modal-information";
import { NewsRecom, BeritaBaru } from "@/components/News/NewsRecom";
import { SambutanKadis } from "@/components/sambutan";
import { StatsPengunjung } from "@/components/statistik-pengunjung/statistik-pengunjung";
import { TitleFirst, TitleLast } from "@/components/title-landingpage";
import { TugasKami } from "@/components/tugas-kami";
import TugasKamiSection from "@/components/TugasKamiSection";

function page() {
  return (
    <div className="mb-40 flex flex-col gap-10 ">
      {/* <ModalInfo /> */}
      {/* hero section */}
      <div className="">
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
            <div className="mt-15 leading-3">
              <Hero />
            </div>
          </div>
        </div>
      </div>
      {/* Tugas Kami */}
      <TugasKamiSection />

      <SambutanKadis />

      {/* Informasi Publikasi */}
      <div className="container relative mx-auto items-center lg:px-48">
        <TitleLast
          title="📢 Berita & Pengumuman"
          descColor="Apa yang terjadi"
          descNormal="di Bonebol"
          subdesc="Berikut tiga berita teranyar dari kami!"
        />
        <BeritaBaru />
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
        className="mt-32 border-y-2 border-darkPrimary border-opacity-10 py-20 dark:border-white dark:border-opacity-10"
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
      <StatsPengunjung />
    </div>
  );
}

export default page;
