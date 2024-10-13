"use client";
import Image from "next/image";

export const TugasKami = ({ title, subtitle, image }) => {
  const disableRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };
  return (
    <div className="dark:text-white">
      <div className="group relative h-[369px] w-[360px] rounded-lg border bg-white shadow-white/10 drop-shadow-md transition-all duration-200 hover:border-[#28A6E0] dark:border dark:border-[#1B2132] dark:bg-gradient-to-b dark:from-[#0d1226] dark:from-60% dark:to-[#131b39] dark:shadow-inner hover:dark:border-[#28A6E0]">
        {/* text */}
        <div className="relative z-10 px-10 py-15">
          <p className="text-base">{title}</p>
          <h2 className="text-2xl font-bold">{subtitle}</h2>
        </div>

        {/* image */}
        <Image
          src={image}
          width={100}
          height={100}
          alt="gambar"
          className="absolute bottom-0 left-0 z-1 h-auto w-full object-contain"
          onContextMenu={disableRightClick}
        />
        <Image
          src={"/tugas-grid.png"}
          width={500}
          height={500}
          alt="gambar"
          className="w- absolute bottom-0 left-0 z-0 h-auto object-contain"
          onContextMenu={disableRightClick}
        />
      </div>
    </div>
  );
};
export const TugasKamiAlter = ({ title, subtitle, image }) => {
  const disableRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };
  return (
    <div className="container mx-auto dark:text-white xl:px-40 3xl:px-[400px]">
      <div className="group relative h-[369px] w-[360px] rounded-lg border border-[#1B2132] shadow-inner shadow-white/10 transition-all duration-200 dark:bg-gradient-to-b dark:from-[#0d1226] dark:from-60% dark:to-[#131b39] hover:dark:border-[#28A6E0] ">
        {/* text */}
        <div className="relative z-10 px-10 py-15">
          <p className="text-base">{title}</p>
          <h2 className="text-2xl font-bold">{subtitle}</h2>
        </div>

        {/* image */}
        <Image
          src={image}
          width={100}
          height={100}
          alt="gambar"
          className="absolute bottom-0 left-0 z-1 h-auto w-full object-contain"
          onContextMenu={disableRightClick}
        />
        <Image
          src={"/tugas-grid.png"}
          width={500}
          height={500}
          alt="gambar"
          className="w- absolute bottom-0 left-0 z-0 h-auto object-contain"
          onContextMenu={disableRightClick}
        />
      </div>
    </div>
  );
};
