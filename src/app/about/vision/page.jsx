import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Lightbulb, Rocket, ShieldCheck, Heart, Users } from 'lucide-react';

export const metadata = {
  title: 'Vision & Mission | HITM Ranchi',
  description: 'Our commitment to high-quality technical education and training.',
};

export default function VisionPage() {
  const values = [
    { icon: <Target className="text-hitm-red" />, title: 'Mission', desc: 'To provide high-quality technical education and training that meets the evolving needs of the industry and society.' },
    { icon: <Lightbulb className="text-hitm-red" />, title: 'Vision', desc: 'To be a globally recognized institution known for excellence in technology, management, and research.' },
    { icon: <ShieldCheck className="text-hitm-red" />, title: 'Integrity', desc: 'We uphold the highest ethical standards in all our academic and professional pursuits.' },
    { icon: <Heart className="text-hitm-red" />, title: 'Excellence', desc: 'We strive for perfection in teaching, learning, and infrastructure development.' }
  ];

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 bg-white pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="gold" className="mb-4">Our Foundation</Badge>
            <h1 className="text-4xl md:text-5xl font-black font-serif text-hitm-navy mb-4 uppercase tracking-tighter">Vision & Mission</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              At HITM Ranchi, we are driven by a singular purpose: to empower our students with the skills and 
              mindset needed to lead in a technology-driven world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
             <div className="p-10 rounded-3xl bg-gray-50 border border-gray-100 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6">
                   <Target className="text-hitm-red" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-hitm-navy mb-4 font-serif uppercase tracking-widest">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed font-medium">To provide high-quality technical education and training that meets the evolving needs of the industry and society. We aim to foster an environment of innovation, critical thinking, and ethical leadership.</p>
             </div>
             <div className="p-10 rounded-3xl bg-hitm-navy text-white flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full"></div>
                <div className="w-16 h-16 bg-white/10 rounded-2xl shadow-sm flex items-center justify-center mb-6">
                   <Lightbulb className="text-hitm-gold" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 font-serif uppercase tracking-widest">Our Vision</h3>
                <p className="text-gray-300 leading-relaxed font-medium">To be a globally recognized institution known for excellence in technology, management, and research, producing professionals who contribute meaningfully to national development and global progress.</p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <Card key={i} className="border-none shadow-md hover:shadow-xl transition-all">
                <CardContent className="pt-8 text-center">
                  <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-4">{v.icon}</div>
                  <h4 className="font-bold text-gray-900 mb-2 uppercase tracking-widest text-xs">{v.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{v.desc}</p>
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

