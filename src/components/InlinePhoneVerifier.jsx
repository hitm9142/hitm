'use client';
import { useState, useEffect, useRef } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { CheckCircle2, Loader2, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function InlinePhoneVerifier({ 
  phone, 
  onChange, 
  onVerificationComplete, 
  recaptchaId = 'default' 
}) {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const recaptchaVerifierRef = useRef(null);
  const confirmationResultRef = useRef(null);
  const timerRef = useRef(null);

  // Check if phone number is exactly 10 digits
  const isTenDigits = phone && phone.replace(/\D/g, '').length === 10;

  // Format phone number to standard E.164 (+91 for India)
  const formatPhone = (p) => {
    const cleaned = p.replace(/\D/g, '');
    if (cleaned.length === 10) return `+91${cleaned}`;
    if (cleaned.length === 12 && cleaned.startsWith('91')) return `+${cleaned}`;
    return `+${cleaned}`;
  };

  useEffect(() => {
    // Reset state if phone number changes from 10 digits
    if (!isTenDigits) {
      setOtpSent(false);
      setSuccess(false);
      setError('');
      onVerificationComplete(false);
      cleanupVerifier();
      stopTimer();
    }
  }, [phone, isTenDigits]);

  useEffect(() => {
    if (otpSent && timer > 0) {
      timerRef.current = setTimeout(() => setTimer(prev => prev - 1), 1000);
    } else if (otpSent && timer === 0) {
      setCanResend(true);
    }
    return () => stopTimer();
  }, [otpSent, timer]);

  const stopTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const cleanupVerifier = () => {
    if (recaptchaVerifierRef.current) {
      try {
        recaptchaVerifierRef.current.clear();
      } catch (err) {
        console.error("Error clearing recaptcha verifier:", err);
      }
      recaptchaVerifierRef.current = null;
    }
    confirmationResultRef.current = null;
    
    // Reset the recaptcha container HTML to prevent "reCAPTCHA has already been rendered" error on retries
    if (typeof document !== 'undefined') {
      const container = document.getElementById(`recaptcha-container-${recaptchaId}`);
      if (container) {
        container.innerHTML = '';
      }
    }
  };

  const handleSendOTP = async (e) => {
    if (e) e.preventDefault();
    if (!isTenDigits) return;

    setLoading(true);
    setError('');
    
    // Preserve the OTP input container when resending
    const isResend = otpSent;
    if (!isResend) {
      setOtpSent(false);
    }
    cleanupVerifier();

    try {
      // Initialize recaptcha verifier
      const containerId = `recaptcha-container-${recaptchaId}`;
      const verifier = new RecaptchaVerifier(auth, containerId, {
        size: 'invisible',
        callback: () => {}
      });
      recaptchaVerifierRef.current = verifier;

      const formattedPhone = formatPhone(phone);
      const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, verifier);
      confirmationResultRef.current = confirmationResult;
      
      setOtpSent(true);
      setTimer(60);
      setCanResend(false);
      setOtp(''); // Clear the previous OTP input box on resend
    } catch (err) {
      console.error("Firebase send phone OTP error:", err);
      setError('Failed to send verification code. Please try again.');
      cleanupVerifier();
      if (isResend) {
        setCanResend(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    if (e) e.preventDefault();
    if (!otp || otp.length !== 6) {
      setError('Please enter a 6-digit verification code.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (!confirmationResultRef.current) {
        throw new Error('Verification session expired. Please send OTP again.');
      }
      await confirmationResultRef.current.confirm(otp);
      
      setSuccess(true);
      setOtpSent(false);
      onVerificationComplete(true);
      cleanupVerifier();
      stopTimer();
    } catch (err) {
      console.error("Firebase confirm OTP error:", err);
      setError('Invalid OTP code. Please check and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3 w-full">
      {/* Hidden recaptcha element */}
      <div id={`recaptcha-container-${recaptchaId}`} className="hidden"></div>

      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Input 
            type="tel"
            required
            placeholder="Mobile Number" 
            value={phone}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, '').slice(0, 10);
              onChange(val);
            }}
            disabled={success || loading}
            className={`h-12 bg-gray-50 border-gray-200 focus:bg-white transition-all rounded-xl ${success ? 'pr-10 border-green-500 bg-green-50/20' : ''}`}
          />
          {success && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600">
              <CheckCircle2 size={20} />
            </span>
          )}
        </div>

        {isTenDigits && !success && !otpSent && (
          <Button 
            type="button"
            onClick={handleSendOTP}
            disabled={loading}
            className="h-12 px-5 bg-hitm-navy hover:bg-hitm-red text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md shrink-0 active:scale-95 transition-all"
          >
            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : 'Verify'}
          </Button>
        )}
      </div>

      {otpSent && (
        <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl space-y-3 animate-in slide-in-from-top duration-300">
          <p className="text-xs text-gray-500 text-center font-medium">
            We have sent a verification code to your phone number.
          </p>
          <div className="flex gap-2">
            <Input 
              type="text"
              maxLength={6}
              placeholder="Enter 6-Digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              disabled={loading}
              className="h-10 text-center text-sm font-bold tracking-[0.2em] bg-white border-gray-200 rounded-xl"
            />
            <Button
              type="button"
              onClick={handleVerifyOTP}
              disabled={loading || otp.length !== 6}
              className="h-10 px-4 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-xl shadow-md shrink-0"
            >
              {loading ? <Loader2 className="animate-spin w-4 h-4" /> : 'Confirm'}
            </Button>
          </div>

          <div className="flex justify-between items-center px-1 text-[11px]">
            {error ? (
              <span className="text-red-500 font-semibold flex items-center gap-1">
                <ShieldAlert size={12} /> {error}
              </span>
            ) : (
              <span></span>
            )}
            {canResend ? (
              <button 
                type="button" 
                onClick={handleSendOTP} 
                className="text-hitm-navy hover:text-hitm-red font-bold hover:underline"
              >
                Resend OTP
              </button>
            ) : (
              <span className="text-gray-400 font-medium">Resend in {timer}s</span>
            )}
          </div>
        </div>
      )}

      {error && !otpSent && (
        <p className="text-red-500 text-xs font-bold bg-red-50 p-2.5 rounded-xl border border-red-100 animate-fade-in flex items-center gap-1.5">
          <ShieldAlert size={14} /> {error}
        </p>
      )}
    </div>
  );
}
