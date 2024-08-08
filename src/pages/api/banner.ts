import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const banners = await prisma.banner.findMany();
      res.status(200).json(banners);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch banner" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
