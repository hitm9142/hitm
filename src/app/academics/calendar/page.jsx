'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Download, Clock, BookOpen, AlertCircle, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function AcademicCalendarPage() {
  const generatePDF = () => {
    const doc = new jsPDF();
    const collegeName = "Haider Institute of Technology and Management (HITM)";
    const address = "Haider Institute of Technology and Management, Okhargarha, Pithoriya, Ranchi -834006";
    const contact = "Phone: 764-496-6461 | Email: info@hitmranchi.ac.in";

    // Header
    doc.setFont("playfair", "bold");
    doc.setFontSize(22);
    doc.setTextColor(139, 26, 26); // hitm-red
    const titleWidth = doc.getTextWidth(collegeName);
    doc.text(collegeName, (doc.internal.pageSize.getWidth() - titleWidth) / 2, 20);

    doc.setFontSize(10);
    doc.setFont("inter", "normal");
    doc.setTextColor(100);
    const addrWidth = doc.getTextWidth(address);
    doc.text(address, (doc.internal.pageSize.getWidth() - addrWidth) / 2, 28);
    const contactWidth = doc.getTextWidth(contact);
    doc.text(contact, (doc.internal.pageSize.getWidth() - contactWidth) / 2, 34);

    doc.setDrawColor(212, 160, 23); // hitm-gold
    doc.line(20, 40, 190, 40);

    // Title
    doc.setFontSize(16);
    doc.setTextColor(15, 37, 71); // hitm-navy
    doc.text("Official Academic Calendar 2026-29", 20, 55);

    // Table
    const tableData = events.map(e => [e.date, e.event, e.type]);
    doc.autoTable({
      startY: 65,
      head: [['Date', 'Description', 'Category']],
      body: tableData,
      headStyles: { fillColor: [15, 37, 71], textColor: [255, 255, 255], fontStyle: 'bold' },
      bodyStyles: { textColor: [50, 50, 50] },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      margin: { left: 20, right: 20 }
    });

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text("Haider Institute of Technology and Management - Ranchi, Jharkhand - 834006", 20, doc.internal.pageSize.getHeight() - 10);
        doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.getWidth() - 30, doc.internal.pageSize.getHeight() - 10);
    }

    doc.save("HITM_Academic_Calendar_2026.pdf");
  };

  const events = [
    { month: 'April 2026', date: 'April 15', event: 'OOD / Even Semester Commencement', type: 'Academic' },
    { month: 'April 2026', date: 'April 25', event: 'TechFest - HITMX 2026', type: 'Event' },
    { month: 'May 2026', date: 'May 10', event: 'First Mid-Semester Examination', type: 'Exam' },
    { month: 'June 2026', date: 'June 01-15', event: 'Summer Vacation / Internships', type: 'Holiday' },
    { month: 'July 2026', date: 'July 20', event: 'Second Mid-Semester Examination', type: 'Exam' },
    { month: 'August 2026', date: 'Aug 15', event: 'Independence Day Celebration', type: 'Event' },
    { month: 'September 2026', date: 'Sep 25', event: 'End Semester Theory Exams', type: 'Exam' },
  ];

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      {/* Banner */}
      <section className="bg-hitm-navy pt-32 pb-20 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-hitm-red/5 skew-x-12 translate-x-1/4" />
        <div className="container mx-auto px-4 relative z-10">
          <Badge variant="gold" className="mb-4">Academic Cell</Badge>
          <h1 className="text-4xl md:text-5xl font-black font-serif text-white mb-6">Academic Calendar 2026-27</h1>
          <p className="text-gray-400 max-w-2xl text-lg leading-relaxed">
            Plan your academic year ahead. View important dates for examinations, holidays, and campus events.
          </p>
        </div>
      </section>

      <section className="py-20 flex-1">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            <div className="lg:col-span-2 space-y-8">
              <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-hitm-red/10 flex items-center justify-center text-hitm-red"><Calendar /></div>
                  <h3 className="text-xl font-bold text-gray-900">Current Session: Even Semester</h3>
                </div>
                <Button variant="outline" className="hidden border-hitm-red text-hitm-red hover:bg-hitm-red hover:text-white md:flex items-center gap-2" onClick={generatePDF}>
                  <Download size={16} /> Download Full PDF
                </Button>
              </div>

              <div className="space-y-4">
                {events.map((e, i) => (
                  <div key={i} className="flex flex-col md:flex-row gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-hitm-red/20 transition-all group">
                    <div className="md:w-32 shrink-0">
                      <p className="text-xs font-bold text-hitm-red uppercase tracking-widest mb-1">{e.month}</p>
                      <p className="text-xl font-black text-hitm-navy font-serif">{e.date}</p>
                    </div>
                    <div className="flex-1 flex justify-between items-center">
                      <h4 className="font-bold text-gray-800 group-hover:text-hitm-red transition-colors">{e.event}</h4>
                      <Badge variant={e.type === 'Exam' ? 'destructive' : e.type === 'Event' ? 'gold' : 'secondary'}>{e.type}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
               <Card className="bg-white border-none shadow-xl rounded-[40px] overflow-hidden">
                 <div className="bg-hitm-navy p-6 text-white">
                   <h3 className="font-bold font-serif flex items-center gap-2"><Clock size={20} className="text-hitm-gold" /> Key Deadlines</h3>
                 </div>
                 <CardContent className="p-6 space-y-4">
                    {[
                      { l: 'Exam Registration', v: 'By May 05, 2026' },
                      { l: 'Project Submission', v: 'By June 20, 2026' },
                      { l: 'Scholarship Form', v: 'By April 30, 2026' },
                      { l: 'Hostel Re-allotment', v: 'By July 15, 2026' },
                    ].map((d, i) => (
                      <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 text-xs">
                        <span className="text-gray-500 font-medium">{d.l}</span>
                        <span className="font-bold text-hitm-navy">{d.v}</span>
                      </div>
                    ))}
                 </CardContent>
               </Card>

               <div className="bg-hitm-red rounded-[40px] p-8 text-white relative overflow-hidden group">
                  <Bookmark className="absolute -right-4 -top-4 text-white/10 w-32 h-32 rotate-12 group-hover:scale-110 transition-transform" />
                  <h4 className="text-xl font-bold font-serif mb-4 relative z-10">Attendance Policy</h4>
                  <p className="text-white/80 text-sm leading-relaxed mb-6 relative z-10">
                    A minimum of 75% attendance is mandatory for appearing in the End-semester examinations as per JUT norms.
                  </p>
                  <Link href="/about/overview" className="text-xs font-black uppercase tracking-widest text-hitm-gold hover:text-white transition-colors flex items-center gap-2 relative z-10">
                    Full Regulations <AlertCircle size={14} />
                  </Link>
               </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
