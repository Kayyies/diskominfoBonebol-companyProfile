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
              className="aspect-square h-full w-full rounded-lg object-cover md:aspect-4/3"
            />
          </figure>
          <div className="card-body w-full px-2 pb-2 pt-2 md:px-5 md:pb-5 md:pt-0">
            <h2 className="card-title line-clamp-1 text-base md:text-lg">
              {publikasi.title}
            </h2>
            <div className="flex flex-col gap-2 md:flex-row md:justify-between">
              <div className="flex flex-col items-start gap-2 md:flex-row md:items-center">
                <span className="text-xs">📎{publikasi.category}</span>
                <span className="text-xs">🗓️{publikasi.date}</span>
              </div>
              <span className="text-xs">⬇️{publikasi.download}</span>
            </div>
            <div className="card-actions md:mt-4">
              <button className="text-darkPrimary dark:via-darkPrimary ark:border-none w-full rounded-lg border border-[0C62F7] py-2 text-xs dark:border-none dark:bg-gradient-to-b dark:from-[#283877] dark:to-[#283877] dark:text-white">
                Unduh
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
export default PublikasiCard;
