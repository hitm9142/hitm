'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2, ShieldCheck } from 'lucide-react';

export default function CCAvenueTestPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: '1.00',
    billing_name: 'Test Student',
    billing_email: 'test@example.com',
    billing_tel: '9999999999',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Send details to our backend to get the encrypted HTML form
      const res = await fetch('/api/ccavenue/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_id: `TEST_${Date.now()}`,
          ...formData,
        }),
      });

      const data = await res.json();

      if (data.formHtml) {
        // 2. Create a temporary div, inject the HTML form, and append it to the body
        // The HTML form contains a script that will automatically submit itself
        const div = document.createElement('div');
        div.innerHTML = data.formHtml;
        document.body.appendChild(div);
        
        // As a fallback, try to find the form and submit it if the inline script doesn't execute
        const form = div.querySelector('form#nonseamless');
        if (form) {
          form.submit();
        }
      } else {
        alert('Failed to initiate payment.');
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <section className="pt-32 pb-20 flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-lg">
          <Card className="shadow-2xl border-none rounded-[40px] overflow-hidden">
            <CardHeader className="bg-hitm-navy text-white p-8 pb-6 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-hitm-red/20 skew-x-12 translate-x-1/4" />
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4 backdrop-blur-sm">
                  <ShieldCheck size={32} className="text-white" />
                </div>
                <CardTitle className="text-2xl font-black font-serif">CCAvenue Test Payment</CardTitle>
                <CardDescription className="text-gray-300 mt-2">Staging Environment Simulator</CardDescription>
              </div>
            </CardHeader>
            
            <CardContent className="p-8">
              <form onSubmit={handlePayment} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (INR)</Label>
                  <Input 
                    id="amount" 
                    type="number"
                    step="0.01"
                    required 
                    value={formData.amount}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="billing_name">Billing Name</Label>
                  <Input 
                    id="billing_name" 
                    required 
                    value={formData.billing_name}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="billing_email">Email</Label>
                  <Input 
                    id="billing_email" 
                    type="email"
                    required 
                    value={formData.billing_email}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="billing_tel">Mobile</Label>
                  <Input 
                    id="billing_tel" 
                    type="tel"
                    required 
                    value={formData.billing_tel}
                    onChange={handleChange}
                  />
                </div>

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full h-14 bg-hitm-red hover:bg-hitm-navy text-white font-black uppercase tracking-widest text-sm shadow-xl hover:shadow-2xl transition-all"
                  >
                    {loading ? (
                      <><Loader2 className="mr-2 animate-spin" /> Processing...</>
                    ) : (
                      'Pay Now (Test Mode)'
                    )}
                  </Button>
                </div>
                
                <p className="text-xs text-center text-gray-500 mt-4">
                  You will be redirected to CCAvenue&apos;s staging portal. Select &quot;Avenues Test&quot; under Net Banking to simulate success or failure.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  );
}
