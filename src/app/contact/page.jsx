'use client';
export const dynamic = 'force-dynamic';
export const runtime = 'edge';

import { useState } from 'react';
import dynamicImport from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, Clock, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

import InlinePhoneVerifier from '@/components/InlinePhoneVerifier';

const ContactLeafletMap = dynamicImport(() => import('@/components/ContactLeafletMap'), { ssr: false });

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [phoneVerified, setPhoneVerified] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message || !formData.phone) {
      setErrorMessage("Please fill in all required fields.");
      setStatus("error");
      return;
    }

    if (!phoneVerified) {
      setErrorMessage("Please verify your phone number with OTP first.");
      setStatus("error");
      return;
    }

    setLoading(true);
    setStatus(null);
    setErrorMessage('');

    let firestoreSuccess = false;

    // 1. Try to submit to Firestore first
    try {
      if (db) {
        await addDoc(collection(db, 'contact_submissions'), {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject || 'General Inquiry',
          message: formData.message,
          createdAt: serverTimestamp()
        });
        firestoreSuccess = true;
      } else {
        throw new Error("Database not initialized.");
      }
    } catch (err) {
      console.error("Firestore submit error:", err);
      setErrorMessage("Could not save to database. Please check your internet connection.");
      setStatus("error");
    }

    // 2. Try to submit to Web3Forms email API
    // We wrap this in a try-catch so that even if Web3Forms fails, it doesn't affect Firestore success!
    if (firestoreSuccess) {
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            access_key: "ea72c4d8-d56a-48f8-af05-7dd8d48268a9",
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            subject: formData.subject || "Contact Page Message",
            message: formData.message
          })
        });
        const data = await res.json();
        if (!data.success) {
          console.warn("Web3Forms email submission returned success: false", data);
        }
      } catch (mailErr) {
        console.error("Web3Forms email submission failed:", mailErr);
      }

      setStatus("success");
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setPhoneVerified(false);
    }

    setLoading(false);
  };


  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 bg-white pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="gold" className="mb-4">Get In Touch</Badge>
            <h1 className="text-4xl md:text-5xl font-black font-serif text-hitm-navy mb-4">Contact HITM Ranchi</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Have questions about admissions, courses, or campus life? We&apos;re here to help. 
              Reach out to us through any of the channels below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="border-none shadow-lg bg-hitm-navy text-white overflow-hidden relative">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-8 font-serif">Campus Information</h3>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                        <MapPin className="text-hitm-gold" size={20} />
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Haider Institute of Technology and Management, Okhargarha, Pithoriya, Ranchi -834006
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                        <Phone className="text-hitm-gold" size={20} />
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Admission: 764-496-6461<br />
                        {/* Admissions: +91 98765 43210 */}
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                        <Mail className="text-hitm-gold" size={20} />
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        info@hitmranchi.ac.in
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                        <Clock className="text-hitm-gold" size={20} />
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Office Hours: Mon - Sat<br />
                        09:00 AM - 05:00 PM
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <ContactLeafletMap />
            </div>

            {/* Contact Form */}
            <Card className="lg:col-span-2 border-none shadow-2xl relative">
              <div className="absolute top-0 w-full h-2 bg-hitm-red"></div>
              <CardContent className="p-10">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-hitm-navy mb-2">Send us a Message</h3>
                  <p className="text-gray-500 text-sm">We&apos;ll get back to you within 24 business hours.</p>
                </div>
                {status === 'success' ? (
                  <div className="text-center py-10 animate-in fade-in zoom-in duration-300">
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100 animate-bounce">
                      <CheckCircle2 className="text-green-500 w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-hitm-navy mb-2">Message Sent!</h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                      Thank you for contacting us. Your message has been safely saved, and we will get back to you shortly.
                    </p>
                    <Button 
                      className="mt-8 bg-hitm-navy hover:bg-hitm-red text-white" 
                      onClick={() => setStatus(null)}
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Full Name *</Label>
                        <Input 
                          required
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Doe" 
                          className="h-12 bg-gray-50 border-gray-200" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Email Address *</Label>
                        <Input 
                          required
                          type="email" 
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@example.com" 
                          className="h-12 bg-gray-50 border-gray-200" 
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Mobile Number *</Label>
                        <InlinePhoneVerifier 
                          phone={formData.phone}
                          onChange={p => setFormData({ ...formData, phone: p })}
                          onVerificationComplete={setPhoneVerified}
                          recaptchaId="contact-us"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Subject</Label>
                        <Input 
                          value={formData.subject}
                          onChange={e => setFormData({ ...formData, subject: e.target.value })}
                          placeholder="Admission Inquiry" 
                          className="h-12 bg-gray-50 border-gray-200" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Your Message *</Label>
                      <Textarea 
                        required
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Type your message here..." 
                        className="min-h-[150px] bg-gray-50 border-gray-200" 
                      />
                    </div>
                    
                    {status === 'error' && (
                      <p className="text-red-500 text-sm font-semibold bg-red-50 p-3 rounded-lg border border-red-100 animate-in fade-in duration-300">
                        {errorMessage}
                      </p>
                    )}

                     {loading ? (
                       <div className="w-full flex items-center justify-center gap-2 bg-hitm-navy text-white rounded-md py-3 text-sm font-bold animate-pulse">
                         <Loader2 className="animate-spin" size={16} /> Sending Message... Please wait
                       </div>
                     ) : (
                       <Button 
                         type="submit"
                         disabled={!phoneVerified}
                         className="w-full h-12 bg-hitm-red hover:bg-hitm-navy text-white font-bold tracking-widest uppercase transition-all shadow-lg hover:shadow-hitm-red/20 group"
                       >
                         Send Message <Send className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                       </Button>
                     )}

                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

