import { MdEmail } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import { footerItem } from "@/data/footerItem";
import { IoMdArrowRoundForward } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-gradient-to-b from-[#f5f4f4] to-[#edf1fd] to-70% pb-15 dark:bg-gradient-to-b dark:from-darkPrimary dark:via-[#1d2956] dark:to-[#2e418a] dark:to-90% lg:mt-20 ">
      <div className="container mx-auto mb-12 px-6 text-base-content dark:text-white lg:px-48">
        {/* kata besar */}
        <div className="flex flex-col gap-15 lg:mb-10 lg:flex-row">
          <div className="flex flex-col gap-5 text-darkPrimary dark:text-white lg:w-5/12">
            <p className="text-sm tracking-wide ">
              Kamu telah berada di akhir halaman 😉
            </p>
            <h1 className="text-6xl font-medium">
              <span className="text-textAccent">Terima kasih</span>
              <br />
              telah ✨
              <br />
              berkunjung
            </h1>
            <p className="hidden cursor-not-allowed items-center gap-1 text-sm tracking-wide transition-colors duration-100 hover:text-textAccent lg:flex">
              Simak Info lebih lanjut terkait kontak kami
              <span>
                <IoMdArrowRoundForward />
              </span>
            </p>
          </div>
          <div className="lg:w-7/12 ">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2  lg:gap-0">
              <div className="grid grid-rows-2 gap-5">
                <div className="flex flex-col gap-4">
                  <h3 className="inline-block max-w-fit rounded-xl border border-[0C62F7] px-4 py-2 text-sm font-semibold text-darkPrimary dark:border-none dark:bg-gradient-to-b dark:from-[#283877] dark:via-darkPrimary dark:to-[#283877] dark:text-white">
                    Connect with us
                  </h3>
                  <p className="text-sm">📧 diskominfo@bonebolangokab.go.id</p>
                  <p className="text-sm">📞 +62 812-3456-7890</p>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="inline-block max-w-fit rounded-xl border border-[0C62F7] px-4 py-2 text-sm font-semibold text-darkPrimary dark:border-none dark:bg-gradient-to-b dark:from-[#283877] dark:via-darkPrimary dark:to-[#283877] dark:text-white">
                    Ikuti Kami
                  </h3>
                  <div className="flex flex-col gap-2 text-sm">
                    <Link
                      href="https://www.instagram.com/diskominfobonebol/"
                      className="transition-colors duration-100 hover:text-textAccent"
                    >
                      @diskominfobonebol
                    </Link>
                    <Link
                      href="https://www.instagram.com/berita_bonebolango/"
                      className="transition-colors duration-100 hover:text-textAccent"
                    >
                      @berita_bonebolango
                    </Link>
                    <Link
                      href="https://www.instagram.com/opendata.bonebol/"
                      className="transition-colors duration-100 hover:text-textAccent"
                    >
                      @opendata.bonebolango
                    </Link>
                  </div>
                </div>
              </div>
              <div className="grid gap-5 lg:grid-rows-2">
                <div className="flex flex-col gap-4">
                  <h3 className="inline-block max-w-fit rounded-xl border border-[0C62F7] px-4 py-2 text-sm font-semibold text-darkPrimary dark:border-none dark:bg-gradient-to-b dark:from-[#283877] dark:via-darkPrimary dark:to-[#283877] dark:text-white">
                    Lokasi Diskomdigi Bonebol
                  </h3>
                  <div className="flex flex-col gap-2 text-wrap text-sm">
                    <p>
                      🌍 H44W+P6G, Ulanta, Suwawa, Bone Bolango Regency,
                      Gorontalo 96113
                    </p>
                    <Link
                      href="https://maps.app.goo.gl/z5w4T1WjuqgHLLLk7"
                      className="transition-colors duration-100 hover:text-textAccent"
                    >
                      🔗 Link Google Maps
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* divider */}
        <div className="my-5 border border-gray-400 dark:border-white/20 lg:my-10 lg:w-full"></div>
        {/* footernya footer */}
        <div className="flex flex-col items-center justify-between gap-3 px-3 lg:flex-row">
          <Image
            src="/diskominfo.png"
            alt="aa"
            width={500}
            height={500}
            className="w-30 lg:w-40"
          />
          <p className="text-wrap text-xs tracking-wide text-gray-700 dark:text-gray-400 lg:text-darkPrimary lg:dark:text-white ">
            {" "}
            Made with love ❤️ by Zulhamd Kayyies Podungge
          </p>
        </div>
      </div>
    </div>
  );
}
