import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const newVolunteer = await prisma.volunteer.create({
        data: req.body,
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
