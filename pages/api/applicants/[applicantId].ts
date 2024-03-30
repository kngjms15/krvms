// pages/api/applicants/[applicantId].ts

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const { applicantId } = req.query;

    try {
      const deleteResponse = await prisma.volunteerApplicant.delete({
        where: {
          applicantId: String(applicantId),
        },
      });
      res.status(204).json(deleteResponse);
    } catch (error) {
      console.error("Failed to delete applicant with ID:", applicantId, error);
      res.status(500).json({ error: "Error deleting applicant", details: error });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
