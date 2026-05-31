'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Download, FileText, ArrowRight, BookOpen } from 'lucide-react';
import { generatePagePDF } from '@/lib/pdf-service';

export default function BrochuresPage() { 
  const handleDownload = () => {
  const link = document.createElement("a");
  link.href = "/hitm.pdf";
  link.download = "hitm.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  return (
    <main className='flex flex-col min-h-screen bg-gray-50'>
      <Navbar />
      
      {/* Header */}
      <section className='pt-32 pb-16 bg-white border-b border-gray-100'>
        <div className='container mx-auto px-4 text-center'>
          <Badge variant='gold' className='mb-4'>Admissions 2026</Badge>
          <h1 className='text-4xl md:text-5xl font-black text-hitm-navy font-serif mb-4 uppercase'>Information <span className="text-hitm-red">Brochures</span></h1>
          <p className='text-gray-500 max-w-2xl mx-auto'>
            Download our latest brochures to learn more about our programs, campus life, and the unique HITM experience.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl flex flex-col md:flex-row border border-gray-100 animate-fade-up">
              {/* Image Side */}
              <div className="md:w-2/5 relative min-h-[300px]">
                <Image 
                  src="https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=2070&auto=format&fit=crop"
                  alt="University Prospectus"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-hitm-navy/20" />
                <div className="absolute top-4 left-4">
                   <div className="bg-hitm-red text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">New Released</div>
                </div>
              </div>

              {/* Content Side */}
              <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-hitm-gold mb-4">
                   <BookOpen className="w-5 h-5" />
                   <span className="text-sm font-bold uppercase tracking-wider">Academic Year 2026</span>
                </div>
                <h2 className="text-3xl font-serif font-bold text-hitm-navy mb-4">General University Prospectus</h2>
                <p className="text-gray-500 mb-8 leading-relaxed">
                  Get a comprehensive overview of HITM Ranchi. This brochure covers all undergraduate and postgraduate programs, admission criteria, fee structure, and placement records.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-hitm-red" />
                    <span>Includes Course Curriculum for all branches</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-hitm-red" />
                    <span>Detailed Scholarship Information</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-8 py-4 bg-hitm-navy text-white rounded-xl font-bold hover:bg-hitm-navy/90 transition-all shadow-lg hover:-translate-y-1"
                  >
                    <Download className="w-5 h-5" />
                    Download Brochure
                    <span className="text-xs opacity-60 ml-1">(87.4 KB)</span>
                  </button>
                  <button className="flex items-center gap-2 px-8 py-4 bg-white border border-gray-200 text-hitm-navy rounded-xl font-bold hover:bg-gray-50 transition-all">
                    View Online
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="mt-12 p-6 bg-hitm-gold/5 rounded-2xl border border-hitm-gold/20 flex gap-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
               <FileText className="text-hitm-gold shrink-0" />
               <p className="text-sm text-gray-600 leading-relaxed">
                 <span className="font-bold text-hitm-navy">Note:</span> Selective department brochures (Engineering, Management, Science) will be available soon. For immediate queries, please contact the admissions cell.
               </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  ); 
}
