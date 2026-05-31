'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IndianRupee, Clock, GraduationCap, ChevronRight, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function FeeStructurePage() {
  const fees = [
    { 
      course: 'B.Tech Program', 
      specialization: 'Computer Science | AI & DS',
      level: 'Undergraduate',
      duration: '4 Years (8 Semesters)', 
      registrationFee: '10,000',
      othersFee: '10,000',
      cautionMoney: '5,000',
      semesters: 8,
      perSemesterFee: '65,000',
      total: '5,45,000'
    },
    { 
      course: 'B.Tech Program', 
      specialization: 'Civil | Mechanical | EEE',
      level: 'Undergraduate',
      duration: '4 Years (8 Semesters)', 
      registrationFee: '10,000',
      othersFee: '10,000',
      cautionMoney: '5,000',
      semesters: 8,
      perSemesterFee: '55,000',
      total: '4,65,000'
    },
    { 
      course: 'BCA Program', 
      specialization: 'Software Development',
      level: 'Undergraduate',
      duration: '3 Years (6 Semesters)', 
      registrationFee: '10,000',
      othersFee: '10,000',
      cautionMoney: '5,000',
      semesters: 6,
      perSemesterFee: '50,000',
      total: '3,25,000'
    },
    { 
      course: 'MCA Program', 
      specialization: 'Advanced IT Technologies',
      level: 'Postgraduate',
      duration: '2 Years (4 Semesters)', 
      registrationFee: '10,000',
      othersFee: '10,000',
      cautionMoney: '5,000',
      semesters: 4,
      perSemesterFee: '60,000',
      total: '2,65,000'
    },
    { 
      course: 'Diploma (Polytechnic)', 
      specialization: 'Civil | Mechanical | EEE | CSE',
      level: 'Diploma',
      duration: '3 Years (6 Semesters)', 
      registrationFee: '10,000',
      othersFee: '10,000',
      cautionMoney: '5,000',
      semesters: 6,
      perSemesterFee: '35,000',
      total: '2,35,000'
    },
    { 
      course: 'MBA Program', 
      specialization: 'Finance | Marketing | HR | IT',
      level: 'Postgraduate',
      duration: '2 Years (4 Semesters)', 
      registrationFee: '10,000',
      othersFee: '10,000',
      cautionMoney: '5,000',
      semesters: 4,
      perSemesterFee: '85,000',
      total: '3,65,000'
    },
    { 
      course: 'BBA Program', 
      specialization: 'Management Essentials',
      level: 'Undergraduate',
      duration: '3 Years (6 Semesters)', 
      registrationFee: '10,000',
      othersFee: '10,000',
      cautionMoney: '5,000',
      semesters: 6,
      perSemesterFee: '50,000',
      total: '3,25,000'
    }
  ];

  const downloadPDF = () => {
    const doc = new jsPDF();
    const collegeName = "Haider Institute of Technology and Management (HITM)";
    const contactInfo = "Phone: +91 764-496-6461 | Email: admissions@hitmranchi.ac.in";
    const address = "Haider Institute of Technology and Management, Okhargarha, Pithoriya, Ranchi -834006";
    const pageHeight = doc.internal.pageSize?.height || doc.internal.pageSize.getHeight();
    const topMargin = 35;
    const bottomMargin = 25;
    const pageBottom = pageHeight - bottomMargin;

    const ensurePageSpace = (spaceNeeded) => {
      if (currentY + spaceNeeded > pageBottom) {
        doc.addPage();
        currentY = topMargin;
      }
    };

    const addHeaderFooter = (data) => {
      // Header
      doc.setFontSize(18);
      doc.setTextColor(180, 20, 20); // HITM Red
      doc.setFont("helvetica", "bold");
      doc.text(collegeName, 105, 15, { align: "center" });
      
      doc.setFontSize(9);
      doc.setTextColor(100);
      doc.setFont("helvetica", "normal");
      doc.text(contactInfo, 105, 22, { align: "center" });
      
      doc.setDrawColor(200);
      doc.line(14, 26, 196, 26);

      // Footer
      const pageCount = doc.internal.getNumberOfPages();
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text("Page " + pageCount, 196, 285, { align: "right" });
      doc.text(address, 105, 285, { align: "center" });
      doc.line(14, 280, 196, 280);
    };

    let currentY = 35;

    doc.setFontSize(14);
    doc.setTextColor(30);
    doc.text("OFFICIAL FEE STRUCTURE (2026-27)", 105, currentY, { align: "center" });
    currentY += 15;

    fees.forEach((fee, index) => {
      ensurePageSpace(40);

      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 48, 96); // HITM Navy
      doc.text(`${index + 1}. ${fee.course} - ${fee.specialization} (${fee.duration})`, 14, currentY);
      currentY += 5;

      // First Table: One-time Fees
      let oneTimeBody = [
        ['Registration Fee', `Rs. ${fee.registrationFee}`],
        ['Others Fee', `Rs. ${fee.othersFee}`],
        ['Caution Money (Refundable)', `Rs. ${fee.cautionMoney}`]
      ];

      ensurePageSpace(40);
      autoTable(doc, {
        startY: currentY,
        head: [['One-Time Payments', 'Amount (INR)']],
        body: oneTimeBody,
        theme: 'striped',
        headStyles: { fillColor: [200, 200, 200], textColor: [0,0,0] },
        margin: { top: topMargin, bottom: bottomMargin, left: 14, right: 14 },
        didDrawPage: addHeaderFooter
      });

      currentY = doc.lastAutoTable.finalY + 5;

      // Second Table: Semester Fees
      let semesterBody = [];
      for (let i = 1; i <= fee.semesters; i++) {
        semesterBody.push([`Semester ${i}`, `Rs. ${fee.perSemesterFee}`]);
      }
      semesterBody.push([
        { content: 'Total Course Fee', styles: { fontStyle: 'bold', fillColor: [230, 230, 230] } },
        { content: `Rs. ${fee.total}`, styles: { fontStyle: 'bold', fillColor: [230, 230, 230] } }
      ]);

      ensurePageSpace(40);
      autoTable(doc, {
        startY: currentY,
        head: [['Semester Fees', 'Tuition Fee (INR)']],
        body: semesterBody,
        theme: 'striped',
        headStyles: { fillColor: [180, 20, 20] },
        margin: { top: topMargin, bottom: bottomMargin, left: 14, right: 14 },
        didDrawPage: addHeaderFooter
      });

      currentY = doc.lastAutoTable.finalY + 15;
    });

    // Final total disclaimer
    ensurePageSpace(20);
    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.setFont("helvetica", "italic");
    doc.text("* Note: Fees are subject to university/board norms. Hostel and transport are extra charges.", 14, currentY);

    if (doc.internal.getNumberOfPages() > 0) {
       // Ensure Header/Footer on first page if not added by autoTable
       // Actually autoTable didDrawPage handles it, but let's be safe.
    }

    doc.save("HITM_Fee_Structure_2026.pdf");
  };

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 bg-gray-50 pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-hitm-red border-hitm-red/20 font-bold px-4 py-1">Admission 2026</Badge>
            <h1 className="text-4xl md:text-5xl font-black font-serif text-hitm-navy mb-4">Fee Structure</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Transparent investment in your professional future. We provide various scholarship options 
              based on merit and socio-economic categories.
            </p>
          </div>
          
          <div className="space-y-12">
            {fees.map((fee, idx) => (
              <Card key={idx} className="border-0 shadow-xl rounded-2xl overflow-hidden bg-white group">
                <div className="absolute top-0 left-0 w-2 h-full bg-hitm-red group-hover:w-3 transition-all" />
                <div className="grid grid-cols-1 lg:grid-cols-3">
                  {/* Left Column: Course Header */}
                  <div className="p-8 lg:p-10 bg-hitm-navy/5 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-gray-100">
                    <div className="flex items-center gap-2 text-hitm-red mb-3">
                      <GraduationCap size={20} />
                      <span className="font-bold text-xs uppercase tracking-widest">{fee.level}</span>
                    </div>
                    <h2 className="text-2xl font-black text-hitm-navy mb-2">{fee.course}</h2>
                    <p className="text-gray-500 text-sm mb-6">{fee.specialization}</p>
                    <div className="flex items-center gap-2 text-gray-700 font-bold">
                      <Clock size={16} className="text-hitm-red" />
                      {fee.duration}
                    </div>
                  </div>

                  {/* Middle Column: Fee Breakup */}
                  <div className="p-8 lg:p-10 lg:col-span-2">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 flex items-center">
                      Detailed Fee Breakdown <ChevronRight size={14} className="ml-1" />
                    </h3>
                    
                    <div className="space-y-6">
                      {/* One Time Fees Table */}
                      <div className="overflow-hidden border border-gray-200 rounded-xl">
                        <table className="w-full text-sm text-left">
                          <thead className="bg-gray-50 text-hitm-navy font-bold">
                            <tr>
                              <th className="px-6 py-3">Fees</th>
                              <th className="px-6 py-3 text-right">Amount (INR)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            <tr className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-3 text-gray-600">Registration Fee</td>
                              <td className="px-6 py-3 font-bold text-hitm-navy text-right">₹ {fee.registrationFee}</td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-3 text-gray-600">Others Fee</td>
                              <td className="px-6 py-3 font-bold text-hitm-navy text-right">₹ {fee.othersFee}</td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-3 text-gray-600">Caution Money (Refundable)</td>
                              <td className="px-6 py-3 font-bold text-hitm-navy text-right">₹ {fee.cautionMoney}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Semester Fees Table */}
                      <div className="overflow-hidden border border-gray-200 rounded-xl">
                        <table className="w-full text-sm text-left">
                          <thead className="bg-hitm-navy text-white font-bold">
                            <tr>
                              <th className="px-6 py-3">Semester Fees</th>
                              <th className="px-6 py-3 text-right">Tuition Fee (INR)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {[...Array(fee.semesters)].map((_, i) => (
                              <tr key={i} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-3 text-gray-600">Semester {i + 1}</td>
                                <td className="px-6 py-3 font-bold text-hitm-navy text-right">
                                  ₹ {fee.perSemesterFee}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="flex justify-between items-center pt-6 mt-4 border-t-2 border-gray-100">
                        <span className="text-xl md:text-2xl font-black text-hitm-navy uppercase tracking-tighter">Total Course Fee</span>
                        <div className="text-right">
                          <p className="text-3xl md:text-4xl font-black text-hitm-red flex items-center justify-end">
                            <IndianRupee size={28} className="mr-1" /> {fee.total}
                          </p>
                          <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-bold">Hostel & Transport Extra</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-16 p-8 bg-hitm-navy rounded-2xl shadow-2xl text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <h4 className="font-bold border-l-4 border-hitm-red pl-3 mb-4">Hostel Fee</h4>
                <p className="text-gray-300 text-sm italic">Accommodation with mess facilities provided at competitive rates.</p>
              </div>
              <div>
                <h4 className="font-bold border-l-4 border-hitm-red pl-3 mb-4">Note</h4>
                <p className="text-gray-300 text-sm italic">Fee as per norms of AICTE.</p>
              </div>
              <div>
                <h4 className="font-bold border-l-4 border-hitm-red pl-3 mb-4">Refund Policy</h4>
                <p className="text-gray-300 text-sm italic">Refund as per AICTE  norms applicable at the time of withdrawal.</p>
              </div>
              <div className="flex items-center justify-center md:justify-end">
                <button 
                  onClick={downloadPDF}
                  className="bg-hitm-red text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-white hover:text-hitm-navy transition-all transform hover:-translate-y-1 flex items-center gap-2"
                >
                  <Download size={18} /> Download Fee Structure (PDF)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
