// pages/api/volunteers.ts

import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const volunteers = await prisma.volunteer.findMany();
    res.status(200).json(volunteers);
  } catch (error) {
    console.error("Failed to fetch volunteers:", error);
    res.status(500).json({ error: "Failed to fetch volunteers" });
  }
}
