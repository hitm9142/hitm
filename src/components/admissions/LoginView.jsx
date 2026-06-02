'use client';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowRight, ShieldCheck } from 'lucide-react';
import InlinePhoneVerifier from '@/components/InlinePhoneVerifier';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function LoginView({ onLoginSuccess }) {
  const [phone, setPhone] = useState('');
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isDebug = process.env.NEXT_PUBLIC_DEPLOYMENT_MODE === 'debug';

  const handleProceed = async () => {
    if (!isDebug && !phoneVerified) {
      setError('Please verify your phone number first.');
      return;
    }
    
    if (isDebug && phone.length < 10) {
       setError('Please enter a valid 10-digit phone number for testing.');
       return;
    }

    setLoading(true);
    setError('');

    try {
      const phoneId = phone.replace('+91', '').slice(-10);
      const docRef = doc(db, 'applications', phoneId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        localStorage.setItem('admission_session_phone', phoneId);
        onLoginSuccess(phoneId, docSnap.data());
      } else {
        // Create initial draft
        const initialData = {
          phone: phoneId,
          status: 'Draft',
          step: 1,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };
        await setDoc(docRef, initialData);
        localStorage.setItem('admission_session_phone', phoneId);
        onLoginSuccess(phoneId, initialData);
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto animate-in fade-in zoom-in-95 duration-300 mt-10">
      <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden bg-white relative">
        <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-hitm-navy to-hitm-red" />
        <CardContent className="p-10 text-center">
          <div className="w-16 h-16 bg-blue-50 text-hitm-navy rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
            <ShieldCheck size={32} />
          </div>
          <h3 className="text-2xl font-bold text-hitm-navy mb-3">Applicant Portal</h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            Verify your mobile number to create a new application or access an existing one.
            {isDebug && <span className="block mt-2 text-red-500 font-bold">Debug Mode: OTP Bypassed</span>}
          </p>

          <div className="space-y-6 text-left">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Mobile Number *</label>
              {isDebug ? (
                <input 
                  type="text" 
                  className="w-full h-12 border rounded-md px-4 font-mono text-lg tracking-widest text-center focus:ring-2 focus:ring-hitm-red/20 outline-none transition-all"
                  placeholder="Enter 10 digit number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength={10}
                />
              ) : (
                <InlinePhoneVerifier
                  phone={phone}
                  onChange={setPhone}
                  onVerificationComplete={setPhoneVerified}
                  recaptchaId="admission-login"
                />
              )}
            </div>

            {error && (
              <p className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-lg border border-red-100 flex items-center gap-2">
                {error}
              </p>
            )}

            <Button
              type="button"
              onClick={handleProceed}
              disabled={(!isDebug && !phoneVerified) || loading} 
              className="w-full h-12 bg-hitm-navy hover:bg-hitm-red text-white uppercase font-bold tracking-widest shadow-lg transition-all"
            >
              {loading ? (
                <span className="flex items-center gap-2"><Loader2 className="animate-spin" size={16} /> Authenticating...</span>
              ) : (
                <span className="flex items-center gap-2">Proceed to Portal <ArrowRight size={16} /></span>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
