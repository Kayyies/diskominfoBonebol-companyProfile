import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const hoaxes = await prisma.beritaHoax.findMany();
      res.status(200).json(hoaxes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch Hoaxes" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
