'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, Users, BookOpen, ArrowRight, Settings, Download } from 'lucide-react';
import Link from 'next/link';
import { generatePagePDF } from '@/lib/pdf-service';
import ApplyModal from '@/components/ApplyModal';

export default function DiplomaPage() {
  const handleDownload = () => {
    generatePagePDF("Diploma_Information", "Diploma in Polytechnic - Technical Branches", {
      headers: ["Branch Name", "Seats", "Affiliation"],
      rows: branches.map(b => [b.name, b.seats, "JUT Ranchi"])
    });
  };

  const branches = [
    { name: 'Computer Science & Engineering', seats: 60 },
    { name: 'Data Science', seats: 30 },
    { name: 'Artificial Intelligence', seats: 30 },
    { name: 'Mechanical Engineering', seats: 60 },
    { name: 'Electrical Engineering', seats: 60 },
    { name: 'Civil Engineering', seats: 60 },
    { name: 'Electrical & Electronics Engg.', seats: 30 },
    { name: 'Electronics & Comm. Engg.', seats: 30 }
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero */}
      <section className="bg-hitm-navy pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1544725121-be3b5d02e9b1?auto=format&fit=crop&q=80&w=1600" alt="Diploma" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="flex justify-center items-center gap-4 mb-4">
            <Badge variant="gold">Vocational Excellence</Badge>
             <Button variant="ghost" size="sm" onClick={handleDownload} className="text-white hover:bg-white/10">
              <Download size={16} className="mr-2" /> Download Technical-Brochure
            </Button>
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-serif text-white mb-6">Diploma in Polytechnic</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Gain practical technical skills. Our 3-year diploma programs are recognized by AICTE and designed for high employability.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 flex-1">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-black font-serif text-gray-900 mb-8">Technical Branches</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {branches.map((b, i) => (
                  <div key={i} className="flex items-center justify-between p-5 bg-gray-50 border rounded-2xl hover:border-hitm-red/30 transition-all group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gray-400 group-hover:text-hitm-red transition-colors"><Settings size={18} /></div>
                      <span className="font-bold text-gray-800 text-sm">{b.name}</span>
                    </div>
                    <Badge variant="secondary" className="bg-white text-[10px]">{b.seats} Seats</Badge>
                  </div>
                ))}
              </div>

              <div className="mt-12 bg-hitm-red/5 rounded-3xl p-8 border border-hitm-red/10">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Lateral Entry Benefits</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Diploma graduates from HITM Ranchi are eligible for Direct Admission into the 2nd Year (3rd Semester) 
                  of our B.Tech programs. This provides a clear pathway from vocational to degree education.
                </p>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-hitm-red"><CheckCircle size={14} /> AICTE Approved</div>
                  <div className="flex items-center gap-2 text-xs font-bold text-hitm-red"><CheckCircle size={14} /> JUT Affiliated</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="bg-white border text-center p-8 rounded-[40px] shadow-xl">
                <CardContent className="pt-6">
                  <Users className="mx-auto text-hitm-gold mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Duration & Eligibility</h3>
                  <div className="space-y-4 text-sm text-gray-500 mb-8 text-left">
                     <p className="flex justify-between border-b pb-2"><span>Duration</span> <span className="font-bold text-gray-900">3 Years</span></p>
                     <p className="flex justify-between border-b pb-2"><span>Min Qual.</span> <span className="font-bold text-gray-900">10th Std</span></p>
                     <p className="flex justify-between border-b pb-2"><span>Min. Marks</span> <span className="font-bold text-gray-900">35% Avg</span></p>
                  </div>
                  <ApplyModal courseName="Diploma in Polytechnic">
                    <Button className="w-full bg-hitm-navy hover:bg-hitm-red h-14" size="lg">
                      Apply Now 2026
                    </Button>
                  </ApplyModal>
                </CardContent>
              </Card>

              <div className="bg-gray-950 rounded-[40px] p-8 text-white relative overflow-hidden">
                <h4 className="text-lg font-bold mb-5 relative z-10 font-serif">Fee Structure</h4>
                <div className="space-y-4 relative z-10 mb-8">
                  <div className="flex justify-between border-b border-white/10 pb-3">
                    <span className="text-xs text-white/70 font-bold uppercase tracking-wider">One-time Fees</span>
                    <span className="text-sm font-black">₹ 25,000</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-3">
                    <span className="text-xs text-white/70 font-bold uppercase tracking-wider">Semester Fee</span>
                    <span className="text-sm font-black text-hitm-gold">₹ 35,000</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-xs text-white font-black uppercase tracking-wider">Total Fee</span>
                    <span className="text-sm font-black">₹ 2,35,000</span>
                  </div>
                </div>
                <Link href="/admissions/fee" className="text-xs font-bold text-white hover:text-hitm-gold flex items-center gap-2 relative z-10">View Installment Plans <ArrowRight size={14}/></Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
