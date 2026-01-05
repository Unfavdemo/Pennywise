import Link from 'next/link';
import { Wallet, TrendingUp, Target, Sparkles, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-emerald-50 to-white dark:from-gray-900 dark:to-gray-800">
      
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">AI-Powered Money Management</span>
          </div>
          
          <h1 className="text-gray-900 dark:text-gray-100 mb-6">
            Take Control of Your Money, Student Style
          </h1>
          
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Budget smarter. Save faster. Stress less. Pennywise is the financial companion built specifically for students who want to take charge of their finances without the complexity.
          </p>
          
          <Link
            href="/product"
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 dark:bg-emerald-600 text-white rounded-lg hover:bg-emerald-600 dark:hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Start Budgeting
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Who Will Benefit Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-gray-900 dark:text-gray-100 mb-4">
            Perfect for Students Who Want To...
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-xl">
              <div className="w-12 h-12 bg-emerald-500 dark:bg-emerald-600 rounded-lg flex items-center justify-center mb-4">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-gray-900 dark:text-gray-100 mb-2">Track spending without stress</h3>
              <p className="text-gray-600 dark:text-gray-300">Simple, quick expense tracking that doesn&apos;t feel like a chore</p>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-500 dark:bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-gray-900 dark:text-gray-100 mb-2">Build savings habits that last</h3>
              <p className="text-gray-600 dark:text-gray-300">Set goals and watch your progress grow with every dollar saved</p>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl">
              <div className="w-12 h-12 bg-purple-500 dark:bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-gray-900 dark:text-gray-100 mb-2">Understand where money goes</h3>
              <p className="text-gray-600 dark:text-gray-300">Visual insights that make your spending patterns crystal clear</p>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl">
              <div className="w-12 h-12 bg-amber-500 dark:bg-amber-600 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-gray-900 dark:text-gray-100 mb-2">Achieve financial goals</h3>
              <p className="text-gray-600 dark:text-gray-300">AI-powered insights help you make smarter money decisions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Features Preview */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-gray-900 dark:text-gray-100 mb-4">
            Everything You Need, Nothing You Don&apos;t
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            We&apos;ve built Pennywise with students in mind - simple, powerful, and actually enjoyable to use.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-600 transition-colors">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-gray-900 dark:text-gray-100 mb-2">Easy Expense Tracking</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Add transactions in seconds with our streamlined interface</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-600 transition-colors">
              <div className="text-3xl mb-3">🤖</div>
              <h3 className="text-gray-900 dark:text-gray-100 mb-2">Smart Categorization</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">AI automatically categorizes your expenses - no manual sorting needed</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-600 transition-colors">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-gray-900 dark:text-gray-100 mb-2">Savings Goals</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Set and track financial goals with visual progress indicators</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-600 transition-colors">
              <div className="text-3xl mb-3">📈</div>
              <h3 className="text-gray-900 dark:text-gray-100 mb-2">Visual Insights</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Beautiful charts and graphs help you understand your spending patterns</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
