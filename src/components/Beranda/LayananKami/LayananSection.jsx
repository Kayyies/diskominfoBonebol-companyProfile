import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { LayKamData } from "@/data/LayKamData";

const LayananSection = () => {
  return (
    <div className="container mx-auto ">
      <div
        className="
          flex flex-wrap justify-center gap-5 bg-[url('/mesh-for-layananLight.png')] bg-contain
          bg-cover bg-left-bottom bg-no-repeat px-40 dark:bg-[url('/mesh-for-layananDark.png')] 2xl:justify-start
        "
      >
        {LayKamData.map((item, i) => (
          <Link key={i} href={`/layanan/${item.id}`} passHref>
            <div className="dark:bg-darkSecondary dark:text-darkAccent group card mb-4 w-80 border-2 border-transparent bg-white shadow-md hover:border-blue-500 hover:shadow-md hover:transition-all hover:duration-75 md:mb-2 xl:w-card">
              <div className="card-body flex flex-col gap-5">
                {/* Image */}
                <div className="overflow-hidden rounded-xl">
                  <Image
                    src={item.logo}
                    height={50}
                    alt="logo"
                    className="rounded-xl transition-transform duration-200 group-hover:scale-110"
                  />
                </div>

                {/* Title */}
                <h2 className="card-title font-bold text-black transition-colors duration-200 group-hover:text-[#38BDF8] dark:text-white">
                  {item.title}
                </h2>
                <p className="line-clamp-6 text-sm">{item.desc}</p>
                <div className="card-actions items-center justify-between rounded py-1 pr-3 transition-colors duration-200 group-hover:text-[#38BDF8] ">
                  <button>Buka Halaman</button>
                  <FaArrowRight />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LayananSection;
