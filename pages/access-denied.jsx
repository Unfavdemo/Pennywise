import Link from 'next/link';
import Footer from '../components/Footer';
import { ShieldOff } from 'lucide-react';

export default function AccessDenied() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full mb-6">
            <ShieldOff className="w-10 h-10 text-red-600 dark:text-red-400" />
          </div>
          
          <h1 className="text-gray-900 dark:text-gray-100 mb-4">Access Denied</h1>
          
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            This page is restricted to coaches and instructors only. Please log in with appropriate credentials to access this content.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="px-6 py-3 bg-emerald-500 dark:bg-emerald-600 text-white rounded-lg hover:bg-emerald-600 dark:hover:bg-emerald-700 transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/"
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Go Home
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

