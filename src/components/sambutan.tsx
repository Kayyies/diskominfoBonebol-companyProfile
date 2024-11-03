import { TitleDoang } from "./title-landingpage";

export const SambutanKadis = () => {
  return (
    <>
      <div className="relative mx-auto mb-10 flex flex-col gap-5 lg:mb-20 lg:w-[1400px] lg:gap-10">
        {/* <TitleDoang title="🧕🏻 Sambutan Kadis" /> */}
        {/* image */}
        <div className="h-[300px] w-full bg-[url(/assets/kadis.png)] bg-cover bg-left lg:h-[500px] lg:rounded-lg lg:bg-center">
          <div className="h-[300px] w-full bg-gradient-to-r from-[#0C1124]/60 from-45% to-[#0C1124]/80 lg:h-[500px]">
            <div className="h-[300px] w-full bg-[url(/assets/gridSambutan.png)] bg-cover bg-center lg:h-[500px]"></div>
          </div>
        </div>
        {/* text */}
        <div className="relative mx-auto flex flex-col gap-10 px-5 leading-loose tracking-wide text-darkPrimary dark:text-white  lg:flex-row lg:px-40">
          {/* text kiri */}
          {/* kadis desktop */}
          <p className="hidden w-full font-light lg:block lg:w-3/12 lg:pt-5">
            <span className="font-bold text-textAccent">
              Misnawaty Wantogia, SE, MM.{" "}
            </span>
            Kepala Dinas Komunikasi dan Digital Kabupaten Bone Bolango {"["}
            2021 - Sekarang{"]"}
          </p>
          {/* kadis mobile */}
          <div className="absolute -top-34">
            <div className="absolute -left-2 top-2 h-24 w-54 bg-textAccent p-2 text-xs leading-5 lg:hidden"></div>
            <div className="absolute w-54 bg-white p-2 text-xs leading-5 dark:bg-darkPrimary lg:hidden">
              <h3 className="font-bold text-textAccent">
                Misnawaty Wantogia, SE., MM.
              </h3>
              <p>Kepala Dinas Komunikasi dan Digital Kabupaten Bone Bolango</p>
              <p>
                {"["}
                2021 - Sekarang{"]"}
              </p>
            </div>
          </div>
          {/* text kanan */}
          <h1 className="w-full text-center text-lg font-light leading-loose tracking-wide lg:w-9/12 lg:text-left lg:text-4xl lg:leading-loose xl:font-extralight">
            Dengan menyebut nama Tuhan yang Maha Esa, saya sebagai{" "}
            <span className="font-bold text-textAccent">Kepala Dinas</span>,
            mewakili jajaran Dinas Komunikasi dan Digital Bone Bolango{" "}
            <span className="font-bold text-textAccent">
              menyambut teman-teman pada halaman resmi kami.
            </span>{" "}
            Semoga segala informasi seputar dinas kami tersampaikan dengan
            tuntas kepada teman-teman 🙏🏻
          </h1>
        </div>
        <div className="rounded-lg border border-darkPrimary/20 dark:border-white/30"></div>
      </div>
    </>
  );
};
