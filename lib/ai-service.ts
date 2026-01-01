/**
 * AI Service for Pennywise
 * 
 * This service provides AI-powered categorization and insights.
 * It supports both OpenAI and Google Gemini APIs, with fallback to keyword matching.
 */

// Simple keyword-based categorization (fallback)
function keywordCategorize(description: string, merchant: string): string {
  const text = `${description} ${merchant}`.toLowerCase();
  
  if (text.match(/coffee|starbucks|restaurant|food|lunch|dinner|breakfast|chipotle|mcdonalds|pizza|burger|taco|subway|wawa/)) {
    return 'Food & Dining';
  }
  if (text.match(/uber|lyft|gas|bus|train|taxi|parking|transport|metro|subway|transit/)) {
    return 'Transportation';
  }
  if (text.match(/movie|concert|game|netflix|spotify|hulu|entertainment|show|streaming|disney/)) {
    return 'Entertainment';
  }
  if (text.match(/amazon|shop|store|clothes|clothing|purchase|buy|target|walmart|retail/)) {
    return 'Shopping';
  }
  if (text.match(/book|tuition|course|school|university|education|supplies|textbook|college/)) {
    return 'Education';
  }
  if (text.match(/gym|fitness|health|doctor|pharmacy|medicine|workout|yoga|exercise/)) {
    return 'Health & Fitness';
  }
  if (text.match(/rent|utility|phone|internet|bill|electric|water|internet|cable|wifi/)) {
    return 'Bills & Utilities';
  }
  if (text.match(/salary|paycheck|allowance|income|paid|earnings|wage|stipend/)) {
    return 'Income';
  }
  
  return 'Other';
}

/**
 * Categorize a transaction using AI (OpenAI or Gemini) or fallback to keywords
 */
export async function categorizeTransaction(
  description: string,
  merchant?: string
): Promise<{ category: string; method: 'openai' | 'gemini' | 'keyword' }> {
  const text = `${description} ${merchant || ''}`.trim();
  
  if (!text) {
    return { category: 'Other', method: 'keyword' };
  }

  // Try OpenAI first
  if (process.env.OPENAI_API_KEY) {
    try {
      const category = await categorizeWithOpenAI(text);
      return { category, method: 'openai' };
    } catch (error) {
      console.error('OpenAI categorization failed:', error);
      // Fall through to next method
    }
  }

  // Try Gemini second
  if (process.env.GEMINI_API_KEY) {
    try {
      const category = await categorizeWithGemini(text);
      return { category, method: 'gemini' };
    } catch (error) {
      console.error('Gemini categorization failed:', error);
      // Fall through to keyword matching
    }
  }

  // Fallback to keyword matching
  return {
    category: keywordCategorize(description, merchant || ''),
    method: 'keyword'
  };
}

/**
 * Categorize using OpenAI
 */
async function categorizeWithOpenAI(text: string): Promise<string> {
  const { OpenAI } = await import('openai');
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const categories = [
    'Food & Dining',
    'Transportation',
    'Entertainment',
    'Shopping',
    'Education',
    'Health & Fitness',
    'Bills & Utilities',
    'Income',
    'Other'
  ];

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `You are a financial categorization assistant. Categorize the following transaction into one of these categories: ${categories.join(', ')}. Only respond with the category name, nothing else.`
      },
      {
        role: 'user',
        content: `Transaction: "${text}"`
      }
    ],
    max_tokens: 20,
    temperature: 0.3,
  });

  const category = response.choices[0]?.message?.content?.trim() || 'Other';
  
  // Validate the response is one of our categories
  if (categories.includes(category)) {
    return category;
  }
  
  // If AI returned something else, try to match it
  const lowerCategory = category.toLowerCase();
  for (const cat of categories) {
    if (cat.toLowerCase().includes(lowerCategory) || lowerCategory.includes(cat.toLowerCase())) {
      return cat;
    }
  }
  
  return 'Other';
}

/**
 * Categorize using Google Gemini
 */
async function categorizeWithGemini(text: string): Promise<string> {
  const { GoogleGenerativeAI } = await import('@google/generative-ai');
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const categories = [
    'Food & Dining',
    'Transportation',
    'Entertainment',
    'Shopping',
    'Education',
    'Health & Fitness',
    'Bills & Utilities',
    'Income',
    'Other'
  ];

  const prompt = `Categorize this transaction into one of these categories: ${categories.join(', ')}. Only respond with the category name, nothing else.\n\nTransaction: "${text}"`;

  const result = await model.generateContent(prompt);
  const category = result.response.text().trim();
  
  // Validate the response
  if (categories.includes(category)) {
    return category;
  }
  
  // Try to match partial
  const lowerCategory = category.toLowerCase();
  for (const cat of categories) {
    if (cat.toLowerCase().includes(lowerCategory) || lowerCategory.includes(cat.toLowerCase())) {
      return cat;
    }
  }
  
  return 'Other';
}

/**
 * Generate spending insights using AI (if available) or rule-based logic
 */
export function generateInsights(transactions: any[]) {
  if (transactions.length === 0) {
    return [];
  }

  const insights = [];
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  // Spending vs Income
  if (totalIncome > 0) {
    const spendingRate = (totalExpenses / totalIncome) * 100;
    if (spendingRate < 70) {
      insights.push({
        type: 'positive',
        message: `Great job! You're spending only ${spendingRate.toFixed(0)}% of your income. Keep up the good saving habits!`,
      });
    } else if (spendingRate > 90) {
      insights.push({
        type: 'warning',
        message: `You're spending ${spendingRate.toFixed(0)}% of your income. Consider cutting back to build savings.`,
      });
    }
  }

  // Top spending category
  const categoryTotals = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc: Record<string, number>, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];
  if (topCategory && totalExpenses > 0) {
    const percentage = (topCategory[1] / totalExpenses) * 100;
    insights.push({
      type: 'info',
      message: `Your biggest expense is ${topCategory[0]} at $${topCategory[1].toFixed(2)} (${percentage.toFixed(0)}% of spending).`,
    });
  }

  // Savings potential
  const savingsPotential = totalIncome - totalExpenses;
  if (savingsPotential > 0) {
    insights.push({
      type: 'positive',
      message: `You're on track to save $${savingsPotential.toFixed(2)} this month! Consider setting a savings goal.`,
    });
  } else if (savingsPotential < 0) {
    insights.push({
      type: 'warning',
      message: `You're spending $${Math.abs(savingsPotential).toFixed(2)} more than you earn. Review your expenses.`,
    });
  }

  return insights;
}

