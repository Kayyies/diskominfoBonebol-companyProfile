import newsData from "@/data/newsData";
import Link from "next/link";
import Image from "next/image";

//assets
import { MdPerson } from "react-icons/md";
import { PiTagSimpleFill } from "react-icons/pi";
import { BsFillCalendarFill } from "react-icons/bs";

function NewsRecom() {
  const highlightData = newsData.slice(0, 3);
  return (
    <div className="container mx-auto flex flex-row justify-center gap-3">
      {highlightData.map((news, index) => (
        <Link href={news.link} key={index}>
          <div className="flex h-full w-card flex-col gap-3 rounded-md border-2 border-transparent bg-base-100 p-5 transition-all hover:border-2 hover:border-[#38BDF8] hover:bg-base-300 hover:text-blue-600 dark:text-white hover:dark:text-blue-600">
            <div className="relative h-[230px] rounded-sm">
              <Image
                src={`/${news.image}`}
                alt={news.title}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-md"
              />
            </div>
            <h2 className="text-lg font-semibold">{news.title}</h2>
            <div className="category flex flex-col gap-x-5 gap-y-2 text-sm  text-gray-600">
              <p className="flex items-center gap-2 text-ellipsis">
                🧑🏻‍🦱
                {news.author}
              </p>
              <p className="flex items-center gap-2 text-ellipsis">
                📌
                {news.category}
              </p>
              <p className="flex items-center gap-2 text-ellipsis">
                📅
                {news.date}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
export default NewsRecom;
