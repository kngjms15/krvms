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
          ...formData,
          // Set the application status to 'Pending'
          status: 'Pending',
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
