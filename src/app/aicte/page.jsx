'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Download, ShieldCheck, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AICTEPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <section className="pt-32 pb-20 bg-hitm-navy relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-hitm-red/5 skew-x-12 translate-x-1/4" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge variant="gold" className="mb-4">Compliance & Approvals</Badge>
          <h1 className="text-4xl md:text-6xl font-black font-serif text-white mb-6 uppercase tracking-tighter">AICTE Approval</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            HITM Ranchi is proudly approved by the All India Council for Technical Education (AICTE), New Delhi, ensuring the highest standards of technical education.
          </p>
        </div>
      </section>

      <section className="py-20 flex-1">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="shadow-2xl border-none rounded-[40px] overflow-hidden bg-white mb-12">
              <div className="bg-gradient-to-r from-hitm-navy to-gray-800 p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
                    <ShieldCheck className="text-hitm-gold" size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black font-serif">Haider Institute of Technology</h3>
                    <p className="text-xs text-white/60 font-bold uppercase tracking-widest mt-1">Permanent ID: 1-46887005383 | State: Jharkhand</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                   <Badge variant="gold" className="mb-2">Recommended for EVC</Badge>
                   <p className="text-[10px] text-white/40">Rescrutiny Date: 10-FEB-26</p>
                </div>
              </div>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="p-6 text-xs font-black uppercase tracking-widest text-gray-400">Programme & Level</th>
                        <th className="p-6 text-xs font-black uppercase tracking-widest text-gray-400">Course Name</th>
                        <th className="p-6 text-xs font-black uppercase tracking-widest text-gray-400">Approved Intake</th>
                        <th className="p-6 text-xs font-black uppercase tracking-widest text-gray-400">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-sm">
                      {[
                        { prog: 'Engg & Tech (UG)', name: 'Computer Science & Engg', intake: 120, dur: '4 Years' },
                        { prog: 'Engg & Tech (UG)', name: 'Electrical & Electronics Engg', intake: 60, dur: '4 Years' },
                        { prog: 'Engg & Tech (UG)', name: 'Data Sciences', intake: 30, dur: '4 Years' },
                        { prog: 'Engg & Tech (UG)', name: 'Artificial Intelligence (AI)', intake: 30, dur: '4 Years' },
                        { prog: 'Engg & Tech (UG)', name: 'Mechanical Engineering', intake: 60, dur: '4 Years' },
                        { prog: 'Engg & Tech (UG)', name: 'Civil Engineering', intake: 60, dur: '4 Years' },
                        { prog: 'Engg & Tech (Diploma)', name: 'Computer Science & Engg', intake: 120, dur: '3 Years' },
                        { prog: 'Engg & Tech (Diploma)', name: 'Electrical & Electronics Engg', intake: 60, dur: '3 Years' },
                        { prog: 'Computer App (UG)', name: 'BCA', intake: 180, dur: '3 Years' },
                        { prog: 'Computer App (PG)', name: 'MCA', intake: 180, dur: '2 Years' },
                        { prog: 'Management (UG)', name: 'BBA', intake: 180, dur: '3 Years' },
                        { prog: 'Management (PG)', name: 'MBA', intake: 180, dur: '2 Years' },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                          <td className="p-6 font-bold text-hitm-navy">{row.prog}</td>
                          <td className="p-6 text-gray-600 font-medium">{row.name}</td>
                          <td className="p-6"><Badge variant="outline" className="text-hitm-red border-hitm-red/20 font-black">{row.intake} Seats</Badge></td>
                          <td className="p-6 text-gray-500">{row.dur}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
               <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 flex gap-6 items-start">
                  <div className="w-12 h-12 bg-hitm-red/10 rounded-2xl flex items-center justify-center shrink-0 text-hitm-red">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-hitm-navy mb-2">Building Approval</h4>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4">Approved by Zila Parishad, Ranchi (RZP/BP/001/2023) for Educational Usage.</p>
                    {/* <Badge variant="secondary">Area: 2.48 Acres</Badge> */}
                  </div>
               </div>
               <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 flex gap-6 items-start">
                  <div className="w-12 h-12 bg-hitm-navy/10 rounded-2xl flex items-center justify-center shrink-0 text-hitm-navy">
                    <ExternalLink size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-hitm-navy mb-2">Affiliating Body</h4>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4">Under Jharkhand University of Technology (JUT), Ranchi.</p>
                    <Badge variant="secondary">Approval Cycle:  From 2026</Badge>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
