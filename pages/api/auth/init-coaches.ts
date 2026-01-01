import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import bcrypt from 'bcryptjs';

const COACH_CREDENTIALS = [
  { email: 'rob@launchpadphilly.org', password: 'lpuser1', name: 'Rob', role: 'coach' },
  { email: 'sanaa@launchpadphilly.org', password: 'lpuser2', name: 'Sanaa', role: 'coach' },
  { email: 'taheera@launchpadphilly.org', password: 'lpuser3', name: 'Taheera', role: 'coach' },
];

/**
 * POST /api/auth/init-coaches
 * Initialize coach accounts in the database
 * This endpoint ensures all coach accounts exist
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const results = [];

    for (const coach of COACH_CREDENTIALS) {
      // Check if coach already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: coach.email },
      });

      if (existingUser) {
        results.push({
          email: coach.email,
          status: 'exists',
          message: 'Coach account already exists',
        });
        continue;
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(coach.password, 10);

      // Create coach account
      const user = await prisma.user.create({
        data: {
          email: coach.email,
          password: hashedPassword,
          name: coach.name,
          role: coach.role,
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
        },
      });

      results.push({
        email: coach.email,
        status: 'created',
        message: 'Coach account created successfully',
        user,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Coach accounts initialized',
      results,
    });
  } catch (error: any) {
    console.error('Error initializing coach accounts:', error);
    return res.status(500).json({ 
      error: 'Failed to initialize coach accounts',
      details: error.message 
    });
  }
}

