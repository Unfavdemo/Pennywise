import { Trash2, Filter } from 'lucide-react';
import { Transaction } from '../pages/Product';

interface TransactionListProps {
  transactions: Transaction[];
  filter: 'all' | 'income' | 'expense';
  setFilter: (filter: 'all' | 'income' | 'expense') => void;
  onDelete: (id: string) => void;
}

export default function TransactionList({ transactions, filter, setFilter, onDelete }: TransactionListProps) {
  const filteredTransactions = transactions.filter(t => {
    if (filter === 'all') return true;
    return t.type === filter;
  });

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Food & Dining': 'bg-orange-100 text-orange-700',
      'Transportation': 'bg-blue-100 text-blue-700',
      'Entertainment': 'bg-purple-100 text-purple-700',
      'Shopping': 'bg-pink-100 text-pink-700',
      'Education': 'bg-indigo-100 text-indigo-700',
      'Health & Fitness': 'bg-green-100 text-green-700',
      'Bills & Utilities': 'bg-gray-100 text-gray-700',
      'Income': 'bg-emerald-100 text-emerald-700',
      'Other': 'bg-slate-100 text-slate-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Transactions</h3>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              filter === 'all'
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('income')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              filter === 'income'
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Income
          </button>
          <button
            onClick={() => setFilter('expense')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              filter === 'expense'
                ? 'bg-red-100 text-red-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Expenses
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {filteredTransactions.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-4xl mb-4">📊</div>
            <p className="text-gray-500 mb-2">No transactions yet</p>
            <p className="text-sm text-gray-400">Start by adding your first transaction above</p>
          </div>
        ) : (
          filteredTransactions.map(transaction => (
            <div key={transaction.id} className="p-4 hover:bg-gray-50 transition-colors group">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`px-2 py-1 rounded-lg text-xs ${getCategoryColor(transaction.category)}`}>
                      {transaction.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(transaction.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-900">
                    {transaction.description || transaction.merchant || 'Transaction'}
                  </p>
                  {transaction.merchant && transaction.description && (
                    <p className="text-sm text-gray-500">{transaction.merchant}</p>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  <span className={`${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </span>
                  <button
                    onClick={() => onDelete(transaction.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {filteredTransactions.length > 0 && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Total</span>
            <span className="text-gray-900">
              {filteredTransactions.reduce((sum, t) => {
                return sum + (t.type === 'income' ? t.amount : -t.amount);
              }, 0).toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
