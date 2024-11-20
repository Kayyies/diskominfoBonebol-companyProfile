//(root)/dokumen/[slug]/page.jsx

"use client";

import { useEffect, useState } from "react";
import JumbotronDetail from "@/components/Jumbotron/JumbotronDetail";
import Spinner from "@/components/Spinner";

export default function DokumenDetailPage({ params }) {
  const { slug } = params;

  const [dokumen, setDokumen] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchDokumen = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(`/api/dokumen/${slug}`);
        if (!response.ok) {
          throw new Error("Failed to fetch document");
        }

        const foundDokumen = await response.json();
        setDokumen(foundDokumen);
      } catch (error) {
        console.error("Failed to fetch dokumen:", error);
        setDokumen(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDokumen();
  }, [slug]);

  return (
    <div className="bg-base-100">
      <JumbotronDetail
        title={dokumen?.title}
        category={dokumen?.category}
        date={dokumen?.createdAt?.split("T")[0]} // Display only the date part
      />

      {isLoading ? (
        <Spinner />
      ) : dokumen ? (
        <div className="container mx-auto px-48 pb-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
              <div className="flex flex-col gap-2">
                {/* PDF Viewer */}
                <div className="h-[450px] w-full overflow-hidden rounded-lg border lg:h-[750px]">
                  <iframe
                    src={dokumen.file} // Dynamically set the PDF file URL
                    width="100%"
                    height="100%"
                    aria-label="PDF Dokumen"
                  >
                    PDF tidak dapat ditampilkan.
                    <a
                      href={dokumen.file}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Klik di sini
                    </a>{" "}
                    untuk mengunduh dokumen.
                  </iframe>
                </div>
              </div>
            </div>
            <div>
              <div className="text-justify leading-8 dark:text-white">
                <p>{dokumen.desc}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center">Dokumen tidak ditemukan.</p>
      )}
    </div>
  );
}
