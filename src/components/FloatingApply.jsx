'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { X, Send, CheckCircle2, MessageSquareText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import InlinePhoneVerifier from './InlinePhoneVerifier';

const floatingButtons = [
  { label: 'UG', course: 'B.Tech' },
  { label: 'PG', course: 'MBA' },
  { label: 'Diploma', course: 'Diploma' },
];

const courseOptions = ['B.Tech', 'Diploma', 'MBA', 'BBA', 'MCA', 'BCA'];

const branchOptions = {
  'B.Tech': [
    'Computer Science & Engineering (CSE)',
    'Data Sciences',
    'Artificial Intelligence (AI)',
    'Electrical & Electronics Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
  ],
  Diploma: [
    'Computer Science & Engineering',
    'Data Sciences',
    'Artificial Intelligence',
    'Mechanical Engineering',
    'Electrical & Electronics Engineering',
    'Civil Engineering',
  ],
  MBA: ['Finance Management', 'Marketing Management', 'Human Resource Management', 'Information Technology'],
};

export default function FloatingApply() {
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1); // 1: Form, 2: Success
  const [loading, setLoading] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', course: '', branch: '' });

  const handleOpen = () => {
    setFormData({ name: '', phone: '', email: '', course: '', branch: '' });
    setPhoneVerified(false);
    setStep(1);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.course) return;
    if (!phoneVerified) {
      alert('Please verify your phone number with OTP first.');
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'enquiries'), {
        name: formData.name,
        phone: formData.phone,
        email: formData.email || '',
        program: formData.course,
        branch: formData.branch || 'N/A',
        source: 'Mobile Floating Enquiry',
        status: 'New',
        createdAt: serverTimestamp(),
      });
      setStep(2);
      setTimeout(handleClose, 3000);
    } catch (err) {
      console.error('Error saving mobile enquiry popup data:', err);
      alert('Failed to submit enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Re-initialize NoPaperForms widget every time modal opens
  useEffect(() => {
    if (!showModal) return;

    // Give React time to mount the widget div in the DOM
    const timer = setTimeout(() => {
      // Clear any previous widget content so it re-renders fresh
      const widget = document.querySelector('.npf_wgts[data-w="92a2ad338fcee31956c6a2a71b1852cb"]');
      if (widget) widget.innerHTML = '';

      // Remove old script if already injected
      const existing = document.getElementById('npf-widget-script');
      if (existing) existing.remove();

      // Inject fresh script so NoPaperForms scans the DOM
      const s = document.createElement('script');
      s.id = 'npf-widget-script';
      s.type = 'text/javascript';
      s.async = true;
      s.src = 'https://widgets.in4.nopaperforms.com/emwgts.js';
      document.body.appendChild(s);
    }, 100);

    return () => clearTimeout(timer);
  }, [showModal]);

  return (
    <>
      {pathname?.startsWith('/admin-dashboard') ? null : (
        <>
          {/* Desktop View: Stack of UG, PG, Diploma Buttons + Register Now */}
          <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] hidden md:flex flex-col gap-[2px] items-end pointer-events-none">
            {/* {floatingButtons.map((btn) => (
              <Link
                key={btn.label}
                href={`/admissions/apply?form=1&course=${encodeURIComponent(btn.course)}`}
                className="pointer-events-auto w-20 bg-[#e67e22] text-white flex flex-col items-center justify-center py-2.5 px-1 rounded-l-md shadow-lg hover:w-24 transition-all duration-300 group border-b border-white/20"
              >
                <span className="text-[13px] font-black leading-none uppercase tracking-tight">{btn.label}</span>
                <span className="text-[7px] font-bold uppercase tracking-tight text-center leading-tight mt-1 text-white/80 group-hover:text-white">
                  APPLY{'\n'}NOW
                </span>
              </Link>
            ))} */}
            <a
              href="https://applynow.hitmranchi.ac.in/?utm_source=website"
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto w-20 bg-[#e67e22] text-white flex flex-col items-center justify-center py-2.5 px-1 rounded-l-md shadow-lg hover:w-24 transition-all duration-300 group border-b border-white/20"
            >
              <span className="text-[11px] font-black leading-none uppercase tracking-tight text-center">REGISTER</span>
              <span className="text-[7px] font-bold uppercase tracking-tight text-center leading-tight mt-1 text-white/80 group-hover:text-white">
                NOW
              </span>
            </a>
          </div>

          {/* Mobile View: Single Enquiry Now Button */}
          <div className="fixed right-4 bottom-20 z-[100] flex md:hidden pointer-events-none">
            <button
              onClick={handleOpen}
              className="pointer-events-auto h-12 w-36 bg-[#e67e22] hover:bg-hitm-navy text-white flex items-center justify-center gap-2 px-4 rounded-full shadow-2xl transition-all duration-300 font-bold text-xs uppercase tracking-wider animate-bounce"
            >
              <MessageSquareText size={16} /> Enquiry Now
            </button>
          </div>

          {/* Mobile Enquiry Modal */}
          {showModal && (
            <div className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
              <div className="absolute inset-0" onClick={handleClose} />
              <div className="bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden max-w-md w-full shadow-2xl relative z-10 animate-in slide-in-from-bottom duration-300 max-h-[90vh] flex flex-col">
                <div className="bg-gradient-to-r from-hitm-navy to-[#0F2547] p-5 text-white flex justify-between items-center relative overflow-hidden shrink-0">
                  <div className="relative z-10">
                    <h3 className="font-bold font-serif text-lg text-hitm-gold">Quick Enquiry</h3>
                    <p className="text-xs text-white/60">Fill in details for admission guidance</p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="text-white/70 hover:text-white bg-white/10 rounded-full p-1.5 hover:bg-hitm-red z-20"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="p-6 overflow-y-auto custom-scrollbar bg-white flex-1">
                  {/* {step === 1 ? ( */}
                  <div className="npf_wgts" data-height="510px" data-w="92a2ad338fcee31956c6a2a71b1852cb" />
                  {/* ) : (
                    <div className="py-10 text-center">
                      <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-100 animate-bounce">
                        <CheckCircle2 className="text-green-500 w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold text-hitm-navy mb-2">Thank You!</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        Your enquiry has been successfully verified and saved. Our counselor will contact you shortly.
                      </p>
                    </div>
                  )} */}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
