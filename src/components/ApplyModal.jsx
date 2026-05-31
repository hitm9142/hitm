"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export default function ApplyModal({ courseName, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      <div onClick={() => setIsOpen(true)} className="relative cursor-pointer group">
        <div className="pointer-events-none w-full">
          {children}
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-hitm-navy/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200 relative z-10">
            <div className="bg-hitm-navy p-5 flex justify-between items-center text-white border-b border-hitm-gold/30 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-xl pointer-events-none"></div>
              <h3 className="font-bold text-lg relative z-10">Confirm Application</h3>
              <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors relative z-10 bg-white/10 rounded-full p-1.5 hover:bg-hitm-red">
                <X size={18} />
              </button>
            </div>
            <div className="p-8 text-center text-hitm-navy">
              <p className="mb-8 text-lg font-medium leading-relaxed text-gray-600">
                Are you sure you want to start your application for <br />
                <strong className="text-xl font-black text-hitm-navy mt-2 block">{courseName}</strong>?
              </p>
              <div className="flex gap-4">
                <Button variant="outline" className="flex-1 h-12 uppercase tracking-wider text-xs font-bold border-gray-200 text-gray-500 hover:bg-gray-50" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button className="flex-1 h-12 bg-hitm-red hover:bg-hitm-navy uppercase tracking-wider text-xs font-bold text-white shadow-lg shadow-hitm-red/20" onClick={() => router.push('/admissions/apply?form=1')}>
                  Yes, Apply Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
