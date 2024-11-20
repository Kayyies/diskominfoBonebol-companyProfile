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
      const dokumen = await prisma.dokumen.findUnique({
        where: { slug: slug as string },
      });

      if (!dokumen) {
        return res.status(404).json({ error: "Document not found" });
      }

      res.status(200).json(dokumen);
    } catch (error) {
      console.error("Failed to fetch document:", error);
      res.status(500).json({ error: "Failed to fetch document" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
