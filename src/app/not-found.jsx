'use client';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { FileQuestion, Home, ArrowLeft, Search, GraduationCap, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center bg-white relative overflow-hidden py-32">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-hitm-gold via-hitm-red to-hitm-navy" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-hitm-red/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-hitm-navy/5 rounded-full blur-3xl" />

        <div className="container max-w-2xl mx-auto px-4 text-center z-10">
          <div className="mb-10 relative inline-block">
            <div className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-gray-50 flex items-center justify-center border-4 border-gray-100 shadow-inner group transition-all hover:border-hitm-red">
              <Compass size={80} className="text-gray-200 group-hover:text-hitm-red transition-all group-hover:rotate-45 duration-700" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-7xl md:text-9xl font-black text-hitm-navy tracking-tighter opacity-10 blur-[1px]">404</span>
            </div>
            <div className="absolute -bottom-2 right-4 bg-hitm-red text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-lg border-2 border-white animate-bounce uppercase tracking-widest">
              Lost In Campus?
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-black font-serif text-gray-900 mb-4 leading-tight">
            Classroom Not Found.
          </h1>

          <p className="text-gray-500 text-lg mb-10 max-w-lg mx-auto leading-relaxed italic">
            &quot;The page you are looking for has been moved or graduated to another semester. Let&apos;s get you back to the right building.&quot;
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild variant="default" size="lg" className="h-14 px-8 bg-hitm-navy hover:bg-hitm-red text-white font-bold rounded-xl shadow-xl transition-all hover:-translate-y-1 w-full sm:w-auto">
              <Link href="/" className="flex items-center gap-2">
                <Home size={20} /> Return to Home
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="h-14 px-8 border-2 border-gray-200 text-gray-700 font-bold rounded-xl transition-all w-full sm:w-auto"
              onClick={() => window.history.back()}
            >
              <span className="flex items-center gap-2">
                <ArrowLeft size={20} /> Go Back One Step
              </span>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
