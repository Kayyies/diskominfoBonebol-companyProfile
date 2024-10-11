import Link from "next/link";
import { usePathname } from "next/navigation";

function JumbotronDetail({ title, author, category, date }) {
    let pathName = usePathname();
    pathName = pathName.split("/").slice(0, -1).join("");

    const dateFormat = new Date(date);
    date = dateFormat.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    return (
        <div>
            <div
                className="py-10 w-full h-[380px] xl:h-[480px]"
                style={{
                    backgroundImage: "url(/assets/dividerBgDetail.png)",
                    backgroundPosition: "center top",
                    backgroundSize: "cover",
                }}
            >
                <div className="mt-10 xl:mt-16 container mx-auto px-6 lg:px-30 2xl:px-48">
                    <Link href={`/${pathName}`} className="inline-flex items-center gap-2 mb-2 xl:mb-4 text-xs xl:text-sm text-gray-400 hover:text-[38BDF8] transition-all">
                        <span className="text-base xl:text-xl pb-0.5">&lsaquo;</span>
                        <span>Kembali</span>
                    </Link>
                    <div className="flex flex-col gap-5">
                        <h1 className="text-2xl md:text-3xl xl:text-5xl leading-tight font-bold text-[0C1124]">
                            {title}
                        </h1>
                        <div className="flex flex-col gap-2">
                            {
                                pathName === "berita" ? <span className="text-xs xl:text-base">✏️ {author}</span> : <span className="text-xs xl:text-base">🏷️ {category}</span>
                            }
                            <span className="text-xs xl:text-base">🗓️ {date}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JumbotronDetail;
