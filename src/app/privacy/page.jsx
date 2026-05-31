import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-32 max-w-4xl">
        <h1 className="text-4xl font-black font-serif text-hitm-navy mb-8">Privacy Policy</h1>
        <div className="prose prose-slate max-w-none text-gray-600 space-y-6">
          <p className="text-lg">At HITM Ranchi, we value your privacy. This policy outlines how we handle your personal data.</p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-10">1. Information We Collect</h2>
          <p>We collect information you provide directly to us through forms, such as your name, email address, and phone number when you apply or enquire.</p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-10">2. How We Use Your Information</h2>
          <p>We use the information to process admissions, respond to enquiries, and provide campus-related updates.</p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-10">3. Data Security</h2>
          <p>We implement security measures to protect your data using Firebase secure storage and encrypted connections.</p>
          
          <p className="pt-10 text-sm text-gray-400">Last updated: April 2026</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
