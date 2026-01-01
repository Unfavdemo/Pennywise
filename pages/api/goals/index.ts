import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { z } from 'zod';

// Validation schema for creating/updating goals
const goalSchema = z.object({
  name: z.string().min(1),
  targetAmount: z.number().positive(),
  currentAmount: z.number().min(0).optional(),
  deadline: z.string().optional(), // ISO date string
});

/**
 * GET /api/goals
 * Get all goals for the authenticated user
 */
/**
 * POST /api/goals
 * Create a new goal
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const userId = req.headers['x-user-id'] as string;
      
      if (!userId) {
        return res.status(401).json({ error: 'User ID is required' });
      }

      const goals = await prisma.goal.findMany({
        where: {
          userId: userId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return res.status(200).json(goals);
    } catch (error: any) {
      console.error('Error fetching goals:', error);
      return res.status(500).json({ error: 'Failed to fetch goals' });
    }
  }

  if (req.method === 'POST') {
    try {
      const userId = req.headers['x-user-id'] as string;
      
      if (!userId) {
        return res.status(401).json({ error: 'User ID is required' });
      }

      // Validate request body
      const validationResult = goalSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          error: 'Invalid goal data',
          details: validationResult.error.errors 
        });
      }

      const data = validationResult.data;

      // Parse deadline if provided
      const deadline = data.deadline ? new Date(data.deadline) : null;

      const goal = await prisma.goal.create({
        data: {
          name: data.name,
          targetAmount: data.targetAmount,
          currentAmount: data.currentAmount || 0,
          deadline: deadline,
          userId: userId,
        },
      });

      return res.status(201).json(goal);
    } catch (error: any) {
      console.error('Error creating goal:', error);
      return res.status(500).json({ error: 'Failed to create goal' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

