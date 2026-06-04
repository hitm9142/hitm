'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Printer, CheckCircle2 } from 'lucide-react';

export default function SubmittedDetailsView({ applicationData, onCancel }) {
  
  const handlePrint = () => {
    window.print();
  };

  const pDetails = applicationData.personalDetails || {};
  const aDetails = applicationData.academicDetails || {};
  const progDetails = applicationData.programSelection || {};
  const isPaid = applicationData.payment?.status === 'Success';

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-300 print:max-w-full">
      <div className="flex justify-between items-center mb-6 print:hidden">
        <button onClick={onCancel} className="text-gray-500 hover:text-hitm-navy flex items-center text-sm font-bold">
          <ArrowLeft size={16} className="mr-1" /> Back to Dashboard
        </button>
        <Button onClick={handlePrint} variant="outline" className="border-gray-300">
          <Printer size={16} className="mr-2" /> Download / Print
        </Button>
      </div>

      <Card className="border border-gray-200 shadow-xl rounded-3xl overflow-hidden bg-white print:shadow-none print:border-none print:rounded-none">
        <div className="bg-gradient-to-r from-hitm-navy to-hitm-red p-8 text-white flex justify-between items-center print:bg-white print:text-black print:border-b-2 print:border-black">
          <div>
            <h2 className="text-3xl font-black font-serif mb-1">Application Details</h2>
            <p className="text-sm font-bold uppercase tracking-widest opacity-80 print:text-gray-600">Session 2026-27</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-widest opacity-80 print:text-gray-600">Application ID</p>
            <p className="font-mono text-xl font-bold">{applicationData.phone}</p>
          </div>
        </div>

        <CardContent className="p-8 md:p-10 space-y-8">
          
          <div className="flex items-center gap-2 mb-6">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${isPaid ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'} print:border print:border-black print:bg-white print:text-black`}>
              Status: {applicationData.status}
            </span>
          </div>

          <section>
            <h3 className="text-lg font-bold text-hitm-navy mb-4 border-b pb-2 print:text-black">Personal Details</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4">
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Name</p>
                <p className="font-medium">{pDetails.name || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Father&apos;s Name</p>
                <p className="font-medium">{pDetails.fatherName || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Email</p>
                <p className="font-medium">{pDetails.email || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Mobile</p>
                <p className="font-medium">{applicationData.phone}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Date of Birth</p>
                <p className="font-medium">{pDetails.dob || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Gender</p>
                <p className="font-medium">{pDetails.gender || 'N/A'}</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold text-hitm-navy mb-4 border-b pb-2 print:text-black">Program Selection</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4">
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Programme</p>
                <p className="font-medium">{progDetails.program || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Branch / Specialization</p>
                <p className="font-medium">{progDetails.branch || 'N/A'}</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold text-hitm-navy mb-4 border-b pb-2 print:text-black">Academic Details</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4">
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Qualification</p>
                <p className="font-medium">{aDetails.qualification || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Board / University</p>
                <p className="font-medium">{aDetails.board || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Passing Year</p>
                <p className="font-medium">{aDetails.passingYear || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Percentage</p>
                <p className="font-medium">{aDetails.percentage ? `${aDetails.percentage}%` : 'N/A'}</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold text-hitm-navy mb-4 border-b pb-2 print:text-black">Payment Details</h3>
            
            <div className="space-y-6">
              {/* Application Fee */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 print:bg-white print:border-black">
                <h4 className="font-bold text-hitm-navy mb-3 text-sm print:text-black">Application Fee (₹1,000)</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-4">
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">Status</p>
                    <p className={`font-medium ${isPaid ? 'text-green-600' : ''}`}>{applicationData.payment?.status || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">Order ID</p>
                    <p className="font-medium text-xs break-words">{applicationData.payment?.orderId || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">Transaction ID</p>
                    <p className="font-medium text-xs break-words">{applicationData.payment?.transactionId || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">Amount</p>
                    <p className="font-medium">₹{applicationData.payment?.amount || '1000.00'}</p>
                  </div>
                </div>
              </div>

              {/* Admission Confirmation Fee */}
              {applicationData.admissionPayment && (
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 print:bg-white print:border-black">
                  <h4 className="font-bold text-blue-900 mb-3 text-sm print:text-black">Admission Confirmation Fee (₹10,000)</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-4">
                    <div>
                      <p className="text-xs text-blue-700/70 font-bold uppercase print:text-gray-500">Status</p>
                      <p className={`font-medium ${applicationData.admissionPayment.status === 'Success' ? 'text-green-600' : 'text-blue-900'}`}>{applicationData.admissionPayment.status}</p>
                    </div>
                    <div>
                      <p className="text-xs text-blue-700/70 font-bold uppercase print:text-gray-500">Order ID</p>
                      <p className="font-medium text-xs break-words text-blue-900">{applicationData.admissionPayment.orderId || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-blue-700/70 font-bold uppercase print:text-gray-500">Transaction ID</p>
                      <p className="font-medium text-xs break-words text-blue-900">{applicationData.admissionPayment.transactionId || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-blue-700/70 font-bold uppercase print:text-gray-500">Amount</p>
                      <p className="font-medium text-blue-900">₹{applicationData.admissionPayment.amount || '10000.00'}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          <div className="mt-8 pt-8 border-t text-center print:block hidden">
            <p className="text-sm text-gray-500 italic">This is a system generated document.</p>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
