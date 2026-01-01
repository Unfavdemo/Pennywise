import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { z } from 'zod';

const goalSchema = z.object({
  name: z.string().min(1).optional(),
  targetAmount: z.number().positive().optional(),
  currentAmount: z.number().min(0).optional(),
  deadline: z.string().optional(),
});

/**
 * GET /api/goals/[id]
 * Get a single goal by ID
 */
/**
 * PUT /api/goals/[id]
 * Update a goal
 */
/**
 * DELETE /api/goals/[id]
 * Delete a goal
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const userId = req.headers['x-user-id'] as string;

  if (!userId) {
    return res.status(401).json({ error: 'User ID is required' });
  }

  if (req.method === 'GET') {
    try {
      const goal = await prisma.goal.findFirst({
        where: {
          id: id as string,
          userId: userId, // Ensure user owns this goal
        },
      });

      if (!goal) {
        return res.status(404).json({ error: 'Goal not found' });
      }

      return res.status(200).json(goal);
    } catch (error: any) {
      console.error('Error fetching goal:', error);
      return res.status(500).json({ error: 'Failed to fetch goal' });
    }
  }

  if (req.method === 'PUT') {
    try {
      // Check if goal exists and belongs to user
      const existingGoal = await prisma.goal.findFirst({
        where: {
          id: id as string,
          userId: userId,
        },
      });

      if (!existingGoal) {
        return res.status(404).json({ error: 'Goal not found' });
      }

      // Validate request body (all fields optional for update)
      const validationResult = goalSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          error: 'Invalid goal data',
          details: validationResult.error.errors 
        });
      }

      const data = validationResult.data;
      const updateData: any = {};

      if (data.name) updateData.name = data.name;
      if (data.targetAmount) updateData.targetAmount = data.targetAmount;
      if (data.currentAmount !== undefined) updateData.currentAmount = data.currentAmount;
      if (data.deadline !== undefined) {
        updateData.deadline = data.deadline ? new Date(data.deadline) : null;
      }

      const goal = await prisma.goal.update({
        where: {
          id: id as string,
        },
        data: updateData,
      });

      return res.status(200).json(goal);
    } catch (error: any) {
      console.error('Error updating goal:', error);
      return res.status(500).json({ error: 'Failed to update goal' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      // Check if goal exists and belongs to user
      const existingGoal = await prisma.goal.findFirst({
        where: {
          id: id as string,
          userId: userId,
        },
      });

      if (!existingGoal) {
        return res.status(404).json({ error: 'Goal not found' });
      }

      await prisma.goal.delete({
        where: {
          id: id as string,
        },
      });

      return res.status(200).json({ message: 'Goal deleted successfully' });
    } catch (error: any) {
      console.error('Error deleting goal:', error);
      return res.status(500).json({ error: 'Failed to delete goal' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

