'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, Users, BookOpen, ArrowRight, Monitor } from 'lucide-react';
import Link from 'next/link';
import ApplyModal from '@/components/ApplyModal';

export default function BCAPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-hitm-navy pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1600"
            alt="BCA"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-between items-center mb-4">
            <Badge variant="gold">Top Rated IT Program</Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-serif text-white mb-6  tracking-tight capitalize">
            best bca college in ranchi
          </h1>
          <p className="text-gray-300 max-w-2xl text-lg leading-relaxed font-medium">
            Jumpstart your software career. Learn web development, mobile apps, and database management with HITM
            Ranchi&apos;s most popular undergraduate tech degree.
          </p>
        </div>
      </section>
      {/* About the Program Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image on Left */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] lg:h-[500px]">
              <img src="/images/bca-img.png" alt="B.Tech Program at HITM" className="w-full h-full object-cover" />
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
                  The Bachelor of Computer Applications (BCA) program at HITM is a 3-year undergraduate qualification.
                  The program is designed to equip students with foundational software development, programming, and
                  application design knowledge, where students dive deep into the concepts of web development, mobile
                  apps, and database management. HITM’s <b> BCA course in Ranchi </b> also focuses on emerging
                  technologies like AI/ML, cloud computing, cybersecurity, etc., for students’ future readiness.{' '}
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
                      title: 'Technical Proficiency',
                      desc: 'Students in the BCA program at HITM build a deep understanding of logic, mathematical and theoretical foundations, and programming languages like React, Node.js, and Java.',
                    },
                    {
                      title: 'Experienced Faculty',
                      desc: 'Students at HITM receive academic guidance directly from the faculty of the IIT. It ensures that students receive the best mentorship for their future prospects.',
                    },
                    {
                      title: 'Value-Added Laboratories',
                      desc: 'Any resources that students may require in their learning journey at HITM are provided by our state-of-the-art laboratories. The labs are what replicate the offerings of a top BCA college in Ranchi.',
                    },
                    {
                      title: 'Industry-Oriented Curriculum',
                      desc: 'Our curriculum across all the courses has been aligned with industry demand, where students focus on AI, innovation, and emerging technologies.',
                    },
                    {
                      title: 'Top-Notch Infrastructure',
                      desc: 'Our infrastructure has been designed to provide students with the highest comfort required for the best learning experience. Infrastructure is one of the qualities that separates HITM as the best college for BCA in Ranchi.',
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
                <p className="text-white/80 text-sm mt-1">Creating tomorrow&apos;s innovators today</p>
              </div>
            </div>
          </div>
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
                  BCA remains the backbone of the IT industry. At HITM Ranchi, we don&apos;t just teach programming; we
                  teach problem-solving using modern technology stacks including React, Node.js, and Java.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {[
                  {
                    icon: <Monitor className="text-hitm-red" />,
                    title: 'Modern Labs',
                    desc: 'Work on high-end systems in our specialized computing labs.',
                  },
                  {
                    icon: <Users className="text-hitm-red" />,
                    title: 'Team Projects',
                    desc: 'Build real-world software applications in collaborative teams.',
                  },
                  {
                    icon: <BookOpen className="text-hitm-red" />,
                    title: 'Updated Syllabus',
                    desc: 'Learn current industry trends like Cloud and Cybersecurity.',
                  },
                  {
                    icon: <Clock className="text-hitm-red" />,
                    title: 'Fast Careers',
                    desc: 'Secure technical roles across India’s leading technology hubs.',
                  },
                ].map((f, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-5 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all border border-gray-100"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
                      {f.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{f.title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-3xl p-8 md:p-10 border border-gray-100 h-fit">
              <h3 className="text-2xl font-black font-serif text-hitm-navy mb-6">BCA Admission in Jharkhand</h3>
              <div className="space-y-3 mb-10">
                {[
                  { label: 'Seats', value: '180' },
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
