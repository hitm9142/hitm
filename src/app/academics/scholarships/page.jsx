'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { CheckCircle, Info, Award, Calendar, HandCoins, GraduationCap } from 'lucide-react';

export default function ScholarshipsPage() { 
  const scholarshipTypes = [
    {
      title: "Merit-Based Scholarship",
      description: "Awarded to students with exceptional academic records in Class 12 or equivalent qualifying examinations.",
      icon: <Award className="w-6 h-6 text-hitm-gold" />,
    },
    {
      title: "Need-Based Financial Aid",
      description: "Designed for students from economically weaker sections to ensure finance is not a barrier to education.",
      icon: <HandCoins className="w-6 h-6 text-hitm-red" />,
    },
    {
      title: "Sportsperson Scholarship",
      description: "Available for students who have represented at state, national, or international levels in recognized sports.",
      icon: <CheckCircle className="w-6 h-6 text-hitm-navy" />,
    },
    {
      title: "Defense Personnel Ward",
      description: "Special fee concessions for wards of serving or retired personnel of Indian Armed Forces and Paramilitary forces.",
      icon: <Info className="w-6 h-6 text-blue-600" />,
    }
  ];

  return (
    <main className='flex flex-col min-h-screen bg-white'>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <Image 
          src="/images/scholar.webp"
          alt="Students studying"
          fill
          className="object-cover"
          priority
        />
        <div className="container mx-auto px-4 relative z-20 text-center">
          <Badge variant='gold' className='mb-4 px-4 py-1 text-sm'>Academics</Badge>
          <h1 className='text-4xl md:text-6xl font-black text-white font-serif mb-6 uppercase tracking-tight'>
            Empowering Your <span className="text-hitm-gold">Future</span>
          </h1>
          <p className='text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed'>
            We believe that financial constraints should never stand in the way of talent. HITM offers a wide range of scholarships to support meritorious and deserving students.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className='py-20 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <div className="animate-fade-up">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-hitm-navy mb-6">Invest in Your Education</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                HITM Ranchi is committed to fostering academic excellence and ensuring that quality education is accessible to all. Our scholarship programs are designed to recognize talent, reward hard work, and provide support to those who need it most.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-hitm-red/10 rounded-lg">
                    <GraduationCap className="w-6 h-6 text-hitm-red" />
                  </div>
                  <div>
  <h3 className="font-bold text-hitm-navy">Committed to Supporting Every Student</h3>
  <p className="text-sm text-gray-500">
    Providing financial assistance and scholarships to help students begin their academic journey.
  </p>
</div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-hitm-gold/10 rounded-lg">
                    <Calendar className="w-6 h-6 text-hitm-gold" />
                  </div>
                  <div>
                    <h3 className="font-bold text-hitm-navy">Renewable Every Year</h3>
                    <p className="text-sm text-gray-500">Scholarships can be maintained throughout the course duration based on academic performance.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl skew-y-2 lg:skew-y-0 lg:rotate-3 transition-transform hover:rotate-0 duration-500">
              <Image 
                src="/images/school.webp"
                alt="Success at HITM"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="section-title">
            <h2 className="text-3xl font-serif font-bold">Types of Scholarships</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {scholarshipTypes.map((type, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md hover:-translate-y-1">
                <div className="mb-4">{type.icon}</div>
                <h3 className="font-bold text-lg text-hitm-navy mb-3">{type.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Get Scholarship */}
      

      {/* CTA Section */}
      <section className="py-16 bg-hitm-navy text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-6">Have Questions about Scholarships?</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto italic">
            &quot;Our financial aid office is here to help you navigate your options and find the best support for your education.&quot;
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-hitm-red hover:bg-hitm-red-dark transition-colors rounded-full font-bold">Contact Advisor</button>
            <button className="px-8 py-3 bg-white/10 hover:bg-white/20 transition-colors rounded-full font-bold border border-white/20">Download FAQ</button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  ); 
}
