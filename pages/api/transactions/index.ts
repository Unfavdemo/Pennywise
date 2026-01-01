import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { z } from 'zod';

// Validation schema for creating/updating transactions
const transactionSchema = z.object({
  type: z.enum(['income', 'expense']),
  amount: z.number().positive(),
  category: z.string().min(1),
  description: z.string().optional(),
  merchant: z.string().optional(),
  date: z.string().optional(), // ISO date string
});

/**
 * GET /api/transactions
 * Get all transactions for the authenticated user
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      // TODO: Get userId from session/auth (for now, we'll need to pass it)
      // For MVP, we'll get it from query or header temporarily
      const userId = req.headers['x-user-id'] as string;
      
      if (!userId) {
        return res.status(401).json({ error: 'User ID is required' });
      }

      const transactions = await prisma.transaction.findMany({
        where: {
          userId: userId,
        },
        orderBy: {
          date: 'desc',
        },
      });

      return res.status(200).json(transactions);
    } catch (error: any) {
      console.error('Error fetching transactions:', error);
      return res.status(500).json({ error: 'Failed to fetch transactions' });
    }
  }

  if (req.method === 'POST') {
    try {
      const userId = req.headers['x-user-id'] as string;
      
      if (!userId) {
        return res.status(401).json({ error: 'User ID is required' });
      }

      // Validate request body
      const validationResult = transactionSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          error: 'Invalid transaction data',
          details: validationResult.error.errors 
        });
      }

      const data = validationResult.data;

      // Parse date or use current date
      const transactionDate = data.date 
        ? new Date(data.date) 
        : new Date();

      const transaction = await prisma.transaction.create({
        data: {
          type: data.type,
          amount: data.amount,
          category: data.category,
          description: data.description,
          merchant: data.merchant,
          date: transactionDate,
          userId: userId,
        },
      });

      return res.status(201).json(transaction);
    } catch (error: any) {
      console.error('Error creating transaction:', error);
      return res.status(500).json({ error: 'Failed to create transaction' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

