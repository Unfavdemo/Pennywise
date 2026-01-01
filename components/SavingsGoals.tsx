import { Plus, Trash2, DollarSign } from 'lucide-react';
import { Goal } from '../pages/Product';
import { useState } from 'react';

interface SavingsGoalsProps {
  goals: Goal[];
  onAddGoal: () => void;
  onUpdateGoal: (id: string, amount: number) => void;
  onDeleteGoal: (id: string) => void;
}

export default function SavingsGoals({ goals, onAddGoal, onUpdateGoal, onDeleteGoal }: SavingsGoalsProps) {
  const [addingToGoal, setAddingToGoal] = useState<string | null>(null);
  const [addAmount, setAddAmount] = useState('');

  const handleAddToGoal = (goalId: string) => {
    const amount = parseFloat(addAmount);
    if (amount > 0) {
      onUpdateGoal(goalId, amount);
      setAddingToGoal(null);
      setAddAmount('');
    }
  };

  const getDaysUntilDeadline = (deadline?: string) => {
    if (!deadline) return null;
    const today = new Date();
    const target = new Date(deadline);
    const diff = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-900">Savings Goals</h3>
        <button
          onClick={onAddGoal}
          className="p-2 hover:bg-emerald-50 rounded-lg transition-colors text-emerald-600"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {goals.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🎯</div>
            <p className="text-gray-500 mb-2">No goals yet</p>
            <p className="text-sm text-gray-400 mb-4">Create your first savings goal</p>
            <button
              onClick={onAddGoal}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Goal
            </button>
          </div>
        ) : (
          goals.map(goal => {
            const progress = (goal.currentAmount / goal.targetAmount) * 100;
            const daysLeft = getDaysUntilDeadline(goal.deadline);
            
            return (
              <div key={goal.id} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors group">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-gray-900 mb-1">{goal.name}</h4>
                    <p className="text-sm text-gray-500">
                      ${goal.currentAmount.toFixed(2)} of ${goal.targetAmount.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => onDeleteGoal(goal.id)}
                    className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full transition-all"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">{progress.toFixed(0)}% complete</span>
                    {daysLeft !== null && (
                      <span className="text-xs text-gray-500">
                        {daysLeft > 0 ? `${daysLeft} days left` : 'Deadline passed'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Add Money Button */}
                {addingToGoal === goal.id ? (
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                      <input
                        type="number"
                        step="0.01"
                        value={addAmount}
                        onChange={(e) => setAddAmount(e.target.value)}
                        className="w-full pl-7 pr-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        placeholder="0.00"
                        autoFocus
                      />
                    </div>
                    <button
                      onClick={() => handleAddToGoal(goal.id)}
                      className="px-3 py-1.5 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => {
                        setAddingToGoal(null);
                        setAddAmount('');
                      }}
                      className="px-3 py-1.5 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setAddingToGoal(goal.id)}
                    className="w-full py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors text-sm flex items-center justify-center gap-2"
                  >
                    <DollarSign className="w-4 h-4" />
                    Add Money
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
