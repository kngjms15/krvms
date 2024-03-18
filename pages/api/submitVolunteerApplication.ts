import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const formData = req.body;

    try {
      // Insert the form data into the database
      const application = await prisma.volunteerApplicant.create({
        data: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          dob: new Date(formData.dob), // Convert string to Date object
          address: formData.address,
          city: formData.city,
          province: formData.province,
          postalCode: formData.postalCode,
          chapter: formData.chapter,
          primaryPhone: formData.primaryPhone,
          secondaryPhone: formData.secondaryPhone,
          email: formData.email,
          employer: formData.employer,
          conviction: formData.conviction === 'true', // Convert string to boolean
          bondable: formData.bondable === 'true', // Convert string to boolean
          medicalCondition: formData.medicalCondition === 'true', // Convert string to boolean
          medicalConditionDetails: formData.medicalConditionDetails,
          emergencyContactName: formData.emergencyContactName,
          emergencyContactRelationship: formData.emergencyContactRelationship,
          emergencyContactPhone: formData.emergencyContactPhone,
          volunteerExperienceDetails: formData.volunteerExperienceDetails,
          // Set the application status to 'Pending'
          interviewStatus: 'Pending', // Assuming 'interviewStatus' is the correct field name
        },
      });

      // Respond with the created application
      res.status(201).json(application);
    } catch (error) {
      console.error('Failed to submit volunteer application:', error);
      res.status(500).json({ message: 'Failed to submit application' });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
