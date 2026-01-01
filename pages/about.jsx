import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { AlertCircle, TrendingDown, Clock, BookOpen } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Navigation />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-gray-900 dark:text-gray-100 mb-4">Understanding the Problem</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-12">
            Before building Pennywise, we needed to deeply understand the financial challenges students face every day.
          </p>

          {/* Problem Statement */}
          <section className="mb-12">
            <div className="bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500 dark:border-emerald-400 p-6 rounded-r-lg mb-6">
              <h2 className="text-gray-900 dark:text-gray-100 mb-4">The Student Financial Challenge</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  Students today face a unique financial paradox: they&apos;re earning and spending money, often for the first time in their lives, but they lack the tools, education, and time to manage it effectively. Unlike adults with stable incomes and established budgets, students juggle part-time jobs, variable financial aid, family support, and unexpected expenses - all while trying to focus on their education.
                </p>
                <p>
                  The core problem isn&apos;t just about not having enough money - it&apos;s about not knowing where the money goes. Students frequently find themselves broke before the month ends, unable to save for important goals, and stressed about finances in ways that impact their academic performance and mental health. This isn&apos;t due to irresponsibility; it&apos;s a lack of visibility, structure, and accessible tools designed for their specific situation.
                </p>
                <p>
                  Most existing financial apps are built for working adults with regular paychecks and complex financial portfolios. Students need something different: simple, fast, non-judgmental, and educational. They need a tool that meets them where they are and helps them build healthy money habits without overwhelming them with features they don&apos;t need or understand.
                </p>
              </div>
            </div>
          </section>

          {/* Real-World Manifestation */}
          <section className="mb-12">
            <h2 className="text-gray-900 dark:text-gray-100 mb-6">How This Shows Up in Real Life</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-xl">
                <AlertCircle className="w-8 h-8 text-orange-500 dark:text-orange-400 mb-4" />
                <h3 className="text-gray-900 dark:text-gray-100 mb-3">The Mystery of Disappearing Money</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Students often report feeling like their money &quot;just disappears.&quot; They know they had $200 last week, but now it&apos;s gone, and they can&apos;t pinpoint where it went. Small purchases - a coffee here, a snack there, an impulse buy online - add up invisibly without tracking.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-xl">
                <TrendingDown className="w-8 h-8 text-red-500 dark:text-red-400 mb-4" />
                <h3 className="text-gray-900 dark:text-gray-100 mb-3">Inability to Save for Goals</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Whether it&apos;s saving for spring break, a new laptop, or an emergency fund, students struggle to set aside money consistently. Without a clear picture of income vs. expenses, saving feels impossible or gets pushed aside for immediate needs.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-xl">
                <Clock className="w-8 h-8 text-purple-500 dark:text-purple-400 mb-4" />
                <h3 className="text-gray-900 dark:text-gray-100 mb-3">End-of-Month Panic</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Students frequently experience financial anxiety during the last week of the month, when money runs out before the next paycheck or allowance arrives. This leads to borrowing from friends, skipping meals, or racking up credit card debt.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-xl">
                <BookOpen className="w-8 h-8 text-blue-500 dark:text-blue-400 mb-4" />
                <h3 className="text-gray-900 dark:text-gray-100 mb-3">Lack of Financial Literacy</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Many students have never been taught basic budgeting, expense tracking, or financial planning. They want to manage money better but don't know where to start or what "good" money management even looks like.
                </p>
              </div>
            </div>
          </section>

          {/* Personal Example */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-blue-50 dark:from-blue-900/20 to-purple-50 dark:to-purple-900/20 p-8 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-4">
                <div className="text-4xl">💭</div>
                <div>
                  <h3 className="text-gray-900 dark:text-gray-100 mb-3">A Realistic Student Scenario</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Meet Jordan, a sophomore in college. Jordan works part-time at a campus library earning about $500 per month. Their parents send $200 monthly for personal expenses. With $700 total, Jordan should be comfortable, right?
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    But by the third week of every month, Jordan is broke. Where does the money go? $150 on food delivery apps (convenience during late-night study sessions), $80 on coffee shops (study fuel and social hangouts), $120 on streaming services and app subscriptions (most forgotten), $100 on spontaneous shopping (stress relief during midterms), $90 on Uber/Lyft (when running late to class), and countless small purchases that don't register mentally.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Jordan wants to save $500 for a summer program but has been trying for six months with zero progress. The problem isn't lack of income - it's lack of visibility and intentionality. Jordan needs to see where every dollar goes and make conscious decisions about spending vs. saving.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Why It's Difficult */}
          <section className="mb-12">
            <h2 className="text-gray-900 dark:text-gray-100 mb-6">Why Solving This Is Challenging</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-gray-900 dark:text-gray-100 mb-2">Limited Financial Education</h3>
                <p className="text-gray-600 dark:text-gray-300">Most schools don't teach personal finance, leaving students to figure it out on their own through trial and error.</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-gray-900 dark:text-gray-100 mb-2">Variable Income Sources</h3>
                <p className="text-gray-600 dark:text-gray-300">Unlike salaried adults, students have irregular income from multiple sources - part-time work, family support, financial aid - making budgeting complex.</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-gray-900 dark:text-gray-100 mb-2">Habit-Building Difficulty</h3>
                <p className="text-gray-600 dark:text-gray-300">Creating a consistent habit of tracking expenses requires discipline and motivation, especially when students are already overwhelmed with coursework.</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-gray-900 dark:text-gray-100 mb-2">Time Constraints</h3>
                <p className="text-gray-600 dark:text-gray-300">Students are busy with classes, homework, jobs, and social life. Complex budgeting systems get abandoned because they take too much time.</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-gray-900 dark:text-gray-100 mb-2">Existing Tools Are Too Complex</h3>
                <p className="text-gray-600 dark:text-gray-300">Traditional finance apps are designed for adults with mortgages, investments, and retirement planning - overwhelming and irrelevant for students.</p>
              </div>
            </div>
          </section>

          {/* Consequences */}
          <section className="mb-12">
            <h2 className="text-gray-900 dark:text-gray-100 mb-6">What Happens If We Don't Solve This</h2>
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 dark:border-red-400 p-6 rounded-r-lg">
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">•</span>
                  <span><strong>Debt Accumulation:</strong> Students may turn to credit cards or loans to cover gaps, starting their adult life in debt.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">•</span>
                  <span><strong>Academic Stress:</strong> Financial anxiety impacts focus, grades, and mental health, potentially affecting academic success.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">•</span>
                  <span><strong>Long-Term Financial Consequences:</strong> Poor money habits formed in college can persist for years, affecting career and life decisions.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">•</span>
                  <span><strong>Missed Opportunities:</strong> Without savings, students miss out on internships, study abroad, or career development opportunities that require upfront costs.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Existing Solutions */}
          <section className="mb-12">
            <h2 className="text-gray-900 dark:text-gray-100 mb-6">Current Solutions & Their Limitations</h2>
            <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
              <div className="bg-gray-100 dark:bg-gray-700 p-6 border-b border-gray-200 dark:border-gray-600">
                <h3 className="text-gray-900 dark:text-gray-100">Example: Mint (by Intuit)</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">A popular personal finance app used by millions</p>
              </div>
              
              <div className="grid md:grid-cols-2 divide-x divide-gray-200 dark:divide-gray-700">
                <div className="p-6">
                  <h4 className="text-emerald-600 dark:text-emerald-400 mb-4">What Worked ✓</h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">✓</span>
                      <span>Automatic transaction syncing from bank accounts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">✓</span>
                      <span>Visual charts and spending breakdowns</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">✓</span>
                      <span>Free to use with no subscription fees</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">✓</span>
                      <span>Spending categories and budget tracking</span>
                    </li>
                  </ul>
                </div>
                
                <div className="p-6 bg-gray-50 dark:bg-gray-900">
                  <h4 className="text-red-600 dark:text-red-400 mb-4">What Didn't Work ✗</h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">✗</span>
                      <span>Too complex with features students don't need (investments, loans, credit scores)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">✗</span>
                      <span>Requires bank account linking - privacy concerns and not all students have accounts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">✗</span>
                      <span>Cluttered interface with ads and upsells</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">✗</span>
                      <span>No AI-powered insights tailored to student spending patterns</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">✗</span>
                      <span>Feels corporate and impersonal - not designed with students in mind</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
