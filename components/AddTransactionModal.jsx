import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

const CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Education',
  'Health & Fitness',
  'Bills & Utilities',
  'Income',
  'Other',
];

export default function AddTransactionModal({ onClose, onAdd }) {
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [merchant, setMerchant] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [aiSuggested, setAiSuggested] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiMethod, setAiMethod] = useState('');

  const handleAICategorize = async () => {
    if (!description && !merchant) {
      return;
    }

    setAiLoading(true);
    try {
      const response = await fetch('/api/ai/categorize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description, merchant }),
      });

      if (!response.ok) {
        throw new Error('Failed to categorize');
      }

      const data = await response.json();
      setCategory(data.category);
      setAiMethod(data.method);
      setAiSuggested(true);
      setTimeout(() => setAiSuggested(false), 3000);
    } catch (error) {
      console.error('AI categorization error:', error);
      // Fallback to keyword matching
      const text = `${description} ${merchant}`.toLowerCase();
      let suggested = 'Other';
      
      if (text.match(/coffee|starbucks|restaurant|food|lunch|dinner|breakfast|chipotle|mcdonalds|pizza|burger/)) {
        suggested = 'Food & Dining';
      } else if (text.match(/uber|lyft|gas|bus|train|taxi|parking|transport/)) {
        suggested = 'Transportation';
      } else if (text.match(/movie|concert|game|netflix|spotify|hulu|entertainment|show/)) {
        suggested = 'Entertainment';
      } else if (text.match(/amazon|shop|store|clothes|clothing|purchase|buy/)) {
        suggested = 'Shopping';
      } else if (text.match(/book|tuition|course|school|university|education|supplies/)) {
        suggested = 'Education';
      } else if (text.match(/gym|fitness|health|doctor|pharmacy|medicine|workout/)) {
        suggested = 'Health & Fitness';
      } else if (text.match(/rent|utility|phone|internet|bill|electric|water/)) {
        suggested = 'Bills & Utilities';
      } else if (text.match(/salary|paycheck|allowance|income|paid|earnings/)) {
        suggested = 'Income';
      }
      
      setCategory(suggested);
      setAiMethod('keyword');
      setAiSuggested(true);
      setTimeout(() => setAiSuggested(false), 3000);
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!amount || !category) {
      alert('Please fill in amount and category');
      return;
    }

    onAdd({
      type,
      amount: parseFloat(amount),
      category,
      description,
      merchant,
      date,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-gray-900">Add Transaction</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Transaction Type */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Transaction Type</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setType('income')}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  type === 'income'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 bg-white text-gray-700'
                }`}
              >
                Income
              </button>
              <button
                type="button"
                onClick={() => setType('expense')}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  type === 'expense'
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-200 bg-white text-gray-700'
                }`}
              >
                Expense
              </button>
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Amount *</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="e.g., Lunch with friends"
            />
          </div>

          {/* Merchant */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Merchant/Store</label>
            <input
              type="text"
              value={merchant}
              onChange={(e) => setMerchant(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="e.g., Starbucks"
            />
          </div>

          {/* AI Categorize Button */}
          {(description || merchant) && !category && (
            <button
              type="button"
              onClick={handleAICategorize}
              disabled={aiLoading}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className={`w-4 h-4 ${aiLoading ? 'animate-spin' : ''}`} />
              {aiLoading ? 'Categorizing...' : 'AI Categorize'}
            </button>
          )}

          {/* Category */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Category *
              {aiSuggested && (
                <span className="ml-2 text-xs text-purple-600">
                  ✨ AI Suggested {aiMethod === 'openai' && '(OpenAI)'} {aiMethod === 'gemini' && '(Gemini)'} {aiMethod === 'keyword' && '(Keyword)'}
                </span>
              )}
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            >
              <option value="">Select a category</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

