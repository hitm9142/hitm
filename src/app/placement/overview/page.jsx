'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Award, Globe, Briefcase, GraduationCap, Users, ShieldCheck, Rocket, Zap, BookOpen } from 'lucide-react';
import Image from 'next/image';

export default function PlacementOverviewPage() {
  const trainingModules = [
    { 
      icon: <Zap className="text-hitm-gold" />, 
      title: 'Aptitude &amp; Reasoning', 
      desc: 'Intensive training in quantitative, logical, and verbal reasoning from the early semesters.' 
    },
    { 
      icon: <Target className="text-hitm-red" />, 
      title: 'Technical Grooming', 
      desc: 'Focus on core programming, data structures, and industry-relevant technologies like Cloud &amp; AI.' 
    },
    { 
      icon: <Users className="text-blue-600" />, 
      title: 'Soft Skills', 
      desc: 'Communication skills, personality development, and professional etiquette workshops.' 
    },
    { 
      icon: <Target className="text-hitm-navy" />, 
      title: 'Mock Interviews', 
      desc: 'Real-world interview simulations with industry experts to build confidence.' 
    }
  ];

  const commitmentPoints = [
    "100% Placement Assistance for all eligible students.",
    "Strategic Industry-Academic partnerships for internship opportunities.",
    "Dedicated Training & Placement Cell (TPC) for career guidance.",
    "Regular Corporate Guest Lectures and Industry Visits.",
    "A strong network of corporate mentors and advisors."
  ];

  return (
    <main className="flex flex-col min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <Badge variant="gold" className="mb-4">Vision 2026</Badge>
              <h1 className="text-4xl md:text-5xl font-black font-serif text-hitm-navy mb-6 leading-tight">
                Our Commitment to <span className="text-hitm-red">Your Career</span>
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                As a newly founded institution, HITM Ranchi is building a future-ready placement ecosystem from day one. Our focus is not just on jobs, but on creating industry leaders through rigorous training and strategic corporate alliances.
              </p>
              
              <div className="flex flex-wrap gap-4">
                 <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
                    <ShieldCheck className="text-green-500 w-6 h-6" />
                    <div>
                       <p className="font-bold text-hitm-navy leading-none">Industry Ready</p>
                       <p className="text-[10px] text-gray-500 uppercase mt-1">Focus on Skill Development</p>
                    </div>
                 </div>
                 <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
                    <Rocket className="text-hitm-gold w-6 h-6" />
                    <div>
                       <p className="font-bold text-hitm-navy leading-none">Global Network</p>
                       <p className="text-[10px] text-gray-500 uppercase mt-1">Building Corporate Ties</p>
                    </div>
                 </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl relative h-[400px]">
                <Image 
                  src="https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=2071&auto=format&fit=crop" 
                  alt="Corporate Training Session" 
                  fill
                  className="object-cover" 
                />
                <div className="absolute inset-0 bg-hitm-navy/20" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-8 rounded-2xl shadow-xl border border-gray-50 max-w-[250px] hidden md:block">
                 <p className="text-hitm-red font-serif font-black text-2xl mb-1">TPC</p>
                 <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-4">Training &amp; Placement Cell</p>
                 <p className="text-sm text-gray-600 italic leading-relaxed">
                   &quot;Guiding students from the classroom to the boardroom.&quot;
                 </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-hitm-navy">The Placement Roadmap</h2>
            <p className="text-gray-500 mt-4 italic max-w-xl mx-auto">A well-structured four-year journey designed to make every student industry-ready.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trainingModules.map((module, i) => (
              <Card key={i} className="border-none shadow-sm hover:shadow-xl transition-all duration-300 group">
                <CardContent className="pt-10 text-center px-6">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-hitm-navy transition-colors">
                    {module.icon}
                  </div>
                  <h3 className="font-bold text-xl text-hitm-navy mb-3">{module.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{module.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-24 bg-hitm-navy text-white relative overflow-hidden">
         <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               <div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8">No Compromise on <span className="text-hitm-gold">Placement Support</span></h2>
                  <div className="space-y-6">
                     {commitmentPoints.map((point, id) => (
                        <div key={id} className="flex items-start gap-4">
                           <div className="w-6 h-6 rounded-full bg-hitm-gold/20 flex items-center justify-center shrink-0 mt-1">
                              <ShieldCheck className="w-4 h-4 text-hitm-gold" />
                           </div>
                           <p className="text-gray-300 text-lg leading-snug">{point}</p>
                        </div>
                     ))}
                  </div>
               </div>
               <div className="bg-white/5 p-10 rounded-3xl border border-white/10">
                  <div className="flex items-center gap-4 mb-8">
                     <Users className="text-hitm-gold w-10 h-10" />
                     <h3 className="text-2xl font-bold">Corporate Connect</h3>
                  </div>
                  <p className="text-gray-400 mb-8 leading-relaxed">
                    HITM Ranchi is actively engaging with leading industry giants and startups to establish MoUs and Corporate Hubs. Our foundation is built on the principle of &apos;Industry-first&apos; education.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 bg-white/5 rounded-xl text-center">
                        <p className="text-xs text-gray-500 uppercase mb-1">Target Sectors</p>
                        <p className="font-bold text-sm">IT, Core, Finance</p>
                     </div>
                     <div className="p-4 bg-white/5 rounded-xl text-center">
                        <p className="text-xs text-gray-500 uppercase mb-1">Focus Area</p>
                        <p className="font-bold text-sm">Product & Service</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {/* Decorative elements */}
         <div className="absolute top-0 right-0 w-96 h-96 bg-hitm-red/5 rounded-full blur-3xl" />
         <div className="absolute bottom-0 left-0 w-96 h-96 bg-hitm-gold/5 rounded-full blur-3xl" />
      </section>

      {/* Upcoming Partnerships */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <Badge variant="outline" className="text-hitm-red border-hitm-red mb-4">Open & Transparent</Badge>
          <h2 className="text-3xl font-serif font-bold text-hitm-navy mb-6">Building Our Legacy</h2>
          <p className="text-gray-600 text-lg mb-10 leading-relaxed italic">
            &quot;We are not showing past data because we believe in creating new milestones. Join us in building a legacy of excellence where every student is a success story.&quot;
          </p>
          <div className="flex justify-center flex-wrap gap-8 opacity-40 grayscale pointer-events-none">
             {/* Using generic representation for sectors instead of fake logos */}
             <div className="flex items-center gap-2"><Briefcase /> <span className="font-bold uppercase tracking-tighter">Information Tech</span></div>
             <div className="flex items-center gap-2"><Target /> <span className="font-bold uppercase tracking-tighter">Manufacturing</span></div>
             <div className="flex items-center gap-2"><Award /> <span className="font-bold uppercase tracking-tighter">FinTech</span></div>
             <div className="flex items-center gap-2"><Globe /> <span className="font-bold uppercase tracking-tighter">EdTech</span></div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
