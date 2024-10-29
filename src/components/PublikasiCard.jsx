import { PiTagSimpleFill } from "react-icons/pi";
import { BsCalendarDateFill } from "react-icons/bs";
import { MdDownloadForOffline } from "react-icons/md";
import Link from "next/link";
import Image from "next/image"; // Import Image component

function PublikasiCard({ publikasi }) {
  return (
    <Link href={`/dokumen/${publikasi.slug}`}>
      <div className="card rounded-lg border-2 border-transparent bg-base-100 shadow transition-all hover:border-[38BDF8] dark:bg-[#01091E] md:h-full">
        <div className="flex flex-row md:flex-col">
          <figure className="w-fit px-2 py-2 md:w-full md:px-5 md:py-5">
            <Image
              src={`/${publikasi.thumbnail}`} // Add a leading slash to the image path
              alt={publikasi.title}
              width={150}
              height={150}
              className="aspect-square h-full w-full rounded-lg object-contain md:aspect-[1/1]"
            />
          </figure>
          <div className="grid grid-cols-1 gap-3 px-2 pb-2 pt-2 md:px-5 md:pb-5 md:pt-0">
            <div className="grid grid-cols-1 gap-1">
              <h3 className="line-clamp-1 text-xs font-bold text-gray-400">
                {publikasi.category}
              </h3>
              <h1 className="md:text-md card-title line-clamp-2 text-base md:font-bold">
                {publikasi.title}
              </h1>
            </div>

            <div className="flex flex-wrap items-start gap-2 gap-y-1 md:flex-row md:items-center">
              <span className="text-xs">📎{publikasi.category}</span>
              <span className="text-xs">🗓️{publikasi.date}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
export default PublikasiCard;
