import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { applicantId } = req.query;

  if (req.method === "GET") {
    try {
      const applicant = await prisma.volunteerApplicant.findUnique({
        where: { applicantId: String(applicantId) },
      });

      if (!applicant) {
        return res.status(404).json({ error: "Applicant not found" });
      }

      return res.status(200).json(applicant);
    } catch (error) {
      console.error("Failed to fetch applicant details:", error);
      return res.status(500).json({ error: "Failed to fetch applicant details" });
    }
  }

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

      if (interviewStatus === "Accepted") {
        const updatedApplicant = await prisma.volunteerApplicant.findUnique({
          where: { applicantId: String(applicantId) },
        });

        if (!updatedApplicant) {
          return res.status(404).json({ error: "Applicant not found" });
        }

        await prisma.volunteer.create({
          data: {
            firstName: updatedApplicant.firstName,
            lastName: updatedApplicant.lastName,
            role: "Volunteer",
            dob: updatedApplicant.dob,
            address: updatedApplicant.address,
            city: updatedApplicant.city,
            province: updatedApplicant.province,
            postalCode: updatedApplicant.postalCode,
            chapter: updatedApplicant.chapter,
            primaryPhone: updatedApplicant.primaryPhone,
            secondaryPhone: updatedApplicant.secondaryPhone,
            email: updatedApplicant.email,
            employer: updatedApplicant.employer,
            conviction: updatedApplicant.conviction,
            bondable: updatedApplicant.bondable,
            medicalCondition: updatedApplicant.medicalCondition,
            medicalConditionDetails: updatedApplicant.medicalConditionDetails,
            emergencyContactName: updatedApplicant.emergencyContactName,
            emergencyContactRelationship: updatedApplicant.emergencyContactRelationship,
            emergencyContactPhone: updatedApplicant.emergencyContactPhone,
            volunteerExperienceDetails: updatedApplicant.volunteerExperienceDetails,
            interviewStatus: updatedApplicant.interviewStatus,
            status: "Active",
          },
        });
      }

      return res.status(200).json({ message: "Status updated successfully" });
    } catch (error) {
      console.error("Failed to update status:", error);
      return res.status(500).json({ error: "Failed to update status" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const deleteResponse = await prisma.volunteerApplicant.delete({
        where: {
          applicantId: String(applicantId),
        },
      });
      return res.status(204).json(deleteResponse);
    } catch (error) {
      console.error("Failed to delete applicant with ID:", applicantId, error);
      return res.status(500).json({ error: "Error deleting applicant", details: error });
    }
  }

  res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
