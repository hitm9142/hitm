'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, Users, BookOpen, ArrowRight, Code } from 'lucide-react';
import Link from 'next/link';
import ApplyModal from '@/components/ApplyModal';

export default function MCAPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-hitm-navy pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1600"
            alt="MCA"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-between items-center mb-4">
            <Badge variant="gold">Postgraduate IT Program</Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-serif text-white mb-6 capitalize tracking-tight">
            best mca college in ranchi
          </h1>
          <p className="text-gray-300 max-w-2xl text-lg leading-relaxed font-medium">
            Master the art of software development, data science, and web technologies. HITM Ranchi is the premier hub
            for tech leaders in Jharkhand.
          </p>
        </div>
      </section>

      {/* About the Program Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image on Left */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] lg:h-[500px]">
              <img
                src="/images/mca-image-1.webp"
                alt="B.Tech Program at HITM"
                className="w-full h-full object-cover object-left"
              />
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
                  The Master of Computer Applications (MCA) program at HITM is a 2-year postgraduate qualification. The
                  program is designed to equip students with advanced software engineering, programming languages, and
                  application development knowledge, where students dive deep into the concepts of software development,
                  data science, and web technologies. HITM’s<b> MCA course in Ranchi</b> is offered across numerous
                  specialization domains focusing on emerging technologies like AI/ML, data science, etc., for students’
                  future readiness.
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
                Why Choose HITM
              </h2>
              <div className="space-y-4">
                <ul className="space-y-4">
                  {[
                    {
                      title: 'Technical Proficiency',
                      desc: 'Students in the MCA program at HITM build a deep understanding of logic, mathematical and theoretical foundations, and programming languages like Java, Python, and C++.',
                    },
                    {
                      title: 'Experienced Faculty',
                      desc: 'Students at HITM receive academic guidance directly from the faculty of the IIT. It ensures that students receive the best mentorship for their future prospects.',
                    },
                    {
                      title: 'Value-Added Laboratories',
                      desc: 'Any resources that students may require in their learning journey at HITM are provided by our state-of-the-art laboratories.',
                    },
                    {
                      title: 'Industry-Oriented Curriculum',
                      desc: ' Our curriculum across all the courses has been aligned with industry demand, where students focus on AI, innovation, and emerging technologies.',
                    },
                    {
                      title: 'Top-Notch Infrastructure',
                      desc: 'Our infrastructure has been designed to provide students with the highest comfort required for the best learning experience. Infrastructure is one of the qualities that separates HITM from an average MCA in Jharkhand.',
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
                className="w-full h-full object-cover"
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
      {/* Overview */}
      <section className="py-20 flex-1">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="section-title !text-left">
                <h2 className="!mb-4">Build Your Tech Legacy</h2>
                <p className="text-gray-500">
                  Our MCA program is designed to bridge the gap between academic knowledge and industrial application.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: <Code className="text-hitm-red" />,
                    title: 'Advanced Coding',
                    desc: 'Focus on Java, Python, and C++.',
                  },
                  {
                    icon: <Users className="text-hitm-red" />,
                    title: 'Industry Ready',
                    desc: 'Practical hands-on training.',
                  },
                  {
                    icon: <Clock className="text-hitm-red" />,
                    title: '2-Year Track',
                    desc: 'Fast-track your post-grad career.',
                  },
                  {
                    icon: <BookOpen className="text-hitm-red" />,
                    title: 'Research Base',
                    desc: 'Research and development CS lab access.',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-hitm-navy rounded-3xl p-8 text-white">
                <h3 className="text-xl font-bold mb-4 font-serif text-hitm-gold">Eligibility</h3>
                <ul className="space-y-3">
                  {[
                    'Maths in 10+2 is Mandatory',
                    'BCA / B.Sc (IT) / B.Sc with 50% Marks',
                    'JCECEB / Direct Admission Round',
                    'Approved Intake: 180 Seats',
                  ].map((li, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                      <CheckCircle size={16} className="text-hitm-gold" /> {li}
                    </li>
                  ))}
                </ul>

                <h3 className="text-xl font-bold mb-4 mt-8 font-serif text-hitm-gold border-t border-white/10 pt-8">
                  Fee Structure
                </h3>
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
              <img
                src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=1000"
                alt="Tech"
                className="rounded-[40px] shadow-2xl relative z-10"
              />
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
