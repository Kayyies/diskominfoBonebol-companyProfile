function Hero() {
  return (
    <div className="container mx-auto px-10 xl:px-40 leading-3 justify-center items-center text-center flex flex-col gap-3 xl:gap-5">
      <p className="text-2xl xl:text-6xl max-w-5xl font-bold xl:pt-16">
        <span className="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-400 text-transparent bg-clip-text">
          Diskominfo
        </span>{" "}
        Bone Bolango Akurat, Informatif, Serta Melayani{" "}
        <span className="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-400 text-transparent bg-clip-text">
          Sepenuh Hati
        </span>
      </p>
      <div className="text-base xl:text-lg">
        Temukan informasi publik terkini dari <br /> Dinas Komunikasi &
        Informatika Kabupaten Bone Bolango
      </div>
    </div>
  );
}
export default Hero;
