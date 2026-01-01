import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';
import { z } from 'zod';

// Validation schema for migration data
const migrationDataSchema = z.object({
  transactions: z.array(z.object({
    type: z.enum(['income', 'expense']),
    amount: z.number().positive(),
    category: z.string(),
    description: z.string().optional(),
    merchant: z.string().optional(),
    date: z.string(),
  })).optional(),
  goals: z.array(z.object({
    name: z.string(),
    targetAmount: z.number().positive(),
    currentAmount: z.number().min(0),
    deadline: z.string().optional(),
  })).optional(),
});

/**
 * POST /api/migrate
 * Migrate data from localStorage to database
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const userId = req.headers['x-user-id'] as string;
    
    if (!userId) {
      return res.status(401).json({ error: 'User ID is required' });
    }

    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Validate request body
    const validationResult = migrationDataSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      return res.status(400).json({ 
        error: 'Invalid migration data',
        details: validationResult.error.errors 
      });
    }

    const { transactions, goals } = validationResult.data;
    const results = {
      transactionsMigrated: 0,
      goalsMigrated: 0,
      errors: [] as string[],
    };

    // Migrate transactions
    if (transactions && transactions.length > 0) {
      try {
        const transactionData = transactions.map(t => ({
          type: t.type,
          amount: t.amount,
          category: t.category,
          description: t.description || null,
          merchant: t.merchant || null,
          date: new Date(t.date),
          userId: userId,
        }));

        // Check for existing transactions to avoid duplicates
        const existingTransactions = await prisma.transaction.findMany({
          where: { userId },
          select: { id: true, date: true, amount: true, category: true },
        });

        // Filter out potential duplicates (same date, amount, category)
        const uniqueTransactions = transactionData.filter(newT => {
          return !existingTransactions.some(existing => {
            const existingDate = new Date(existing.date).toISOString().split('T')[0];
            const newDate = newT.date.toISOString().split('T')[0];
            return existingDate === newDate &&
                   existing.amount === newT.amount &&
                   existing.category === newT.category;
          });
        });

        if (uniqueTransactions.length > 0) {
          await prisma.transaction.createMany({
            data: uniqueTransactions,
            skipDuplicates: true,
          });
          results.transactionsMigrated = uniqueTransactions.length;
        }
      } catch (error: any) {
        results.errors.push(`Transaction migration error: ${error.message}`);
      }
    }

    // Migrate goals
    if (goals && goals.length > 0) {
      try {
        const goalData = goals.map(g => ({
          name: g.name,
          targetAmount: g.targetAmount,
          currentAmount: g.currentAmount || 0,
          deadline: g.deadline ? new Date(g.deadline) : null,
          userId: userId,
        }));

        // Check for existing goals to avoid duplicates
        const existingGoals = await prisma.goal.findMany({
          where: { userId },
          select: { id: true, name: true },
        });

        // Filter out potential duplicates (same name)
        const uniqueGoals = goalData.filter(newG => {
          return !existingGoals.some(existing => existing.name === newG.name);
        });

        if (uniqueGoals.length > 0) {
          await prisma.goal.createMany({
            data: uniqueGoals,
            skipDuplicates: true,
          });
          results.goalsMigrated = uniqueGoals.length;
        }
      } catch (error: any) {
        results.errors.push(`Goal migration error: ${error.message}`);
      }
    }

    return res.status(200).json({
      success: true,
      ...results,
      message: `Migration completed: ${results.transactionsMigrated} transactions, ${results.goalsMigrated} goals migrated`,
    });
  } catch (error: any) {
    console.error('Error during migration:', error);
    return res.status(500).json({ error: 'Failed to migrate data' });
  }
}

