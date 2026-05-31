'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2, Loader2, X, ArrowRight } from 'lucide-react';
import { db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import InlinePhoneVerifier from '@/components/InlinePhoneVerifier';
import Link from 'next/link';

const branchOptions = {
  'B.Tech': ['Computer Science & Engineering (CSE)', 'Data Science', 'Artificial Intelligence & ML', 'Electric & Electronics Engineering', 'Mechanical Engineering', 'Civil Engineering'],
  Diploma: ['Computer Science & Engineering', 'Data Science', 'Artificial Intelligence', 'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering', 'Electrical & Electronics Engg.', 'Electronics & Comm. Engg.'],
  MBA: ['Finance Management', 'Marketing Management', 'Human Resource Management', 'Information Technology'],
};

export default function AdmissionApplyClient() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [userIp, setUserIp] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);

  const [formData, setFormData] = useState({
    name: '', fatherName: '', email: '', phone: '', program: '', branch: ''
  });

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setUserIp(data.ip))
      .catch(err => console.error('IP Error:', err));

    const params = new URLSearchParams(window.location.search);
    const shouldOpenForm = params.get('form') === '1' || Boolean(params.get('course'));
    setShowForm(shouldOpenForm);
    const course = params.get('course');
    if (course) {
      setFormData(prev => ({ ...prev, program: course, branch: '' }));
    }
  }, []);

  const handleInitialSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!phoneVerified) {
      setError('Please verify your phone number with OTP first.');
      return;
    }

    setLoading(true);
    try {
      const docRef = doc(db, 'enquiries', formData.phone);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const existingData = docSnap.data();
        if (existingData.payment?.status === 'Success' || existingData.payment?.status === 'Verified') {
          setError('An application with this phone number already exists and has been successfully paid.');
          setLoading(false);
          return;
        } else {
          // Allow recovery: load the data and proceed to payment
          setFormData({
            name: existingData.name || '',
            fatherName: existingData.fatherName || '',
            email: existingData.email || '',
            phone: existingData.phone || '',
            program: existingData.program || '',
            branch: existingData.branch || '',
          });
          setError('Unpaid application found. Directing to payment options...');
          setShowPayment(true);
          setLoading(false);
          return;
        }
      }

      setShowPayment(true);
    } catch (err) {
      console.error(err);
      setError('Something went wrong verifying your details.');
    }
    setLoading(false);
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      const orderId = `APP_${Date.now()}_${formData.phone}`;

      // Save/Update form details with payment state Pending
      await setDoc(doc(db, 'enquiries', formData.phone), {
        ...formData,
        documentUrl: 'N/A',
        payment: {
          orderId: orderId,
          amount: '1000.00',
          transactionId: 'N/A',
          receiptUrl: 'N/A',
          status: 'Pending',
          createdAt: serverTimestamp()
        },
        status: 'New',
        ipAddress: userIp,
        createdAt: serverTimestamp()
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
          billing_name: formData.name,
          billing_email: formData.email,
          billing_tel: formData.phone,
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
      console.error('Error finalizing:', submitError);
      setError('Something went wrong during submission. Please try again.');
      setLoading(false);
    }
  };

  const handleSkipPayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const orderId = `APP_${Date.now()}_${formData.phone}`;

      // Save form details with payment state Pending
      await setDoc(doc(db, 'enquiries', formData.phone), {
        ...formData,
        documentUrl: 'N/A',
        payment: {
          orderId: orderId,
          amount: '1000.00',
          transactionId: 'N/A',
          receiptUrl: 'N/A',
          status: 'Pending',
          createdAt: serverTimestamp()
        },
        status: 'New',
        ipAddress: userIp,
        createdAt: serverTimestamp()
      }, { merge: true });

      setSubmitted(true);
      setShowPayment(false);
    } catch (submitError) {
      console.error('Error in skip payment submit:', submitError);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 bg-gray-50 pt-24 pb-20 relative">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black font-serif text-hitm-navy mb-4">Admission Process 2026</h1>
            <p className="text-gray-500 italic">Review the admission steps first, then continue to the application form when you are ready.</p>
          </div>

          {!submitted && !showForm && (
            <div className="mb-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Step 1', description: 'Choose your preferred program and keep your contact details ready.' },
                  { title: 'Step 2', description: 'Verify your phone number with OTP and fill out the basic details form.' },
                  { title: 'Step 3', description: 'Pay the application fee online or skip/pay later to finish your application.' },
                ].map((step) => (
                  <Card key={step.title} className="border border-gray-200 shadow-sm">
                    <CardContent className="p-6">
                      <div className="w-11 h-11 rounded-2xl bg-hitm-red/10 text-hitm-red flex items-center justify-center mb-4">
                        <CheckCircle2 size={22} />
                      </div>
                      <h3 className="text-lg font-bold text-hitm-navy mb-2">{step.title}</h3>
                      <p className="text-sm text-gray-600 leading-6">{step.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="border border-gray-200 shadow-sm">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="max-w-2xl">
                      <h3 className="text-2xl font-bold text-hitm-navy mb-3">Eligibility Before You Apply</h3>
                      <p className="text-gray-600 leading-7 mb-5">
                        Please make sure you meet the basic academic requirements for your chosen program before filling out the application form.
                      </p>
                    </div>
                    <Button type="button" variant="outline" className="shrink-0" onClick={() => window.location.href = '/admissions/eligibility'}>
                      View Full Eligibility
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                    {[
                      { title: 'B.Tech / Engineering', points: '10+2 with Physics, Chemistry and Mathematics. Entrance score details can be added during application.' },
                      { title: 'Diploma / Polytechnic', points: '10th pass from a recognized board. Relevant entrance details may be submitted if available.' },
                      { title: 'MBA / MCA', points: 'Graduate degree from a recognized university. Entrance score can be provided during application if applicable.' },
                      { title: 'BBA / BCA', points: '10+2 pass from a recognized board with the required qualifying marks as per institute norms.' },
                    ].map((item) => (
                      <div key={item.title} className="rounded-2xl bg-gray-50 border border-gray-100 p-5">
                        <h4 className="text-lg font-bold text-hitm-navy mb-2">{item.title}</h4>
                        <p className="text-sm text-gray-600 leading-6">{item.points}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden bg-white relative">
            <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-hitm-navy to-hitm-red" />
            <CardContent className="p-10">
              {submitted ? (
                <div className="text-center py-10 animate-fade-in">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 size={32} /></div>
                  <h3 className="text-2xl font-bold text-hitm-navy mb-2">Application Submitted Successfully!</h3>
                  <p className="text-gray-500">Your details have been successfully saved with payment marked as pending. Our admissions cell will review your application shortly.</p>
                </div>
              ) : !showForm ? (
                <div className="text-center py-8">
                  <div className="max-w-2xl mx-auto">
                    <h3 className="text-2xl font-bold text-hitm-navy mb-3">Ready to Begin Your Application?</h3>
                    <p className="text-gray-600 leading-relaxed mb-8">
                      Once you click below, the simplified application form will open. You can verify your phone number and submit your application.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button type="button" onClick={() => setShowForm(true)} className="h-12 px-8 bg-hitm-red hover:bg-hitm-navy text-white font-bold uppercase tracking-widest">
                        Apply Now <ArrowRight size={16} />
                      </Button>
                      <Button type="button" variant="outline" className="h-12 px-8" onClick={() => window.location.href = '/admissions/eligibility'}>
                        Check Eligibility
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleInitialSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2"><Label>Student Name *</Label><Input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} /></div>
                    <div className="space-y-2"><Label>Father&apos;s Name *</Label><Input required value={formData.fatherName} onChange={e => setFormData({ ...formData, fatherName: e.target.value })} /></div>
                    
                    <div className="space-y-2">
                      <Label>Mobile Number * (Serves as your Application ID)</Label>
                      <InlinePhoneVerifier
                        phone={formData.phone}
                        onChange={(p) => setFormData({ ...formData, phone: p })}
                        onVerificationComplete={setPhoneVerified}
                        recaptchaId="admission-apply"
                      />
                    </div>
                    
                    <div className="space-y-2"><Label>Email Address *</Label><Input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} /></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Select Preferred Course *</Label>
                      <select className="w-full h-10 border rounded-md px-3 bg-gray-50" required value={formData.program} onChange={e => setFormData({ ...formData, program: e.target.value, branch: '' })}>
                        <option value="">Choose Course...</option>
                        <option value="B.Tech">B.Tech (Bachelor of Technology)</option>
                        <option value="Diploma">Diploma in Polytechnic</option>
                        <option value="MBA">MBA</option>
                        <option value="BBA">BBA</option>
                        <option value="MCA">MCA</option>
                        <option value="BCA">BCA</option>
                      </select>
                    </div>

                    {branchOptions[formData.program] ? (
                      <div className="space-y-2 animate-in fade-in zoom-in duration-200">
                        <Label>Select Specialization / Branch *</Label>
                        <select className="w-full h-10 border rounded-md px-3 bg-white" required value={formData.branch} onChange={e => setFormData({ ...formData, branch: e.target.value })}>
                          <option value="">Choose Branch...</option>
                          {branchOptions[formData.program].map((b) => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <div className="hidden md:block" />
                    )}
                  </div>

                  {error && !showPayment && <p className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}
                  {loading ? (
                    <div className="w-full flex items-center justify-center gap-2 bg-hitm-navy text-white rounded-md py-3 text-sm font-bold animate-pulse">
                      <Loader2 className="animate-spin" size={16} /> Verifying application... Please wait
                    </div>
                  ) : (
                    <Button type="submit" disabled={!phoneVerified} className="w-full h-12 bg-hitm-navy hover:bg-hitm-red text-white uppercase font-bold tracking-widest shadow-lg">
                      Proceed to Payment Options
                    </Button>
                  )}
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        {showPayment && (
          <div className="fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="bg-gradient-to-r from-hitm-navy to-hitm-red p-6 text-white flex justify-between items-center relative">
                <div>
                  <h3 className="text-xl font-black font-serif italic">Submit Application</h3>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-80 mt-1">Application Fee: Rs. 1,000</p>
                </div>
                <button onClick={() => setShowPayment(false)} className="bg-white/20 p-2 rounded-full hover:bg-white hover:text-hitm-navy transition-colors text-white absolute top-6 right-6">
                  <X size={16} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 text-center shadow-inner">
                  <p className="text-sm text-gray-700 leading-relaxed font-medium">
                    You can either complete your secure online payment of <strong className="text-hitm-navy font-bold">1,000 Rupees</strong> now, or submit your details and pay later.
                  </p>
                </div>

                {error && showPayment && <p className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}

                <div className="flex flex-col gap-3">
                  {loading ? (
                    <div className="w-full flex items-center justify-center gap-2 bg-hitm-navy text-white rounded-md py-3 text-sm font-bold animate-pulse">
                      <Loader2 className="animate-spin" size={16} /> Finalizing application... Please wait
                    </div>
                  ) : (
                    <>
                      <Button type="button" onClick={handleFinalSubmit} className="w-full h-12 bg-hitm-red hover:bg-hitm-navy text-white uppercase font-bold tracking-widest shadow-xl hover:-translate-y-0.5 transition-transform">
                        Pay Application Fee Online
                      </Button>
                      <Button type="button" onClick={handleSkipPayment} variant="outline" className="w-full h-12 border-gray-200 hover:bg-gray-50 text-gray-700 uppercase font-bold tracking-widest transition-transform">
                        Submit & Pay Later
                      </Button>
                    </>
                  )}
                  
                  <p className="text-center text-xs text-gray-400 mt-2">
                    By proceeding, you agree to the college <Link href="/refund-policy" target="_blank" className="text-hitm-navy hover:text-hitm-red font-bold hover:underline">Refund Policy</Link>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}

