import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Transaction } from '../pages/Product';

interface InsightsChartsProps {
  transactions: Transaction[];
}

const COLORS = ['#f97316', '#3b82f6', '#a855f7', '#ec4899', '#6366f1', '#10b981', '#64748b', '#eab308'];

export default function InsightsCharts({ transactions }: InsightsChartsProps) {
  // Calculate spending by category
  const categoryData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      const existing = acc.find(item => item.name === t.category);
      if (existing) {
        existing.value += t.amount;
      } else {
        acc.push({ name: t.category, value: t.amount });
      }
      return acc;
    }, [] as { name: string; value: number }[]);

  // Calculate monthly trend (simplified - using transaction dates)
  const monthlyData = transactions.reduce((acc, t) => {
    const month = new Date(t.date).toLocaleDateString('en-US', { month: 'short' });
    const existing = acc.find(item => item.month === month);
    
    if (existing) {
      if (t.type === 'income') {
        existing.income += t.amount;
      } else {
        existing.expenses += t.amount;
      }
    } else {
      acc.push({
        month,
        income: t.type === 'income' ? t.amount : 0,
        expenses: t.type === 'expense' ? t.amount : 0,
      });
    }
    return acc;
  }, [] as { month: string; income: number; expenses: number }[]);

  if (transactions.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-gray-900 mb-6">Spending Insights</h3>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Pie Chart - Spending by Category */}
        {categoryData.length > 0 && (
          <div>
            <h4 className="text-gray-700 text-sm mb-4">Expenses by Category</h4>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Bar Chart - Monthly Trend */}
        {monthlyData.length > 0 && (
          <div>
            <h4 className="text-gray-700 text-sm mb-4">Income vs Expenses</h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
                <Legend />
                <Bar dataKey="income" fill="#10b981" name="Income" />
                <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
