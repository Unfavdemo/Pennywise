import Link from 'next/link';
import { useRouter } from 'next/router';
import { Home, ArrowLeft } from 'lucide-react';

export default function Custom404() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-emerald-50 to-white dark:from-gray-900 dark:to-gray-800">
      
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-emerald-500 dark:text-emerald-400 mb-4">
              404
            </h1>
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Sorry, we couldn&apos;t find the page you&apos;re looking for. 
              The page might have been moved or doesn&apos;t exist.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
            
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 dark:bg-emerald-600 text-white rounded-lg hover:bg-emerald-600 dark:hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl"
            >
              <Home className="w-5 h-5" />
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

