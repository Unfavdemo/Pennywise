import { useState, useEffect, useCallback } from 'react';
import { Plus, Trash2, Edit2, AlertTriangle, CheckCircle } from 'lucide-react';
import { apiRequest, handleApiResponse } from '../lib/api-helpers';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Education',
  'Health & Fitness',
  'Bills & Utilities',
  'Other',
];

const PERIODS = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'yearly', label: 'Yearly' },
];

export default function BudgetTracking({ transactions }) {
  const [budgets, setBudgets] = useState([]);
  const [showAddBudget, setShowAddBudget] = useState(false);
  const [loading, setLoading] = useState(true);
  const [budgetProgress, setBudgetProgress] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, id: null });

  useEffect(() => {
    fetchBudgets();
  }, []);

  const calculateProgress = useCallback(() => {
    const progress = {};
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    budgets.forEach(budget => {
      let startDate, endDate;
      
      if (budget.period === 'monthly') {
        startDate = new Date(currentYear, currentMonth, 1);
        endDate = new Date(currentYear, currentMonth + 1, 0);
      } else if (budget.period === 'weekly') {
        const dayOfWeek = now.getDay();
        startDate = new Date(now);
        startDate.setDate(now.getDate() - dayOfWeek);
        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
      } else if (budget.period === 'yearly') {
        startDate = new Date(currentYear, 0, 1);
        endDate = new Date(currentYear, 11, 31);
      } else {
        startDate = budget.startDate ? new Date(budget.startDate) : new Date();
        endDate = budget.endDate ? new Date(budget.endDate) : null;
      }

      const categoryTransactions = transactions.filter(t => 
        t.type === 'expense' &&
        t.category === budget.category &&
        new Date(t.date) >= startDate &&
        (!endDate || new Date(t.date) <= endDate)
      );

      const spent = categoryTransactions.reduce((sum, t) => sum + t.amount, 0);
      const percentage = (spent / budget.amount) * 100;

      progress[budget.id] = {
        spent,
        percentage,
        remaining: budget.amount - spent,
      };
    });

    setBudgetProgress(progress);
  }, [budgets, transactions]);

  useEffect(() => {
    if (budgets.length > 0 && transactions.length > 0) {
      calculateProgress();
    }
  }, [budgets, transactions, calculateProgress]);

  const fetchBudgets = async () => {
    try {
      setLoading(true);
      const response = await apiRequest('/api/budgets');
      const data = await handleApiResponse(response);
      setBudgets(data);
    } catch (error) {
      console.error('Error fetching budgets:', error);
    } finally {
      setLoading(false);
    }
  };

  const addBudget = async (budgetData) => {
    try {
      const response = await apiRequest('/api/budgets', {
        method: 'POST',
        body: JSON.stringify(budgetData),
      });

      const newBudget = await handleApiResponse(response);
      setBudgets([...budgets, newBudget]);
      setShowAddBudget(false);
    } catch (error) {
      console.error('Error adding budget:', error);
      alert(error.message || 'Failed to add budget');
    }
  };

  const handleDeleteBudgetClick = (id) => {
    setDeleteConfirm({ isOpen: true, id });
  };

  const deleteBudget = async () => {
    const id = deleteConfirm.id;
    try {
      await apiRequest(`/api/budgets/${id}`, {
        method: 'DELETE',
      });

      setBudgets(budgets.filter(b => b.id !== id));
      setDeleteConfirm({ isOpen: false, id: null });
    } catch (error) {
      console.error('Error deleting budget:', error);
      alert(error.message || 'Failed to delete budget');
      setDeleteConfirm({ isOpen: false, id: null });
    }
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 100) return 'bg-red-500';
    if (percentage >= 80) return 'bg-yellow-500';
    return 'bg-emerald-500';
  };

  const getProgressWarning = (percentage) => {
    if (percentage >= 100) return { icon: AlertTriangle, text: 'Over budget!', color: 'text-red-600', darkColor: 'dark:text-red-400' };
    if (percentage >= 80) return { icon: AlertTriangle, text: 'Approaching limit', color: 'text-yellow-600', darkColor: 'dark:text-yellow-400' };
    return { icon: CheckCircle, text: 'On track', color: 'text-emerald-600', darkColor: 'dark:text-emerald-400' };
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <p className="text-gray-500 dark:text-gray-400">Loading budgets...</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-900 dark:text-gray-100">Budget Tracking</h3>
        <button
          onClick={() => setShowAddBudget(true)}
          className="p-2 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors text-emerald-600 dark:text-emerald-400"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {budgets.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">💰</div>
          <p className="text-gray-500 dark:text-gray-400 mb-2">No budgets set</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Create a budget to track your spending</p>
          <button
            onClick={() => setShowAddBudget(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Budget
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {budgets.map(budget => {
            const progress = budgetProgress[budget.id] || { spent: 0, percentage: 0, remaining: budget.amount };
            const warning = getProgressWarning(progress.percentage);
            const WarningIcon = warning.icon;

            return (
              <div key={budget.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-emerald-300 dark:hover:border-emerald-600 transition-colors group">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-gray-900 dark:text-gray-100">{budget.category}</h4>
                      <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
                        {PERIODS.find(p => p.value === budget.period)?.label || budget.period}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      ${progress.spent.toFixed(2)} of ${budget.amount.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteBudgetClick(budget.id)}
                    className="p-1 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="mb-2">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`${getProgressColor(progress.percentage)} h-2 rounded-full transition-all`}
                      style={{ width: `${Math.min(progress.percentage, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {progress.percentage.toFixed(0)}% used
                    </span>
                    <div className="flex items-center gap-1 text-xs">
                      <WarningIcon className={`w-3 h-3 ${warning.color} ${warning.darkColor}`} />
                      <span className={`${warning.color} ${warning.darkColor}`}>{warning.text}</span>
                    </div>
                  </div>
                </div>

                {progress.remaining > 0 && (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400">
                    ${progress.remaining.toFixed(2)} remaining
                  </p>
                )}
                {progress.remaining < 0 && (
                  <p className="text-xs text-red-600 dark:text-red-400">
                    ${Math.abs(progress.remaining).toFixed(2)} over budget
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {showAddBudget && (
        <AddBudgetModal
          onClose={() => setShowAddBudget(false)}
          onAdd={addBudget}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, id: null })}
        onConfirm={deleteBudget}
        title="Delete Budget"
        message="Are you sure you want to delete this budget? This action cannot be undone."
      />
    </div>
  );
}

function AddBudgetModal({ onClose, onAdd }) {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [period, setPeriod] = useState('monthly');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    if (!category) {
      setErrors({ category: 'Category is required' });
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      setErrors({ amount: 'Amount must be greater than 0' });
      return;
    }

    onAdd({
      category,
      amount: parseFloat(amount),
      period,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-gray-900 dark:text-gray-100">Create Budget</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <span className="text-gray-500 dark:text-gray-400">×</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Category *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                errors.category ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
              }`}
              required
            >
              <option value="">Select a category</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.category}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Budget Amount *</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={`w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                  errors.amount ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="0.00"
                required
              />
            </div>
            {errors.amount && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.amount}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Period *</label>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              required
            >
              {PERIODS.map(p => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-emerald-500 dark:bg-emerald-600 text-white rounded-lg hover:bg-emerald-600 dark:hover:bg-emerald-700 transition-colors"
            >
              Create Budget
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

