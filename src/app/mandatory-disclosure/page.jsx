'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Download, ShieldCheck, Users, Building2, BookOpen, Scale, Landmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function MandatoryDisclosurePage() {
  const disclosureCategories = [
    {
      title: 'AICTE Letter of Approval (LoA)',
      icon: <Landmark className="text-hitm-red" size={28} />,
      desc: 'Official All India Council for Technical Education (AICTE) approval letter for the 2026–27 academic year.',
      action: (
        <Button asChild className="bg-hitm-red hover:bg-hitm-navy text-white rounded-xl w-full h-11 text-xs font-bold gap-2">
          <a href="/LOA Report 2026-27.pdf" download>
            <Download size={16} /> Download LoA PDF
          </a>
        </Button>
      )
    },
    {
      title: 'Governing Body & Trust',
      icon: <Users className="text-hitm-navy" size={28} />,
      desc: 'Details of the Al Almaas Haider Charitable Trust governing body members, management executives, and trust deeds.',
      action: (
        <Button asChild variant="outline" className="border-gray-200 hover:border-hitm-red text-gray-700 rounded-xl w-full h-11 text-xs font-bold">
          <Link href="/about/governing-body">View Governing Body</Link>
        </Button>
      )
    },
    {
      title: 'Faculty List & Details',
      icon: <BookOpen className="text-hitm-navy" size={28} />,
      desc: 'Department-wise list of highly qualified, AICTE-compliant full-time faculty members and specialized technical staff.',
      action: (
        <Button asChild variant="outline" className="border-gray-200 hover:border-hitm-red text-gray-700 rounded-xl w-full h-11 text-xs font-bold">
          <Link href="/about/faculty">View Faculty Details</Link>
        </Button>
      )
    },
    {
      title: 'Anti-Ragging Committee',
      icon: <Scale className="text-hitm-red" size={28} />,
      desc: 'Strict anti-ragging compliance policies, committee details, emergency helpline numbers, and disciplinary squad members.',
      action: (
        <Button asChild variant="outline" className="border-gray-200 hover:border-hitm-red text-gray-700 rounded-xl w-full h-11 text-xs font-bold">
          <Link href="/about/anti-ragging">View Committee & Rules</Link>
        </Button>
      )
    },
    {
      title: 'Infrastructure & Labs',
      icon: <Building2 className="text-hitm-navy" size={28} />,
      desc: 'Classrooms, high-tech computing networks, specialized labs, library resources, and general hostel/campus layouts.',
      action: (
        <Button asChild variant="outline" className="border-gray-200 hover:border-hitm-red text-gray-700 rounded-xl w-full h-11 text-xs font-bold">
          <Link href="/campus">Explore Infrastructure</Link>
        </Button>
      )
    },
    {
      title: 'Grievance Redressal Cell',
      icon: <ShieldCheck className="text-hitm-red" size={28} />,
      desc: 'Established student/faculty grievance committee details, online grievance portal contacts, and compliance statements.',
      action: (
        <Button asChild variant="outline" className="border-gray-200 hover:border-hitm-red text-gray-700 rounded-xl w-full h-11 text-xs font-bold">
          <Link href="/contact">Submit / Contact Committee</Link>
        </Button>
      )
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 pb-20 bg-hitm-navy relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-hitm-red/5 skew-x-12 translate-x-1/4" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge variant="gold" className="mb-4">Statutory Compliance</Badge>
          <h1 className="text-4xl md:text-6xl font-black font-serif text-white mb-6 uppercase tracking-tighter">Mandatory Disclosure</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            In accordance with the regulatory guidelines of the AICTE and the Jharkhand University of Technology (JUT), HITM Ranchi maintains complete operational transparency.
          </p>
        </div>
      </section>

      {/* Grid of Categories */}
      <section className="py-20 flex-1">
        <div className="container mx-auto px-4 max-w-5xl">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {disclosureCategories.map((item, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-2xl transition-all duration-300 rounded-[32px] overflow-hidden bg-white group flex flex-col justify-between">
                <CardContent className="p-8 space-y-6 flex flex-col justify-between h-full">
                  <div className="space-y-4">
                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-hitm-red/5 transition-colors">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-hitm-navy font-serif leading-tight">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="pt-4 border-t border-gray-50">
                    {item.action}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Academic Integrity Statement Card */}
          <Card className="border-none shadow-xl bg-gradient-to-r from-hitm-navy to-[#0F2547] text-white rounded-[40px] p-8 md:p-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full blur-xl" />
            <div className="relative z-10 space-y-6">
              <h3 className="text-2xl font-black font-serif text-hitm-gold italic">Affiliation & Accreditation Statement</h3>
              <p className="text-gray-300 text-sm leading-relaxed font-medium">
                HITM Ranchi is run and managed by the Al Almaas Haider Charitable Trust. The institution is fully approved by the All India Council for Technical Education (AICTE), New Delhi, and is affiliated with the Jharkhand University of Technology (JUT), Ranchi, for carrying out professional Engineering, Management, and Computer Application programmes.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Badge variant="outline" className="border-white/20 text-white/80 font-bold px-4 py-1">Permanent ID: 1-46887005383</Badge>
                <Badge variant="outline" className="border-white/20 text-white/80 font-bold px-4 py-1">AICTE Approved Cycle: From 2026</Badge>
              </div>
            </div>
          </Card>

        </div>
      </section>

      <Footer />
    </main>
  );
}
