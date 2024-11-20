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

const pengumuman = [
  {
    id: 1,
    title: "Pengumuman Beasiswa Bone Bolango Cemerlang 2024",
    date: "Selasa, 26 September 2023 Pukul 16:13",
    file: "/pengumuman_beasiswa.pdf",
  },
  {
    id: 2,
    title: "Pengumuman Beasiswa Bank Indonesia 2024",
    date: "Selasa, 26 September 2023 Pukul 16:13",
    file: "/pengumuman_beasiswa.pdf",
  },
  {
    id: 3,
    title: "Aturan penggunaan frekuensi 22.3fm",
    date: "Rabu, 27 September 2023 Pukul 16:13",
    file: "/pengumuman_beasiswa.pdf",
  },
];

export const NewsCard = ({ article }) => {
  // jika image bad request 400
  const image = article.urlToImage
    ? article.urlToImage
    : "https://placehold.jp/150x150.png";

  return (
    <Link
      href={`/berita/${createSlug(article.title)}`}
      className="my-3 rounded-lg border-transparent p-1 transition-all duration-100 ease-in-out md:my-0 md:border-2 md:border-gray-200 md:bg-white/90 md:p-5 md:drop-shadow-sm md:hover:border-textAccent md:dark:border-textAccent/30 md:dark:bg-transparent md:hover:dark:border-textAccent"
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
          <h1 className="text- line-clamp-2 font-bold md:text-lg">
            {article.title}
          </h1>
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
      <div className="flex flex-col gap-3">
        {pengumuman.map((data) => (
          <div
            key={data.id}
            className="flex h-fit w-full flex-col gap-5 rounded-lg border-2 border-gray-200 bg-white p-5 text-darkPrimary drop-shadow-sm transition-all duration-150 ease-in-out dark:border-textAccent/30 dark:bg-transparent dark:text-white/90 hover:dark:border-textAccent"
          >
            {/* title & date */}
            <div className="flex flex-col gap-2">
              <h1 className="text-md line-clamp-2 font-bold tracking-wide ">
                {data.title}
              </h1>
              <p className="text-xs font-light text-gray-500">
                <span>🕛</span> {data.date}
              </p>
            </div>

            {/* download & share */}
            <div className="flex gap-3 text-xs font-bold">
              <a
                href={data.file}
                download
                className="flex items-center gap-2 rounded-lg border-2 border-textAccent/70 p-3 transition-colors duration-100 hover:border-textAccent hover:text-textAccent dark:border-textAccent"
              >
                Unduh Dokumen <IoMdDownload className="text-lg" />
              </a>

              {/* <button className="transition-color rounded-lg border-2 border-textAccent/70 p-3 duration-100 hover:border-textAccent hover:text-textAccent dark:border-textAccent">
                <IoMdShare className="text-lg" />
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export const SelengkapnyaCard = () => {
  return (
    <div className="w-full flex-shrink-0 md:w-[200px]">
      <div className="card flex h-[200px] justify-center gap-3 rounded-full border-2 border-transparent bg-white p-5 transition-all duration-100 ease-in-out hover:border-2 hover:border-[#38BDF8] hover:bg-base-300 hover:text-blue-600 dark:bg-[#01091E] dark:text-white hover:dark:text-blue-600">
        <h2 className="text-md line-clamp-2 flex justify-center font-bold leading-tight">
          Lihat Selengkapnya
        </h2>
      </div>
    </div>
  );
};
