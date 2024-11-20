import Link from "next/link";
import { usePathname } from "next/navigation";

function JumbotronDetail({ title, author, category, date }) {
  let pathName = usePathname();
  const pathArray = pathName.split("/");
  pathName = pathArray.slice(1, pathArray.length - 1).join("/");

  const dateFormat = new Date(date);
  date = dateFormat.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <div>
      <div className="h-[380px] w-full bg-[url(/slugDivider.png)] bg-cover bg-top py-10 dark:text-white xl:h-[480px]">
        <div className="container mx-auto mt-10 px-6 lg:px-30 xl:mt-16 2xl:px-48">
          <Link
            href={`/${pathName}`}
            className="mb-2 inline-flex items-center gap-2 text-xs text-gray-400 transition-all hover:text-[38BDF8] xl:mb-4 xl:text-sm"
          >
            <span className="pb-0.5 text-base xl:text-xl">&lsaquo;</span>
            <span>Kembali</span>
          </Link>
          <div className="flex flex-col gap-5">
            <h1 className="text-2xl font-bold leading-tight text-[0C1124] dark:text-white md:text-3xl xl:text-5xl">
              {title}
            </h1>
            <div className="flex flex-col gap-2">
              {pathName === "berita" ? (
                <span className="text-xs xl:text-base">✏️ {author}</span>
              ) : (
                <span className="text-xs xl:text-base">🏷️ {category}</span>
              )}
              <span className="text-xs xl:text-base">🗓️ {date}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JumbotronDetail;
