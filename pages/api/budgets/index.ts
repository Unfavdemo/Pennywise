import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { z } from 'zod';

// Validation schema for creating/updating budgets
const budgetSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  amount: z.number().positive('Amount must be greater than 0'),
  period: z.enum(['monthly', 'weekly', 'yearly', 'custom']).default('monthly'),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

/**
 * GET /api/budgets
 * Get all budgets for the authenticated user
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

      const budgets = await prisma.budget.findMany({
        where: {
          userId: userId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return res.status(200).json(budgets);
    } catch (error: any) {
      console.error('Error fetching budgets:', error);
      return res.status(500).json({ error: 'Failed to fetch budgets' });
    }
  }

  if (req.method === 'POST') {
    try {
      const userId = req.headers['x-user-id'] as string;
      
      if (!userId) {
        return res.status(401).json({ error: 'User ID is required' });
      }

      // Validate request body
      const validationResult = budgetSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          error: 'Invalid budget data',
          details: validationResult.error.errors 
        });
      }

      const { category, amount, period, startDate, endDate } = validationResult.data;

      // Check if budget already exists for this category and period
      const existingBudget = await prisma.budget.findFirst({
        where: {
          userId,
          category,
          period,
        },
      });

      if (existingBudget) {
        return res.status(400).json({ 
          error: 'Budget already exists for this category and period' 
        });
      }

      // Create new budget
      const budget = await prisma.budget.create({
        data: {
          category,
          amount,
          period,
          startDate: startDate ? new Date(startDate) : new Date(),
          endDate: endDate ? new Date(endDate) : null,
          userId,
        },
      });

      return res.status(201).json(budget);
    } catch (error: any) {
      console.error('Error creating budget:', error);
      return res.status(500).json({ error: 'Failed to create budget' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

