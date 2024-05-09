import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { LayKamData } from "@/data/LayKamData";

export default function CardLayanan() {
  return (
    <div className="container mx-auto px-40 flex flex-wrap justify-center 2xl:justify-start gap-5">
      {LayKamData.map((item, i) => (
        <Link key={i} href={`/layanan/${item.id}`} passHref>
          <div className="card w-80 xl:w-card border-transparent border-2 bg-white shadow-md mb-4 md:mb-2 hover:shadow-md hover:border-2 hover:transition-all hover:duration-75 hover:border-blue-500 ">
            <div className="card-body">
              <Image
                src={item.logo}
                height={50}
                alt="logo"
                className="rounded-xl"
              />
              <h2 className="card-title font-bold ">{item.title}</h2>
              <p className="line-clamp-2 text-sm">{item.desc}</p>
              <div className="card-actions justify-between items-center py-1 pr-3 rounded hover:bg-blue-100 hover:transition-all hover:duration-75">
                <button href="/">Baca Selengkapnya</button>
                <FaArrowRight />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
