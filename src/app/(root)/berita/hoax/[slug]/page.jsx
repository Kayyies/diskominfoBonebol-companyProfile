"use client";

import { useEffect, useState } from "react";
import JumbotronDetail from "@/components/Jumbotron/JumbotronDetail";
import Spinner from "@/components/Spinner";
import Image from "next/image";

export default function BeritaHoaxDetailPage({ params }) {
  const { slug } = params;

  const [beritaHoax, setBeritaHoax] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchBeritaHoax = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(`/api/beritahoax/${slug}`);
        if (!response.ok) {
          throw new Error("Failed to fetch berita hoax");
        }

        const foundBeritaHoax = await response.json();
        setBeritaHoax(foundBeritaHoax);
      } catch (error) {
        console.error("Failed to fetch berita hoax:", error);
        setBeritaHoax(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBeritaHoax();
  }, [slug]);

  // Sanitize HTML content to prevent XSS attacks
  const getSanitizedContent = (html) => {
    // Replace empty <p></p> tags with <br />
    const modifiedContent = html.replace(/<p><\/p>/g, "<br />");
    return DOMPurify.sanitize(modifiedContent); // Clean the HTML content
  };

  return (
    <div className="bg-base-100">
      <JumbotronDetail
        title={beritaHoax?.title}
        category={beritaHoax?.category}
        date={beritaHoax?.createdAt?.split("T")[0]} // Display only the date part
      />

      <div className="container mx-auto px-6 lg:px-40">
        {isLoading ? (
          <Spinner />
        ) : beritaHoax ? (
          <div className="mb-12">
            {/* Cek jika gambar ada */}
            {beritaHoax.yoast_head_json?.og_image?.[0]?.url ? (
              <Image
                src={beritaHoax.image}
                alt={beritaHoax?.title || "beritaHoax Image"}
                width={1000}
                height={500}
                className="mb-6 h-full w-full object-cover"
              />
            ) : (
              <div className="mb-6 h-[500px] w-full bg-gray-200" /> // fallback jika tidak ada gambar
            )}
            {/* Tampilkan konten artikel */}
            <div className="flex justify-center">
              <div className="w-[700px] text-sm text-darkPrimary dark:text-white xl:text-lg">
                <div
                  className="space-y-6"
                  dangerouslySetInnerHTML={{ __html: beritaHoax.content }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center dark:text-white">
            Berita Hoax not found
          </div>
        )}
      </div>
    </div>
  );
}
