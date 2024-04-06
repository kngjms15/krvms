import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient(); // Instantiate PrismaClient

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { volunteerId } = req.query;

  if (req.method === "DELETE") {
    try {
      const deletedVolunteer = await prisma.volunteer.delete({
        where: {
          volunteerId: String(volunteerId),
        },
      });

      res
        .status(200)
        .json({
          message: "Volunteer deleted successfully",
          volunteer: deletedVolunteer,
        });
    } catch (error) {
      console.error("Error deleting volunteer:", error);
      res
        .status(500)
        .json({ message: "Failed to delete volunteer. Please try again." });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
