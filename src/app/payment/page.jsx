'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Loader2, ShieldCheck } from 'lucide-react';
import { db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import InlinePhoneVerifier from '@/components/InlinePhoneVerifier';
import Link from 'next/link';

export default function PaymentPage() {
  const [formData, setFormData] = useState({
    regNum: '',
    name: '',
    mobile: '',
    email: '',
    amount: '',
    purpose: 'Semester Tuition Fee',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [phoneVerified, setPhoneVerified] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!phoneVerified) {
      setError('Please verify your mobile number with OTP first.');
      return;
    }

    const amt = parseFloat(formData.amount);
    if (isNaN(amt) || amt <= 0) {
      setError('Please enter a valid payment amount.');
      return;
    }

    setLoading(true);

    try {
      const orderId = `GEN_${Date.now()}_${formData.mobile}`;

      // 1. Create a pending payment log in Firestore
      await setDoc(doc(db, 'online_payments', orderId), {
        orderId,
        regNum: formData.regNum || 'N/A',
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email,
        amount: amt,
        purpose: formData.purpose,
        status: 'Pending',
        createdAt: serverTimestamp(),
      });

      // 2. Send details to backend API to get encrypted form
      const res = await fetch('/api/ccavenue/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_id: orderId,
          amount: amt.toFixed(2),
          billing_name: formData.name,
          billing_email: formData.email,
          billing_tel: formData.mobile,
          order_type: 'general',
        }),
      });

      const data = await res.json();

      if (data.formHtml) {
        // 3. Auto-submit encrypted checkout form
        const div = document.createElement('div');
        div.innerHTML = data.formHtml;
        document.body.appendChild(div);
        
        const form = div.querySelector('form#nonseamless');
        if (form) {
          form.submit();
        } else {
          setError('Failed to load secure checkout form redirect.');
          setLoading(false);
        }
      } else {
        setError(data.error || 'Payment gateway initiation failed.');
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while initiating payment. Please try again.');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <section className="pt-32 pb-20 bg-hitm-navy relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-hitm-red/5 skew-x-12 translate-x-1/4" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge variant="gold" className="mb-4">Secure Gateway</Badge>
          <h1 className="text-4xl md:text-5xl font-black font-serif text-white mb-6">Online Fee Payment</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Pay semester fees, exam fees, hostel fees, and admission fees instantly online via secure net banking, cards, or UPI.
          </p>
        </div>
      </section>

      <section className="py-20 flex-1">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Direct Online Payment Form */}
            <Card className="shadow-2xl border-none rounded-[40px] overflow-hidden">
              <CardHeader className="bg-hitm-navy text-white p-8 pb-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-hitm-red/10 skew-x-12 translate-x-1/4" />
                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white backdrop-blur-md">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-black font-serif">Quick Online Pay</CardTitle>
                    <CardDescription className="text-gray-300">Fast, direct payments using CCAvenue</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="regNum">Registration / Roll Number (Optional)</Label>
                      <Input 
                        id="regNum" 
                        placeholder="e.g. HITM/2026/001" 
                        value={formData.regNum}
                        onChange={(e) => setFormData({ ...formData, regNum: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input 
                        id="name" 
                        required 
                        placeholder="John Doe" 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="mobile">Mobile Number *</Label>
                      <InlinePhoneVerifier
                        phone={formData.mobile}
                        onChange={(p) => setFormData({ ...formData, mobile: p })}
                        onVerificationComplete={setPhoneVerified}
                        recaptchaId="online-payment"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input 
                        id="email" 
                        required 
                        type="email" 
                        placeholder="john@example.com" 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="purpose">Payment Purpose / Category *</Label>
                      <select 
                        id="purpose"
                        required
                        className="w-full h-10 border rounded-md px-3 bg-white text-sm"
                        value={formData.purpose}
                        onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                      >
                        <option value="Semester Tuition Fee">Semester Tuition Fee</option>
                        <option value="Admission Fee">Admission Fee</option>
                        <option value="Hostel & Mess Fee">Hostel & Mess Fee</option>
                        <option value="Exam Fee">Exam Fee</option>
                        <option value="Fine & Penalty">Fine & Penalty</option>
                        <option value="Other Fees">Other Fees</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount to Pay (INR) *</Label>
                      <Input 
                        id="amount" 
                        required 
                        type="number"
                        min="1"
                        step="0.01"
                        placeholder="0.00" 
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      />
                    </div>
                  </div>

                  {error && <p className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-2xl border border-red-100">{error}</p>}

                   {loading ? (
                     <div className="w-full flex items-center justify-center gap-2 bg-hitm-navy text-white rounded-md py-4 text-sm font-bold animate-pulse">
                       <Loader2 className="animate-spin" size={16} /> Transferring to CCAvenue... Please wait
                     </div>
                   ) : (
                     <Button 
                       type="submit" 
                       disabled={!phoneVerified}
                       className="w-full h-14 bg-hitm-red hover:bg-hitm-navy text-white font-black uppercase tracking-widest text-sm shadow-xl hover:shadow-2xl transition-all"
                     >
                       Pay ₹{formData.amount || '0.00'} Online Now
                     </Button>
                   )}
                  
                  <p className="text-center text-xs text-gray-500 mt-3">
                    By making this payment, you agree to our <Link href="/refund-policy" className="text-hitm-navy hover:text-hitm-red font-bold hover:underline">Refund Policy</Link>.
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* Offline Bank Account Details */}
            <Card className="shadow-lg border border-gray-100 rounded-[40px] overflow-hidden">
              <CardHeader className="bg-white border-b border-gray-100 p-8 pb-4">
                <div className="w-12 h-12 rounded-2xl bg-hitm-navy/5 flex items-center justify-center text-hitm-navy mb-4">
                  <CreditCard size={24} />
                </div>
                <CardTitle className="text-xl font-bold font-serif text-hitm-navy">Offline Bank Transfer Details</CardTitle>
                <CardDescription>If you wish to make manual RTGS/NEFT/IMPS transfers, use these details</CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-semibold text-gray-500">Bank Name</Label>
                      <p className="text-lg font-bold text-hitm-navy">THE JAMMU AND KASHMIR BANK</p>
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-gray-500">Account Number</Label>
                      <p className="text-lg font-bold text-hitm-navy">0520010100001043</p>
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-gray-500">IFSC Code</Label>
                      <p className="text-lg font-bold text-hitm-navy">JAKA0RANCHI</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-semibold text-gray-500">Account Holder Name</Label>
                      <p className="text-lg font-bold text-hitm-navy">Haider Institute of Technology and Management</p>
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-gray-500">Branch</Label>
                      <p className="text-lg font-bold text-hitm-navy">Ranchi Branch</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-100 rounded-2xl">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> For offline transfers, please contact the college administration directly with your reference receipt to update your accounts.
                  </p>
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
