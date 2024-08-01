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

      res.status(200).json({
        message: "Volunteer deleted successfully",
        volunteer: deletedVolunteer,
      });
    } catch (error) {
      console.error("Error deleting volunteer:", error);
      res
        .status(500)
        .json({ message: "Failed to delete volunteer. Please try again." });
    }
  } else if (req.method === "PATCH") {
    try {
      const { body } = req;
      const updatedVolunteer = await prisma.volunteer.update({
        where: {
          volunteerId: String(volunteerId),
        },
        data: {
          // Update the volunteer fields based on the request body
          // Assuming the request body contains all fields to update
          // You might want to add validation for required fields
          // and only update the fields that are provided in the request
          firstName: body.firstName,
          lastName: body.lastName,
          role: body.role,
          dob: body.dob,
          address: body.address,
          city: body.city,
          province: body.province,
          postalCode: body.postalCode,
          chapter: body.chapter,
          primaryPhone: body.primaryPhone,
          secondaryPhone: body.secondaryPhone,
          email: body.email,
          employer: body.employer,
          conviction: body.conviction,
          bondable: body.bondable,
          medicalCondition: body.medicalCondition,
          medicalConditionDetails: body.medicalConditionDetails,
          emergencyContactName: body.emergencyContactName,
          emergencyContactRelationship: body.emergencyContactRelationship,
          emergencyContactPhone: body.emergencyContactPhone,
          volunteerExperienceDetails: body.volunteerExperienceDetails,
          interviewStatus: body.interviewStatus,
          status: body.status,
        },
      });

      res.status(200).json({
        message: "Volunteer updated successfully",
        volunteer: updatedVolunteer,
      });
    } catch (error) {
      console.error("Error updating volunteer:", error);
      res
        .status(500)
        .json({ message: "Failed to update volunteer. Please try again." });
    }
  } else if (req.method === "PUT") {
    try {
      const { body } = req;
      const updatedVolunteer = await prisma.volunteer.update({
        where: {
          volunteerId: String(volunteerId),
        },
        data: {
          // Update the volunteer fields based on the request body
          // Assuming the request body contains all fields to update
          // You might want to add validation for required fields
          // and only update the fields that are provided in the request
          firstName: body.firstName,
          lastName: body.lastName,
          role: body.role,
          dob: body.dob,
          address: body.address,
          city: body.city,
          province: body.province,
          postalCode: body.postalCode,
          chapter: body.chapter,
          primaryPhone: body.primaryPhone,
          secondaryPhone: body.secondaryPhone,
          email: body.email,
          employer: body.employer,
          conviction: body.conviction,
          bondable: body.bondable,
          medicalCondition: body.medicalCondition,
          medicalConditionDetails: body.medicalConditionDetails,
          emergencyContactName: body.emergencyContactName,
          emergencyContactRelationship: body.emergencyContactRelationship,
          emergencyContactPhone: body.emergencyContactPhone,
          volunteerExperienceDetails: body.volunteerExperienceDetails,
          interviewStatus: body.interviewStatus,
          status: body.status,
        },
      });
  
      res.status(200).json({
        message: "Volunteer updated successfully",
        volunteer: updatedVolunteer,
      });
    } catch (error) {
      console.error("Error updating volunteer:", error);
      res
        .status(500)
        .json({ message: "Failed to update volunteer. Please try again." });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
