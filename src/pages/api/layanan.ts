import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

// Initialize Prisma Client
const prisma = new PrismaClient();

// API Handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const services = await prisma.layanan.findMany();
      res.status(200).json(services);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch Layanan" });
    }
  } else if (req.method === "POST") {
    try {
      const { image, title, desc, link } = req.body;

      console.log("Incoming data:", req.body); // Log incoming data

      // Ensure all fields are present
      if (!image || !title || !desc || !link) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const newLayanan = await prisma.layanan.create({
        data: {
          image,
          title,
          desc,
          link,
        },
      });
      res.status(201).json(newLayanan);
    } catch (error) {
      console.error("Error details:", error);
      res.status(500).json({ error: "Failed to add new layanan" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
