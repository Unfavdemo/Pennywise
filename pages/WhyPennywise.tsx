import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { CheckCircle, AlertTriangle, Lightbulb, Calendar } from 'lucide-react';

export default function WhyPennywise() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-gray-900 mb-4">Why Pennywise?</h1>
          <p className="text-gray-600 mb-12">
            Our strategic approach to solving the student money management problem.
          </p>

          {/* Solution Explanation */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-8 rounded-xl border border-emerald-200">
              <h2 className="text-gray-900 mb-4">Our Approach</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Pennywise takes a fundamentally different approach to money management. Instead of trying to be everything for everyone, we've built a tool specifically for students - simple enough to use daily, powerful enough to create real change, and smart enough to provide insights without requiring financial expertise.
                </p>
                <p>
                  Our core philosophy is <strong>visibility leads to intentionality</strong>. When students can see exactly where their money goes, they naturally make better decisions. We combine effortless expense tracking with AI-powered categorization and insights to remove the friction that causes students to abandon traditional budgeting tools.
                </p>
                <p>
                  Pennywise addresses the problems outlined in our About page by: (1) Making tracking fast and frictionless - under 10 seconds per transaction, (2) Using AI to eliminate manual categorization work, (3) Providing visual insights that make spending patterns obvious, (4) Creating a judgment-free space focused on progress, not perfection, and (5) Helping students set and achieve realistic savings goals with progress tracking.
                </p>
              </div>
            </div>
          </section>

          {/* Features List */}
          <section className="mb-12">
            <h2 className="text-gray-900 mb-6">What Pennywise Does</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Core Features */}
              <div>
                <h3 className="text-emerald-600 mb-4">Core Features</h3>
                <div className="space-y-4">
                  <div className="bg-white border border-gray-200 p-5 rounded-lg">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="text-gray-900 mb-1">Income & Expense Tracking</h4>
                        <p className="text-gray-600 text-sm">Quick-add forms for logging all transactions with minimal effort</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 p-5 rounded-lg">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="text-gray-900 mb-1">Spending Categories</h4>
                        <p className="text-gray-600 text-sm">Organize transactions into relevant categories like food, transportation, entertainment</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 p-5 rounded-lg">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="text-gray-900 mb-1">Savings Goals</h4>
                        <p className="text-gray-600 text-sm">Set financial targets and track progress with visual indicators</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 p-5 rounded-lg">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="text-gray-900 mb-1">Financial Insights</h4>
                        <p className="text-gray-600 text-sm">Charts and visualizations showing spending patterns over time</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Features */}
              <div>
                <h3 className="text-purple-600 mb-4">AI-Powered Features</h3>
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 p-5 rounded-lg">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🤖</span>
                      <div>
                        <h4 className="text-gray-900 mb-1">Smart Categorization</h4>
                        <p className="text-gray-600 text-sm">AI automatically suggests categories based on transaction descriptions</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 p-5 rounded-lg">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">📊</span>
                      <div>
                        <h4 className="text-gray-900 mb-1">Predictive Budgeting</h4>
                        <p className="text-gray-600 text-sm">Get budget suggestions based on your historical spending patterns</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 p-5 rounded-lg">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">💡</span>
                      <div>
                        <h4 className="text-gray-900 mb-1">Spending Insights</h4>
                        <p className="text-gray-600 text-sm">Discover patterns and receive personalized tips to improve habits</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 p-5 rounded-lg">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🚨</span>
                      <div>
                        <h4 className="text-gray-900 mb-1">Anomaly Detection</h4>
                        <p className="text-gray-600 text-sm">Get alerts when spending deviates significantly from your normal patterns</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Expected Challenges */}
          <section className="mb-12">
            <h2 className="text-gray-900 mb-6">Challenges We Anticipate</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3 bg-amber-50 p-4 rounded-lg border border-amber-200">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-gray-900">User Adoption & Habit Formation</h4>
                  <p className="text-gray-600 text-sm mt-1">Getting students to consistently use the app and build a tracking habit</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 bg-amber-50 p-4 rounded-lg border border-amber-200">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-gray-900">Data Accuracy & Manual Entry</h4>
                  <p className="text-gray-600 text-sm mt-1">Ensuring students enter transactions accurately and promptly</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 bg-amber-50 p-4 rounded-lg border border-amber-200">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-gray-900">AI Accuracy for Categorization</h4>
                  <p className="text-gray-600 text-sm mt-1">Training AI to correctly categorize diverse student expenses</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 bg-amber-50 p-4 rounded-lg border border-amber-200">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-gray-900">Time Constraints for Development</h4>
                  <p className="text-gray-600 text-sm mt-1">Building a fully-featured app within the project timeline</p>
                </div>
              </div>
            </div>
          </section>

          {/* Solutions to Challenges */}
          <section className="mb-12">
            <h2 className="text-gray-900 mb-6">Our Solutions</h2>
            <div className="space-y-4">
              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-5 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-gray-900 mb-2">For User Adoption & Habit Formation:</h4>
                    <p className="text-gray-700">
                      Make the experience delightful and rewarding. Use positive reinforcement (streak tracking, progress celebrations), keep the interface minimal and fast (sub-10-second transaction entry), and provide immediate value through insights that show students exactly what they're gaining from tracking.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-5 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-gray-900 mb-2">For Data Accuracy & Manual Entry:</h4>
                    <p className="text-gray-700">
                      Use smart defaults (today's date, most common categories), implement AI-assisted categorization to reduce manual work, and create a forgiving system that allows easy editing and correction without judgment.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-5 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-gray-900 mb-2">For AI Accuracy:</h4>
                    <p className="text-gray-700">
                      Start with a rule-based system (keywords like "Starbucks" → Food & Dining), allow users to correct AI suggestions (which improves the model), and maintain a simple category structure that's easier to predict accurately.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-5 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-gray-900 mb-2">For Time Constraints:</h4>
                    <p className="text-gray-700">
                      Build an MVP with core features first (transaction tracking, basic categorization, simple goals), then iterate with AI features. Use agile development with clear sprint goals and prioritize features that provide the most student value.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Project Plan */}
          <section className="mb-12">
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <Calendar className="w-8 h-8 text-blue-500 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-3">Project Plan Overview</h3>
                  <p className="text-gray-600 mb-6">
                    Pennywise is being developed using an agile methodology with clear phases and deliverables.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="text-gray-900">Phase 1: Foundation (Weeks 1-2)</h4>
                      <p className="text-gray-600 text-sm">Wireframing, design system, basic app structure, navigation</p>
                    </div>
                    
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="text-gray-900">Phase 2: Core Features (Weeks 3-4)</h4>
                      <p className="text-gray-600 text-sm">Transaction tracking, categorization, basic insights, data persistence</p>
                    </div>
                    
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="text-gray-900">Phase 3: AI Integration (Weeks 5-6)</h4>
                      <p className="text-gray-600 text-sm">Smart categorization, predictive insights, anomaly detection</p>
                    </div>
                    
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="text-gray-900">Phase 4: Polish & Testing (Weeks 7-8)</h4>
                      <p className="text-gray-600 text-sm">User testing, bug fixes, performance optimization, documentation</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <a 
                      href="https://github.com/yourusername/pennywise/blob/main/project-plan.md"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      View Full Project Plan →
                    </a>
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
