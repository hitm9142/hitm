'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, GraduationCap, BookOpen, Clock } from 'lucide-react';

export default function EligibilityPage() {
  const eligibilityData = [
    {
      title: 'Engineering & Technology (B.Tech)',
      duration: '4 Years (8 Semesters)',
      criteria: [
        'Passed 10+2 with Physics and Mathematics (Compulsory) + Chemistry/CS/IT (Any one).',
        'Min 45% marks (40% for Reserved Categories) as per AICTE/JUT norms.',
        'Courses: CSE, EEE, AI, Data Science, Mechanical, Civil.'
      ],
      icon: <GraduationCap className="text-hitm-red" />
    },
    {
      title: 'Polytechnic Diploma',
      duration: '3 Years (6 Semesters)',
      criteria: [
        'Passed 10th Std. / SSC examination.',
        'Obtained at least 35% marks in the qualifying examination.',
        'Courses: CSE, EEE, AI, Data Science, Mechanical, Civil.'
      ],
      icon: <BookOpen className="text-hitm-red" />
    },
    {
      title: 'Management (BBA / MBA)',
      duration: '3 / 2 Years',
      criteria: [
        'MBA: Any Graduate with min 50% marks (45% for Reserved).',
        'BBA: 10+2 / Intermediate in any stream with min 45% marks.',
        'Approval: AICTE Approved 180 Intake for both programs.'
      ],
      icon: <GraduationCap className="text-hitm-navy" />
    },
    {
      title: 'Computer Applications (BCA / MCA)',
      duration: '3 / 2 Years',
      criteria: [
        'MCA: BCA / BSc / BCom / BA with Maths at 10+2 or Graduation.',
        'BCA: 10+2 with Mathematics / Statistics / CS / IP preferred.',
        'Admission based on Academic Merit as per JUT Ranchi guidelines.'
      ],
      icon: <GraduationCap className="text-hitm-navy" />
    }
  ];

  return (
    <main className='flex flex-col min-h-screen bg-gray-50'>
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-hitm-navy pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-hitm-red/5 skew-x-12 translate-x-1/4" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge variant="gold" className="mb-4">Admissions 2026</Badge>
          <h1 className="text-4xl md:text-6xl font-black font-serif text-white mb-6 uppercase tracking-tighter">Eligibility Criteria</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Ensure you meet the academic requirements for your desired program before starting your application journey at HITM Ranchi.
          </p>
        </div>
      </section>

      <div className='flex-1 py-20'>
        <div className='container mx-auto px-4'>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {eligibilityData.map((item, index) => (
              <Card key={index} className="border-none shadow-xl rounded-[32px] overflow-hidden hover:shadow-2xl transition-all duration-300">
                <CardHeader className="bg-white border-b border-gray-100 p-8">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-hitm-red">
                      {item.icon}
                    </div>
                    <Badge variant="outline" className="flex items-center gap-2 border-hitm-gold/30 text-gray-500">
                      <Clock size={12} /> {item.duration}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-black font-serif text-hitm-navy mt-6">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <ul className="space-y-4">
                    {item.criteria.map((criterion, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="text-hitm-gold mt-1 shrink-0" size={18} />
                        <span className="text-gray-600 font-medium leading-relaxed">{criterion}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-20 bg-hitm-navy rounded-[40px] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full bg-hitm-red/10 animate-pulse" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-black font-serif mb-6">Still have questions?</h2>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto text-lg leading-relaxed">
                Our admissions helpdesk is available from 9:00 AM to 6:00 PM to help you with your queries regarding eligibility and entrance tests.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <a href="tel:7644966461" className="bg-hitm-red hover:bg-white hover:text-hitm-red text-white px-8 py-4 rounded-full font-black uppercase tracking-widest transition-all shadow-xl">
                  Call: +91 7644966461
                </a>
                <a href="mailto:admissions@hitmranchi.ac.in" className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-black uppercase tracking-widest transition-all border border-white/20 backdrop-blur-md">
                  Email Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  ); 
}
