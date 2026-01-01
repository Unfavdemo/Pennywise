import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { z } from 'zod';

// Validation schema for updating budgets
const budgetUpdateSchema = z.object({
  category: z.string().min(1).optional(),
  amount: z.number().positive().optional(),
  period: z.enum(['monthly', 'weekly', 'yearly', 'custom']).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

/**
 * GET /api/budgets/[id]
 * Get a specific budget
 * PUT /api/budgets/[id]
 * Update a budget
 * DELETE /api/budgets/[id]
 * Delete a budget
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
      const budget = await prisma.budget.findFirst({
        where: {
          id: id as string,
          userId,
        },
      });

      if (!budget) {
        return res.status(404).json({ error: 'Budget not found' });
      }

      return res.status(200).json(budget);
    } catch (error: any) {
      console.error('Error fetching budget:', error);
      return res.status(500).json({ error: 'Failed to fetch budget' });
    }
  }

  if (req.method === 'PUT') {
    try {
      // Validate request body
      const validationResult = budgetUpdateSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          error: 'Invalid budget data',
          details: validationResult.error.errors 
        });
      }

      // Check if budget exists and belongs to user
      const existingBudget = await prisma.budget.findFirst({
        where: {
          id: id as string,
          userId,
        },
      });

      if (!existingBudget) {
        return res.status(404).json({ error: 'Budget not found' });
      }

      const updateData: any = {};
      if (validationResult.data.category !== undefined) {
        updateData.category = validationResult.data.category;
      }
      if (validationResult.data.amount !== undefined) {
        updateData.amount = validationResult.data.amount;
      }
      if (validationResult.data.period !== undefined) {
        updateData.period = validationResult.data.period;
      }
      if (validationResult.data.startDate !== undefined) {
        updateData.startDate = new Date(validationResult.data.startDate);
      }
      if (validationResult.data.endDate !== undefined) {
        updateData.endDate = validationResult.data.endDate ? new Date(validationResult.data.endDate) : null;
      }

      const budget = await prisma.budget.update({
        where: {
          id: id as string,
        },
        data: updateData,
      });

      return res.status(200).json(budget);
    } catch (error: any) {
      console.error('Error updating budget:', error);
      return res.status(500).json({ error: 'Failed to update budget' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      // Check if budget exists and belongs to user
      const existingBudget = await prisma.budget.findFirst({
        where: {
          id: id as string,
          userId,
        },
      });

      if (!existingBudget) {
        return res.status(404).json({ error: 'Budget not found' });
      }

      await prisma.budget.delete({
        where: {
          id: id as string,
        },
      });

      return res.status(200).json({ success: true });
    } catch (error: any) {
      console.error('Error deleting budget:', error);
      return res.status(500).json({ error: 'Failed to delete budget' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

