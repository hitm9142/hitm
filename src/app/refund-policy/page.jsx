'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Calendar, RefreshCw, HelpCircle, FileText } from 'lucide-react';

export default function RefundPolicyPage() {
  const refundTimeline = [
    { time: 'Before Commencement of Classes', refund: '100% Refund', note: 'Subject to a deduction of Rs. 1,000 as processing charges.' },
    { time: 'Within 15 days of Class Commencement', refund: '80% Refund', note: '20% of tuition fee will be deducted.' },
    { time: 'Between 16 to 30 days of Class Commencement', refund: '50% Refund', note: '50% of tuition fee will be deducted.' },
    { time: 'More than 30 days after Class Commencement', refund: 'No Refund', note: 'No tuition or other fees will be refunded under any circumstances.' },
  ];

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      {/* Banner */}
      <section className="bg-hitm-navy pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1600" alt="Refund Policy" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge variant="gold" className="mb-4">HITM Policy</Badge>
          <h1 className="text-4xl md:text-6xl font-black font-serif text-white mb-6">Fee Refund Policy</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Please read the rules and timeline regarding cancellation of admission and fee refunds at Haider Institute of Technology and Management (HITM).
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 flex-1">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-8">
            
            {/* Overview */}
            <Card className="border-none shadow-xl rounded-3xl overflow-hidden bg-white">
              <CardContent className="p-8 md:p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-hitm-red/10 flex items-center justify-center text-hitm-red">
                    <ShieldCheck size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-hitm-navy font-serif">General Terms</h2>
                </div>
                <p className="text-gray-600 leading-8 text-base">
                  Refund of fees is governed in accordance with the rules established by the AICTE guidelines and JUT norms for technical institutions. All applications for admission cancellation must be submitted in writing with valid reasons and supported by parent/guardian signature, along with original fee receipts and admission documentation.
                </p>
              </CardContent>
            </Card>

            {/* Refund Timeline Table */}
            <Card className="border-none shadow-xl rounded-3xl overflow-hidden bg-white">
              <CardContent className="p-8 md:p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-hitm-navy/5 flex items-center justify-center text-hitm-navy">
                    <Calendar size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-hitm-navy font-serif">Refund Percentage Timeline</h2>
                </div>

                <div className="overflow-x-auto border border-gray-100 rounded-2xl">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                      <tr>
                        <th className="px-6 py-4">Submission Timeline</th>
                        <th className="px-6 py-4 text-center">Refund Percentage</th>
                        <th className="px-6 py-4">Deduction Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {refundTimeline.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4 font-bold text-gray-800">{item.time}</td>
                          <td className="px-6 py-4 text-center">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                              index === 0 ? 'bg-green-50 text-green-700' :
                              index === 1 ? 'bg-blue-50 text-blue-700' :
                              index === 2 ? 'bg-amber-50 text-amber-700' :
                              'bg-red-50 text-red-700'
                            }`}>
                              {item.refund}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-500 text-xs">{item.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Non-Refundable components */}
            <Card className="border-none shadow-xl rounded-3xl overflow-hidden bg-white">
              <CardContent className="p-8 md:p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-hitm-red/10 flex items-center justify-center text-hitm-red">
                    <RefreshCw size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-hitm-navy font-serif">Non-Refundable Fees</h2>
                </div>
                <ul className="space-y-4 text-gray-600 text-sm leading-relaxed">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-hitm-red mt-2 shrink-0" />
                    <span><strong>Admission Prospectus/Application form fee</strong> of Rs. 1,000 is strictly non-refundable.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-hitm-red mt-2 shrink-0" />
                    <span><strong>University Registration Fee</strong> paid directly to the JUT/Affiliating Board cannot be refunded by the institute.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-hitm-red mt-2 shrink-0" />
                    <span>Fees paid for <strong>Exam Booklets, Uniform, and Book Bank</strong> are non-refundable once the items have been issued.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Process */}
            <Card className="border-none shadow-xl rounded-3xl overflow-hidden bg-white">
              <CardContent className="p-8 md:p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-hitm-navy/5 flex items-center justify-center text-hitm-navy">
                    <FileText size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-hitm-navy font-serif">Refund Application Procedure</h2>
                </div>
                <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                  <p>
                    1. Submit a formal application to the **Principal / Registrar Office** stating the reason for cancellation, enclosing the original admission letter and payment receipt.
                  </p>
                  <p>
                    2. Once reviewed and authorized by the administration, the refund check/bank transfer will be processed.
                  </p>
                  <p>
                    3. The entire refund cycle takes approximately **15 to 30 working days** from the date of submission of the complete cancel application along with all original documents.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card className="border-none shadow-xl rounded-3xl overflow-hidden bg-white">
              <CardContent className="p-8 md:p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-hitm-red/10 flex items-center justify-center text-hitm-red">
                    <HelpCircle size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-hitm-navy font-serif">Need Help?</h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm mb-4">
                  For any query regarding admission cancellation or refunds, please reach out to the accounts office.
                </p>
                <div className="text-xs text-gray-500 font-semibold">
                  Email: accounts@hitmranchi.ac.in | Call: +91 764-496-6461
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
