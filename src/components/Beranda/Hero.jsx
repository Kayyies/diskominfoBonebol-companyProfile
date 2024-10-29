function Hero() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center gap-3 px-10 text-center leading-3 xl:gap-5 xl:px-40">
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
        Temukan informasi publik terkini dari <br /> Dinas Komunikasi & Digital
        Kabupaten Bone Bolango
      </div>
    </div>
  );
}
export default Hero;
