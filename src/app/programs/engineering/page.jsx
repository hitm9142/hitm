'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, Users, BookOpen, ArrowRight, Award } from 'lucide-react';
import Link from 'next/link';
import ApplyModal from '@/components/ApplyModal';

export default function EngineeringPage() {
  const branches = [
    {
      name: 'Computer Science & Engineering (CSE)',
      seats: 120,
      desc: 'Cutting-edge curriculum focused on AI, Software Engineering, and Cloud Computing.',
    },
    {
      name: 'Data Sciences (DS)',
      seats: 30,
      desc: 'Advanced analytics, statistical modeling, and big data technologies.',
    },
    {
      name: 'Artificial Intelligence (AI)',
      seats: 30,
      desc: 'Deep learning, robotics, and neural networks integration.',
    },
    {
      name: 'Electrical & Electronics Engineering (EEE)',
      seats: 60,
      desc: 'Power systems, microelectronics, and control systems.',
    },
    { name: 'Mechanical Engineering (ME)', seats: 60, desc: 'Thermodynamics, robotics, and precision manufacturing.' },
    {
      name: 'Civil Engineering (CE)',
      seats: 60,
      desc: 'Structural design, construction management, and urban planning.',
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-hitm-navy pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1600"
            alt="Engineering"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-between items-center mb-4">
            <Badge variant="gold">Department of Engineering</Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-serif text-white mb-6 capitalize">
            Best b tech college in ranchi
          </h1>
          <p className="text-gray-300 max-w-2xl text-lg leading-relaxed">
            Empowering the next generation of engineers with innovation, practical skills, and technical excellence at
            HITM Ranchi.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <Clock className="mx-auto text-hitm-red mb-2" />
              <p className="text-2xl font-black text-hitm-navy">4 Years</p>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Duration</p>
            </div>
            <div className="text-center">
              <Users className="mx-auto text-hitm-red mb-2" />
              <p className="text-2xl font-black text-hitm-navy">360</p>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Total Seats</p>
            </div>
            <div className="text-center">
              <Award className="mx-auto text-hitm-red mb-2" />
              <p className="text-2xl font-black text-hitm-navy">AICTE</p>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Approved</p>
            </div>
            <div className="text-center">
              <BookOpen className="mx-auto text-hitm-red mb-2" />
              <p className="text-2xl font-black text-hitm-navy">JUT</p>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Affiliation</p>
            </div>
          </div>
        </div>
      </section>

      {/* About the Program Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image on Left */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] lg:h-[500px]">
              <img
                src="/images/btech-image-1.webp"
                alt="B.Tech Program at HITM"
                className="w-full h-full object-cover"
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
                  The Bachelor of Technology (B.Tech) program at HITM is a four-year full-time undergraduate engineering
                  program recognized by the All India Council for Technical Education (AICTE). The program aims to build
                  an engineering mindset where students build the essential skills of problem-solving, critical
                  thinking, and insightfully using data for decision-making. The program at HITM’s{' '}
                  <b> B.Tech institute in Ranchi</b> is offered across numerous specialization domains, providing
                  students with the flexibility to pursue a field of their interest.
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
                      title: 'AICTE Approved',
                      desc: 'All the B.Tech programs at HITM have been approved by the statutory national-level council for technical education. Such approvals improve the credibility and are only traits of a top B Tech college in Ranchi.',
                    },
                    {
                      title: 'Experienced Faculty',
                      desc: 'Students at HITM receive academic guidance directly from the faculty of the IIT. It ensures that students receive the best mentorship for their future prospects.',
                    },
                    {
                      title: 'Value-Added Laboratories',
                      desc: 'All the laboratories in the institute have been developed as per the AICTE norms and standards.',
                    },
                    {
                      title: 'Industry-Oriented Curriculum',
                      desc: 'Our curriculum across all the courses has been aligned with industry demand, where students focus on AI, innovation, and emerging technologies.',
                    },
                    {
                      title: 'Top-Notch Infrastructure',
                      desc: 'Our infrastructure has been designed to provide students with the highest comfort required for the best learning experience. Infrastructure is one of the qualities that separates HITM as the best B Tech college in Jharkhand.',
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
                <p className="text-white/80 text-sm mt-1">Creating tomorrow&apos;s innovators today</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specializations Offered */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-black font-serif text-gray-900 mb-6">Specializations Offered</h2>
              <div className="space-y-4">
                {branches.map((b, i) => (
                  <Card key={i} className="border-none shadow-sm hover:shadow-md transition-all bg-gray-50">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-gray-900">{b.name}</h3>
                        <Badge variant="outline" className="text-[10px]">
                          {b.seats} Seats
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="bg-white border rounded-[40px] p-8 md:p-12 shadow-2xl sticky top-32">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Admission Criteria</h3>
              <ul className="space-y-4 mb-8">
                {[
                  '10+2 with Physics, Chemistry & Math',
                  'Minimum 45% aggregate (40% for reserved)',
                  'Valid JEE Main or JCECEB ScoreCard',
                  'Lateral Entry available for Diploma holders',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
                    <CheckCircle className="text-hitm-red shrink-0" size={18} />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="bg-hitm-red/5 p-6 rounded-2xl mb-8 border border-hitm-red/10">
                <h4 className="text-sm font-bold text-hitm-navy uppercase tracking-widest mb-4 font-serif text-center">
                  Fee Structure
                </h4>
                <div className="space-y-3 mb-2">
                  <div className="flex justify-between items-center border-b border-hitm-red/10 pb-2">
                    <span className="text-xs font-semibold text-gray-600">One-time Fees (Reg. + Caution)</span>
                    <span className="text-sm font-black text-gray-900">₹ 25,000</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-hitm-red/10 pb-2">
                    <span className="text-xs font-semibold text-gray-600">Semester Fee</span>
                    <span className="text-sm font-black text-hitm-red">₹ 55,000</span>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-xs font-black text-hitm-navy">Total Course Fee (From)</span>
                    <span className="text-sm font-black text-hitm-navy">₹ 4,65,000</span>
                  </div>
                </div>
              </div>

              <ApplyModal courseName="Bachelor of Technology (B.Tech)">
                <Button className="w-full bg-hitm-red hover:bg-hitm-navy h-14 shadow-xl text-lg font-bold" size="lg">
                  Apply for B.Tech Admission <ArrowRight className="ml-2" />
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
