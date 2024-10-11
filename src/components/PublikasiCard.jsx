import { PiTagSimpleFill } from "react-icons/pi";
import { BsCalendarDateFill } from "react-icons/bs";
import { MdDownloadForOffline } from "react-icons/md";
import Link from "next/link";
import Image from "next/image"; // Import Image component

function PublikasiCard({ publikasi }) {
    return (
        <Link href={`/dokumen/${publikasi.slug}`}>
            <div className="card md:h-full bg-base-100 shadow rounded-lg border-2 border-transparent hover:border-[38BDF8] transition-all">
                <div className="flex flex-row md:flex-col">
                    <figure className="w-fit md:w-full px-2 py-2 md:px-5 md:py-5">
                        <Image
                            src={`/${publikasi.thumbnail}`} // Add a leading slash to the image path
                            alt={publikasi.title}
                            width={150}
                            height={150}
                            className="rounded-lg w-full h-full aspect-square md:aspect-4/3 object-cover"
                        />
                    </figure>
                    <div className="w-full card-body px-2 pt-2 pb-2 md:px-5 md:pt-0 md:pb-5">
                        <h2 className="card-title text-base md:text-lg line-clamp-1">{publikasi.title}</h2>
                        <div className="flex flex-col md:flex-row md:justify-between gap-2">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                                <span className="text-xs">📎{publikasi.category}</span>
                                <span className="text-xs">🗓️{publikasi.date}</span>
                            </div>
                            <span className="text-xs">⬇️{publikasi.download}</span>
                        </div>
                        <div className="card-actions md:mt-4">
                            <button className="btn btn-sm w-full">Unduh</button>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
export default PublikasiCard;
