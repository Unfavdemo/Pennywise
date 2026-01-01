import Link from 'next/link';
import { Wallet } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-emerald-500 dark:bg-emerald-600 rounded-lg flex items-center justify-center">
              <Wallet className="w-4 h-4 text-white" />
            </div>
            <span className="text-emerald-600 dark:text-emerald-400">Pennywise</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              About
            </Link>
            <Link href="/features" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Features
            </Link>
            <Link href="/product" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Product
            </Link>
          </div>
          
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2026 Pennywise. Built for students.
          </p>
        </div>
      </div>
    </footer>
  );
}

