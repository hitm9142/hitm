'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Phone, Mail, Calendar, Image as ImageIcon, MapPin, ChevronDown, Menu, X,
  BookOpen, GraduationCap, Users, Building2, Trophy, Briefcase,
  Bell, ArrowRight, CreditCard, Home
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';


const navItems = [
  {
    label: 'Home', icon: <Home size={16} />,
    href: '/',
    isHome: true,
  },
  {
    label: 'Programs', icon: <BookOpen size={16} />,
    children: [
      { label: 'Engineering (B.Tech)', href: '/programs/engineering' },
      { label: 'MBA', href: '/programs/mba' },
      { label: 'MCA', href: '/programs/mca' },
      { label: 'Engineering Diploma', href: '/programs/diploma' },
      { label: 'BCA', href: '/programs/bca' },
      { label: 'BBA', href: '/programs/bba' },
    ],
  },
  {
    label: 'Management', icon: <Building2 size={16} />,
    children: [
      { label: 'Governing Body', href: '/about/governing-body' },
      { label: 'Vision & Mission', href: '/about/vision' },
      { label: "Chairman's Message", href: '/about/director' },
    ],
  },
  {
    label: 'Admissions', icon: <Users size={16} />,
    children: [
      { label: 'Eligibility', href: '/admissions/eligibility' },
      { label: 'Admission Process', href: '/admissions/apply' },
      { label: 'Fee Structure', href: '/admissions/fee' },
    ],
  },
  {
    label: 'Academics', icon: <GraduationCap size={16} />,
    children: [
      { label: 'Syllabus (PDF)', href: '/academics/syllabus' },
      { label: 'Academic Calendar', href: '/academics/calendar' },
      { label: 'Faculty Details', href: '/about/faculty' },
    ],
  },
  {
    label: 'Student Life', icon: <Trophy size={16} />,
    children: [
      { label: 'Facilities', href: '/student-life' },
      { label: 'Events', href: '/campus/events' },
      { label: 'Hostel & Transport', href: '/student-life' },
    ],
  },
  {
    label: 'Contact', icon: <Phone size={16} />,
    href: '/contact',
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileItem, setOpenMobileItem] = useState(null);
  const [academicYear, setAcademicYear] = useState('');

  useEffect(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const isNew = currentMonth >= 2; // March onwards
    setAcademicYear(isNew ? `${currentYear}-${currentYear + 1}` : `${currentYear - 1}-${currentYear}`);

    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      {/* Premium Header Container */}
      <header className={cn(
        "bg-white w-full z-[1000] transition-all duration-300",
        scrolled ? "fixed top-0 shadow-2xl" : "relative"
      )}>
        <div className="flex flex-wrap justify-between items-center lg:flex-nowrap lg:items-stretch w-full">

          {/* Left: Logo Area (Aligned to standard container) */}
          <div className="flex items-center py-3 lg:py-6 pl-[max(1rem,calc((100vw-1400px)/2+1rem))] lg:pr-10 shrink-0">
            <Link href="/" className="flex items-center gap-2.5 sm:gap-4 group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center relative shrink-0">
                <img src="/images/logo/ahct-logo.png" alt="HITM Logo" className="w-full h-full object-contain rounded-full" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-[1.1rem] sm:text-2xl md:text-3xl font-black text-hitm-navy tracking-tighter leading-none border-b-2 border-hitm-navy/10 pb-1">
                  HITM <span className="text-hitm-red">RANCHI</span>
                </h1>
                <div className="text-[7.5px] sm:text-[9px] md:text-[11px] font-bold text-gray-500 uppercase mt-1 leading-[1.2]">
                  <p className="text-hitm-navy">Run and Managed by AL ALMAAS HAIDER CHARITABLE TRUST</p>
                  Approved by AICTE, New Delhi 
                </div>
              </div>
            </Link>
          </div>

          {/* Right: Dual Bar Area (Spans to right edge) */}
          <div className="flex-1 flex flex-col justify-between relative">

            {/* Top Bar (Dark Blue) - Right Full Width */}
            <div className="bg-hitm-navy text-white text-[10px] font-bold uppercase tracking-wider pl-8 pr-[max(1rem,calc((100vw-1400px)/2+1rem))] py-2.5 rounded-bl-[40px] hidden lg:flex items-center justify-between shadow-lg ml-[-20px] relative z-10">
              <div className="flex items-center gap-6">
                <a href="mailto:info@hitmranchi.ac.in" className="flex items-center gap-2 hover:text-hitm-gold transition-colors">
                  <Mail size={12} className="text-hitm-gold" /> info@hitmranchi.ac.in
                </a>
                <a href="tel:7644966461" className="flex items-center gap-2 hover:text-hitm-gold transition-colors border-l border-white/20 pl-6">
                  <Phone size={12} className="text-hitm-gold" /> Admission Cell: (+91) 7644966461
                </a>
              </div>
              <div className="flex items-center gap-4 xl:gap-6">
                <Link href="/admissions/apply?form=1" className="hover:text-hitm-gold transition-colors border-r border-white/20 pr-6 underline decoration-hitm-gold decoration-2 underline-offset-4">
                  <span suppressHydrationWarning>APPLY NOW Batch-2026</span>
                </Link>
                <Link href="https://www.aicte.gov.in/" className="hover:text-hitm-gold transition-colors border-r border-white/20 pr-6">AICTE</Link>
                <Link href="/incubation" className="hover:text-hitm-gold transition-colors border-r border-white/20 pr-6">Incubation Center</Link>
                <Link href="/career" className="hover:text-hitm-gold transition-colors border-r border-white/20 pr-6">Careers</Link>
                <Link href="/payment" className="hover:text-hitm-gold transition-colors flex items-center gap-2">
                  <CreditCard size={12} className="text-hitm-gold" /> Online Fee Payment
                </Link>
              </div>
            </div>

            {/* Bottom Bar (Navbar) - Aligned to standard container */}
            <div className="flex items-center justify-end flex-1 py-1 pr-[max(1rem,calc((100vw-1400px)/2+1rem))]">
              <ul className="hidden xl:flex items-center gap-1">
                {navItems.map((item) => (
                  <li key={item.label} className="relative group">
                    {item.children ? (
                      <>
                        <span className="flex items-center gap-1.5 px-4 py-3 text-[13px] font-black text-hitm-navy uppercase tracking-tight cursor-pointer transition-colors group-hover:text-hitm-red">
                          {item.label}
                          <ChevronDown size={14} className="transition-transform duration-300 group-hover:-rotate-180 text-hitm-red" />
                        </span>

                        <div className="absolute top-full left-0 pt-2 opacity-0 invisible translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                          <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-2 min-w-[220px] overflow-hidden">
                            <div className="h-1 w-full bg-hitm-red mb-2 rounded-full" />
                            {item.children.map((child) => (
                              <Link
                                key={child.label}
                                href={child.href}
                                className="group/link flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-gray-600 hover:text-hitm-red hover:bg-gray-50 rounded-lg transition-all"
                              >
                                <span className="group-hover/link:translate-x-1 transition-transform">{child.label}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : item.isHome ? (
                      <Link href={item.href} title="Home" className="flex items-center gap-1.5 px-4 py-3 text-[13px] font-black text-hitm-navy uppercase tracking-tight transition-colors hover:text-hitm-red">
                        Home
                      </Link>
                    ) : (
                      <Link href={item.href} className="flex items-center gap-1.5 px-4 py-3 text-[13px] font-black text-hitm-navy uppercase tracking-tight transition-colors hover:text-hitm-red">
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

              {/* Mobile Menu Toggle */}
              <button
                className="xl:hidden p-3 rounded-xl bg-gray-100 text-hitm-navy hover:bg-hitm-red hover:text-white transition-all shadow-sm"
                onClick={() => setMobileOpen(true)}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-hitm-navy/80 backdrop-blur-sm z-[60] xl:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Modern Mobile Menu Drawer */}
      <div className={cn(
        "fixed top-0 right-0 h-full w-[85%] max-w-[400px] bg-white z-[70] shadow-2xl xl:hidden transition-transform duration-500 overflow-y-auto flex flex-col",
        mobileOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="bg-gradient-to-r from-hitm-navy to-[#0F2547] px-6 py-8 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 opacity-10">
            <Building2 size={150} />
          </div>
          <div className="relative z-10">
            <h3 className="text-white font-black font-serif text-2xl tracking-tight">HITM RANCHI</h3>
            <p className="text-hitm-gold font-bold text-[10px] uppercase tracking-widest mt-1">Haider Institute of Technology and Management</p>
          </div>
          <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 text-white/50 hover:text-white bg-white/10 hover:bg-hitm-red rounded-full p-2 transition-colors z-20">
            <X size={20} />
          </button>
        </div>

        <ul className="py-4 flex-1">
          {navItems.map((item) => (
            <li key={item.label} className="border-b border-gray-100 px-4">
              {item.children ? (
                <>
                  <button
                    className="w-full flex justify-between items-center py-4 text-sm font-bold text-hitm-navy uppercase tracking-wide hover:text-hitm-red transition-colors"
                    onClick={() => setOpenMobileItem(openMobileItem === item.label ? null : item.label)}
                  >
                    <span className="flex items-center gap-3"><span className="text-hitm-gold">{item.icon}</span>{item.label}</span>
                    <ChevronDown size={16} className={cn("transition-transform text-gray-400", openMobileItem === item.label && "rotate-180 text-hitm-red")} />
                  </button>
                  <div className={cn("overflow-hidden transition-all duration-300 ease-in-out", openMobileItem === item.label ? "max-h-[800px] opacity-100 mb-4" : "max-h-0 opacity-0")}>
                    <div className="bg-gray-50 rounded-xl p-2 border border-gray-100 space-y-1">
                      {item.children.map((child) => (
                        <Link key={child.label} href={child.href} onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-hitm-red hover:bg-white rounded-lg transition-colors shadow-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-hitm-gold" />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="w-full flex items-center py-4 text-sm font-bold text-hitm-navy uppercase tracking-wide hover:text-hitm-red transition-colors"
                >
                  <span className="flex items-center gap-3"><span className="text-hitm-gold">{item.icon}</span>{item.label}</span>
                </Link>
              )}
            </li>
          ))}
          <li className="border-b border-gray-100 px-4">
            <Link
              href="/payment"
              onClick={() => setMobileOpen(false)}
              className="w-full flex items-center py-4 text-sm font-bold text-hitm-navy uppercase tracking-wide hover:text-hitm-red transition-colors"
            >
              <span className="flex items-center gap-3">
                <span className="text-hitm-gold"><CreditCard size={16} /></span>
                Online Fee Payment
              </span>
            </Link>
          </li>
        </ul>

        <div className="p-6 border-t bg-gray-50 mt-auto shadow-inner">
          <Button asChild variant="default" className="w-full bg-hitm-red hover:bg-hitm-navy text-white h-12 uppercase tracking-widest text-sm font-bold shadow-xl" onClick={() => setMobileOpen(false)}>
            <Link href="/admissions/apply?form=1" suppressHydrationWarning>Apply Now 2026</Link>
          </Button>
          <div className="mt-4 text-center pb-2">
            <p className="text-xs font-semibold text-gray-400">Call Admissions: 764-496-6461</p>
          </div>
        </div>
      </div>
    </>
  );
}
