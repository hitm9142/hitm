'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, Users, BookOpen, ArrowRight, Target, Download } from 'lucide-react';
import Link from 'next/link';
import { generatePagePDF } from '@/lib/pdf-service';
import ApplyModal from '@/components/ApplyModal';

export default function BBAPage() {
  const handleDownload = () => {
    generatePagePDF("BBA_Prospectus", "Bachelor of Business Administration", {
      headers: ["Asset", "Description"],
      rows: [
        ["Industry Focused", "Curriculum designed with industry leaders"],
        ["Mentorship", "1-on-1 career guidance"],
        ["Real World Labs", "Practical projects and internships"],
        ["Early Placement", "Support starting from final year"]
      ]
    });
  };
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero */}
      <section className="bg-hitm-navy pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1600" alt="BBA" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-between items-center mb-4">
            <Badge variant="gold">School of Business</Badge>
            <Button variant="ghost" size="sm" onClick={handleDownload} className="text-white hover:bg-white/10">
              <Download size={16} className="mr-2" /> Download Business-Brochure
            </Button>
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-serif text-white mb-6">Bachelor of Business Administration</h1>
          <p className="text-gray-300 max-w-2xl text-lg leading-relaxed">
            The foundation of your business career. Develop the leadership, strategic thinking, and entrepreneurial skills required for modern management.
          </p>
        </div>
      </section>

      {/* Program Info */}
      <section className="py-20 flex-1">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            <div className="lg:col-span-2 space-y-12">
               <div>
                  <h2 className="text-3xl font-black font-serif text-gray-950 mb-6">Why BBA at HITM Ranchi?</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                      { icon: <Target className="text-hitm-red" />, title: 'Industry Focused', desc: 'Curriculum designed in collabration with industry leaders.' },
                      { icon: <Users className="text-hitm-red" />, title: 'Mentorship', desc: '1-on-1 career guidance from experienced professionals.' },
                      { icon: <BookOpen className="text-hitm-red" />, title: 'Real World Labs', desc: 'Practical projects and summer internships included.' },
                      { icon: <Clock className="text-hitm-red" />, title: 'Early Placement', desc: 'Placement support starting from final year.' }
                    ].map((f, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-hitm-red/5 flex items-center justify-center shrink-0">{f.icon}</div>
                        <div><h4 className="font-bold text-gray-900 mb-1">{f.title}</h4><p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p></div>
                      </div>
                    ))}
                  </div>
               </div>

               <div className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-100">
                  <h3 className="text-2xl font-black font-serif text-gray-900 mb-5">Curriculum Focus</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {['Business Mgmt', 'Marketing', 'FinTech', 'Digital Biz', 'Economics', 'Soft Skills'].map((tag) => (
                      <div key={tag} className="bg-white border text-center py-3 rounded-xl shadow-sm text-sm font-bold text-gray-700">{tag}</div>
                    ))}
                  </div>
               </div>
            </div>

            <div className="h-fit sticky top-32">
              <Card className="shadow-2xl border-none p-6 bg-hitm-navy text-white rounded-[40px]">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-6 font-serif text-hitm-gold">Quick Admission</h3>
                  <div className="space-y-3 mb-8">
                    {[
                      { label: 'Seats', value: '120' },
                      { label: 'Duration', value: '3 Years / 6 Sem' },
                      { label: 'Eligibility', value: '10+2 with 45% Avg' },
                      { label: 'Admission Fee', value: '₹ 25,000' },
                      { label: 'Semester Fee', value: '₹ 50,000' },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="text-xs text-white/50">{item.label}</span>
                        <span className="text-sm font-bold text-right">{item.value}</span>
                      </div>
                    ))}
                  </div>
                  <ApplyModal courseName="Bachelor of Business Administration (BBA)">
                    <Button className="w-full h-14 bg-hitm-red hover:bg-white hover:text-hitm-red transition-all font-black uppercase tracking-widest text-xs">
                      Apply Now 2026 <ArrowRight className="ml-2" />
                    </Button>
                  </ApplyModal>
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
