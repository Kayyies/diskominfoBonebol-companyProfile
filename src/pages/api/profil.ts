import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const profiles = await prisma.profil.findMany();
      res.status(200).json(profiles);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch profiles" });
    }
  } else if (req.method === "POST") {
    try {
      const { category, title, desc } = req.body;
      const newProfile = await prisma.profil.create({
        data: {
          category,
          title,
          desc,
        },
      });
      res.status(201).json(newProfile);
    } catch (error) {
      res.status(500).json({ error: "Failed to add new profile" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
