// pages/api/applicants/[applicantId].ts

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { applicantId } = req.query;

  if (req.method === "PATCH") {
    try {
      const { interviewStatus } = req.body;

      // Validate interviewStatus
      if (!["Pending", "Rejected", "Accepted"].includes(interviewStatus)) {
        return res.status(400).json({ error: "Invalid interviewStatus" });
      }

      await prisma.volunteerApplicant.update({
        where: { applicantId: String(applicantId) },
        data: { interviewStatus },
      });

      res.status(200).json({ message: "Status updated successfully" });
    } catch (error) {
      console.error("Failed to update status:", error);
      res.status(500).json({ error: "Failed to update status" });
    }
  } else if (req.method === "DELETE") {
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
    res.setHeader("Allow", ["PATCH", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
