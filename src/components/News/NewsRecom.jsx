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
    <div className="flex flex-col gap-7">
      <div className="flex justify-between gap-5">
        {highlightData.map((news, index) => (
          <Link href={news.link} key={index}>
            <div className="w-card bg-base-100 hover:bg-base-300 flex h-full flex-col gap-3 rounded-md  p-5 transition-all hover:text-blue-600">
              <div className="relative h-[230px] rounded-sm">
                <Image
                  src={`/${news.image}`}
                  alt={news.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <h2 className="text-lg font-semibold">{news.title}</h2>
              <p className="line-clamp-2 text-sm text-gray-600">
                {news.content}
              </p>
              <div className="category flex flex-col gap-2 text-sm  text-gray-600">
                <p className="flex items-center gap-2 text-ellipsis">
                  <MdPerson />
                  {news.author}
                </p>
                <p className="flex items-center gap-2 text-ellipsis">
                  <PiTagSimpleFill />
                  {news.category}
                </p>
                <p className="flex items-center gap-2 text-ellipsis">
                  <BsFillCalendarFill />
                  {news.date}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default NewsRecom;
