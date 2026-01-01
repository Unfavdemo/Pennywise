import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { ExternalLink, Lock } from 'lucide-react';

export default function RubricEvidence() {
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
        <div className="max-w-5xl mx-auto">
          {/* Access Banner */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="text-blue-900 mb-1">Instructor/Coach Access Only</h3>
                <p className="text-blue-700 text-sm">
                  This page maps CCC competencies to project artifacts for evaluation purposes.
                </p>
                <p className="text-sm text-blue-600 mt-2">
                  Logged in as: <strong>{user?.email}</strong> ({user?.role})
                </p>
              </div>
            </div>
          </div>

          <h1 className="text-gray-900 mb-4">Rubric Evidence Map</h1>
          <p className="text-gray-600 mb-12">
            This page demonstrates where each CCC competency can be found in the Pennywise project.
          </p>

          {/* CCC.1.1 Section */}
          <section className="mb-12">
            <div className="bg-white border-2 border-emerald-200 rounded-xl overflow-hidden">
              <div className="bg-emerald-50 p-6 border-b border-emerald-200">
                <h2 className="text-emerald-900 mb-2">CCC.1.1 - Understanding the Problem</h2>
                <p className="text-emerald-700">
                  Demonstrates ability to clearly articulate a problem, explain its real-world manifestation, 
                  identify challenges in solving it, and analyze existing solutions.
                </p>
              </div>
              
              <div className="p-6">
                <h3 className="text-gray-900 mb-4">Where to See It:</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-500 mt-1">•</span>
                    <span className="text-gray-700">
                      <strong>Page 2 - About:</strong> Comprehensive problem analysis including student financial 
                      challenges, real-world scenarios, difficulties, consequences, and existing solution evaluation
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-500 mt-1">•</span>
                    <span className="text-gray-700">
                      <strong>README.md:</strong> Problem Summary section with personal examples and context
                    </span>
                  </li>
                </ul>
                
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                  >
                    View Page 2 - About
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                  <a
                    href="https://github.com/yourusername/pennywise#problem-summary"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    View README Problem Section
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* CCC.1.2 Section */}
          <section className="mb-12">
            <div className="bg-white border-2 border-blue-200 rounded-xl overflow-hidden">
              <div className="bg-blue-50 p-6 border-b border-blue-200">
                <h2 className="text-blue-900 mb-2">CCC.1.2 - Planning a Solution</h2>
                <p className="text-blue-700">
                  Demonstrates ability to plan a solution by creating wireframes, outlining features, 
                  anticipating challenges, and developing a project roadmap.
                </p>
              </div>
              
              <div className="p-6">
                <h3 className="text-gray-900 mb-4">Where to See It:</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 mt-1">•</span>
                    <span className="text-gray-700">
                      <strong>Wireframes:</strong> Complete 7-page wireframe documentation showing UI/UX planning, 
                      user flows, and component inventory
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 mt-1">•</span>
                    <span className="text-gray-700">
                      <strong>Page 3 - Why Pennywise?:</strong> Solution explanation, feature planning, 
                      challenge anticipation, and mitigation strategies
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 mt-1">•</span>
                    <span className="text-gray-700">
                      <strong>project-plan.md:</strong> Detailed project plan with phases, sprints, 
                      deliverables, and timeline
                    </span>
                  </li>
                </ul>
                
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://www.figma.com/design/your-wireframes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    View Wireframes
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <Link
                    href="/why-pennywise"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    View Page 3 - Why Pennywise?
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                  <a
                    href="https://github.com/yourusername/pennywise/blob/main/project-plan.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    View Project Plan
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* CCC.1.3 Section */}
          <section className="mb-12">
            <div className="bg-white border-2 border-purple-200 rounded-xl overflow-hidden">
              <div className="bg-purple-50 p-6 border-b border-purple-200">
                <h2 className="text-purple-900 mb-2">CCC.1.3 - Building a Working App</h2>
                <p className="text-purple-700">
                  Demonstrates ability to build a functional application with working features, 
                  user interactions, data persistence, and AI integration.
                </p>
              </div>
              
              <div className="p-6">
                <h3 className="text-gray-900 mb-4">Where to See It:</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="text-purple-500 mt-1">•</span>
                    <span className="text-gray-700">
                      <strong>Page 5 - Product:</strong> Fully functional MVP with transaction tracking, 
                      savings goals, insights, and AI-powered categorization
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-500 mt-1">•</span>
                    <span className="text-gray-700">
                      <strong>Core Features:</strong> Add/delete transactions, filter transactions, 
                      create goals, track progress, view charts
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-500 mt-1">•</span>
                    <span className="text-gray-700">
                      <strong>AI Features:</strong> Smart expense categorization, personalized insights, 
                      spending pattern analysis
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-500 mt-1">•</span>
                    <span className="text-gray-700">
                      <strong>Data Persistence:</strong> LocalStorage implementation for saving user data
                    </span>
                  </li>
                </ul>
                
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/product"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    View Page 5 - Product
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/product"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Test Live Application
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Navigation */}
          <section>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-gray-900 mb-4">Quick Navigation</h3>
              <div className="grid md:grid-cols-3 gap-3">
                <Link href="/" className="px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-emerald-500 transition-colors text-center">
                  Page 1: Home
                </Link>
                <Link href="/about" className="px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-emerald-500 transition-colors text-center">
                  Page 2: About
                </Link>
                <Link href="/why-pennywise" className="px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-emerald-500 transition-colors text-center">
                  Page 3: Why Pennywise?
                </Link>
                <Link href="/features" className="px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-emerald-500 transition-colors text-center">
                  Page 4: Features
                </Link>
                <Link href="/product" className="px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-emerald-500 transition-colors text-center">
                  Page 5: Product
                </Link>
                <Link href="/reflection" className="px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-emerald-500 transition-colors text-center">
                  Page 7: Reflection
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
