import Link from 'next/link';
import { useRouter } from 'next/router';
import { Wallet, Menu, X, LogOut, Settings } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navigation() {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const router = useRouter();
  const { user, logout, isCoach } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Why Pennywise?', path: '/why-pennywise' },
    { name: 'Features', path: '/features' },
    { name: 'Product', path: '/product' },
  ];

  const coachLinks = isCoach() ? [
    { name: 'Rubric Evidence', path: '/rubric-evidence' },
    { name: 'Reflection', path: '/reflection' },
  ] : [];

  const allLinks = [...navLinks, ...coachLinks];

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 dark:bg-emerald-600 rounded-lg flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <span className="text-emerald-600 dark:text-emerald-400">Pennywise</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {allLinks.map(link => (
              <Link
                key={link.path}
                href={link.path}
                className={`transition-colors ${
                  router.pathname === link.path
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

                 {/* Auth Button */}
                 <div className="hidden md:flex items-center gap-4">
                   {user ? (
                     <>
                       <Link
                         href="/settings"
                         className="p-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors"
                         title="Settings"
                       >
                         <Settings className="w-5 h-5" />
                       </Link>
                       <div className="flex items-center gap-3">
                         <span className="text-gray-600 dark:text-gray-300 text-sm">{user.name || user.email}</span>
                         <button
                           onClick={logout}
                           className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                         >
                           <LogOut className="w-4 h-4" />
                           Logout
                         </button>
                       </div>
                     </>
                   ) : (
                     <div className="flex items-center gap-3">
                       <Link
                        key="/login"
                         href="/login"
                         className="px-4 py-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                       >
                         Login
                       </Link>
                       <Link
                         key="/signup"
                         href="/signup"
                         className="px-4 py-2 bg-emerald-500 dark:bg-emerald-600 text-white rounded-lg hover:bg-emerald-600 dark:hover:bg-emerald-700 transition-colors"
                       >
                         Sign Up
                       </Link>
                     </div>
                   )}
                 </div>

                 {/* Mobile Menu Button */}
                 <button
                   onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                   className="md:hidden p-2 text-gray-600 dark:text-gray-300"
                 >
                   {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                 </button>
        </div>

               {/* Mobile Menu */}
               {mobileMenuOpen && (
                 <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
                   <div className="flex flex-col gap-4">
                     {allLinks.map(link => (
                       <Link
                         key={link.path}
                         href={link.path}
                         onClick={() => setMobileMenuOpen(false)}
                         className={`px-4 py-2 rounded-lg transition-colors ${
                           router.pathname === link.path
                             ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
                             : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                         }`}
                       >
                         {link.name}
                       </Link>
                     ))}
                     {user && (
                       <Link
                         href="/settings"
                         onClick={() => setMobileMenuOpen(false)}
                         className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                           router.pathname === '/settings'
                             ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
                             : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                         }`}
                       >
                         <Settings className="w-4 h-4" />
                         Settings
                       </Link>
                     )}
                     {user ? (
                       <>
                         <div className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 mt-2 pt-4">
                           {user.name || user.email}
                         </div>
                         <button
                           onClick={() => {
                             logout();
                             setMobileMenuOpen(false);
                           }}
                           className="mx-4 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
                         >
                           <LogOut className="w-4 h-4" />
                           Logout
                         </button>
                       </>
                     ) : (
                       <>
                         <Link
                           href="/login"
                           onClick={() => setMobileMenuOpen(false)}
                           className="mx-4 px-4 py-2 border border-emerald-500 dark:border-emerald-600 text-emerald-600 dark:text-emerald-400 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors text-center"
                         >
                           Login
                         </Link>
                         <Link
                           href="/signup"
                           onClick={() => setMobileMenuOpen(false)}
                           className="mx-4 px-4 py-2 bg-emerald-500 dark:bg-emerald-600 text-white rounded-lg hover:bg-emerald-600 dark:hover:bg-emerald-700 transition-colors text-center"
                         >
                           Sign Up
                         </Link>
                       </>
                     )}
                   </div>
                 </div>
               )}
      </div>
    </nav>
  );
}

