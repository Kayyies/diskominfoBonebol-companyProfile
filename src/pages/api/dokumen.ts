import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const documents = await prisma.dokumen.findMany();
      res.status(200).json(documents);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch documents" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
