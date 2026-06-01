'use client';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft, CreditCard, ShieldCheck } from 'lucide-react';
import { db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function PaymentView({ applicationData, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePayNow = async () => {
    setLoading(true);
    setError('');

    try {
      const orderId = `APP_${Date.now()}_${applicationData.phone}`;

      // Update payment record in db
      await setDoc(doc(db, 'applications', applicationData.phone), {
        payment: {
          orderId: orderId,
          amount: '1000.00',
          transactionId: 'N/A',
          receiptUrl: 'N/A',
          status: 'Pending',
          createdAt: serverTimestamp()
        },
        status: 'Payment Pending',
        updatedAt: serverTimestamp()
      }, { merge: true });

      // Initiate CCAvenue payment request
      const res = await fetch('/api/ccavenue/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_id: orderId,
          amount: '1000.00',
          billing_name: applicationData.name || 'Applicant',
          billing_email: applicationData.email || 'N/A',
          billing_tel: applicationData.phone,
          order_type: 'admission'
        }),
      });

      const data = await res.json();

      if (data.formHtml) {
        const div = document.createElement('div');
        div.innerHTML = data.formHtml;
        document.body.appendChild(div);
        
        const form = div.querySelector('form#nonseamless');
        if (form) {
          form.submit();
        } else {
          setError('Failed to initiate secure checkout redirect.');
          setLoading(false);
        }
      } else {
        setError(data.error || 'Failed to initiate payment.');
        setLoading(false);
      }
    } catch (submitError) {
      console.error('Error finalizing payment:', submitError);
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto animate-in fade-in zoom-in-95 duration-300">
      <button onClick={onCancel} className="text-gray-500 hover:text-hitm-navy flex items-center text-sm font-bold mb-6">
        <ArrowLeft size={16} className="mr-1" /> Back to Dashboard
      </button>

      <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden bg-white">
        <div className="bg-gradient-to-r from-hitm-navy to-hitm-red p-6 text-white text-center">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <CreditCard size={32} />
          </div>
          <h3 className="text-2xl font-black font-serif mb-1">Application Fee</h3>
          <p className="text-sm font-bold uppercase tracking-widest opacity-80">Secure Checkout</p>
        </div>

        <CardContent className="p-8 space-y-6">
          <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex justify-between items-center">
            <span className="text-gray-600 font-bold">Total Amount Due</span>
            <span className="text-2xl font-black text-hitm-navy">₹1,000.00</span>
          </div>

          <div className="flex items-start gap-3 bg-blue-50 text-blue-800 p-4 rounded-xl text-sm">
            <ShieldCheck size={20} className="shrink-0 text-blue-600" />
            <p className="leading-relaxed">
              You are about to be redirected to our secure payment gateway to complete the transaction. Please do not refresh the page during payment.
            </p>
          </div>

          {error && (
            <p className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-lg border border-red-100 text-center">
              {error}
            </p>
          )}

          {process.env.NEXT_PUBLIC_DEPLOYMENT_MODE === 'debug' ? (
            <div className="space-y-4">
              <p className="text-sm font-bold text-center text-red-500 uppercase tracking-widest border-t pt-4">Sandbox Mode Active</p>
              <div className="flex gap-4">
                <Button 
                  onClick={async () => {
                     setLoading(true);
                     try {
                        const orderId = `APP_${Date.now()}_${applicationData.phone}`;
                        await setDoc(doc(db, 'applications', applicationData.phone), {
                          payment: { orderId, amount: '1000.00', transactionId: 'TXN_TEST_123', receiptUrl: 'N/A', status: 'Success', createdAt: serverTimestamp() },
                          status: 'Submitted',
                          updatedAt: serverTimestamp()
                        }, { merge: true });
                        onCancel(); // return to panel to see success
                     } catch(e) { setError('Mock error'); setLoading(false); }
                  }} 
                  disabled={loading}
                  className="w-full h-14 bg-green-600 hover:bg-green-700 text-white uppercase font-black tracking-widest text-lg shadow-xl"
                >
                  Confirm (Success)
                </Button>
                <Button 
                  onClick={async () => {
                     setLoading(true);
                     try {
                        const orderId = `APP_${Date.now()}_${applicationData.phone}`;
                        await setDoc(doc(db, 'applications', applicationData.phone), {
                          payment: { orderId, amount: '1000.00', transactionId: 'TXN_FAIL_123', receiptUrl: 'N/A', status: 'Failed', createdAt: serverTimestamp() },
                          status: 'Payment Pending',
                          updatedAt: serverTimestamp()
                        }, { merge: true });
                        onCancel(); // return to panel to see failure
                     } catch(e) { setError('Mock error'); setLoading(false); }
                  }} 
                  disabled={loading}
                  variant="outline"
                  className="w-full h-14 border-red-200 text-red-600 hover:bg-red-50 uppercase font-black tracking-widest text-lg shadow-sm"
                >
                  Reject (Fail)
                </Button>
              </div>
            </div>
          ) : (
            <Button 
              onClick={handlePayNow} 
              disabled={loading}
              className="w-full h-14 bg-hitm-red hover:bg-hitm-navy text-white uppercase font-black tracking-widest text-lg shadow-xl hover:-translate-y-0.5 transition-transform"
            >
              {loading ? (
                <span className="flex items-center gap-2"><Loader2 className="animate-spin" size={20} /> Processing...</span>
              ) : 'Pay ₹1,000 Now'}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
