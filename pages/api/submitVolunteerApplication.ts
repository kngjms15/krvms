import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

let attempt: string[] = [];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const formData = req.body;

    console.log(`First Name: ${formData.firstName}\t Length: ${formData.firstName.length}`);
    console.log(`Last Name: ${formData.lastName}\t Length: ${formData.lastName.length}`);
    console.log(`DOB: ${formData.dob}\t Length: ${formData.dob.length}`);
    console.log(`Address: ${formData.address}\t Length: ${formData.address.length}`);
    console.log(`City: ${formData.city}\t Length: ${formData.city.length}`);
    console.log(`Province: ${formData.province}\t Length: ${formData.province.length}`);
    console.log(`Postal Code: ${formData.postalCode}\t Length: ${formData.postalCode.length}`);
    console.log(`Chapter: ${formData.chapter}\t Length: ${formData.chapter.length}`);
    console.log(`Primary Phone: ${formData.primaryPhone}\t Length: ${formData.primaryPhone.length}`);
    console.log(`Secondary Phone: ${formData.secondaryPhone}\t Length: ${formData.secondaryPhone.length}`);
    console.log(`Email: ${formData.email}\t Length: ${formData.email.length}`);
    console.log(`Employer: ${formData.employer}\t Length: ${formData.employer.length}`);
    console.log(`Conviction: ${formData.conviction}\t Length: ${formData.conviction.length}`);
    console.log(`Bondable: ${formData.bondable}\t Length: ${formData.bondable.length}`);
    console.log(`Medical Condition: ${formData.medicalCondition}\t Length: ${formData.medicalCondition.length}`);
    console.log(`Medical Condition Details: ${formData.medicalConditionDetails}\t Length: ${formData.medicalConditionDetails.length}`);
    console.log(`Emergency Contact Name: ${formData.emergencyContactName}\t Length: ${formData.emergencyContactName.length}`);
    console.log(`Emergency Contact Relationship: ${formData.emergencyContactRelationship}\t Length: ${formData.emergencyContactRelationship.length}`);
    console.log(`Emergency Contact Phone: ${formData.emergencyContactPhone}\t Length: ${formData.emergencyContactPhone.length}`);
    console.log(`Volunteer Experience Details: ${formData.volunteerExperienceDetails}\t Length: ${formData.volunteerExperienceDetails.length}`);
    console.log(`Interview Status: Pending\t Length: ${'Pending'.length}`);

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