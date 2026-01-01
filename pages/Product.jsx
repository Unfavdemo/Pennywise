import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { Plus, TrendingUp, TrendingDown, Filter, Sparkles, Edit2, Trash2 } from 'lucide-react';
import AddTransactionModal from '../components/AddTransactionModal';
import AddGoalModal from '../components/AddGoalModal';
import TransactionList from '../components/TransactionList';
import SavingsGoals from '../components/SavingsGoals';
import InsightsCharts from '../components/InsightsCharts';
import AIInsights from '../components/AIInsights';

export default function Product() {
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [filter, setFilter] = useState('all');

  // Load data from localStorage
  useEffect(() => {
    const savedTransactions = localStorage.getItem('pennywise_transactions');
    const savedGoals = localStorage.getItem('pennywise_goals');
    
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  // Save transactions to localStorage
  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem('pennywise_transactions', JSON.stringify(transactions));
    }
  }, [transactions]);

  // Save goals to localStorage
  useEffect(() => {
    if (goals.length > 0) {
      localStorage.setItem('pennywise_goals', JSON.stringify(goals));
    }
  }, [goals]);

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setTransactions([newTransaction, ...transactions]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const addGoal = (goal) => {
    const newGoal = {
      ...goal,
      id: Date.now().toString(),
      currentAmount: 0,
    };
    setGoals([...goals, newGoal]);
  };

  const updateGoal = (id, amount) => {
    setGoals(goals.map(g => 
      g.id === id ? { ...g, currentAmount: g.currentAmount + amount } : g
    ));
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter(g => g.id !== id));
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              onDelete={deleteTransaction}
            />

            {/* Insights & Charts */}
            <InsightsCharts transactions={transactions} />
          </div>

          {/* Right Column - Goals & Insights */}
          <div className="space-y-6">
            {/* AI Insights */}
            <AIInsights transactions={transactions} />

            {/* Savings Goals */}
            <SavingsGoals 
              goals={goals}
              onAddGoal={() => setShowAddGoal(true)}
              onUpdateGoal={updateGoal}
              onDeleteGoal={deleteGoal}
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

      {showAddGoal && (
        <AddGoalModal
          onClose={() => setShowAddGoal(false)}
          onAdd={addGoal}
        />
      )}

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

