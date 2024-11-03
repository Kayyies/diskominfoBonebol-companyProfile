import Image from "next/image";
import { TitleOnly } from "../title-landingpage";

function Hero() {
  return (
    <div>
      <TitleOnly />
      {/* desktop */}
      <div className="container mx-auto flex hidden flex-col items-center justify-center gap-3 px-10 text-center leading-3 lg:block xl:gap-5 xl:px-40">
        <p className="max-w-5xl text-2xl font-bold text-[#070404] dark:text-white xl:text-6xl">
          <span className="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-400 bg-clip-text text-transparent">
            Diskomdigi
          </span>{" "}
          Bone Bolango Akurat, Informatif, Serta Melayani{" "}
          <span className="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-400 bg-clip-text text-transparent">
            Sepenuh Hati
          </span>
        </p>
        <div className="text-[#070404] dark:text-white xl:text-lg">
          Temukan informasi publik terkini dari <br /> Dinas Komunikasi &
          Digital Kabupaten Bone Bolango
        </div>
      </div>

      {/* mobile */}
      <div className="container mx-auto flex flex-col items-center justify-center gap-3 text-center leading-3 lg:hidden xl:gap-5 xl:px-40">
        <p className="text-3xl font-bold text-[#070404] dark:text-white xl:text-6xl">
          <span className="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-400 bg-clip-text text-transparent">
            Diskomdigi
          </span>{" "}
          Bone Bolango Melayani{" "}
          <span className="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-400 bg-clip-text text-transparent">
            Sepenuh Hati
          </span>
        </p>
        <p className="px-10 text-sm leading-6 text-[#070404] dark:text-white lg:text-lg">
          Temukan informasi publik terkini dari Dinas Komunikasi dan Digital
          Kabupaten Bone Bolango
        </p>
      </div>

      <figure className="w-full">
        <Image
          src="/hero.png"
          alt="hero"
          width={1500}
          height={500}
          className="w-full object-contain lg:h-auto"
        />
      </figure>
    </div>
  );
}
export default Hero;
