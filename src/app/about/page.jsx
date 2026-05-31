import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, GraduationCap, CheckCircle, Target, Users, BookOpen, Globe, Award, ShieldCheck, Zap } from 'lucide-react';

export const metadata = {
  title: 'About Haider Institute of Technology and Management | HITM Ranchi',
  description: 'Learn about the legacy, excellence, and infrastructure of Haider Institute of Technology and Management.',
};

export default function AboutPage() {
  const coreValues = [
    {
      title: 'Academic Excellence',
      desc: 'Rigorous curriculum designed in collaboration with industry experts to ensure students are job-ready from day one.',
      icon: <GraduationCap size={28} />
    },
    {
      title: 'Innovation & Research',
      desc: 'Fostering a culture of creativity where students are encouraged to solve real-world problems through technology.',
      icon: <Zap size={28} />
    },
    {
      title: 'Ethical Leadership',
      desc: 'Developing professionals who are not just technically sound but also ethically grounded and socially responsible.',
      icon: <ShieldCheck size={28} />
    },
    {
      title: 'Global Perspective',
      desc: 'Exposure to international standards, global industry practices, and diverse learning environments.',
      icon: <Globe size={28} />
    }
  ];

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-hitm-navy overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1600" alt="Campus bg" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 max-w-6xl relative z-10 text-center">
          <Badge variant="gold" className="mb-6 uppercase tracking-widest px-4 py-1.5 shadow-lg">Our Legacy</Badge>
          <h1 className="text-4xl md:text-7xl font-black font-serif text-white mb-6 leading-tight uppercase tracking-tighter italic">About <span className="text-hitm-gold">HITM Ranchi</span></h1>
          <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light">
            Founded in 2008, HITM has transformed from a local college into a premier technical institution, shaping the future of Jharkhand through excellence in Engineering and Management.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="flex-1 bg-white py-20">
        <div className="container mx-auto px-4 max-w-6xl">

          {/* Identity Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
            <div className="relative order-2 lg:order-1">
              <div className="w-full h-[550px] rounded-3xl overflow-hidden shadow-2xl relative">
                <img src="/images/carousel/slide2.jpg" alt="HITM Campus" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-hitm-navy/80 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-hitm-red text-white p-10 rounded-[40px] shadow-2xl transform -rotate-3 border-4 border-white">
                <p className="text-5xl font-black font-serif">15+</p>
                <p className="text-xs font-bold uppercase tracking-widest text-white/80">Years of Excellence</p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <Badge variant="gold" className="mb-4">Institution Profile</Badge>
              <h2 className="text-4xl font-serif font-black text-hitm-navy mb-8 leading-tight uppercase italic tracking-tighter">Pioneering Technical Education</h2>
              <div className="space-y-4 text-gray-600 text-[17px] leading-relaxed">
                <p>
                  Haider Institute of Technology and Management is a premier educational institution committed to delivering quality education in engineering, technology, and management. Located in Ranchi, Jharkhand, the institute is established with the vision of nurturing skilled professionals, innovative thinkers, and responsible leaders for a rapidly evolving global environment.
                </p>
                <p>
                  The institute offers industry-oriented programs with a modern curriculum, practical learning approach, and strong academic foundation. With experienced faculty, state-of-the-art infrastructure, and a student-centric learning environment, Haider Institute of Technology and Management focuses on academic excellence, skill development, and overall personality growth.
                </p>
                <p>
                  Beyond academics, the institute emphasizes ethics, leadership, research, and real-world exposure through workshops, projects, and industry interactions. Our mission is to empower students with knowledge, confidence, and professional competence, enabling them to build successful careers and contribute meaningfully to society.
                </p>
                <p className="font-semibold text-hitm-navy italic border-l-4 border-hitm-red pl-4 mt-6 py-1">
                  Haider Institute of Technology and Management stands as a center of learning where education meets innovation, opportunity, and growth.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 mt-10">
                {[
                  'AICTE Approved',
                  'JUT Affiliated',
                  'Industry Tie-ups',
                  'Smart Campus'
                ].map((text) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-hitm-red/10 flex items-center justify-center">
                      <CheckCircle className="text-hitm-red" size={14} />
                    </div>
                    <span className="font-bold text-hitm-navy uppercase tracking-widest text-[10px]">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quality Policy & Vision */}
          <div className="bg-gray-50 rounded-[60px] p-12 lg:p-20 mb-32 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-hitm-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-hitm-red/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
              <div>
                <h3 className="text-3xl font-serif font-black text-hitm-navy mb-6 italic tracking-tight uppercase">Our Quality Policy</h3>
                <p className="text-gray-600 leading-relaxed text-lg mb-8 italic">
                  &quot;To provide high-quality education and training to students to meet the global challenges by providing state-of-the-art infrastructure and faculty, improving the student satisfaction and continuously improving the quality management system.&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-hitm-gold flex items-center justify-center rounded-2xl shadow-lg">
                    <Award className="text-hitm-navy" size={24} />
                  </div>
                  <div className="font-bold text-hitm-navy uppercase tracking-widest text-sm italic">Certified Excellence</div>
                </div>
              </div>
              <div className="bg-white rounded-[40px] p-10 shadow-xl border border-gray-100 italic">
                <h3 className="text-3xl font-serif font-black text-hitm-red mb-6 tracking-tight uppercase">The Vision</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  To be an institution of global repute that transforms lives through an innovative and rigorous learning environment, ensuring the holistic development of professionals who contribute meaningfully to society and industry.
                </p>
              </div>
            </div>
          </div>

          {/* Core Values Section */}
          <div className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-black text-hitm-navy uppercase tracking-tighter italic">The HITM <span className="text-hitm-red">Philosophy</span></h2>
              <p className="text-gray-500 mt-4 max-w-xl mx-auto">Our four pillars of growth that guide every student through their academic journey.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreValues.map((v, i) => (
                <Card key={i} className="border-none bg-white p-8 rounded-[40px] hover:shadow-2xl transition-all duration-500 group border border-gray-100">
                  <CardContent className="pt-4 flex flex-col gap-6 items-center text-center">
                    <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center group-hover:bg-hitm-navy group-hover:text-white transition-all duration-500 group-hover:-rotate-12 group-hover:scale-110">
                      {v.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-hitm-navy mb-3 font-serif uppercase tracking-tight italic">{v.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Culture Section */}
          <div className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 bg-hitm-red p-12 rounded-[50px] text-white flex flex-col justify-center shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-hitm-navy/10 pointer-events-none" />
                <h3 className="text-3xl font-black mb-6 font-serif italic text-hitm-gold uppercase tracking-tight">Vibrant Campus</h3>
                <p className="text-white/90 text-lg leading-relaxed mb-8"> Beyond classrooms, we offer a culture of celebration and creativity. From the annual fest to technical hackathons, there is never a dull moment at HITM.</p>
                <ul className="space-y-4">
                  {['Student Chapters (IEEE/CSI)', 'Sports Academies', 'Annual Cultural Fest', 'Creative Arts Club'].map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm font-bold uppercase tracking-wider">
                      <div className="w-2 h-2 rounded-full bg-hitm-gold" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-2 relative h-[500px] rounded-[50px] overflow-hidden shadow-2xl group">
                <img src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop" alt="Campus Culture" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-hitm-navy/60 via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl">
                    <p className="text-white font-serif italic text-2xl font-black">Experience the Future.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </main>
  );
}
