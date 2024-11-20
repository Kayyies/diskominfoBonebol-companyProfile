"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import JumbotronDetail from "@/components/Jumbotron/JumbotronDetail";
import Spinner from "@/components/Spinner";

// Fungsi untuk membuat slug dari judul
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Hapus karakter khusus selain spasi dan tanda "-"
    .replace(/\s+/g, "-") // Ganti spasi dengan "-"
    .replace(/^-+|-+$/g, ""); // Hapus tanda "-" di awal atau akhir
}

export default function BeritaDetailPage({ params }) {
  const { slug } = params;

  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!slug) return; // Tunggu sampai slug tersedia

    const fetchArticle = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://berita.bonebolangokab.go.id/wp-json/wp/v2/posts?slug=${slug}`,
        );
        const data = await response.json();

        // Cari artikel berdasarkan slug
        const foundArticle = data.find(
          (article) => createSlug(article.title.rendered) === slug,
        );

        if (foundArticle) {
          setArticle(foundArticle);
        } else {
          console.error("Article not found");
          setArticle(null);
        }
      } catch (error) {
        console.error("Failed to fetch article:", error);
        setArticle(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  return (
    <div className="bg-base-100">
      <JumbotronDetail
        title={article?.title?.rendered}
        author={"Admin Diskominfo"}
        date={article?.date}
      />
      <div className="container mx-auto px-6 lg:px-40">
        {isLoading ? (
          <Spinner />
        ) : article ? (
          <div className="mb-12">
            {/* Cek jika gambar ada */}
            {article.yoast_head_json?.og_image?.[0]?.url ? (
              <Image
                src={article.yoast_head_json.og_image[0].url}
                alt={article.title?.rendered || "Article Image"}
                width={1000}
                height={500}
                className="mb-6 h-full w-full object-cover"
              />
            ) : (
              <div className="mb-6 bg-gray-200 h-[500px] w-full" /> // fallback jika tidak ada gambar
            )}
            {/* Tampilkan konten artikel */}
            <div
              className="text-sm text-darkPrimary dark:text-white xl:text-lg"
              dangerouslySetInnerHTML={{ __html: article.content.rendered }}
            />
          </div>
        ) : (
          <div>Article not found</div>
        )}
      </div>
    </div>
  );
}
