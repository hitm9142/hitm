'use client';
import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { db } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { CheckCircle2, XCircle, Loader2, Printer, Home, RefreshCw, FileText } from 'lucide-react';

export default function PaymentStatusPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-gray-50 flex flex-col justify-between">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <Loader2 size={48} className="animate-spin text-hitm-red mb-4" />
          <h2 className="text-xl font-bold font-serif text-hitm-navy">Loading Payment Status...</h2>
        </div>
        <Footer />
      </main>
    }>
      <PaymentStatusContent />
    </Suspense>
  );
}

function PaymentStatusContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('orderId');
  const printRef = useRef(null);

  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!orderId) {
      setError('Missing Order ID parameter.');
      setLoading(false);
      return;
    }

    // Set up a real-time listener on the Firestore document
    const unsub = onSnapshot(doc(db, 'transactions', orderId), (docSnap) => {
      if (docSnap.exists()) {
        setTransaction(docSnap.data());
      } else {
        setError('Transaction record not found in our database.');
      }
      setLoading(false);
    }, (err) => {
      console.error('Error listening to transaction:', err);
      setError('Failed to load real-time payment status.');
      setLoading(false);
    });

    return () => unsub();
  }, [orderId]);

  const handlePrint = () => {
    window.print();
  };

  const handleRetry = () => {
    if (orderId && orderId.startsWith('APP_')) {
      router.push('/admissions/apply');
    } else {
      router.push('/payment');
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col justify-between">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <Loader2 size={48} className="animate-spin text-hitm-red mb-4" />
          <h2 className="text-xl font-bold font-serif text-hitm-navy">Verifying Payment Status</h2>
          <p className="text-gray-500 text-sm mt-1">Please do not refresh or close this window...</p>
        </div>
        <Footer />
      </main>
    );
  }

  if (error || !transaction) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col justify-between">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <XCircle size={64} className="text-red-500 mb-4" />
          <h2 className="text-2xl font-black font-serif text-hitm-navy">Payment Error</h2>
          <p className="text-red-600 bg-red-50 border border-red-100 rounded-2xl px-5 py-3 mt-2 text-sm font-semibold max-w-md text-center">{error}</p>
          <Button onClick={() => router.push('/')} className="mt-6 bg-hitm-navy text-white">
            <Home size={16} className="mr-2" /> Back to Home
          </Button>
        </div>
        <Footer />
      </main>
    );
  }

  const isSuccess = transaction.status === 'Success';
  const isPending = transaction.status === 'Pending';
  const isFailed = !isSuccess && !isPending;

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-between print:bg-white print:p-0">
      <div className="print:hidden">
        <Navbar />
      </div>

      <div className="flex-1 pt-32 pb-20 container mx-auto px-4 max-w-2xl print:p-0 print:pt-0">
        
        {/* Status Card (Hidden during print) */}
        <div className="print:hidden text-center mb-8">
          {isSuccess && (
            <div className="inline-flex flex-col items-center">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 size={48} />
              </div>
              <Badge variant="green" className="text-xs uppercase tracking-widest font-black mb-2 px-3 py-1">Payment Successful</Badge>
              <h2 className="text-3xl font-black font-serif text-hitm-navy">Thank You!</h2>
              <p className="text-gray-500 text-sm mt-1 max-w-sm">Your payment was processed successfully. A confirmation summary is displayed below.</p>
            </div>
          )}

          {isPending && (
            <div className="inline-flex flex-col items-center">
              <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4">
                <Loader2 size={48} className="animate-spin" />
              </div>
              <Badge variant="amber" className="text-xs uppercase tracking-widest font-black mb-2 px-3 py-1">Payment Awaiting Confirmation</Badge>
              <h2 className="text-3xl font-black font-serif text-hitm-navy">Processing Payment</h2>
              <p className="text-gray-500 text-sm mt-1 max-w-sm">We are waiting for CCAvenue to confirm your payment status. This card will auto-update.</p>
            </div>
          )}

          {isFailed && (
            <div className="inline-flex flex-col items-center">
              <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                <XCircle size={48} />
              </div>
              <Badge variant="destructive" className="text-xs uppercase tracking-widest font-black mb-2 px-3 py-1">Payment Failed / Aborted</Badge>
              <h2 className="text-3xl font-black font-serif text-hitm-navy">Transaction Unsuccessful</h2>
              <p className="text-gray-500 text-sm mt-1 max-w-sm">
                The payment could not be processed. Code: {transaction.statusMessage || 'Rejected by Bank'}
              </p>
            </div>
          )}
        </div>

        {/* Receipt Card (Print Target) */}
        <Card 
          ref={printRef}
          className={`shadow-2xl border-none rounded-[40px] overflow-hidden bg-white print:shadow-none print:border-none print:rounded-none`}
        >
          {/* Header */}
          <div className="bg-hitm-navy p-8 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-2 border-hitm-red print:bg-white print:text-gray-900 print:p-0 print:pb-4 print:border-b">
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-hitm-red print:text-hitm-red">Fee Payment Receipt</div>
              <h1 className="text-xl sm:text-2xl font-black font-serif tracking-tight mt-1">HAIDER INSTITUTE OF TECHNOLOGY &amp; MANAGEMENT</h1>
              <p className="text-xs text-gray-400 mt-0.5 print:text-gray-500">Ranchi, Jharkhand, India · Approved by AICTE</p>
            </div>
            <div className="text-right print:text-right shrink-0">
              <Badge variant={isSuccess ? 'green' : isPending ? 'amber' : 'destructive'} className="text-xs uppercase font-bold py-1 px-3">
                {transaction.status}
              </Badge>
            </div>
          </div>

          <CardContent className="p-8 space-y-6 print:p-0 print:pt-6">
            
            {/* Payment Summary */}
            <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 grid grid-cols-2 gap-4 print:bg-transparent print:border-0 print:p-0 print:mb-6">
              <div>
                <Label className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Order ID</Label>
                <p className="font-bold text-sm text-hitm-navy mt-0.5">{transaction.orderId}</p>
              </div>
              <div>
                <Label className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Tracking / Reference ID</Label>
                <p className="font-bold text-sm text-hitm-navy mt-0.5">{transaction.trackingId || 'N/A'}</p>
              </div>
              <div>
                <Label className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Transaction Date</Label>
                <p className="font-bold text-sm text-hitm-navy mt-0.5">
                  {transaction.updatedAt ? (transaction.updatedAt.toDate ? transaction.updatedAt.toDate().toLocaleString() : new Date(transaction.updatedAt).toLocaleString()) : new Date().toLocaleString()}
                </p>
              </div>
              <div>
                <Label className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Payment Mode</Label>
                <p className="font-bold text-sm text-hitm-navy mt-0.5">{transaction.paymentMode || 'Online Payment'}</p>
              </div>
            </div>

            {/* Student & Payment Details */}
            <div className="space-y-4">
              <h3 className="font-bold font-serif text-lg text-hitm-navy border-b pb-2 print:text-sm">Student details</h3>
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                <div>
                  <Label className="text-xs text-gray-500 font-semibold">Student Name</Label>
                  <p className="font-bold text-gray-900 mt-0.5">{transaction.billing_name}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500 font-semibold">Mobile Number</Label>
                  <p className="font-bold text-gray-900 mt-0.5">{transaction.billing_tel}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500 font-semibold">Email Address</Label>
                  <p className="font-bold text-gray-900 mt-0.5">{transaction.billing_email}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500 font-semibold">Payment Category</Label>
                  <p className="font-bold text-gray-900 mt-0.5">
                    {transaction.type === 'admission' ? 'Admission Form Fee' : 'College Academic Fees'}
                  </p>
                </div>
              </div>
            </div>

            {/* Amount Table */}
            <div className="pt-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-t border-b print:border-t print:border-b">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 font-bold text-xs uppercase print:bg-transparent">
                      <th className="py-2.5 px-4 text-left">Description</th>
                      <th className="py-2.5 px-4 text-right">Amount (INR)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="py-4 px-4 font-medium text-gray-900">
                        {transaction.type === 'admission' ? 'Admission Registration Form Fee 2026' : `College Online Fee Payment (${transaction.orderId})`}
                      </td>
                      <td className="py-4 px-4 text-right font-bold text-gray-900">
                        ₹{parseFloat(transaction.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                    <tr className="border-t font-black bg-gray-50/50 print:bg-transparent">
                      <td className="py-3 px-4 text-right uppercase tracking-wider text-xs font-bold text-gray-500">Total Paid</td>
                      <td className="py-3 px-4 text-right text-lg text-hitm-navy">
                        ₹{parseFloat(transaction.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Receipt Footer */}
            <div className="pt-8 border-t flex justify-between items-center text-xs text-gray-400 print:pt-6 print:text-[10px]">
              <div>
                <p>This is a computer generated payment receipt. No physical signature required.</p>
                <p className="mt-1">For help, contact admissions@hitmranchi.ac.in</p>
              </div>
              <div className="text-right flex flex-col items-center">
                <div className="w-16 h-16 border rounded flex items-center justify-center bg-gray-50 text-[10px] text-gray-400 font-semibold mb-1 print:border">
                  STAMP
                </div>
                <span className="font-bold text-gray-500">HITM Accounts</span>
              </div>
            </div>

          </CardContent>
        </Card>

        {/* Buttons (Hidden during print) */}
        <div className="flex gap-4 mt-8 print:hidden justify-center">
          {isSuccess && (
            <Button onClick={handlePrint} className="h-12 px-6 bg-hitm-red hover:bg-hitm-navy text-white font-bold">
              <Printer size={16} className="mr-2" /> Print / Download Receipt
            </Button>
          )}

          {isFailed && (
            <Button onClick={handleRetry} className="h-12 px-6 bg-hitm-red hover:bg-hitm-navy text-white font-bold">
              <RefreshCw size={16} className="mr-2" /> Retry Payment
            </Button>
          )}

          <Button variant="outline" onClick={() => router.push('/')} className="h-12 px-6">
            <Home size={16} className="mr-2" /> Back to Home
          </Button>
        </div>

      </div>

      <div className="print:hidden">
        <Footer />
      </div>

      {/* Embedded print styles sheet */}
      <style jsx global>{`
        @media print {
          body {
            background-color: white !important;
            color: black !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:p-0 {
            padding: 0 !important;
          }
          .print\\:pt-0 {
            padding-top: 0 !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:border-none {
            border: none !important;
          }
          .print\\:rounded-none {
            border-radius: 0 !important;
          }
          .print\\:bg-transparent {
            background: transparent !important;
          }
        }
      `}</style>
    </main>
  );
}
