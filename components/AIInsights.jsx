import { Sparkles, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

export default function AIInsights({ transactions }) {
  const generateInsights = () => {
    if (transactions.length === 0) {
      return [];
    }

    const insights = [];
    
    // Calculate total expenses
    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    // Insight 1: Spending vs Income
    if (totalIncome > 0) {
      const spendingRate = (totalExpenses / totalIncome) * 100;
      if (spendingRate < 70) {
        insights.push({
          type: 'positive',
          icon: TrendingUp,
          message: `Great job! You're spending only ${spendingRate.toFixed(0)}% of your income. Keep up the good saving habits!`,
        });
      } else if (spendingRate > 90) {
        insights.push({
          type: 'warning',
          icon: AlertCircle,
          message: `You're spending ${spendingRate.toFixed(0)}% of your income. Consider cutting back to build savings.`,
        });
      }
    }

    // Insight 2: Top spending category
    const categoryTotals = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});

    const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];
    if (topCategory && totalExpenses > 0) {
      const percentage = (topCategory[1] / totalExpenses) * 100;
      insights.push({
        type: 'info',
        icon: Sparkles,
        message: `Your biggest expense is ${topCategory[0]} at $${topCategory[1].toFixed(2)} (${percentage.toFixed(0)}% of spending).`,
      });
    }

    // Insight 3: Savings potential
    const savingsPotential = totalIncome - totalExpenses;
    if (savingsPotential > 0) {
      insights.push({
        type: 'positive',
        icon: TrendingUp,
        message: `You're on track to save $${savingsPotential.toFixed(2)} this month! Consider setting a savings goal.`,
      });
    } else if (savingsPotential < 0) {
      insights.push({
        type: 'warning',
        icon: TrendingDown,
        message: `You're spending $${Math.abs(savingsPotential).toFixed(2)} more than you earn. Review your expenses.`,
      });
    }

    // Insight 4: Transaction frequency
    const avgTransactionAmount = totalExpenses / transactions.filter(t => t.type === 'expense').length;
    if (avgTransactionAmount < 20) {
      insights.push({
        type: 'info',
        icon: Sparkles,
        message: `You make frequent small purchases (avg $${avgTransactionAmount.toFixed(2)}). These can add up quickly!`,
      });
    }

    return insights;
  };

  const insights = generateInsights();

  if (insights.length === 0) {
    return (
      <div className="bg-gradient-to-br from-purple-50 dark:from-purple-900/20 to-blue-50 dark:to-blue-900/20 rounded-xl border border-purple-200 dark:border-purple-800 p-6">
        <div className="flex items-center gap-3 mb-3">
          <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <h3 className="text-gray-900 dark:text-gray-100">AI Insights</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          Add some transactions to get personalized insights about your spending patterns!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 dark:from-purple-900/20 to-blue-50 dark:to-blue-900/20 rounded-xl border border-purple-200 dark:border-purple-800 p-6">
      <div className="flex items-center gap-3 mb-4">
        <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        <h3 className="text-gray-900 dark:text-gray-100">AI Insights</h3>
      </div>

      <div className="space-y-3">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          const colors = {
            positive: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300',
            warning: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300',
            info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300',
          };

          return (
            <div
              key={index}
              className={`p-4 rounded-lg border ${colors[insight.type]}`}
            >
              <div className="flex items-start gap-3">
                <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p className="text-sm flex-1">{insight.message}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

