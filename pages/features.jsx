import Link from 'next/link';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { TrendingUp, Target, PieChart, Clock, Sparkles, Zap, Brain, Shield, ArrowRight } from 'lucide-react';

export default function Features() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Navigation />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-gray-900 dark:text-gray-100 mb-4">Features That Make a Difference</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to take control of your finances, powered by AI to make budgeting effortless.
            </p>
          </div>

          {/* AI Integration Highlight - Hero Section */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-purple-500 via-blue-500 to-emerald-500 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                  <Sparkles className="w-5 h-5" />
                  <span>AI-Powered Intelligence</span>
                </div>
                
                <h2 className="text-white mb-4">
                  Smart Technology, Simpler Budgeting
                </h2>
                
                <p className="text-white/90 text-lg mb-8 max-w-2xl">
                  Pennywise uses artificial intelligence to understand your spending patterns, automatically categorize expenses, and provide personalized insights - so you can focus on living, not tracking.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Brain className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white mb-2">Smart Categorization</h3>
                        <p className="text-white/80 text-sm">
                          Type "Chipotle lunch" and watch AI instantly suggest "Food & Dining" - no manual sorting needed.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white mb-2">Predictive Budgeting</h3>
                        <p className="text-white/80 text-sm">
                          Get budget suggestions based on your actual spending history, not generic templates.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white mb-2">Intelligent Insights</h3>
                        <p className="text-white/80 text-sm">
                          Discover patterns you didn't know existed: "You spend 40% more on weekends" or "Coffee purchases up 25% during finals."
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white mb-2">Anomaly Detection</h3>
                        <p className="text-white/80 text-sm">
                          Get alerts when spending spikes unusually - catch problems before they become habits.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Core Features Showcase */}
          <section className="mb-16">
            <h2 className="text-center text-gray-900 dark:text-gray-100 mb-8">Core Features</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-emerald-500 dark:hover:border-emerald-400 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-gray-900 dark:text-gray-100 mb-2">Quick Transaction Entry</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  Add income and expenses in under 10 seconds with our streamlined form. No complexity, just speed.
                </p>
                <Link href="/product" className="text-emerald-600 text-sm hover:text-emerald-700 inline-flex items-center gap-1">
                  Try it <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                  <PieChart className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-gray-900 dark:text-gray-100 mb-2">Smart Categories</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  Organize spending into intuitive categories. AI suggests the right one based on your description.
                </p>
                <Link href="/product" className="text-blue-600 text-sm hover:text-blue-700 inline-flex items-center gap-1">
                  Try it <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-purple-500 dark:hover:border-purple-400 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-gray-900 dark:text-gray-100 mb-2">Savings Goals</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  Set financial targets and track progress with visual bars. See your goals come to life.
                </p>
                <Link href="/product" className="text-purple-600 text-sm hover:text-purple-700 inline-flex items-center gap-1">
                  Try it <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-amber-500 dark:hover:border-amber-400 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-gray-900 dark:text-gray-100 mb-2">Visual Insights</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  See your spending patterns through charts and graphs. Understanding leads to better decisions.
                </p>
                <Link href="/product" className="text-amber-600 text-sm hover:text-amber-700 inline-flex items-center gap-1">
                  Try it <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* Differentiation Section */}
          <section className="mb-16">
            <h2 className="text-center text-gray-900 dark:text-gray-100 mb-8">Why Choose Pennywise?</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎓</span>
                </div>
                <h3 className="text-gray-900 dark:text-gray-100 mb-3">Built for Students</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Not another generic finance app. Every feature is designed specifically for student life, student budgets, and student goals.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🤖</span>
                </div>
                <h3 className="text-gray-900 dark:text-gray-100 mb-3">AI-Powered Insights</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Let artificial intelligence do the heavy lifting. Get smart suggestions, pattern recognition, and personalized tips automatically.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✨</span>
                </div>
                <h3 className="text-gray-900 dark:text-gray-100 mb-3">Simple & Approachable</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  No financial jargon. No overwhelming complexity. Just a clean, friendly interface that helps you understand your money.
                </p>
              </div>
            </div>
          </section>

          {/* How AI Helps */}
          <section className="mb-16">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 md:p-12">
              <h2 className="text-gray-900 dark:text-gray-100 mb-6 text-center">How AI Solves Real Problems</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 mb-4">
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">😫</div>
                      <div>
                        <h4 className="text-gray-900 dark:text-gray-100 mb-1">Problem: Manual categorization is tedious</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">Students abandon budgeting because sorting every transaction takes too long</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 border border-emerald-200 dark:border-emerald-800">
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">✅</div>
                      <div>
                        <h4 className="text-emerald-700 dark:text-emerald-300 mb-1">AI Solution: Auto-categorization</h4>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">AI reads "Starbucks coffee" and instantly suggests "Food & Dining" - you just confirm or adjust</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 mb-4">
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">🤷</div>
                      <div>
                        <h4 className="text-gray-900 dark:text-gray-100 mb-1">Problem: No idea what's "normal" spending</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">Students don't know if spending $200 on food is reasonable or excessive</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 border border-emerald-200 dark:border-emerald-800">
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">✅</div>
                      <div>
                        <h4 className="text-emerald-700 dark:text-emerald-300 mb-1">AI Solution: Personalized insights</h4>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">AI compares to your history: "Food spending up 30% this month" with context and suggestions</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl p-8 md:p-12 text-white">
              <h2 className="text-white mb-4">Ready to Transform Your Finances?</h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Join students who are taking control of their money with Pennywise. Start tracking, start saving, start succeeding.
              </p>
              <Link
                href="/product"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-600 rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Experience the Full Product
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
