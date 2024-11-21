// pages/api/dokumen/[slug].ts
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { slug } = req.query;

  if (req.method === "GET") {
    try {
      const beritaHoax = await prisma.beritaHoax.findUnique({
        where: { slug: slug as string },
      });

      if (!beritaHoax) {
        return res.status(404).json({ error: "Berita Hoax not found" });
      }

      res.status(200).json(beritaHoax);
    } catch (error) {
      console.error("Failed to fetch berita hoax:", error);
      res.status(500).json({ error: "Failed to fetch berita hoax" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
