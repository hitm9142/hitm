import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, GraduationCap, CheckCircle, Target, Users, BookOpen } from 'lucide-react';

export const metadata = {
  title: 'About HITM Ranchi | Overview',
  description: 'Learn about the legacy, excellence, and infrastructure of Haider Institute of Technology and Management.',
};

export default function OverviewPage() {
  const points = [
    { title: 'Academic Excellence', desc: 'Rigorous curriculum designed in collaboration with industry experts to ensure students are job-ready from day one.' },
    { title: 'Modern Infrastructure', desc: 'State-of-the-art labs, a digital library, and a beautiful big green campus in Ranchi.' },
    { title: 'Industry Connect', desc: 'Over 200+ corporate partners providing internship and placement opportunities to our students.' },
    { title: 'Expert Faculty', desc: 'Mentorship from Ph.D. holders and industry veterans who bring years of practical experience.' }
  ];

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 bg-white pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="relative">
               <div className="w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl relative">
                  <img src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800" alt="HITM Campus" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-hitm-navy/80 via-transparent to-transparent" />
               </div>
               <div className="absolute -bottom-8 -right-8 bg-hitm-red text-white p-8 rounded-3xl shadow-2xl transform rotate-3">
                  <p className="text-4xl font-black font-serif">15+</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-white/80">Years of Legacy</p>
               </div>
            </div>
            
            <div>
              <Badge variant="gold" className="mb-4">Institution Profile</Badge>
              <h1 className="text-4xl md:text-6xl font-black font-serif text-hitm-navy mb-6 leading-tight uppercase tracking-tighter italic">About HITM Ranchi</h1>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Established as Haider Institute of Technology and Management in 2008, our institution has emerged as a premier destination for technical &amp; management education in Jharkhand. 
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                We are committed to fostering academic excellence, research innovation, and holistic development. With a focus on state-of-the-art facilities and industry-aligned programs, we prepare our students to excel in the global professional landscape.
              </p>
              <div className="grid grid-cols-2 gap-6">
                 {/* <div className="flex items-center gap-3">
                    <CheckCircle className="text-hitm-red" size={20} />
                    <span className="font-bold text-hitm-navy uppercase tracking-widest text-xs">NAAC Accredited</span>
                 </div> */}
                 <div className="flex items-center gap-3">
                    <CheckCircle className="text-hitm-red" size={20} />
                    <span className="font-bold text-hitm-navy uppercase tracking-widest text-xs">AICTE Approved</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <CheckCircle className="text-hitm-red" size={20} />
                    <span className="font-bold text-hitm-navy uppercase tracking-widest text-xs">ISO Certified</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <CheckCircle className="text-hitm-red" size={20} />
                    <span className="font-bold text-hitm-navy uppercase tracking-widest text-xs">Skill Centers</span>
                 </div>
              </div>
            </div>
          </div>


          
          {/* Culture Section */}
          <div className="mt-24 mb-24">
             <div className="section-title">
                <h2 className="text-3xl font-serif font-bold text-hitm-navy">Campus Culture & Values</h2>
             </div>
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 bg-hitm-navy p-10 rounded-[40px] text-white flex flex-col justify-center">
                   <h3 className="text-2xl font-bold mb-4 font-serif italic text-hitm-gold">Innovation First</h3>
                   <p className="text-white/70 text-sm leading-relaxed mb-6"> Our culture is built on the pillars of creativity and technical rigour. We encourage students to think beyond text-books and solve real-world problems.</p>
                   <ul className="space-y-3">
                      <li className="flex items-center gap-2 text-xs font-bold"><CheckCircle size={14} className="text-hitm-gold" /> Student-led Hackathons</li>
                      <li className="flex items-center gap-2 text-xs font-bold"><CheckCircle size={14} className="text-hitm-gold" /> Research Symposia</li>
                      <li className="flex items-center gap-2 text-xs font-bold"><CheckCircle size={14} className="text-hitm-gold" /> Entrepreneurial Cell</li>
                   </ul>
                </div>
                <div className="lg:col-span-2 relative h-[400px] rounded-[40px] overflow-hidden shadow-2xl">
                   <img src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop" alt="Campus Life" className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-black/20" />
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {points.map((p, i) => (
              <Card key={i} className="border-none bg-gray-50 p-6 rounded-3xl hover:bg-white hover:shadow-2xl transition-all duration-500 group">
                <CardContent className="pt-4 flex flex-col gap-4 items-center text-center">
                   <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md group-hover:bg-hitm-red group-hover:text-white transition-all duration-500 shrink-0">
                      <Target size={28} />
                   </div>
                   <div>
                      <h3 className="text-lg font-bold text-hitm-navy mb-2 font-serif uppercase tracking-tight">{p.title}</h3>
                      <p className="text-gray-500 text-xs leading-relaxed">{p.desc}</p>
                   </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

