import Jumbotron from "@/components/Jumbotron/Jumbotron";
import beritaVector from "../../../../public/profil.svg";
import NewsSide from "@/components/News/NewsSide";
import Image from "next/image";
import style from "./slug.module.css";
import NewsRecom from "@/components/News/NewsRecom";

function Page() {
  return (
    <div className="container mx-auto px-48">
      <div className="flex flex-col justify-center my-10">
        <div className="">
          <div>
            <div className="text-sm breadcrumbs">
              <ul>
                <li>
                  <a>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="w-4 h-4 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                      ></path>
                    </svg>
                    Diskominfo Bonebol
                  </a>
                </li>
                <li>
                  <a>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="w-4 h-4 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                      ></path>
                    </svg>
                    Seputar Diskominfo
                  </a>
                </li>
                <li>
                  <span className="inline-flex gap-2 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="w-4 h-4 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                    Ini Langkah Pemkab Bone Bolango Tekan Harga Beras yang
                    Meroket Naik
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col px-48 gap-3 my-5">
            <button className="mx-auto justify-center btn btn-xs btn-active bg-transparent w-20">
              Bupati
            </button>
            <h1 className="text-center text-4xl font-bold leading-[3rem]">
              Ini Langkah Pemkab Bone Bolango Tekan Harga Beras yang Meroket
              Naik
            </h1>
            <p className="text-center text-sm text-gray-500">
              Azwar Botak - 22 Januari 2024
            </p>
          </div>
          <div className={style.imgContainer}>
            <Image
              src="/slug.jpg"
              alt="berita"
              fill
              style={{
                objectFit: "cover",
              }}
            />
          </div>
          <div className="mt-10 px-48 ">
            PORTALJABAR, KAB. GARUT - Penjabat (Pj) Bupati Garut, Barnas
            Adjidin, secara langsung memeriksa ketersediaan beras di Gudang
            Bulog, Jalan Cimanuk, Kecamatan Tarogong Kidul, Kabupaten Garut
            (5/3/2024). Barnas menyatakan ketersediaan pangan di Kabupaten Garut
            dipastikan aman hingga pascalebaran. Ia menyebut tidak ada
          </div>
        </div>
      </div>
      <h1 className="text-3xl font-semibold">Berita Terbaru</h1>
      <NewsRecom />
    </div>
  );
}
export default Page;
