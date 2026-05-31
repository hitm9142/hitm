'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';

export default function Page() { 
  return (
    <main className='flex flex-col min-h-screen'>
      <Navbar />
      <div className='flex-1 bg-white pt-24 pb-20'>
        <div className='container mx-auto px-4 text-center'>
          <Badge variant='gold' className='mb-4'>Information</Badge>
          <h1 className='text-4xl font-black text-hitm-navy font-serif mb-4 uppercase'>HITM SECTION</h1>
          <p className='text-gray-500 italic'>Content for this section is currently being updated by the HITM academic cell.</p>
        </div>
      </div>
      <Footer />
    </main>
  ); 
}
