'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-6">
        <AlertCircle size={40} className="text-red-600" />
      </div>
      
      <h1 className="text-4xl font-black font-serif text-gray-900 mb-2">Something went wrong!</h1>
      <p className="text-gray-500 max-w-md mb-8">
        We apologize for the inconvenience. An unexpected error occurred while processing your request.
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <Button 
          onClick={() => reset()} 
          variant="default" 
          className="bg-hitm-red hover:bg-hitm-navy gap-2"
        >
          <RefreshCw size={18} /> Try Again
        </Button>
        <Button asChild variant="outline" className="gap-2">
          <Link href="/">
            <Home size={18} /> Back to Homepage
          </Link>
        </Button>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200">
        <p className="text-xs text-gray-400">Error Details: {error?.message || "Internal App Error"}</p>
      </div>
    </div>
  );
}
