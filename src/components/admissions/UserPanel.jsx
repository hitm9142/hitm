'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogOut, ArrowRight, FileText, CheckCircle2, CreditCard, AlertCircle } from 'lucide-react';

export default function UserPanel({ applicationData, onAction }) {
  const isDraft = applicationData.status === 'Draft';
  const isPendingPayment = applicationData.status === 'Payment Pending';
  const isSubmitted = applicationData.status === 'Submitted' || applicationData.status === 'Verified';

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in zoom-in-95 duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black font-serif text-hitm-navy">Applicant Dashboard</h2>
        <Button variant="ghost" className="text-gray-500 hover:text-red-500" onClick={() => onAction('LOGOUT')}>
          <LogOut size={16} className="mr-2" /> Exit
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-0 shadow-sm bg-blue-50/50">
          <CardContent className="p-6">
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Application ID</p>
            <p className="font-mono text-lg font-bold text-hitm-navy">{applicationData.phone}</p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm bg-gray-50/50">
          <CardContent className="p-6">
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Status</p>
            <div className="flex items-center gap-2 mt-1">
              {isSubmitted ? <CheckCircle2 size={18} className="text-green-500" /> : <AlertCircle size={18} className="text-amber-500" />}
              <span className={`font-bold ${isSubmitted ? 'text-green-600' : 'text-amber-600'}`}>
                {applicationData.status}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gray-50/50">
          <CardContent className="p-6">
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Payment</p>
            <span className={`font-bold ${applicationData.payment?.status === 'Success' ? 'text-green-600' : 'text-gray-600'}`}>
              {applicationData.payment?.status || 'Not Initiated'}
            </span>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-xl rounded-3xl overflow-hidden bg-white">
        <CardContent className="p-8 md:p-10">
          <h3 className="text-xl font-bold text-hitm-navy mb-4">Actions</h3>
          <div className="space-y-4">
            
            {isDraft && (
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-5 bg-gray-50 rounded-2xl border border-gray-100">
                <div>
                  <h4 className="font-bold text-gray-900 flex items-center gap-2">
                    <FileText size={18} className="text-hitm-red" /> Application Form
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">Your application is incomplete. Please fill out all required details.</p>
                </div>
                <Button onClick={() => onAction('CONTINUE_FORM')} className="w-full md:w-auto shrink-0 bg-hitm-navy hover:bg-hitm-red text-white">
                  Continue Application <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            )}

            {isPendingPayment && (
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-5 bg-amber-50 rounded-2xl border border-amber-100">
                <div>
                  <h4 className="font-bold text-amber-900 flex items-center gap-2">
                    <CreditCard size={18} className="text-amber-600" /> Application Fee
                  </h4>
                  <p className="text-sm text-amber-700/80 mt-1">Pay the application fee of Rs. 1,000 <span className="font-bold">(Non-Refundable)</span> to submit your form.</p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                  <Button variant="outline" onClick={() => onAction('CONTINUE_FORM')} className="w-full md:w-auto shrink-0 border-amber-300 text-amber-700 hover:bg-amber-100 hover:text-amber-800">
                    Edit Application
                  </Button>
                  <Button onClick={() => onAction('PAY')} className="w-full md:w-auto shrink-0 bg-hitm-red hover:bg-hitm-navy text-white">
                    Pay Now <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {isSubmitted && (!applicationData.admissionPayment || applicationData.admissionPayment.status !== 'Success') && (
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-5 bg-blue-50 rounded-2xl border border-blue-100">
                <div>
                  <h4 className="font-bold text-blue-900 flex items-center gap-2">
                    <CreditCard size={18} className="text-blue-600" /> Admission Confirmation Fee
                  </h4>
                  <p className="text-sm text-blue-700/80 mt-1">Pay the admission confirmation fee of Rs. 10,000 to secure your seat.</p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                  <Button onClick={() => onAction('PAY_ADMISSION')} className="w-full md:w-auto shrink-0 bg-hitm-navy hover:bg-hitm-red text-white">
                    Pay Rs. 10,000 <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {(isSubmitted || isPendingPayment || applicationData.status === 'Admission Confirmed') && (
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-5 bg-gray-50 rounded-2xl border border-gray-100">
                <div>
                  <h4 className="font-bold text-gray-900 flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-green-600" /> Submitted Details
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">Review the details you have provided in your application.</p>
                </div>
                <Button variant="outline" onClick={() => onAction('VIEW_APPLICATION')} className="w-full md:w-auto shrink-0 border-gray-300">
                  View Details
                </Button>
              </div>
            )}
            
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
