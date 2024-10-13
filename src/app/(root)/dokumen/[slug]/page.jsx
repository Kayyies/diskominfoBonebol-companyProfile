"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PublikasiData } from "@/data/PublikasiData";
import JumbotronDetail from "@/components/Jumbotron/JumbotronDetail";
import Spinner from "@/components/Spinner";

export default function DokumenDetailPage({ params }) {
  const { slug } = params;

  const [dokumen, setDokumen] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(null); // Gambar utama
  const [currentIndex, setCurrentIndex] = useState(0); // Index untuk slider gambar kecil
  const [isTransitioning, setIsTransitioning] = useState(false); // Untuk transisi gambar utama
  const imagesPerSlide = 4; // Jumlah gambar kecil dalam satu slide

  useEffect(() => {
    if (!slug) return;

    const fetchDokumen = async () => {
      setIsLoading(true);

      try {
        const data = PublikasiData;

        const foundDokumen = data.find((dokumen) => dokumen.slug === slug);

        if (foundDokumen) {
          setDokumen(foundDokumen);
          setCurrentImage(foundDokumen.thumbnail); // Set gambar utama ke thumbnail awal
        } else {
          console.error("Dokumen not found");
          setDokumen(null);
        }
      } catch (error) {
        console.error("Failed to fetch dokumen:", error);
        setDokumen(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDokumen();
  }, [slug]);

  const handleImageClick = (image) => {
    setIsTransitioning(true); // Set transisi aktif
    setTimeout(() => {
      setCurrentImage(image); // Ubah gambar utama
      setIsTransitioning(false); // Matikan transisi
    }, 300); // Durasi transisi 300ms
  };

  const nextSlide = () => {
    if (currentIndex + imagesPerSlide < dokumen.images.length) {
      setCurrentIndex(currentIndex + imagesPerSlide); // Geser slide berikutnya
    }
  };

  const prevSlide = () => {
    if (currentIndex - imagesPerSlide >= 0) {
      setCurrentIndex(currentIndex - imagesPerSlide); // Geser slide sebelumnya
    }
  };

  return (
    <div className="bg-base-100">
      <JumbotronDetail
        title={dokumen?.title}
        category={dokumen?.category}
        date={dokumen?.date}
      />

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-6 pb-12 lg:px-30 2xl:px-48">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
              <div className="flex flex-col gap-2">
                {/* Gambar utama dengan transisi */}
                <div
                  className={`transition-opacity duration-300 ${
                    isTransitioning ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <Image
                    src={`/${currentImage || dokumen?.thumbnail}`}
                    alt={dokumen?.title}
                    width={500}
                    height={500}
                    className="w-full"
                  />
                </div>

                {/* Slider gambar kecil */}
                <div className="relative mt-2 flex items-center justify-between">
                  {/* Tombol sebelumnya */}
                  <button
                    onClick={prevSlide}
                    className="btn btn-sm absolute start-0 z-10 rounded-full border-0 bg-white shadow hover:bg-white hover:shadow-lg disabled:bg-white disabled:bg-opacity-50"
                    disabled={currentIndex === 0}
                  >
                    &lt;
                  </button>

                  {/* Gambar kecil dengan transisi */}
                  <div className="grid w-full grid-cols-4 gap-2 overflow-hidden transition-transform duration-300 ease-in-out">
                    {dokumen?.images
                      ?.slice(currentIndex, currentIndex + imagesPerSlide)
                      ?.map((image, index) => (
                        <div
                          key={index}
                          className="cursor-pointer"
                          onClick={() => handleImageClick(image)}
                        >
                          <Image
                            src={`/${image}`}
                            alt={`${index} - ${dokumen?.title}`}
                            width={100}
                            height={100}
                            className="h-full w-full object-cover transition-opacity duration-300 hover:opacity-75"
                          />
                        </div>
                      ))}
                  </div>

                  {/* Tombol berikutnya */}
                  <button
                    onClick={nextSlide}
                    className="btn btn-sm absolute end-0 z-10 rounded-full border-0 bg-white shadow hover:bg-white hover:shadow-lg disabled:bg-white disabled:bg-opacity-50"
                    disabled={
                      currentIndex + imagesPerSlide >= dokumen?.images.length
                    }
                  >
                    &gt;
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div className="text-justify leading-8 dark:text-white">
                <p>
                  Banyak orang mungkin berpikir bahwa skripsi yang sulit menjadi
                  penyebab utama mahasiswa memilih untuk drop out dari perguruan
                  tinggi. Namun, kenyataannya lebih kompleks dari itu.
                </p>
                <br />
                <p>
                  Berdasarkan data, terdapat 602.208 mahasiswa di Indonesia yang
                  memutuskan untuk berhenti kuliah dari total 8.483.213
                  mahasiswa yang terdaftar. Menariknya, perguruan tinggi swasta
                  (PTS) menjadi tempat di mana fenomena ini paling sering
                  terjadi. Pada tahun 2020, tercatat sebanyak 478.826 mahasiswa
                  atau 79,5% dari total kasus drop out berasal dari PTS.
                  Sementara itu, 101.758 orang berasal dari perguruan tinggi
                  negeri (PTN), 18.284 orang dari perguruan tinggi agama (PTA),
                  dan sisanya 3.395 orang dari perguruan tinggi kedinasan (PTK).
                </p>
                <br />
                <p>
                  Ketika dilihat berdasarkan jurusan, kelompok bidang ilmu
                  ekonomi menjadi penyumbang terbesar angka putus sekolah,
                  diikuti oleh jurusan teknik yang menempati posisi kedua.
                  Namun, hal ini bukan berarti minat masyarakat untuk
                  melanjutkan pendidikan menurun. Sebagai contoh, di Jawa Barat,
                  terjadi peningkatan yang signifikan dalam jumlah penduduk yang
                  lulus SMA. Pada tahun 2019, tercatat ada 4.089.775 lulusan
                  SMA, dan angka ini meningkat drastis menjadi 10.591.465 pada
                  tahun 2022.
                </p>
                <br />
                <p>
                  Namun, kembali pada isu drop out, ada beberapa alasan konkret
                  mengapa mahasiswa memilih untuk meninggalkan bangku kuliah. Di
                  antara alasan tersebut termasuk melebihi batas waktu studi
                  yang telah ditentukan, tidak lulus dalam mata kuliah wajib,
                  tidak memenuhi jumlah SKS minimum, melakukan pelanggaran berat
                  atau kriminal, dan tentu saja, kesulitan dalam menyelesaikan
                  tugas akhir atau skripsi.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
