import Image from "next/image";
import Link from "next/link";
import NewsTag from "./NewsTag";
import { IoMdDownload, IoMdShare } from "react-icons/io";

const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/gi, "") // Menghapus karakter khusus
    .replace(/\s+/g, "-"); // Mengganti spasi dengan tanda "-"
};

export const NewsCard = ({ article }) => {
  // jika image bad request 400
  const image = article.urlToImage
    ? article.urlToImage
    : "https://placehold.jp/150x150.png";

  return (
    <Link
      href={`/berita/${createSlug(article.title)}`}
      className="rounded-lg border-2 border-gray-200 bg-white/90 p-5 drop-shadow-sm transition-all duration-100 ease-in-out hover:border-textAccent dark:border-textAccent/30 dark:bg-transparent hover:dark:border-textAccent"
    >
      <div className="flex items-start gap-4">
        <div className="w-fit">
          <Image
            src={image} // default image jika tidak ada
            width={150}
            height={150}
            alt={article.title}
            className="aspect-square rounded object-cover"
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <h1 className="line-clamp-2 text-lg font-bold">{article.title}</h1>
          <p className="line-clamp-2 hidden text-xs lg:line-clamp-1 lg:block">
            {article.description}
          </p>
          <NewsTag
            author={article.author}
            category={article.source.name}
            date={article.publishedAt}
          />
        </div>
      </div>
    </Link>
  );
};

export const PengumumanCard = () => {
  return (
    <>
      <div>
        <div className="flex h-fit w-full flex-col gap-5 rounded-lg border-2 border-gray-200 bg-white p-5 text-darkPrimary drop-shadow-sm transition-all duration-150 ease-in-out dark:border-textAccent/30 dark:bg-transparent dark:text-white/90 hover:dark:border-textAccent">
          {/* title & date */}
          <div className="flex flex-col gap-2">
            <h1 className="text-md line-clamp-2 font-bold tracking-wide ">
              Pengumuman Beasiswa Bone Bolango Cemerlang 2024
            </h1>
            <p className="text-xs font-light text-gray-500">
              🕛 Selasa, 26 September 2023 Pukul 16:13
            </p>
          </div>
          {/* donwload & share */}
          <div className="flex gap-3 text-xs font-bold">
            <button className="flex items-center gap-2 rounded-lg border-2 border-textAccent/70 p-3 transition-colors duration-100 hover:border-textAccent hover:text-textAccent dark:border-textAccent">
              Unduh Dokumen <IoMdDownload className="text-lg" />
            </button>
            <button className="transition-color rounded-lg border-2 border-textAccent/70 p-3 duration-100 hover:border-textAccent hover:text-textAccent dark:border-textAccent">
              <IoMdShare className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
