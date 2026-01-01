import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navigation from '../components/Navigation';
import { Plus, TrendingUp, TrendingDown, Filter, Sparkles, Edit2, Trash2 } from 'lucide-react';
import AddTransactionModal from '../components/AddTransactionModal';
import AddGoalModal from '../components/AddGoalModal';
import EditTransactionModal from '../components/EditTransactionModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import TransactionList from '../components/TransactionList';
import SavingsGoals from '../components/SavingsGoals';
import BudgetTracking from '../components/BudgetTracking';
import InsightsCharts from '../components/InsightsCharts';
import AIInsights from '../components/AIInsights';
import { apiRequest, handleApiResponse } from '../lib/api-helpers';
import { useAuth } from '../context/AuthContext';
import { useMigration } from '../lib/useMigration';

export default function Product() {
  const { user } = useAuth();
  const router = useRouter();
  const { isMigrating, migrationComplete, migrationResult, checkAndMigrate } = useMigration();
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMigrationSuccess, setShowMigrationSuccess] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, type: null, id: null });

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  // Check and migrate data on mount
  useEffect(() => {
    if (user && !migrationComplete && !isMigrating) {
      checkAndMigrate();
    }
  }, [user, migrationComplete, isMigrating]);

  // Show migration success message
  useEffect(() => {
    if (migrationResult && migrationResult.transactionsMigrated + migrationResult.goalsMigrated > 0) {
      setShowMigrationSuccess(true);
      setTimeout(() => setShowMigrationSuccess(false), 5000);
    }
  }, [migrationResult]);

  // Fetch transactions and goals from API
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [transactionsRes, goalsRes] = await Promise.all([
          apiRequest('/api/transactions'),
          apiRequest('/api/goals'),
        ]);

        const transactionsData = await handleApiResponse(transactionsRes);
        const goalsData = await handleApiResponse(goalsRes);

        setTransactions(transactionsData);
        setGoals(goalsData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, migrationComplete]);

  const addTransaction = async (transaction) => {
    try {
      const response = await apiRequest('/api/transactions', {
        method: 'POST',
        body: JSON.stringify(transaction),
      });

      const newTransaction = await handleApiResponse(response);
      setTransactions([newTransaction, ...transactions]);
      setShowAddTransaction(false);
    } catch (err) {
      console.error('Error adding transaction:', err);
      alert(err.message || 'Failed to add transaction');
    }
  };

  const updateTransaction = async (id, transaction) => {
    try {
      const response = await apiRequest(`/api/transactions/${id}`, {
        method: 'PUT',
        body: JSON.stringify(transaction),
      });

      const updatedTransaction = await handleApiResponse(response);
      setTransactions(transactions.map(t => 
        t.id === id ? updatedTransaction : t
      ));
      setEditingTransaction(null);
    } catch (err) {
      console.error('Error updating transaction:', err);
      alert(err.message || 'Failed to update transaction');
      throw err;
    }
  };

  const handleDeleteTransactionClick = (id) => {
    setDeleteConfirm({ isOpen: true, type: 'transaction', id });
  };

  const deleteTransaction = async () => {
    const id = deleteConfirm.id;
    try {
      await apiRequest(`/api/transactions/${id}`, {
        method: 'DELETE',
      });

      setTransactions(transactions.filter(t => t.id !== id));
      setDeleteConfirm({ isOpen: false, type: null, id: null });
    } catch (err) {
      console.error('Error deleting transaction:', err);
      alert(err.message || 'Failed to delete transaction');
      setDeleteConfirm({ isOpen: false, type: null, id: null });
    }
  };

  const addGoal = async (goal) => {
    try {
      const response = await apiRequest('/api/goals', {
        method: 'POST',
        body: JSON.stringify(goal),
      });

      const newGoal = await handleApiResponse(response);
      setGoals([...goals, newGoal]);
      setShowAddGoal(false);
    } catch (err) {
      console.error('Error adding goal:', err);
      alert(err.message || 'Failed to add goal');
    }
  };

  const updateGoal = async (id, amount) => {
    try {
      const goal = goals.find(g => g.id === id);
      if (!goal) return;

      const updatedGoal = {
        ...goal,
        currentAmount: goal.currentAmount + amount,
      };

      const response = await apiRequest(`/api/goals/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          name: updatedGoal.name,
          targetAmount: updatedGoal.targetAmount,
          currentAmount: updatedGoal.currentAmount,
          deadline: updatedGoal.deadline,
        }),
      });

      const savedGoal = await handleApiResponse(response);
      setGoals(goals.map(g => g.id === id ? savedGoal : g));
    } catch (err) {
      console.error('Error updating goal:', err);
      alert(err.message || 'Failed to update goal');
    }
  };

  const handleDeleteGoalClick = (id) => {
    setDeleteConfirm({ isOpen: true, type: 'goal', id });
  };

  const deleteGoal = async () => {
    const id = deleteConfirm.id;
    try {
      await apiRequest(`/api/goals/${id}`, {
        method: 'DELETE',
      });

      setGoals(goals.filter(g => g.id !== id));
      setDeleteConfirm({ isOpen: false, type: null, id: null });
    } catch (err) {
      console.error('Error deleting goal:', err);
      alert(err.message || 'Failed to delete goal');
      setDeleteConfirm({ isOpen: false, type: null, id: null });
    }
  };

  // Calculate totals
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const currentBalance = totalIncome - totalExpenses;

  const totalSaved = goals.reduce((sum, g) => sum + g.currentAmount, 0);

  if (!user) {
    return null; // Will redirect
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg">
            <p className="font-semibold">Error loading data</p>
            <p className="text-sm">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 bg-red-600 dark:bg-red-700 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-800"
            >
              Retry
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Migration Success Banner */}
        {showMigrationSuccess && migrationResult && (
          <div className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg">
            <p className="font-semibold">✓ Data Migration Successful!</p>
            <p className="text-sm">
              Migrated {migrationResult.transactionsMigrated} transactions and {migrationResult.goalsMigrated} goals to your account.
            </p>
          </div>
        )}

        {/* Migration Progress */}
        {isMigrating && (
          <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 px-4 py-3 rounded-lg">
            <p className="font-semibold">Migrating your data...</p>
            <p className="text-sm">Please wait while we move your data to the database.</p>
          </div>
        )}

        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-gray-900 dark:text-gray-100 mb-6">Your Financial Dashboard</h1>
          
          {/* Balance Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-300 text-sm">Current Balance</span>
                <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                  💰
                </div>
              </div>
              <p className="text-gray-900 dark:text-gray-100 mb-1">${currentBalance.toFixed(2)}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total available</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-300 text-sm">Total Income</span>
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <p className="text-green-600 dark:text-green-400 mb-1">${totalIncome.toFixed(2)}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">This month</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-300 text-sm">Total Expenses</span>
                <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                  <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />
                </div>
              </div>
              <p className="text-red-600 dark:text-red-400 mb-1">${totalExpenses.toFixed(2)}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">This month</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-300 text-sm">Goals Progress</span>
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  🎯
                </div>
              </div>
              <p className="text-purple-600 dark:text-purple-400 mb-1">${totalSaved.toFixed(2)}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{goals.length} active goals</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Transactions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Add Transaction Button */}
            <button
              onClick={() => setShowAddTransaction(true)}
              className="w-full bg-emerald-500 dark:bg-emerald-600 text-white rounded-xl p-4 hover:bg-emerald-600 dark:hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Add Transaction
            </button>

            {/* Transaction List */}
            <TransactionList 
              transactions={transactions}
              filter={filter}
              setFilter={setFilter}
              onDelete={handleDeleteTransactionClick}
              onEdit={setEditingTransaction}
            />

            {/* Insights & Charts */}
            <InsightsCharts transactions={transactions} />
          </div>

          {/* Right Column - Goals & Insights */}
          <div className="space-y-6">
            {/* AI Insights */}
            <AIInsights transactions={transactions} />

            {/* Budget Tracking */}
            <BudgetTracking transactions={transactions} />

            {/* Savings Goals */}
            <SavingsGoals 
              goals={goals}
              onAddGoal={() => setShowAddGoal(true)}
              onUpdateGoal={updateGoal}
              onDeleteGoal={handleDeleteGoalClick}
            />
          </div>
        </div>
      </main>

      {/* Modals */}
      {showAddTransaction && (
        <AddTransactionModal
          onClose={() => setShowAddTransaction(false)}
          onAdd={addTransaction}
        />
      )}

      {editingTransaction && (
        <EditTransactionModal
          transaction={editingTransaction}
          onClose={() => setEditingTransaction(null)}
          onUpdate={updateTransaction}
        />
      )}

      {showAddGoal && (
        <AddGoalModal
          onClose={() => setShowAddGoal(false)}
          onAdd={addGoal}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, type: null, id: null })}
        onConfirm={deleteConfirm.type === 'transaction' ? deleteTransaction : deleteGoal}
        title={deleteConfirm.type === 'transaction' ? 'Delete Transaction' : 'Delete Goal'}
        message={
          deleteConfirm.type === 'transaction'
            ? 'Are you sure you want to delete this transaction? This action cannot be undone.'
            : 'Are you sure you want to delete this goal? This action cannot be undone.'
        }
      />

      {/* Floating Action Button (Mobile) */}
      <button
        onClick={() => setShowAddTransaction(true)}
        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-emerald-500 dark:bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-600 dark:hover:bg-emerald-700 transition-all flex items-center justify-center hover:scale-110"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}

