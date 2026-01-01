import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { Lock, CheckCircle, XCircle, RefreshCw, Lightbulb } from 'lucide-react';

export default function Reflection() {
  const { user, isCoach } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    if (!isCoach()) {
      router.push('/access-denied');
      return;
    }
  }, [user, isCoach, router]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Access Banner */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="text-blue-900 mb-1">Instructor/Coach Access Only</h3>
                <p className="text-blue-700 text-sm">
                  This page documents the project journey, learnings, and future plans.
                </p>
                <p className="text-sm text-blue-600 mt-2">
                  Logged in as: <strong>{user?.email}</strong> ({user?.role})
                </p>
              </div>
            </div>
          </div>

          <h1 className="text-gray-900 mb-4">Project Reflection</h1>
          <p className="text-gray-600 mb-12">
            A comprehensive look back at the Pennywise development journey, challenges faced, and lessons learned.
          </p>

          {/* What Went Well */}
          <section className="mb-12">
            <div className="bg-white border-2 border-green-200 rounded-xl overflow-hidden">
              <div className="bg-green-50 p-6 border-b border-green-200">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <h2 className="text-green-900">What Went Well</h2>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h4 className="text-gray-900 mb-2">✓ Clear Problem Understanding</h4>
                    <p>
                      The initial research phase helped establish a deep understanding of student financial challenges. 
                      Speaking with peers and analyzing existing solutions like Mint provided valuable insights that 
                      shaped the entire project direction.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-gray-900 mb-2">✓ Effective Planning with Wireframes</h4>
                    <p>
                      Creating comprehensive wireframes before coding saved significant development time. Having a 
                      clear visual reference made implementation straightforward and prevented scope creep. The 
                      7-page structure provided excellent organization.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-gray-900 mb-2">✓ React & Tailwind CSS Stack</h4>
                    <p>
                      The technology choices were excellent. React's component-based architecture made the UI modular 
                      and maintainable, while Tailwind CSS enabled rapid styling without context switching. The 
                      learning curve was manageable.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-gray-900 mb-2">✓ AI Categorization Feature</h4>
                    <p>
                      The keyword-based AI categorization worked better than expected. Simple pattern matching with 
                      words like "Starbucks" or "Uber" proved surprisingly effective for common student expenses. 
                      This feature became a real differentiator.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-gray-900 mb-2">✓ LocalStorage Implementation</h4>
                    <p>
                      Using localStorage for data persistence was a smart choice for the MVP. It provided immediate 
                      value without requiring backend setup, allowing focus on core features first. Data persists 
                      across sessions reliably.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-gray-900 mb-2">✓ User-Centered Design</h4>
                    <p>
                      Keeping the student user in mind throughout development resulted in a clean, approachable 
                      interface. The decision to avoid financial jargon and use friendly language made the app 
                      more accessible.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* What Didn't Go Well */}
          <section className="mb-12">
            <div className="bg-white border-2 border-red-200 rounded-xl overflow-hidden">
              <div className="bg-red-50 p-6 border-b border-red-200">
                <div className="flex items-center gap-3">
                  <XCircle className="w-6 h-6 text-red-600" />
                  <h2 className="text-red-900">What Didn't Go Well</h2>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h4 className="text-gray-900 mb-2">✗ Time Estimation</h4>
                    <p>
                      Underestimated the time required for building the charts and visualization components. 
                      Learning Recharts library and getting the responsive behavior right took longer than planned. 
                      Should have allocated 2x the estimated time for new libraries.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-gray-900 mb-2">✗ Testing on Multiple Devices</h4>
                    <p>
                      Didn't test on actual mobile devices early enough. Some layout issues on smaller screens 
                      weren't caught until late in development. Mobile-first approach was stated but not fully 
                      executed in practice.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-gray-900 mb-2">✗ Data Export Feature</h4>
                    <p>
                      Planned to include CSV export for transactions but ran out of time. This would have been 
                      valuable for students who want to analyze data elsewhere or keep backups. Deferred to 
                      future version.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-gray-900 mb-2">✗ Form Validation UX</h4>
                    <p>
                      Initial form validation was too strict and frustrating. Used basic browser alerts instead 
                      of inline validation messages. Improved later, but the first implementation created poor 
                      user experience.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-gray-900 mb-2">✗ Accessibility Considerations</h4>
                    <p>
                      Accessibility wasn't prioritized from the start. Keyboard navigation, screen reader support, 
                      and color contrast weren't thoroughly tested. Would need significant work to make the app 
                      fully accessible.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* What Changed */}
          <section className="mb-12">
            <div className="bg-white border-2 border-blue-200 rounded-xl overflow-hidden">
              <div className="bg-blue-50 p-6 border-b border-blue-200">
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-6 h-6 text-blue-600" />
                  <h2 className="text-blue-900">Changes Made & Why</h2>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h4 className="text-gray-900 mb-2">Change: Removed Bank Account Linking</h4>
                    <p className="mb-2">
                      <strong>Original Plan:</strong> Integrate with Plaid API for automatic transaction import
                    </p>
                    <p className="mb-2">
                      <strong>Why Changed:</strong> Privacy concerns, API complexity, and time constraints. 
                      Students expressed discomfort with linking bank accounts in user testing.
                    </p>
                    <p>
                      <strong>Result:</strong> Focused on manual entry with AI categorization to reduce friction. 
                      Ended up being a feature, not a limitation - more privacy and control.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-gray-900 mb-2">Change: Simplified Category System</h4>
                    <p className="mb-2">
                      <strong>Original Plan:</strong> 20+ granular categories with subcategories
                    </p>
                    <p className="mb-2">
                      <strong>Why Changed:</strong> User feedback indicated too many choices was overwhelming. 
                      Students wanted quick categorization, not perfect precision.
                    </p>
                    <p>
                      <strong>Result:</strong> Reduced to 9 essential categories. Made categorization faster 
                      and AI suggestions more accurate.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-gray-900 mb-2">Change: Added AI Insights Component</h4>
                    <p className="mb-2">
                      <strong>Original Plan:</strong> Basic charts only
                    </p>
                    <p className="mb-2">
                      <strong>Why Changed:</strong> Charts alone didn't provide actionable insights. Students 
                      wanted to be told what the data means, not just see visualizations.
                    </p>
                    <p>
                      <strong>Result:</strong> Created AI Insights component that generates personalized 
                      messages like "You're spending 40% more on food this month." Much more valuable.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-gray-900 mb-2">Change: RBA Protection Implementation</h4>
                    <p className="mb-2">
                      <strong>Original Plan:</strong> All pages public
                    </p>
                    <p className="mb-2">
                      <strong>Why Changed:</strong> Project requirements specified RBA protection for 
                      reflection and rubric evidence pages.
                    </p>
                    <p>
                      <strong>Result:</strong> Implemented authentication context and protected routes. 
                      Learned about React context API and route protection patterns.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Future Plans */}
          <section className="mb-12">
            <div className="bg-white border-2 border-purple-200 rounded-xl overflow-hidden">
              <div className="bg-purple-50 p-6 border-b border-purple-200">
                <div className="flex items-center gap-3">
                  <Lightbulb className="w-6 h-6 text-purple-600" />
                  <h2 className="text-purple-900">What I'd Build Next</h2>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h4 className="text-gray-900 mb-2">🔄 Recurring Transactions</h4>
                    <p>
                      Allow users to set up recurring income/expenses (like monthly subscriptions or weekly 
                      allowance). This would reduce manual entry burden and provide more accurate budget 
                      predictions. Auto-add transactions on specified dates.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-gray-900 mb-2">📊 Budget Limits & Alerts</h4>
                    <p>
                      Let students set spending limits per category and receive alerts when approaching or 
                      exceeding limits. Visual indicators (yellow warning at 80%, red at 100%) would provide 
                      proactive guidance.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-gray-900 mb-2">🤖 Advanced AI Features</h4>
                    <p>
                      Integrate actual machine learning models (possibly OpenAI GPT) for more sophisticated 
                      insights. Could analyze spending patterns and provide personalized recommendations like 
                      "Based on your habits, you could save $50/month by cooking instead of delivery."
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-gray-900 mb-2">👥 Social Features & Challenges</h4>
                    <p>
                      Anonymous spending comparisons with peers (e.g., "You spend less than 70% of students 
                      in your area"). Savings challenges with friends. Gamification elements to make budgeting 
                      fun and social.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-gray-900 mb-2">☁️ Cloud Sync with Backend</h4>
                    <p>
                      Move from localStorage to a proper backend (Supabase or Firebase) to enable multi-device 
                      sync, data backup, and advanced features. Would require user accounts and authentication 
                      infrastructure.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-gray-900 mb-2">📱 Mobile App Version</h4>
                    <p>
                      Build native iOS/Android apps or use React Native for cross-platform mobile experience. 
                      Quick transaction entry via mobile is crucial since students track expenses on-the-go. 
                      Push notifications for budgets and goals.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-gray-900 mb-2">🎓 Financial Education Content</h4>
                    <p>
                      Integrate educational content about personal finance, budgeting strategies, and money 
                      management specific to students. Short tips, video tutorials, or interactive lessons 
                      within the app.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-gray-900 mb-2">📈 Advanced Analytics Dashboard</h4>
                    <p>
                      Create detailed analytics page with spending trends over time, month-over-month 
                      comparisons, category breakdowns by week/month/year, and forecasting. Help students 
                      understand long-term financial patterns.
                    </p>
                  </div>
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
