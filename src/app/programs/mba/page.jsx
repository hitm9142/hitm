'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, Users, BookOpen, ArrowRight, Briefcase } from 'lucide-react';
import Link from 'next/link';
import ApplyModal from '@/components/ApplyModal';

export default function MBAPage() {
  const specializations = [
    { name: 'Finance Management', desc: 'Focus on financial analysis, corporate finance, and investment banking.' },
    { name: 'Marketing Management', desc: 'Brand management, consumer behavior, and digital marketing strategies.' },
    { name: 'Human Resource Management', desc: 'Organizational behavior, talent acquisition, and labor laws.' },
    { name: 'Information Technology', desc: 'IT project management, systems analysis, and technology leadership.' },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-hitm-navy pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1523240682765-9a026219b22e?auto=format&fit=crop&q=80&w=1600"
            alt="MBA"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="flex justify-center items-center gap-4 mb-4">
            <Badge variant="gold">Department of Management</Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-serif text-white mb-6 capitalize">
            best college for mba in ranchi
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Leading Jharkhand in management education. Transform into a strategic leader with our industry-aligned MBA
            program.
          </p>
        </div>
      </section>
      {/* About the Program Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image on Left */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] lg:h-[500px]">
              <img src="/images/mba-image.webp" alt="B.Tech Program at HITM" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-hitm-navy/60 to-transparent"></div>
              <Badge className="absolute top-6 left-6 bg-hitm-red text-white border-none">AICTE Approved</Badge>
            </div>

            {/* Content on Right */}
            <div>
              <h2 className="text-3xl md:text-4xl font-black font-serif text-gray-900 leading-tight mb-6">
                About the Program
              </h2>
              <div className="space-y-5 text-gray-600 text-base leading-8">
                <p>
                  The Master of Business Administration (MBA) program at HITM is a 2-year postgraduate qualification
                  recognized by the All India Council for Technical Education (AICTE). The program is designed to equip
                  students with advanced business skills and knowledge necessary for managing businesses across multiple
                  scales. The program at HITM’s <b> MBA college in Ranchi</b> is offered across numerous specialization
                  domains such as finance, marketing, human resources, operations, and strategy, providing students with
                  the flexibility to pursue a field of their interest.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose HITM Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content on Left */}
            <div>
              <h2 className="text-3xl md:text-4xl font-black font-serif text-gray-900 leading-tight mb-6">
                Why Choose HITM?
              </h2>
              <div className="space-y-4">
                <ul className="space-y-4">
                  {[
                    {
                      title: 'AICTE Approved',
                      desc: ' All the MBA programs at HITM have been approved by the statutory national-level council for technical education. Such approvals improve the credibility and are only traits of the best MBA college in Ranchi.',
                    },
                    {
                      title: 'Experienced Faculty',
                      desc: 'Students at HITM receive academic guidance from professionals with extensive industry experience. It ensures that students receive the best mentorship for their future prospects.',
                    },
                    {
                      title: 'Value-Added Laboratories',
                      desc: 'HITM students develop a deeper understanding of the business dynamics, helping them with the ability to handle both self-owned and multinational businesses.',
                    },
                    {
                      title: 'Industry-Oriented Curriculum',
                      desc: ' Our curriculum across all the courses has been aligned with the latest business demands, where students focus on AI, innovation, and emerging technologies.',
                    },
                    {
                      title: 'Top-Notch Infrastructure',
                      desc: 'Our infrastructure has been designed to provide students with the highest comfort required for the best learning experience. Infrastructure is one of the qualities that separates HITM as the best college in Jharkhand for MBA.',
                    },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="text-hitm-red shrink-0 mt-1" size={20} />
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Image on Right */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] lg:h-[600px]">
              <img
                src="/images/hitm-infrastructure-img.webp"
                alt="HITM Campus Infrastructure"
                className="w-full h-full object-cover object-left"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-hitm-navy/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white font-bold text-lg">World-Class Infrastructure & Facilities</p>
                <p className="text-white/80 text-sm mt-1">Creating tomorrow's innovators today</p>
              </div>
            </div>
          </div>
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
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-hitm-red shrink-0">
                    <Clock />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">2 Years</p>
                    <p className="text-xs text-gray-400 font-serif">Full Time Program</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-hitm-red shrink-0">
                    <Users />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">180 Seats</p>
                    <p className="text-xs text-gray-400 font-serif">Approved Intake</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-hitm-red shrink-0">
                    <Briefcase />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Excellent ROI</p>
                    <p className="text-xs text-gray-400 font-serif">Placement Support</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-hitm-red shrink-0">
                    <BookOpen />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">AICTE Approved</p>
                    <p className="text-xs text-gray-400 font-serif">Globally Recognized</p>
                  </div>
                </div>
              </div>

              {/* <h3 className="text-2xl font-bold text-gray-900 mb-6">Specializations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {specializations.map((s, i) => (
                  <Card key={i} className="hover:shadow-md transition-all">
                    <CardContent className="p-6">
                      <h4 className="font-bold text-gray-950 mb-2">{s.name}</h4>
                      <p className="text-gray-500 text-sm">{s.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div> */}
            </div>

            <div className="bg-gray-900 text-white rounded-[40px] p-10 shadow-2xl h-fit">
              <h3 className="text-2xl font-bold font-serif mb-6 text-hitm-gold">Admission Process</h3>
              <div className="space-y-6 mb-10">
                {[
                  'Graduation with min. 50% Marks',
                  'Valid CAT / MAT / CMAT Score',
                  'Personal Interview Round',
                  'Document Verification',
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-hitm-red flex items-center justify-center text-xs font-black shrink-0">
                      {i + 1}
                    </div>
                    <span className="text-sm text-white/80">{step}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-bold font-serif mb-5 text-hitm-gold border-t border-white/10 pt-8 mt-8">
                Fee Structure
              </h3>
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
