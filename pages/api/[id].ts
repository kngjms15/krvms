// pages/api/applicants/[id].ts

import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      const applicant = await prisma.volunteerApplicant.delete({
        where: {
          applicantId: Number(id),
        },
      });
      res.status(200).json(applicant);
    } catch (error) {
      console.error("Error deleting applicant:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
