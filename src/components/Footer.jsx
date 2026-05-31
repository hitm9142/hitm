'use client';
import { useState, useEffect } from 'react';

import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, ChevronRight, Facebook, Linkedin, Instagram, Twitter, Youtube } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import VisitCounter from '@/components/VisitCounter';

const footerLinks = {
  quickLinks: [
    { label: 'About HITM', href: '/about' },
    { label: 'All Programs', href: '/programs' },
    { label: 'Apply Online', href: '/admissions/apply?form=1' },
    { label: 'Academic Calendar', href: '/academics/calendar' },
    { label: 'Placement', href: '/placement/overview' },
    { label: 'Photo Gallery', href: '/campus/gallery' },
    { label: 'Notice Board', href: '/notice' },
    { label: 'Career', href: '/career' },
  ],
  programs: [
    { label: 'MBA', href: '/programs/mba' },
    { label: 'MCA', href: '/programs/mca' },
    { label: 'B.Tech', href: '/programs/engineering' },
    { label: 'Diploma', href: '/programs/diploma' },
    { label: 'BCA', href: '/programs/bca' },
    { label: 'BBA', href: '/programs/bba' },
  ],
};

export default function Footer() {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="flex flex-col">
            <Link href="/" className="flex items-center gap-4 mb-6 group">
              <div className="w-14 h-14 rounded-full bg-white p-1 flex items-center justify-center shadow-xl group-hover:rotate-6 transition-transform">
                <img src="/images/logo/ahct-logo.png" alt="HITM Logo" className="w-full h-full object-contain rounded-full" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-white font-black text-xl leading-none tracking-tight">HITM <span className="text-hitm-red">RANCHI</span></h3>
                <p className="text-gray-500 text-[9px] uppercase font-bold tracking-widest mt-1">Haider Institute of Technology <br /> & Management</p>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Haider Institute of Technology and Management, Ranchi - Jharkhand&apos;s most futuristic institute,
              dedicated to excellence in innovation and producing industry-ready leaders.
            </p>
            <div className="flex gap-3">
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all text-gray-400" aria-label="Facebook">
                <Facebook size={16} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all text-gray-400" aria-label="LinkedIn">
                <Linkedin size={16} />
              </a>
              <a href="https://www.instagram.com/hitm_ranchi/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all text-gray-400" aria-label="Instagram">
                <Instagram size={16} />
              </a>
              <a href="https://x.com/HITM_RANCHI" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-gray-800 hover:text-white transition-all text-gray-400" aria-label="Twitter">
                <Twitter size={16} />
              </a>
              <a href="https://www.youtube.com/channel/UChpON9rl02F-PrBOrw4bDQw" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all text-gray-400" aria-label="YouTube">
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 pb-2 border-b border-hitm-red/40 font-serif">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="flex items-center gap-1.5 text-gray-400 text-sm hover:text-hitm-gold transition-all hover:translate-x-1">
                    <ChevronRight size={12} className="text-hitm-red" /> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-white font-semibold mb-4 pb-2 border-b border-hitm-red/40 font-serif">Programs</h4>
            <ul className="space-y-2">
              {footerLinks.programs.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="flex items-center gap-1.5 text-gray-400 text-sm hover:text-hitm-gold transition-all hover:translate-x-1">
                    <ChevronRight size={12} className="text-hitm-red" /> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 pb-2 border-b border-hitm-red/40 font-serif">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin size={16} className="text-hitm-gold shrink-0 mt-0.5" />
                <p className="text-gray-400 text-sm">Haider Institute of Technology and Management, Okhargarha, Pithoriya, Ranchi -834006</p>
              </div>
              <div className="flex gap-3">
                <Phone size={16} className="text-hitm-gold shrink-0" />
                <p className="text-gray-400 text-sm">764-496-6461</p>
              </div>
              <div className="flex gap-3">
                <Mail size={16} className="text-hitm-gold shrink-0" />
                <p className="text-gray-400 text-sm">info@hitmranchi.ac.in</p>
              </div>
              <div className="flex gap-3">
                <Clock size={16} className="text-hitm-gold shrink-0" />
                <p className="text-gray-400 text-sm">Mon-Sat: 9:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-white/10" />

      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-3">
        <div className="flex flex-col md:flex-row items-center gap-1 md:gap-4">
          <p className="text-gray-500 text-xs">
            &copy; {year} HITM Ranchi. All rights reserved.
          </p>
          <span className="hidden md:inline text-gray-700 text-xs">|</span>
          <p className="text-gray-500 text-[10px] sm:text-xs">
            Developed by <a href="https://shrote.com" target="_blank" rel="noopener noreferrer" className="text-hitm-gold font-semibold tracking-wide hover:underline hover:text-white transition-colors">Shrote Technologies</a>
          </p>
          <span className="hidden md:inline text-gray-700 text-xs">|</span>
          <VisitCounter />
        </div>
        <div className="flex gap-4">
          <Link href="/privacy" className="text-gray-500 text-xs hover:text-hitm-gold transition-colors">Privacy Policy</Link>
          <Link href="/refund-policy" className="text-gray-500 text-xs hover:text-hitm-gold transition-colors">Refund Policy</Link>
          <Link href="/terms" className="text-gray-500 text-xs hover:text-hitm-gold transition-colors">Terms of Use</Link>
          <Link href="/sitemap" className="text-gray-500 text-xs hover:text-hitm-gold transition-colors">Sitemap</Link>
          <Link href="/admin/login" className="text-gray-500 text-xs hover:text-hitm-gold transition-colors">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
