import { PiTagSimpleFill } from "react-icons/pi";
import { BsCalendarDateFill } from "react-icons/bs";
import { MdDownloadForOffline } from "react-icons/md";
import { PublikasiData } from "@/data/PublikasiData";
import Link from "next/link";
import Image from "next/image"; // Import Image component

function PublikasiCard() {
  return (
    <div className="flex flex-wrap ">
      {PublikasiData.map((item, index) => (
        <Link href={item.url} key={index}>
          <div className="card mb-5 mr-3 w-[372px] 3xl:w-[526px] border-2 border-blue-100 bg-base-100 transition-all hover:border-blue-500">
            <figure className="px-5 pt-5">
              <Image
                src={`/${item.image}`} // Add a leading slash to the image path
                alt={item.title}
                width={485}
                height={200}
                className="rounded-xl"
                objectFit="cover"
              />
            </figure>
            <div className="card-body  ">
              <h2 className="card-title">{item.title}</h2>
              <div className="flex flex-col gap-2">
                <button className="text-gray-600 flex flex-row items-center gap-3 text-sm hover:text-cyan-500">
                  <span>
                    <PiTagSimpleFill />
                  </span>
                  {item.category}
                </button>
                <button className="text-gray-600 flex flex-row items-center gap-3 text-sm hover:text-cyan-500">
                  <span>
                    <BsCalendarDateFill />
                  </span>
                  {item.date}
                </button>
                <button className="text-gray-600 flex flex-row items-center gap-3 text-sm hover:text-cyan-500">
                  <span>
                    <MdDownloadForOffline />
                  </span>
                  {item.dowload}
                </button>
              </div>
              <div className="card-actions">
                <button className="btn btn-sm w-full">Unduh</button>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
export default PublikasiCard;
