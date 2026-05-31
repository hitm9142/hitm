'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, Users, BookOpen, ArrowRight, Monitor, Download } from 'lucide-react';
import Link from 'next/link';
import { generatePagePDF } from '@/lib/pdf-service';
import ApplyModal from '@/components/ApplyModal';

export default function BCAPage() {
  const handleDownload = () => {
    generatePagePDF("BCA_Course_Curriculum", "Bachelor of Computer Applications", {
      headers: ["Detail", "Value"],
      rows: [
        ["Duration", "3 Years"],
        ["Eligibility", "10+2 with 45%"],
        ["Language Focus", "C++, Java, Python"],
        ["Labs", "Modern Labs with high-end systems"]
      ]
    });
  };
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero */}
      <section className="bg-hitm-navy pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1600" alt="BCA" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-between items-center mb-4">
            <Badge variant="gold">Top Rated IT Program</Badge>
            <Button variant="ghost" size="sm" onClick={handleDownload} className="text-white hover:bg-white/10">
              <Download size={16} className="mr-2" /> Download IT-Curriculum
            </Button>
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-serif text-white mb-6 uppercase tracking-tight">Bachelor of Computer Applications</h1>
          <p className="text-gray-300 max-w-2xl text-lg leading-relaxed font-medium">
            Jumpstart your software career. Learn web development, mobile apps, and database management with HITM Ranchi&apos;s most popular undergraduate tech degree.
          </p>
        </div>
      </section>

      {/* Program Details */}
      <section className="py-20 flex-1">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-black font-serif text-gray-900 mb-8">Ready to Code for the Future?</h2>
              <div className="prose prose-slate max-w-none text-gray-600 mb-12">
                <p className="text-lg">
                  BCA remains the backbone of the IT industry. At HITM Ranchi, we don&apos;t just teach programming; we teach problem-solving using modern technology stacks including React, Node.js, and Java.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {[
                  { icon: <Monitor className="text-hitm-red" />, title: 'Modern Labs', desc: 'Work on high-end systems in our specialized computing labs.' },
                  { icon: <Users className="text-hitm-red" />, title: 'Team Projects', desc: 'Build real-world software applications in collaborative teams.' },
                  { icon: <BookOpen className="text-hitm-red" />, title: 'Updated Syllabus', desc: 'Learn current industry trends like Cloud and Cybersecurity.' },
                  { icon: <Clock className="text-hitm-red" />, title: 'Fast Careers', desc: 'Secure technical roles across India’s leading technology hubs.' }
                ].map((f, i) => (
                  <div key={i} className="flex gap-4 p-5 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all border border-gray-100">
                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">{f.icon}</div>
                    <div><h4 className="font-bold text-gray-900 mb-1">{f.title}</h4><p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-3xl p-8 md:p-10 border border-gray-100 h-fit">
              <h3 className="text-2xl font-black font-serif text-hitm-navy mb-6">Program Snapshot</h3>
              <div className="space-y-3 mb-10">
                {[
                  { label: 'Seats', value: '120' },
                  { label: 'Duration', value: '3 Years / 6 Sem' },
                  { label: 'Eligibility', value: '10+2 with 45%' },
                  { label: 'Core Language', value: 'C++, Java, Python' },
                  { label: 'Admission Fee', value: '₹ 25,000 (One-time)' },
                  { label: 'Semester Fee', value: '₹ 50,000' },
                ].map((s, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">{s.label}</span>
                    <span className="text-sm font-black text-gray-900 text-right">{s.value}</span>
                  </div>
                ))}
              </div>
              <ApplyModal courseName="Bachelor of Computer Applications (BCA)">
                <Button className="w-full bg-hitm-red h-14 shadow-lg text-lg font-black" size="lg">
                  Join BCA Now <ArrowRight className="ml-2" size={18} />
                </Button>
              </ApplyModal>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
