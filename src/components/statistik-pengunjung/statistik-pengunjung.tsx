import { StatsItem } from "./statistik-item";

export const StatsPengunjung = () => {
  return (
    <>
      {/* background */}
      <div className="border-textAccent mx-auto mt-20 flex h-[550px] w-[1200px] items-center justify-center rounded-xl border-4 bg-gradient-to-br dark:from-[#1B074F] dark:via-[#040726] dark:to-[#1B074F]">
        {/* title, divider, stats */}
        <div className="flex flex-col gap-10">
          {/* title gang */}
          <div className="flex flex-col items-center gap-5">
            {/* preTitle */}
            <div className="text-darkPrimary dark:via-darkPrimary inline-block max-w-fit rounded-xl border border-[0C62F7] px-4 py-2 text-sm font-semibold dark:border-none dark:bg-gradient-to-b dark:from-[#283877] dark:to-[#283877] dark:text-white">
              📊 statistik
            </div>
            {/* Title */}
            <h1 className="text-5xl font-bold text-[#38bdf8]">
              <span className="text-darkPrimary dark:text-white">Laporan </span>
              Statistik Kunjungan
            </h1>
            {/* Desc */}
            <p className="text-darkPrimary text-lg font-light dark:text-white">
              Mulai dari statistik kunjungan perhari hingga pertahun!
            </p>
          </div>
          {/* divider */}
          <div className="w-[900px] border border-gray-300 dark:border-white/10"></div>
          {/* stats gang */}
          <div className="flex flex-row gap-15 text-white">
            {/* hari ini */}
            <StatsItem when="Hari ini" number="240" past="Kemarin" />
            {/* Minggu ini */}
            <StatsItem when="Minggu ini" number="2400" past="Minggu Kemarin" />
            {/* Bulan ini */}
            <StatsItem when="Bulan ini" number="7200" past="Bulan Kemarin" />
            {/* Tahun ini */}
            <StatsItem when="Tahun ini" number="86400" past="Tahun Kemarin" />
          </div>
        </div>
      </div>
    </>
  );
};
