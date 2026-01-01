import { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import { z } from 'zod';

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

// Validation schema for transaction form
const transactionSchema = z.object({
  type: z.enum(['income', 'expense']),
  amount: z.number().positive('Amount must be greater than 0'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().optional(),
  merchant: z.string().optional(),
  date: z.string().refine((date) => {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    return selectedDate <= today;
  }, 'Date cannot be in the future'),
});

export default function EditTransactionModal({ transaction, onClose, onUpdate }) {
  const [type, setType] = useState(transaction?.type || 'expense');
  const [amount, setAmount] = useState(transaction?.amount?.toString() || '');
  const [category, setCategory] = useState(transaction?.category || '');
  const [description, setDescription] = useState(transaction?.description || '');
  const [merchant, setMerchant] = useState(transaction?.merchant || '');
  const [date, setDate] = useState(
    transaction?.date 
      ? new Date(transaction.date).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0]
  );
  const [aiSuggested, setAiSuggested] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiMethod, setAiMethod] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (transaction) {
      setType(transaction.type || 'expense');
      setAmount(transaction.amount?.toString() || '');
      setCategory(transaction.category || '');
      setDescription(transaction.description || '');
      setMerchant(transaction.merchant || '');
      setDate(
        transaction.date 
          ? new Date(transaction.date).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0]
      );
    }
  }, [transaction]);

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

  const validateField = (fieldName, value) => {
    try {
      const formData = {
        type,
        amount: fieldName === 'amount' ? (value ? parseFloat(value) : 0) : parseFloat(amount) || 0,
        category: fieldName === 'category' ? value : category,
        description: fieldName === 'description' ? value : description,
        merchant: fieldName === 'merchant' ? value : merchant,
        date: fieldName === 'date' ? value : date,
      };
      
      transactionSchema.parse(formData);
      setErrors(prev => ({ ...prev, [fieldName]: null }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldError = error.errors.find(e => e.path.includes(fieldName));
        if (fieldError) {
          setErrors(prev => ({ ...prev, [fieldName]: fieldError.message }));
          return false;
        }
      }
      setErrors(prev => ({ ...prev, [fieldName]: null }));
      return true;
    }
  };

  const handleBlur = (fieldName) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    const value = fieldName === 'amount' ? amount : 
                  fieldName === 'category' ? category :
                  fieldName === 'description' ? description :
                  fieldName === 'merchant' ? merchant : date;
    validateField(fieldName, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ amount: true, category: true, date: true });
    
    const formData = {
      type,
      amount: parseFloat(amount),
      category,
      description,
      merchant,
      date,
    };

    try {
      transactionSchema.parse(formData);
      setErrors({});
      setLoading(true);
      await onUpdate(transaction.id, formData);
      onClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = {};
        error.errors.forEach(err => {
          const field = err.path[0];
          newErrors[field] = err.message;
        });
        setErrors(newErrors);
      } else {
        console.error('Error updating transaction:', error);
        alert('Failed to update transaction. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!transaction) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-gray-900 dark:text-gray-100">Edit Transaction</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Transaction Type */}
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Transaction Type</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setType('income')}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  type === 'income'
                    ? 'border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                    : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Income
              </button>
              <button
                type="button"
                onClick={() => setType('expense')}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  type === 'expense'
                    ? 'border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                    : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Expense
              </button>
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Amount *</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  if (touched.amount) validateField('amount', e.target.value);
                }}
                onBlur={() => handleBlur('amount')}
                className={`w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                  errors.amount && touched.amount ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="0.00"
                required
              />
            </div>
            {errors.amount && touched.amount && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.amount}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (touched.description) validateField('description', e.target.value);
              }}
              onBlur={() => handleBlur('description')}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                errors.description && touched.description ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="e.g., Lunch with friends"
            />
            {errors.description && touched.description && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>
            )}
          </div>

          {/* Merchant */}
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Merchant/Store</label>
            <input
              type="text"
              value={merchant}
              onChange={(e) => {
                setMerchant(e.target.value);
                if (touched.merchant) validateField('merchant', e.target.value);
              }}
              onBlur={() => handleBlur('merchant')}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                errors.merchant && touched.merchant ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="e.g., Starbucks"
            />
            {errors.merchant && touched.merchant && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.merchant}</p>
            )}
          </div>

          {/* AI Categorize Button */}
          {(description || merchant) && !category && (
            <button
              type="button"
              onClick={handleAICategorize}
              disabled={aiLoading}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className={`w-4 h-4 ${aiLoading ? 'animate-spin' : ''}`} />
              {aiLoading ? 'Categorizing...' : 'AI Categorize'}
            </button>
          )}

          {/* Category */}
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
              Category *
              {aiSuggested && (
                <span className="ml-2 text-xs text-purple-600 dark:text-purple-400">
                  ✨ AI Suggested {aiMethod === 'openai' && '(OpenAI)'} {aiMethod === 'gemini' && '(Gemini)'} {aiMethod === 'keyword' && '(Keyword)'}
                </span>
              )}
            </label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                if (touched.category) validateField('category', e.target.value);
              }}
              onBlur={() => handleBlur('category')}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                errors.category && touched.category ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
              }`}
              required
            >
              <option value="">Select a category</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && touched.category && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.category}</p>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                if (touched.date) validateField('date', e.target.value);
              }}
              onBlur={() => handleBlur('date')}
              max={new Date().toISOString().split('T')[0]}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                errors.date && touched.date ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.date && touched.date && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.date}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-emerald-500 dark:bg-emerald-600 text-white rounded-lg hover:bg-emerald-600 dark:hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

