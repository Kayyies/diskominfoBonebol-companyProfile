"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import JumbotronDetail from "@/components/Jumbotron/JumbotronDetail";
import Spinner from "@/components/Spinner";

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
          `https://newsapi.org/v2/everything?q=indonesia&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`,
        );
        const data = await response.json();

        // Cari artikel berdasarkan slug
        const foundArticle = data.articles.find(
          (article) => createSlug(article.title) === slug,
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
        title={article?.title}
        author={article?.author}
        date={article?.publishedAt}
      />
      <div className="container mx-auto px-6 lg:px-40">
        {isLoading ? (
          <Spinner />
        ) : article ? (
          <div className="mb-12">
            <Image
              src={article.urlToImage}
              alt={article.title}
              width={1000}
              height={500}
              className="mb-6 h-full w-full object-cover"
            />
            <p className="text-sm text-darkPrimary dark:text-white xl:text-lg">
              {article.description}
            </p>
          </div>
        ) : (
          <div>Article not found</div>
        )}
      </div>
    </div>
  );
}
