import { TitleFirst, TitleLast } from "../title-landingpage";
import { GoTriangleUp } from "react-icons/go";

const statistikData = [
  {
    id: "1",
    when: "Hari ini",
    number: "240",
    past: "Kemarin",
  },
  {
    id: "2",
    when: "Minggu ini",
    number: "2400",
    past: "Minggu Kemarin",
  },
  {
    id: "3",
    when: "Bulan ini",
    number: "7200",
    past: "Bulan Kemarin",
  },
  {
    id: "4",
    when: "Tahun ini",
    number: "86400",
    past: "Tahun Kemarin",
  },
];

export const StatsPengunjung = () => {
  const datas = statistikData;
  return (
    <>
      {/* background */}
      <div className="container mx-auto flex w-full items-center justify-center rounded-xl border-4 border-textAccent bg-gradient-to-br py-7 dark:from-[#1B074F] dark:via-[#040726] dark:to-[#1B074F] lg:mt-20 lg:h-[550px] lg:w-[1200px] lg:py-0">
        {/* title, divider, stats */}
        <div className="flex flex-col gap-5 px-5 lg:px-0">
          {/* title gang */}
          <TitleLast
            title="📊 statistik"
            descColor="Laporan"
            descNormal="Statistik Kunjungan"
            subdesc="Mulai dari statistik kunjungan perhari hingga pertahun!"
          />
          {/* divider */}
          <div className="border border-gray-300 dark:border-white/10 lg:w-[900px]"></div>
          {/* stats gang */}
          <div className="flex flex-col gap-5 px-5 lg:flex-row lg:gap-15 lg:px-0">
            {datas.map((data) => (
              <div
                className="flex justify-between gap-3 text-darkPrimary dark:text-white lg:flex-col lg:justify-normal"
                key={data.id}
              >
                {/* present */}
                <div className="flex flex-col gap-3">
                  <h2 className="text-sm font-light tracking-wide lg:text-lg">
                    {data.when}
                  </h2>
                  <h1 className="text-3xl font-bold tracking-wide lg:text-5xl">
                    {data.number}
                  </h1>
                </div>
                {/* past */}
                <div className="flex flex-row items-center gap-1 lg:items-start lg:gap-3">
                  <div className="lg:text-md h-auto w-full flex-wrap text-sm tracking-wide lg:w-[100px]">
                    vs {data.past}
                  </div>
                  <div className="lg:text-md flex flex-row items-center text-sm font-bold">
                    17%{" "}
                    <span>
                      <GoTriangleUp />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
