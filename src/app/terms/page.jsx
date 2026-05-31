import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-32 max-w-4xl">
        <h1 className="text-4xl font-black font-serif text-hitm-navy mb-8">Terms of Use</h1>
        <div className="prose prose-slate max-w-none text-gray-600 space-y-6">
          <p className="text-lg">By accessing the HITM Ranchi website, you agree to these terms.</p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-10">1. Acceptance of Terms</h2>
          <p>This website is provided for informational and educational purposes. Your use of the site constitutes acceptance of these terms.</p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-10">2. Accuracy of Information</h2>
          <p>While we strive for accuracy, HITM Ranchi is not responsible for errors or omissions in the content provided on this site.</p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-10">3. Intellectual Property</h2>
          <p>All content including logos, text, and images are the property of Haider Institute of Technology and Management and its licensors.</p>
          
          <p className="pt-10 text-sm text-gray-400">Copyright © 2026 HITM Ranchi.</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
