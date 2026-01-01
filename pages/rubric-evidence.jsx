import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { ExternalLink, Lock, Search, Lightbulb, Code, CheckCircle } from 'lucide-react';

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

  const competencies = [
    {
      id: '1.1',
      title: 'Understanding the Problem',
      description: 'Demonstrates ability to clearly articulate a problem, explain its real-world manifestation, identify challenges in solving it, and analyze existing solutions.',
      color: 'emerald',
      icon: Search,
      evidence: [
        {
          title: 'Page 2 - About',
          description: 'Comprehensive problem analysis including student financial challenges, real-world scenarios, difficulties, consequences, and existing solution evaluation',
          link: '/about',
          type: 'internal'
        },
        {
          title: 'README.md',
          description: 'Problem Summary section with personal examples and context',
          link: 'https://github.com/yourusername/pennywise#problem-summary',
          type: 'external'
        }
      ]
    },
    {
      id: '1.2',
      title: 'Planning a Solution',
      description: 'Demonstrates ability to plan a solution by creating wireframes, outlining features, anticipating challenges, and developing a project roadmap.',
      color: 'blue',
      icon: Lightbulb,
      evidence: [
        {
          title: 'Wireframes',
          description: 'Complete 7-page wireframe documentation showing UI/UX planning, user flows, and component inventory',
          link: 'https://www.figma.com/design/your-wireframes',
          type: 'external'
        },
        {
          title: 'Page 3 - Why Pennywise?',
          description: 'Solution explanation, feature planning, challenge anticipation, and mitigation strategies',
          link: '/why-pennywise',
          type: 'internal'
        },
        {
          title: 'project-plan.md',
          description: 'Detailed project plan with phases, sprints, deliverables, and timeline',
          link: 'https://github.com/yourusername/pennywise/blob/main/project-plan.md',
          type: 'external'
        }
      ]
    },
    {
      id: '1.3',
      title: 'Building a Working App',
      description: 'Demonstrates ability to build a functional application with working features, user interactions, data persistence, and AI integration.',
      color: 'purple',
      icon: Code,
      evidence: [
        {
          title: 'Page 5 - Product',
          description: 'Fully functional MVP with transaction tracking, savings goals, insights, and AI-powered categorization',
          link: '/product',
          type: 'internal'
        },
        {
          title: 'Core Features',
          description: 'Add/delete transactions, filter transactions, create goals, track progress, view charts',
          link: '/product',
          type: 'internal'
        },
        {
          title: 'AI Features',
          description: 'Smart expense categorization, personalized insights, spending pattern analysis',
          link: '/product',
          type: 'internal'
        },
        {
          title: 'Data Persistence',
          description: 'PostgreSQL database with Prisma ORM, API routes, and data migration from localStorage',
          link: '/product',
          type: 'internal'
        }
      ]
    }
  ];

  const colorClasses = {
    emerald: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-900',
      textLight: 'text-emerald-700',
      button: 'bg-emerald-500 hover:bg-emerald-600',
      icon: 'text-emerald-600'
    },
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-900',
      textLight: 'text-blue-700',
      button: 'bg-blue-500 hover:bg-blue-600',
      icon: 'text-blue-600'
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-900',
      textLight: 'text-purple-700',
      button: 'bg-purple-500 hover:bg-purple-600',
      icon: 'text-purple-600'
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-800">
      <Navigation />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Access Banner */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 p-6 rounded-r-lg mb-8">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <h3 className="text-blue-900 dark:text-blue-100 mb-1">Instructor/Coach Access Only</h3>
                <p className="text-blue-700 dark:text-blue-300 text-sm">
                  This page maps CCC competencies to project artifacts for evaluation purposes.
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">
                  Logged in as: <strong>{user?.email}</strong> ({user?.role})
                </p>
              </div>
            </div>
          </div>

          <h1 className="text-gray-900 dark:text-gray-100 mb-4">Rubric Evidence Map</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-12">
            This page demonstrates where each CCC competency can be found in the Pennywise project.
          </p>

          {/* Competencies */}
          <div className="space-y-12 mb-12">
            {competencies.map((competency) => {
              const colors = colorClasses[competency.color];
              const Icon = competency.icon;
              
              return (
                <section key={competency.id} className="mb-12">
                  <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                    <div className={`${colors.bg} dark:bg-gray-800/50 p-6 border-b border-gray-200 dark:border-gray-700`}>
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 ${colors.bg} dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0 border ${colors.border} dark:border-gray-600`}>
                          <Icon className={`w-6 h-6 ${colors.icon} dark:text-gray-300`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`text-sm font-bold ${colors.text} dark:text-gray-100 bg-white dark:bg-gray-800 px-3 py-1 rounded-lg border ${colors.border} dark:border-gray-600`}>
                              CCC.{competency.id}
                            </span>
                            <h2 className={`text-xl font-bold ${colors.text} dark:text-gray-100`}>
                              {competency.title}
                            </h2>
                          </div>
                          <p className={`${colors.textLight} dark:text-gray-300 text-sm`}>
                            {competency.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-gray-900 dark:text-gray-100 mb-4">Where to See It:</h3>
                      <ul className="space-y-3 mb-6">
                        {competency.evidence.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle className={`w-5 h-5 ${colors.icon} dark:text-gray-300 mt-0.5 flex-shrink-0`} />
                            <div className="flex-1">
                              <span className="text-gray-700 dark:text-gray-300">
                                <strong className="dark:text-gray-200">{item.title}:</strong> {item.description}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="flex flex-wrap gap-3">
                        {competency.evidence
                          .filter((item, idx, arr) => 
                            arr.findIndex(i => i.link === item.link) === idx
                          )
                          .map((item, idx) => (
                            item.type === 'internal' ? (
                              <Link
                                key={idx}
                                href={item.link}
                                className={`inline-flex items-center gap-2 px-6 py-3 ${colors.button} dark:opacity-90 text-white rounded-lg transition-colors`}
                              >
                                {item.title}
                                <ExternalLink className="w-4 h-4" />
                              </Link>
                            ) : (
                              <a
                                key={idx}
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                              >
                                {item.title}
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )
                          ))}
                      </div>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>

          {/* Quick Navigation */}
          <section>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-gray-900 dark:text-gray-100 mb-4">Quick Navigation</h3>
              <div className="grid md:grid-cols-3 gap-3">
                <Link href="/" className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-emerald-500 dark:hover:border-emerald-400 transition-colors text-center text-gray-900 dark:text-gray-100">
                  Page 1: Home
                </Link>
                <Link href="/about" className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-emerald-500 dark:hover:border-emerald-400 transition-colors text-center text-gray-900 dark:text-gray-100">
                  Page 2: About
                </Link>
                <Link href="/why-pennywise" className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-emerald-500 dark:hover:border-emerald-400 transition-colors text-center text-gray-900 dark:text-gray-100">
                  Page 3: Why Pennywise?
                </Link>
                <Link href="/features" className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-emerald-500 dark:hover:border-emerald-400 transition-colors text-center text-gray-900 dark:text-gray-100">
                  Page 4: Features
                </Link>
                <Link href="/product" className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-emerald-500 dark:hover:border-emerald-400 transition-colors text-center text-gray-900 dark:text-gray-100">
                  Page 5: Product
                </Link>
                <Link href="/reflection" className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-emerald-500 dark:hover:border-emerald-400 transition-colors text-center text-gray-900 dark:text-gray-100">
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
