import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const users = await prisma.user.findMany();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  } else if (req.method === "POST") {
    try {
      const { username, role } = req.body;
      const newUser = await prisma.user.create({
        data: {
          username,
          role,
        },
      });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: "Failed to add new user" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
