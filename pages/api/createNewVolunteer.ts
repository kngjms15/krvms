import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { Volunteer } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Received request to create new volunteer");
  console.log("Request body: ", req.body);

  if (req.method === 'POST') {
    try {
      const {
        firstName,
        lastName,
        role,
        dob,
        address,
        city,
        province,
        postalCode,
        chapter,
        primaryPhone,
        secondaryPhone,
        email,
        employer,
        conviction,
        bondable,
        medicalCondition,
        medicalConditionDetails,
        emergencyContactName,
        emergencyContactRelationship,
        emergencyContactPhone,
        volunteerExperienceDetails,
        interviewStatus,
        status,
      } = req.body;

      const newVolunteer: Volunteer = await prisma.volunteer.create({
        data: {
          firstName,
          lastName,
          role,
          dob: new Date(dob),
          address,
          city,
          province,
          postalCode,
          chapter,
          primaryPhone,
          secondaryPhone,
          email,
          employer,
          conviction: Boolean(conviction),
          bondable: Boolean(bondable),
          medicalCondition: Boolean(medicalCondition),  
          medicalConditionDetails,        
          emergencyContactName,
          emergencyContactRelationship,
          emergencyContactPhone,
          volunteerExperienceDetails,
          interviewStatus,
          status,
        },
      });

      res.status(201).json(newVolunteer);
    } catch (error) {
      console.error('Error creating volunteer:', error);
      res.status(500).json({ error: 'Failed to create volunteer' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
