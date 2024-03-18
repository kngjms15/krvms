// pages/api/applicants.ts
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const applicants = await prisma.volunteerApplicant.findMany();
      console.log("Applicants fetched successfully.");
      res.status(200).json(applicants);
    } catch (error) {
      console.error("Error fetching applicants:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
