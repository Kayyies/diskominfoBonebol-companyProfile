import Image from "next/image";
import Link from "next/link";
import NewsTag from "./NewsTag";
import { IoMdDownload, IoMdShare } from "react-icons/io";
import pengumumanData from "@/data/pengumumanData";
import DOMPurify from "dompurify"; // Import DOMPurify for sanitization

// Fungsi untuk membatasi teks
function limitText(html, maxLength) {
  // Buang tag HTML dan dapatkan teks murni
  const plainText = DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });

  // Potong teks jika melebihi panjang maksimal
  const truncatedText =
    plainText.length > maxLength
      ? `${plainText.slice(0, maxLength).trim()}...`
      : plainText;

  return truncatedText;
}

export const NewsCard = ({ article }) => {
  // Ensure you have a fallback image if none is available
  const image = article.image
    ? article.image
    : "https://placehold.jp/150x150.png";

  // Sanitize content to prevent XSS attacks
  const sanitizedContent = DOMPurify.sanitize(article.content);

  // Batasi teks konten dengan panjang maksimal
  const limitedContent = limitText(sanitizedContent, 150); // Batas panjang 150 karakter

  return (
    <Link
      href={`/berita/hoax/${article.slug}`}
      className="my-3 h-fit rounded-lg border-transparent p-1 transition-all duration-100 ease-in-out md:my-0 md:border-2 md:border-gray-200 md:bg-white/90 md:p-5 md:drop-shadow-sm md:hover:border-textAccent md:dark:border-textAccent/30 md:dark:bg-transparent md:hover:dark:border-textAccent"
    >
      <div className="flex items-start gap-4">
        <div className="w-fit">
          <Image
            src={image} // default image if none exists
            width={150}
            height={150}
            alt={article.image}
            className="aspect-square rounded object-cover"
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <h1 className="text- line-clamp-2 font-bold md:text-lg">
            {article.title}
          </h1>

          {/* Gunakan dangerouslySetInnerHTML dengan teks yang dibatasi */}
          <p
            className="line-clamp-2 hidden text-xs lg:line-clamp-1 lg:block"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(limitedContent),
            }}
          />
          <NewsTag
            author={"Admin Diskominfo"}
            category={article.category}
            date={article.createdAt}
          />
        </div>
      </div>
    </Link>
  );
};

export const ListPengumumanCard = () => {
  return (
    <>
      {pengumumanData
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 6)
        .map((pengumuman) => (
          <PengumumanCard key={pengumuman.id} pengumuman={pengumuman} />
        ))}
    </>
  );
};

export const PengumumanCard = ({ pengumuman }) => {
  const formattedDate = new Date(pengumuman.date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <Link
        key={pengumuman.id}
        href={`/berita/pengumuman/${pengumuman.slug}`}
        className="flex flex-col gap-3 hover:cursor-pointer"
      >
        <div className="flex h-fit w-full flex-col gap-5 rounded-lg border-2 bg-white p-5 text-darkPrimary drop-shadow-sm  transition-all duration-150 ease-in-out hover:border-textAccent dark:border-textAccent/30 dark:bg-transparent dark:text-white/90 hover:dark:border-textAccent">
          {/* title & date */}
          <div className="flex flex-col gap-2">
            <h1 className="text-md line-clamp-2 font-bold tracking-wide ">
              {pengumuman.title ?? "-"}
            </h1>
            <div className="flex flex-row gap-2">
              <p className="text-xs font-light text-gray-500">
                <span>🕛</span> {formattedDate ?? "-"}
              </p>
              <p className="text-xs font-light text-gray-500">
                <span>🏷️</span> {pengumuman.category ?? "-"}
              </p>
            </div>
          </div>

          {/* download & share */}
          <div className="flex gap-3 text-xs font-bold">
            <Link
              href={pengumuman.file ?? "-"}
              download
              className="flex items-center gap-2 rounded-lg border-2 border-textAccent/70 p-3 transition-colors duration-100 hover:border-textAccent hover:text-textAccent dark:border-textAccent"
            >
              Unduh Dokumen <IoMdDownload className="text-lg" />
            </Link>

            {/* <button className="transition-color rounded-lg border-2 border-textAccent/70 p-3 duration-100 hover:border-textAccent hover:text-textAccent dark:border-textAccent">
                <IoMdShare className="text-lg" />
              </button> */}
          </div>
        </div>
      </Link>
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
