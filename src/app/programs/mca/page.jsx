'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, Users, BookOpen, ArrowRight, Code, Download } from 'lucide-react';
import Link from 'next/link';
import { generatePagePDF } from '@/lib/pdf-service';
import ApplyModal from '@/components/ApplyModal';

export default function MCAPage() {
  const handleDownload = () => {
    generatePagePDF("MCA_IT_Brochure", "MCA Advanced IT Program", {
      headers: ["Feature", "Benefit"],
      rows: [
        ["Advanced Coding", "Focus on Java, Python, and C++"],
        ["Industry Ready", "Internships at Fortune 500 firms"],
        ["2-Year Track", "Fast-track post-grad career"],
        ["Average Package", "10 LPA+"]
      ]
    });
  };
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero */}
      <section className="bg-hitm-navy pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1600" alt="MCA" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-between items-center mb-4">
            <Badge variant="gold">Postgraduate IT Program</Badge>
            <Button variant="ghost" size="sm" onClick={handleDownload} className="text-white hover:bg-white/10">
              <Download size={16} className="mr-2" /> Download Techno-Brochure
            </Button>
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-serif text-white mb-6 uppercase tracking-tight">Master of Computer Applications</h1>
          <p className="text-gray-300 max-w-2xl text-lg leading-relaxed font-medium">
            Master the art of software development, data science, and web technologies. HITM Ranchi is the premier hub for tech leaders in Jharkhand.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 flex-1">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-8">
              <div className="section-title !text-left">
                <h2 className="!mb-4">Build Your Tech Legacy</h2>
                <p className="text-gray-500">Our MCA program is designed to bridge the gap between academic knowledge and industrial application.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: <Code className="text-hitm-red" />, title: 'Advanced Coding', desc: 'Focus on Java, Python, and C++.' },
                  { icon: <Users className="text-hitm-red" />, title: 'Industry Ready', desc: 'Internships at Fortune 500 firms.' },
                  { icon: <Clock className="text-hitm-red" />, title: '2-Year Track', desc: 'Fast-track your post-grad career.' },
                  { icon: <BookOpen className="text-hitm-red" />, title: 'Research Base', desc: 'Cutting-edge CS research lab access.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0">{item.icon}</div>
                    <div><h4 className="font-bold text-gray-900 text-sm">{item.title}</h4><p className="text-xs text-gray-500">{item.desc}</p></div>
                  </div>
                ))}
              </div>

              <div className="bg-hitm-navy rounded-3xl p-8 text-white">
                <h3 className="text-xl font-bold mb-4 font-serif text-hitm-gold">Eligibility</h3>
                <ul className="space-y-3">
                  {['Maths in 10+2 is Mandatory', 'BCA / B.Sc (IT) / B.Sc with 50% Marks', 'JCECEB / Direct Admission Round'].map((li, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                      <CheckCircle size={16} className="text-hitm-gold" /> {li}
                    </li>
                  ))}
                </ul>
                
                <h3 className="text-xl font-bold mb-4 mt-8 font-serif text-hitm-gold border-t border-white/10 pt-8">Fee Structure</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <span className="text-sm text-white/80 font-medium">One-time Fees</span>
                    <span className="text-sm font-bold text-white">₹ 25,000</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <span className="text-sm text-white/80 font-medium">Per Semester Fee</span>
                    <span className="text-sm font-bold text-hitm-gold">₹ 60,000</span>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-sm text-white font-bold">Total Course Fee</span>
                    <span className="text-sm font-black text-white">₹ 2,65,000</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-hitm-red/10 rounded-[60px] blur-3xl -z-10" />
              <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=1000" alt="Tech" className="rounded-[40px] shadow-2xl relative z-10" />
              <Card className="absolute -bottom-10 -left-10 bg-white shadow-2xl border-none z-20 hidden md:block">
                <CardContent className="p-8 text-center">
                  <p className="text-4xl font-black text-hitm-navy font-serif">10 LPA+</p>
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mt-1">Average SDE Package</p>
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gray-50 py-20 border-t">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-black font-serif text-gray-950 mb-4">Admissions Open for batch 2026-28</h2>
            <p className="text-gray-500 mb-8">Secure your seat in Jharkhand&apos;s most sought-after tech program.</p>
            <ApplyModal courseName="Master of Computer Applications (MCA)">
              <Button size="lg" className="bg-hitm-red h-14 px-12 shadow-xl hover:scale-105 transition-transform">
                Apply Now <ArrowRight className="ml-2" />
              </Button>
            </ApplyModal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
