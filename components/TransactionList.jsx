import { Trash2, Filter, Edit2 } from 'lucide-react';

export default function TransactionList({ transactions, filter, setFilter, onDelete, onEdit }) {
  const filteredTransactions = transactions.filter(t => {
    if (filter === 'all') return true;
    return t.type === filter;
  });

  const getCategoryColor = (category) => {
    const colors = {
      'Food & Dining': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
      'Transportation': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
      'Entertainment': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
      'Shopping': 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300',
      'Education': 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300',
      'Health & Fitness': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
      'Bills & Utilities': 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
      'Income': 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
      'Other': 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300',
    };
    return colors[category] || 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900 dark:text-gray-100">Transactions</h3>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              filter === 'all'
                ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('income')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              filter === 'income'
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Income
          </button>
          <button
            onClick={() => setFilter('expense')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              filter === 'expense'
                ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Expenses
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {filteredTransactions.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-4xl mb-4">📊</div>
            <p className="text-gray-500 dark:text-gray-400 mb-2">No transactions yet</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Start by adding your first transaction above</p>
          </div>
        ) : (
          filteredTransactions.map(transaction => (
            <div key={transaction.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`px-2 py-1 rounded-lg text-xs ${getCategoryColor(transaction.category)}`}>
                      {transaction.category}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(transaction.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-900 dark:text-gray-100">
                    {transaction.description || transaction.merchant || 'Transaction'}
                  </p>
                  {transaction.merchant && transaction.description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">{transaction.merchant}</p>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  <span className={`${
                    transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(transaction)}
                        className="p-2 text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors"
                        title="Edit transaction"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => onDelete(transaction.id)}
                      className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Delete transaction"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {filteredTransactions.length > 0 && (
        <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-300">Total</span>
            <span className="text-gray-900 dark:text-gray-100">
              ${filteredTransactions.reduce((sum, t) => {
                return sum + (t.type === 'income' ? t.amount : -t.amount);
              }, 0).toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

