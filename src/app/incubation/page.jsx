'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Target, Zap, Globe, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import InlinePhoneVerifier from '@/components/InlinePhoneVerifier';

export default function IncubationPage() {
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', interest: '' });
  const [phoneVerified, setPhoneVerified] = useState(false);

  const features = [
    { icon: <Lightbulb size={32} />, title: 'Idea Validation', desc: 'Work with industry mentors to turn your academic projects into viable business models.' },
    { icon: <Zap size={32} />, title: 'Seed Funding', desc: 'Access to seed grants and connection to angel investors for promising student startups.' },
    { icon: <Globe size={32} />, title: 'Global Network', desc: 'Partnerships with international incubators for cross-border mentorship and expansion.' }
  ];

  const openModal = () => {
    setStatusMessage('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setPhoneVerified(false);
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.interest) {
      setStatusMessage('Please fill in all fields before submitting.');
      return;
    }
    if (!phoneVerified) {
      setStatusMessage('Please verify your phone number with OTP first.');
      return;
    }

    setSubmitting(true);
    try {
      await addDoc(collection(db, 'incubation_enquiries'), {
        ...form,
        source: 'Incubation Page',
        status: 'New',
        createdAt: serverTimestamp(),
      });
      setStatusMessage('Thank you! Your request has been submitted successfully.');
      setForm({ name: '', email: '', phone: '', interest: '' });
      setPhoneVerified(false);
      setShowModal(false);
    } catch (error) {
      console.error('Error saving incubation enquiry:', error);
      setStatusMessage('Unable to submit right now. Please try again later.');
    }
    setSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-hitm-navy relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-hitm-red/5 skew-x-12 translate-x-1/4" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge variant="gold" className="mb-4">Innovation Hub</Badge>
          <h1 className="text-4xl md:text-6xl font-black font-serif text-white mb-6 uppercase tracking-tighter italic">HITM Incubation Center</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Empowering the entrepreneurs of tomorrow. We provide the space, mentorship, and resources to transform your vision into a successful startup.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="navy" size="lg" className="h-14 px-10 rounded-full shadow-xl" onClick={openModal}>
              Apply for Incubation 2026
            </Button>
          </div>
          {statusMessage && (
            <p className="mt-6 text-sm text-amber-100 max-w-xl mx-auto">{statusMessage}</p>
          )}
        </div>
      </section>

      {/* Stats/Highlight */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {features.map((f, i) => (
              <div key={i} className="text-center p-8 rounded-[40px] bg-gray-50 hover:bg-white hover:shadow-2xl transition-all border border-gray-100 group">
                <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center mx-auto mb-6 text-hitm-red group-hover:rotate-6 group-hover:scale-110 transition-all">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-hitm-navy mb-3">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="w-full h-[500px] bg-gray-200 rounded-[40px] overflow-hidden shadow-2xl">
                 <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800" alt="Incubation Center" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-hitm-red p-8 rounded-[32px] text-white shadow-2xl hidden md:block">
                 <p className="text-3xl font-black font-serif">2026</p>
                 <p className="text-xs font-bold uppercase tracking-widest opacity-80">Vision Launch</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-black font-serif text-hitm-navy mb-6">Our Vision for Startups</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  The HITM Incubation Center (AIC) is designed to be the heartbeat of innovation in Jharkhand. We don&apos;t just provide office space; we build an ecosystem where students can experiment, fail fast, and succeed bigger.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { title: 'Mentorship', tip: 'Access to 10+ industry veterans and successful founders.' },
                  { title: 'Co-working', tip: 'State-of-the-art labs, high-speed internet, and meeting rooms.' },
                  { title: 'Legal Support', tip: 'Assistance with patent filing and company registration.' }
                ].map((item, index) => (
                  <div key={index} className="flex gap-4 items-start p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-hitm-navy/10 flex items-center justify-center text-hitm-navy shrink-0">
                      <Target size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-hitm-navy">{item.title}</h4>
                      <p className="text-sm text-gray-500">{item.tip}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="default" size="lg" className="h-14 bg-hitm-navy hover:bg-hitm-red px-10 rounded-full shadow-xl" onClick={openModal}>
                  Apply for Incubation 2026
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-950 text-white relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-hitm-red/20 blur-[100px]" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-black font-serif mb-8 italic">Have a Groundbreaking Idea?</h2>
          <p className="text-white/60 mb-10 max-w-xl mx-auto text-lg">
            We are looking for innovative startups to join our 2026 cohort and grow with strong mentorship, support, and resources.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="gold" size="lg" className="h-14 px-12 rounded-full shadow-2xl" onClick={openModal}>
              Join the Waitlist
            </Button>
          </div>
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative w-full max-w-2xl rounded-[40px] bg-white shadow-2xl overflow-hidden">
            <div className="bg-hitm-navy px-8 py-8 text-white relative overflow-hidden">
              <div className="absolute right-0 top-0 w-44 h-44 bg-white/10 rounded-full blur-3xl" />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-hitm-gold mb-3">Incubation Enquiry</p>
                  <h2 className="text-3xl md:text-4xl font-black font-serif max-w-xl">Share your startup idea with our 2026 cohort.</h2>
                </div>
                <button type="button" onClick={closeModal} className="rounded-full border border-white/20 bg-white/10 p-3 text-white hover:bg-white/20 transition-colors">
                  <X size={20} />
                </button>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="p-8 grid gap-6 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <label className="space-y-2 text-sm text-gray-700">
                  <span>Name</span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full rounded-3xl border border-gray-200 px-4 py-3 focus:border-hitm-navy focus:ring-hitm-navy/10 outline-none"
                    placeholder="Your full name"
                  />
                </label>
                <label className="space-y-2 text-sm text-gray-700">
                  <span>Email</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full rounded-3xl border border-gray-200 px-4 py-3 focus:border-hitm-navy focus:ring-hitm-navy/10 outline-none"
                    placeholder="you@example.com"
                  />
                </label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2 text-sm text-gray-700">
                  <span>Phone *</span>
                  <InlinePhoneVerifier
                    phone={form.phone}
                    onChange={(p) => handleChange('phone', p)}
                    onVerificationComplete={setPhoneVerified}
                    recaptchaId="incubation"
                  />
                </div>
                <label className="space-y-2 text-sm text-gray-700">
                  <span>Area of Interest</span>
                  <input
                    type="text"
                    value={form.interest}
                    onChange={(e) => handleChange('interest', e.target.value)}
                    className="w-full rounded-3xl border border-gray-200 px-4 py-3 focus:border-hitm-navy focus:ring-hitm-navy/10 outline-none"
                    placeholder="E.g. AI, EdTech, HealthTech"
                  />
                </label>
              </div>
              {statusMessage && (
                <p className="text-sm text-rose-600">{statusMessage}</p>
              )}
              <div className="flex flex-col sm:flex-row gap-4 justify-end w-full">
                {submitting ? (
                  <div className="w-full flex items-center justify-center gap-2 bg-hitm-navy text-white rounded-full py-4 text-sm font-bold animate-pulse">
                    <Loader2 className="animate-spin" size={16} /> Submitting Idea... Please wait
                  </div>
                ) : (
                  <>
                    <Button variant="outline" type="button" className="h-14 rounded-full flex-1 sm:flex-none" onClick={closeModal}>
                      Cancel
                    </Button>
                    <Button type="submit" className="h-14 rounded-full flex-1 sm:flex-none" disabled={!phoneVerified}>
                      Submit Enquiry
                    </Button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
