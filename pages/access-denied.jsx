import Link from 'next/link';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { ShieldOff } from 'lucide-react';

export default function AccessDenied() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />
      
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
            <ShieldOff className="w-10 h-10 text-red-600" />
          </div>
          
          <h1 className="text-gray-900 mb-4">Access Denied</h1>
          
          <p className="text-gray-600 mb-8">
            This page is restricted to coaches and instructors only. Please log in with appropriate credentials to access this content.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
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

