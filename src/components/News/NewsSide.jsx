import Image from "next/image";

export default function NewsSide() {
  return (
    <div className="w-news2">
      <div className="sticky top-0">
        <h1 className="pt-8 pb-3 font-bold text-lg border-b-2">
          Berita Terpopuler
        </h1>
        <div className="flex gap-3 py-5 border-b-2 items-center">
          <Image src="/beritaImage.png" width={100} height={100} alt="image" />
          <div className="flex flex-col gap-2">
            <h1 className="font-medium text-sm line-clamp-2">
              Merlan Tekankan Nakes Bone Bolango Harus Punya Jiwa Empati Layani
              Warga
            </h1>
            <div className="flex items-center gap-5">
              <a
                href="/"
                className="btn btn-primary btn-xs text-xs font-normal"
              >
                Bupati
              </a>
              <div> - </div>
              <p className="text-gray-400 text-xs">20 Februari 2024</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
