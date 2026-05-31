'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, Users, BookOpen, ArrowRight, Briefcase, Download } from 'lucide-react';
import Link from 'next/link';
import { generatePagePDF } from '@/lib/pdf-service';
import ApplyModal from '@/components/ApplyModal';

export default function MBAPage() {
  const handleDownload = () => {
    generatePagePDF("MBA_Brochure", "Master of Business Administration", {
      headers: ["Specialization", "What you learn"],
      rows: specializations.map(s => [s.name, s.desc])
    });
  };

  const specializations = [
    { name: 'Finance Management', desc: 'Focus on financial analysis, corporate finance, and investment banking.' },
    { name: 'Marketing Management', desc: 'Brand management, consumer behavior, and digital marketing strategies.' },
    { name: 'Human Resource Management', desc: 'Organizational behavior, talent acquisition, and labor laws.' },
    { name: 'Information Technology', desc: 'IT project management, systems analysis, and technology leadership.' }
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero */}
      <section className="bg-hitm-navy pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1523240682765-9a026219b22e?auto=format&fit=crop&q=80&w=1600" alt="MBA" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="flex justify-center items-center gap-4 mb-4">
            <Badge variant="gold">Department of Management</Badge>
            <Button variant="ghost" size="sm" onClick={handleDownload} className="text-white hover:bg-white/10">
              <Download size={16} className="mr-2" /> PDF Brochure
            </Button>
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-serif text-white mb-6">Master of Business Administration</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Leading Jharkhand in management education. Transform into a strategic leader with our industry-aligned MBA program.
          </p>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20 flex-1">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-black font-serif text-gray-900 mb-8">Program Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-hitm-red shrink-0"><Clock /></div>
                  <div><p className="text-sm font-bold text-gray-900">2 Years</p><p className="text-xs text-gray-400 font-serif">Full Time Program</p></div>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-hitm-red shrink-0"><Users /></div>
                  <div><p className="text-sm font-bold text-gray-900">60 Seats</p><p className="text-xs text-gray-400 font-serif">Limited Intake</p></div>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-hitm-red shrink-0"><Briefcase /></div>
                  <div><p className="text-sm font-bold text-gray-900">Excellent ROI</p><p className="text-xs text-gray-400 font-serif">Placement Support</p></div>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-hitm-red shrink-0"><BookOpen /></div>
                  <div><p className="text-sm font-bold text-gray-900">AICTE Approved</p><p className="text-xs text-gray-400 font-serif">Globally Recognized</p></div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Dual Specializations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {specializations.map((s, i) => (
                  <Card key={i} className="hover:shadow-md transition-all">
                    <CardContent className="p-6">
                      <h4 className="font-bold text-gray-950 mb-2">{s.name}</h4>
                      <p className="text-gray-500 text-sm">{s.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 text-white rounded-[40px] p-10 shadow-2xl h-fit">
              <h3 className="text-2xl font-bold font-serif mb-6 text-hitm-gold">Admission Process</h3>
              <div className="space-y-6 mb-10">
                {[
                  'Graduation with min. 50% Marks',
                  'Valid CAT / MAT / CMAT Score',
                  'Personal Interview Round',
                  'Document Verification'
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-hitm-red flex items-center justify-center text-xs font-black shrink-0">{i+1}</div>
                    <span className="text-sm text-white/80">{step}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-bold font-serif mb-5 text-hitm-gold border-t border-white/10 pt-8 mt-8">Fee Structure</h3>
              <div className="space-y-4 mb-10">
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-sm text-white/70 font-medium">One-time Fees</span>
                  <span className="text-sm font-bold text-white">₹ 25,000</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-sm text-white/70 font-medium">Per Semester Fee</span>
                  <span className="text-sm font-bold text-hitm-gold">₹ 85,000</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-sm font-bold text-white">Total Fee</span>
                  <span className="text-sm font-black text-white">₹ 3,65,000</span>
                </div>
              </div>

              <div className="space-y-4">
                <ApplyModal courseName="Master of Business Administration (MBA)">
                  <Button className="w-full h-12 bg-hitm-red hover:bg-white hover:text-hitm-red text-white border-none font-bold shadow-lg shadow-hitm-red/20 transition-all">
                    Apply Now 2026
                  </Button>
                </ApplyModal>
                <Button variant="outline" className="w-full h-12 border-white/20 text-white hover:bg-white/10 hover:text-white">
                  Download MBA Brochure
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
