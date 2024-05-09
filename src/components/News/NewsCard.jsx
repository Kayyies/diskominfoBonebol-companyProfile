import Image from "next/image";
import newsData from "@/data/newsData";
import Link from "next/link";
import NewsTag from "./NewsTag";

export default function NewsCard(params) {
  return (
    <div className="">
      {newsData.map((news) => (
        <Link
          href={news.link}
          key={news.id}
          className="mx-5 mt-5 flex flex-col gap-4 border-2 px-5 py-5 transition-all hover:bg-base-200 hover:text-blue-500 md:border-0"
        >
          <div className="items-center gap-8 sm:flex">
            <Image
              src={`/${news.image}`}
              width={150}
              height={150}
              alt={news.title}
              className="items-center"
            />
            <div className="flex flex-col gap-2">
              <h1 className="line-clamp-2s text-lg font-bold">{news.title}</h1>
              <p className=" line-clamp-2 text-xs lg:line-clamp-1">
                {news.content}
              </p>
              <NewsTag
                author={news.author}
                category={news.category}
                date={news.date}
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
