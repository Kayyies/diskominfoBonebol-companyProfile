import Image from "next/image";
import Link from "next/link";
import NewsTag from "./NewsTag";

const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/gi, "") // Menghapus karakter khusus
    .replace(/\s+/g, "-"); // Mengganti spasi dengan tanda "-"
};

export default function NewsCard({ article }) {
  // jika image bad request 400
  const image = article.urlToImage
    ? article.urlToImage
    : "https://placehold.jp/150x150.png";

  return (
    <Link
      href={`/berita/${createSlug(article.title)}`}
      className="rounded border border-transparent p-5 transition-all hover:border-[38BDF8]"
    >
      <div className="flex items-start gap-4">
        <div className="w-fit">
          <Image
            src={image} // default image jika tidak ada
            width={500}
            height={500}
            alt={article.title}
            className="aspect-square rounded object-cover"
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <h1 className="text-darkPrimary line-clamp-2 text-lg font-bold dark:text-white">
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
}
