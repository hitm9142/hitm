'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GraduationCap, ArrowRight, BookOpen, Briefcase, Award, Globe, Target } from 'lucide-react';
import Link from 'next/link';

export default function ProgramsPage() {
  const categories = [
    {
      name: 'Engineering (B.Tech)',
      icon: <BookOpen className="text-white" size={24} />,
      desc: '4-Year undergraduate programs focused on innovation and problem solving.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
      href: '/programs/engineering',
      courses: ['CSE', 'AI & ML', 'Data Science', 'Civil', 'Electrical', 'Mechanical']
    },
    {
      name: 'Polytechnic (Diploma)',
      icon: <Briefcase className="text-white" size={24} />,
      desc: '3-Year technical diploma programs for job-ready skills.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
      href: '/programs/diploma',
      courses: ['CSE', 'Mechanical', 'Electrical', 'Civil', 'Automobile']
    },
    {
      name: 'Management (MBA/BBA)',
      icon: <Award className="text-white" size={24} />,
      desc: 'Programs designed to build strategic leaders and entrepreneurs.',
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800',
      href: '/programs/mba',
      courses: ['MBA (General)', 'BBA (Digital Marketing)', 'BBA (HRM)']
    },
    {
      name: 'Computer Applications',
      icon: <Globe className="text-white" size={24} />,
      desc: 'Specialized programs for building a career in software and IT.',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800',
      href: '/programs/mca',
      courses: ['MCA (Masters)', 'BCA (Undergraduate)']
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      {/* Banner */}
      <section className="bg-hitm-navy pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1600" alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge variant="gold" className="mb-4">Academic Excellence</Badge>
          <h1 className="text-4xl md:text-6xl font-black font-serif text-white mb-6">Our Academic Programs</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Diverse, industry-aligned programs designed to empower students with knowledge, skills, and values.
          </p>
        </div>
      </section>

      <section className="py-20 flex-1">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((p, i) => (
              <Card key={i} className="group hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col md:flex-row h-full">
                <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-900/60 to-transparent" />
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-hitm-red flex items-center justify-center shadow-lg border border-white/20">
                    {p.icon}
                  </div>
                </div>
                <div className="md:w-1/2 p-8 flex flex-col">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{p.name}</h3>
                  <p className="text-gray-500 text-sm mb-6 leading-relaxed flex-1">{p.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {p.courses.map((c) => (
                      <Badge key={c} variant="secondary" className="text-[10px] bg-gray-100/80 text-gray-600">{c}</Badge>
                    ))}
                  </div>
                  <Button asChild variant="default" className="w-full bg-hitm-navy hover:bg-hitm-red shadow-lg group-hover:-translate-y-1 transition-transform">
                    <Link href={p.href} className="flex items-center gap-2">View Curriculum <ArrowRight size={16} /></Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-20 text-center bg-white border border-gray-100 rounded-[40px] p-12 shadow-xl">
            <GraduationCap size={48} className="mx-auto text-hitm-gold mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Confused about which program to choose?</h2>
            <p className="text-gray-500 mb-8 max-w-xl mx-auto">
              Our academic counselors are here to help you make the right choice for your career. Get a free counseling session today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="default" size="lg" className="bg-hitm-red">
                <Link href="/contact">Talk to an Expert</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/admissions/brochures">Download Prospectus</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
