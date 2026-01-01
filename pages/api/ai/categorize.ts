import type { NextApiRequest, NextApiResponse } from 'next';
import { categorizeTransaction } from '../../../lib/ai-service';

/**
 * API Route: POST /api/ai/categorize
 * 
 * Categorizes a transaction using AI (OpenAI/Gemini) or keyword matching
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { description, merchant } = req.body;

    if (!description && !merchant) {
      return res.status(400).json({ error: 'Description or merchant is required' });
    }

    const result = await categorizeTransaction(description || '', merchant || '');

    return res.status(200).json(result);
  } catch (error: any) {
    console.error('AI categorization error:', error);
    return res.status(500).json({ 
      error: 'Failed to categorize transaction',
      message: error.message 
    });
  }
}

