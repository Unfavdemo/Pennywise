import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { z } from 'zod';

const transactionSchema = z.object({
  type: z.enum(['income', 'expense']).optional(),
  amount: z.number().positive().optional(),
  category: z.string().min(1).optional(),
  description: z.string().optional(),
  merchant: z.string().optional(),
  date: z.string().optional(),
});

/**
 * GET /api/transactions/[id]
 * Get a single transaction by ID
 */
/**
 * PUT /api/transactions/[id]
 * Update a transaction
 */
/**
 * DELETE /api/transactions/[id]
 * Delete a transaction
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
      const transaction = await prisma.transaction.findFirst({
        where: {
          id: id as string,
          userId: userId, // Ensure user owns this transaction
        },
      });

      if (!transaction) {
        return res.status(404).json({ error: 'Transaction not found' });
      }

      return res.status(200).json(transaction);
    } catch (error: any) {
      console.error('Error fetching transaction:', error);
      return res.status(500).json({ error: 'Failed to fetch transaction' });
    }
  }

  if (req.method === 'PUT') {
    try {
      // Check if transaction exists and belongs to user
      const existingTransaction = await prisma.transaction.findFirst({
        where: {
          id: id as string,
          userId: userId,
        },
      });

      if (!existingTransaction) {
        return res.status(404).json({ error: 'Transaction not found' });
      }

      // Validate request body (all fields optional for update)
      const validationResult = transactionSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          error: 'Invalid transaction data',
          details: validationResult.error.errors 
        });
      }

      const data = validationResult.data;
      const updateData: any = {};

      if (data.type) updateData.type = data.type;
      if (data.amount) updateData.amount = data.amount;
      if (data.category) updateData.category = data.category;
      if (data.description !== undefined) updateData.description = data.description;
      if (data.merchant !== undefined) updateData.merchant = data.merchant;
      if (data.date) updateData.date = new Date(data.date);

      const transaction = await prisma.transaction.update({
        where: {
          id: id as string,
        },
        data: updateData,
      });

      return res.status(200).json(transaction);
    } catch (error: any) {
      console.error('Error updating transaction:', error);
      return res.status(500).json({ error: 'Failed to update transaction' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      // Check if transaction exists and belongs to user
      const existingTransaction = await prisma.transaction.findFirst({
        where: {
          id: id as string,
          userId: userId,
        },
      });

      if (!existingTransaction) {
        return res.status(404).json({ error: 'Transaction not found' });
      }

      await prisma.transaction.delete({
        where: {
          id: id as string,
        },
      });

      return res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error: any) {
      console.error('Error deleting transaction:', error);
      return res.status(500).json({ error: 'Failed to delete transaction' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

