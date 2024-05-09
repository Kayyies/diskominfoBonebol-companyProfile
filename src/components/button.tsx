import Link from "next/link";

export const Button = () => {
  return (
    <>
      <Link
        href="#"
        className="mb-3 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-center text-xs font-medium text-white shadow-2 drop-shadow-2 hover:bg-opacity-90"
      >
        Tambah Data
      </Link>
    </>
  );
};
