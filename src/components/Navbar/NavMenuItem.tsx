import Image from "next/image";
import Link from "next/link";

export const NavMenuItem = ({ title, desc, href, image }) => {
  return (
    <Link
      href={href}
      className="hover:bg-darkPrimary/20 flex w-[330px] items-start gap-4 rounded-md border-2 border-transparent px-5 py-4 transition-colors duration-75 ease-in-out hover:border-[#38bdf8]"
    >
      <div className="dark:bg-bgIcon flex h-10 w-10 items-center justify-center rounded-md bg-[#1E293B]">
        <Image
          src={`/assets/${image}.png`}
          width={500}
          height={500}
          className="mx-auto my-auto h-auto w-[25px] items-center duration-100 hover:transition-width hover:ease-in-out"
          alt={`image-${title}`}
        />
      </div>
      <div>
        <h6 className="text-darkPrimary font-bold dark:text-white">{title}</h6>
        <p className="line-clamp-1 text-xs text-gray-800 dark:text-gray-300">
          {desc}
        </p>
      </div>
    </Link>
  );
};
