'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, Users, BookOpen, ArrowRight, Target } from 'lucide-react';
import Link from 'next/link';
import ApplyModal from '@/components/ApplyModal';

export default function BBAPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-hitm-navy pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1600"
            alt="BBA"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-between items-center mb-4">
            <Badge variant="gold">School of Business</Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-serif text-white mb-6 capitalize">
            bba colleges in ranchi
          </h1>
          <p className="text-gray-300 max-w-2xl text-lg leading-relaxed">
            The foundation of your business career. Develop the leadership, strategic thinking, and entrepreneurial
            skills required for modern management.
          </p>
        </div>
      </section>

      {/* About the Program Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image on Left */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] lg:h-[500px]">
              <img src="/images/bba-img.webp" alt="B.Tech Program at HITM" className="w-full h-full object-cover" />
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
                  The Bachelor of Business Administration (MBA) program at HITM is a 3-year undergraduate qualification.
                  The program is designed to equip students with foundational business skills and knowledge necessary
                  for understanding the functional aspects of a company and their interconnection. HITM’s{' '}
                  <b>BBA course in Jharkhand</b> also focuses on building leadership, strategic thinking, and
                  entrepreneurial skills alongside emerging fintech trends for management in the modern business
                  dynamic.{' '}
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
                      title: 'Guaranteed Real World Success',
                      desc: 'Students of the BBA program at HITM are encouraged with practical projects and summer internships. It builds the crucial foundation for the early placement support in the final year of the program.',
                    },
                    {
                      title: 'Experienced Faculty',
                      desc: 'Students at HITM receive academic guidance from professionals with extensive industry experience. It ensures that students receive the best mentorship for their future prospects.',
                    },
                    {
                      title: 'Value-Added Laboratories',
                      desc: 'HITM students develop a deeper understanding of the business dynamics, helping them with the ability to handle both self-owned and multinational businesses. This business acumen is a lost attribute of many BBA colleges in Ranchi Jharkhand, but not HITM.',
                    },
                    {
                      title: 'Industry-Oriented Curriculum',
                      desc: 'Our curriculum across all the courses has been aligned with the latest business demands, where students focus on AI, innovation, and emerging technologies.',
                    },
                    {
                      title: 'Top-Notch Infrastructure',
                      desc: 'Our infrastructure has been designed to provide students with the highest comfort required for the best learning experience. Infrastructure is one of the qualities that separates HITM among the best colleges in Jharkhand for BBA.',
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
      {/* Program Info */}
      <section className="py-20 flex-1">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-black font-serif text-gray-950 mb-6">Why BBA at HITM Ranchi?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    {
                      icon: <Target className="text-hitm-red" />,
                      title: 'Industry Focused',
                      desc: 'Curriculum designed in collaboration with industry leaders.',
                    },
                    {
                      icon: <Users className="text-hitm-red" />,
                      title: 'Mentorship',
                      desc: '1-on-1 career guidance from experienced professionals.',
                    },
                    {
                      icon: <BookOpen className="text-hitm-red" />,
                      title: 'Real World Labs',
                      desc: 'Practical projects and summer internships included.',
                    },
                    {
                      icon: <Clock className="text-hitm-red" />,
                      title: 'Early Placement',
                      desc: 'Placement support starting from final year.',
                    },
                  ].map((f, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-hitm-red/5 flex items-center justify-center shrink-0">
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

              <div className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-100">
                <h3 className="text-2xl font-black font-serif text-gray-900 mb-5">Curriculum Focus</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Business Mgmt', 'Marketing', 'FinTech', 'Digital Biz', 'Economics', 'Soft Skills'].map((tag) => (
                    <div
                      key={tag}
                      className="bg-white border text-center py-3 rounded-xl shadow-sm text-sm font-bold text-gray-700"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="h-fit sticky top-32">
              <Card className="shadow-2xl border-none p-6 bg-hitm-navy text-white rounded-[40px]">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-6 font-serif text-hitm-gold">BBA Admission in Ranchi</h3>
                  <div className="space-y-3 mb-8">
                    {[
                      { label: 'Seats', value: '180' },
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
