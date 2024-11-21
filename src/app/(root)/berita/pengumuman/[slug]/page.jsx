"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import JumbotronDetail from "@/components/Jumbotron/JumbotronDetail";
import Spinner from "@/components/Spinner";
import pengumumanData from "@/data/pengumumanData";

export default function PengumumanDetailPage({ params }) {
    const { slug } = params;

    const [pengumuman, setPengumuman] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!slug) return; // Tunggu sampai slug tersedia

        const fetchPengumuman = async () => {
            setIsLoading(true);

            try {
                const foundPengumuman = pengumumanData.find(
                    (pengumuman) => pengumuman.slug === slug
                );
                if (foundPengumuman) {
                    setPengumuman(foundPengumuman);
                } else {
                    console.error("Pengumuman not found");
                    setPengumuman(null);
                }
            } catch (error) {
                console.error("Failed to fetch pengumuman:", error);
                setPengumuman(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPengumuman();
    }, [slug]);

    return (
        <div className="bg-base-100">
            <JumbotronDetail
                title={pengumuman?.title}
                category={pengumuman?.category}
                date={pengumuman?.date?.split("T")[0]} // Display only the date part
            />

            {isLoading ? (
                <Spinner />
            ) : pengumuman ? (
                <div className="container mx-auto px-48 pb-12">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                        <div>
                            <div className="flex flex-col gap-2">
                                {/* PDF Viewer */}
                                <div className="h-[450px] w-full overflow-hidden rounded-lg border lg:h-[750px]">
                                    <iframe
                                        src={pengumuman.file} // Dynamically set the PDF file URL
                                        width="100%"
                                        height="100%"
                                        aria-label="PDF Pengumuman"
                                    >
                                        PDF tidak dapat ditampilkan.
                                        <a
                                            href={pengumuman.file}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Klik di sini
                                        </a>{" "}
                                        untuk mengunduh pengumuman.
                                    </iframe>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="text-justify leading-8 dark:text-white">
                                <p>{pengumuman.description}</p>
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
