'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Bookmark, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function AcademicCalendarPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      {/* Banner / Hero Section */}
      <section className="bg-hitm-navy pt-32 pb-20 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-hitm-red/5 skew-x-12 translate-x-1/4" />
        <div className="container mx-auto px-4 relative z-10">
          <Badge variant="gold" className="mb-4">Academic Cell</Badge>
          <h1 className="text-4xl md:text-5xl font-black font-serif text-white mb-6">Academic Regulations & Attendance</h1>
          <p className="text-gray-400 max-w-2xl text-lg leading-relaxed">
            Review academic rules, regulations, and attendance requirements enforced by JUT Ranchi.
          </p>
        </div>
      </section>

      {/* Attendance Policy Content */}
      <section className="py-20 flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-hitm-red rounded-[40px] p-8 md:p-12 text-white relative overflow-hidden group shadow-2xl">
            <Bookmark className="absolute -right-4 -top-4 text-white/10 w-44 h-44 rotate-12 group-hover:scale-105 transition-transform" />
            <h3 className="text-3xl font-bold font-serif mb-6 relative z-10">Attendance Policy</h3>
            <p className="text-white/90 text-base md:text-lg leading-relaxed mb-8 relative z-10">
              A minimum of **75% attendance** is strictly mandatory for appearing in the End-semester examinations as per Jharkhand University of Technology (JUT) norms.
            </p>
            <p className="text-white/70 text-sm leading-relaxed mb-8 relative z-10">
              Students falling short of the mandatory 75% attendance threshold without verified medical or college-approved leaves will not be eligible to fill out exam forms or sit for theory and practical end-semester exams.
            </p>
            <Link href="/about/overview" className="inline-flex text-xs font-black uppercase tracking-widest text-hitm-gold hover:text-white transition-colors items-center gap-2 relative z-10 border border-hitm-gold/30 hover:border-white px-5 py-2.5 rounded-xl bg-white/5 backdrop-blur-sm">
              Full Regulations <AlertCircle size={14} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
