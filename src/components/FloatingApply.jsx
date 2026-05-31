'use client';
import { useState } from 'react';
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
  'B.Tech': ['Computer Science & Engineering (CSE)', 'Data Science', 'Artificial Intelligence & ML', 'Electric & Electronics Engineering', 'Mechanical Engineering', 'Civil Engineering'],
  Diploma: ['Computer Science & Engineering', 'Data Science', 'Artificial Intelligence', 'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering', 'Electrical & Electronics Engg.', 'Electronics & Comm. Engg.'],
  MBA: ['Finance Management', 'Marketing Management', 'Human Resource Management', 'Information Technology'],
};

export default function FloatingApply() {
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
      alert("Please verify your phone number with OTP first.");
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
        createdAt: serverTimestamp()
      });
      setStep(2);
      setTimeout(handleClose, 3000);
    } catch (err) {
      console.error("Error saving mobile enquiry popup data:", err);
      alert("Failed to submit enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Desktop View: Stack of UG, PG, Diploma Buttons */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] hidden md:flex flex-col gap-[2px] items-end pointer-events-none">
        {floatingButtons.map((btn) => (
          <Link
            key={btn.label}
            href={`/admissions/apply?form=1&course=${encodeURIComponent(btn.course)}`}
            className="pointer-events-auto w-20 bg-[#e67e22] text-white flex flex-col items-center justify-center py-2.5 px-1 rounded-l-md shadow-lg hover:w-24 transition-all duration-300 group border-b border-white/20"
          >
            <span className="text-[13px] font-black leading-none uppercase tracking-tight">{btn.label}</span>
            <span className="text-[7px] font-bold uppercase tracking-tight text-center leading-tight mt-1 text-white/80 group-hover:text-white">APPLY{'\n'}NOW</span>
          </Link>
        ))}
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
              <button onClick={handleClose} className="text-white/70 hover:text-white bg-white/10 rounded-full p-1.5 hover:bg-hitm-red z-20">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar bg-white flex-1">
              {step === 1 ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <Input 
                      placeholder="Full Name *" 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      required
                      className="border-gray-200 bg-gray-50 focus:bg-white transition-all rounded-xl h-11 text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <InlinePhoneVerifier 
                      phone={formData.phone}
                      onChange={(p) => setFormData({...formData, phone: p})}
                      onVerificationComplete={setPhoneVerified}
                      recaptchaId="mobile-enquiry-popup"
                    />
                  </div>

                  <div className="space-y-1">
                    <Input 
                      placeholder="Email ID (Optional)" 
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="border-gray-200 bg-gray-50 focus:bg-white transition-all rounded-xl h-11 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <select 
                        required
                        className="w-full h-11 border border-gray-200 rounded-xl px-3 bg-gray-50 text-sm focus:bg-white focus:ring-1 focus:ring-hitm-red outline-none"
                        value={formData.course} 
                        onChange={e => setFormData({ ...formData, course: e.target.value, branch: '' })}
                      >
                        <option value="">Course *</option>
                        {courseOptions.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    {branchOptions[formData.course] ? (
                      <div className="space-y-1">
                        <select 
                          required
                          className="w-full h-11 border border-gray-200 rounded-xl px-3 bg-white text-sm focus:ring-1 focus:ring-hitm-red outline-none animate-in fade-in duration-200"
                          value={formData.branch} 
                          onChange={e => setFormData({ ...formData, branch: e.target.value })}
                        >
                          <option value="">Branch *</option>
                          {branchOptions[formData.course].map(b => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <div className="hidden" />
                    )}
                  </div>
                  
                  {loading ? (
                    <div className="w-full flex items-center justify-center gap-2 bg-hitm-navy text-white rounded-xl py-3 text-sm font-bold animate-pulse mt-4">
                      <Loader2 className="animate-spin" size={16} /> Submitting Enquiry... Please wait
                    </div>
                  ) : (
                    <Button 
                      type="submit" 
                      className="w-full bg-hitm-red hover:bg-hitm-navy text-white rounded-xl h-12 font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mt-4" 
                      disabled={!phoneVerified}
                    >
                      <Send size={16} /> Submit Enquiry
                    </Button>
                  )}
                </form>
              ) : (
                <div className="py-10 text-center">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-100 animate-bounce">
                    <CheckCircle2 className="text-green-500 w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-hitm-navy mb-2">Thank You!</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">Your enquiry has been successfully verified and saved. Our counselor will contact you shortly.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
}
