'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';
import {
  LayoutDashboard, Bell, CalendarDays, Users, Briefcase,
  Globe, LogOut, Menu, Clock, Sparkles, Rocket, CreditCard
} from 'lucide-react';
import { cn } from '@/lib/utils';

import DashboardView from '@/components/admin/DashboardView';
import NoticesManager from '@/components/admin/NoticesManager';
import EventsManager from '@/components/admin/EventsManager';
import EnquiriesManager from '@/components/admin/EnquiriesManager';
import CareerManager from '@/components/admin/CareerManager';
import PopupManager from '@/components/admin/PopupManager';
import IncubationManager from '@/components/admin/IncubationManager';
import PaymentsManager from '@/components/admin/PaymentsManager';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
  { id: 'notices', label: 'Notices', icon: <Bell size={16} /> },
  { id: 'events', label: 'Events', icon: <CalendarDays size={16} /> },
  { id: 'enquiries', label: 'Enquiries', icon: <Users size={16} /> },
  { id: 'payments', label: 'Payments', icon: <CreditCard size={16} /> },
  { id: 'careers', label: 'Careers', icon: <Briefcase size={16} /> },
  { id: 'incubation', label: 'Incubation Leads', icon: <Rocket size={16} /> },
  { id: 'popup', label: 'Popup Leads', icon: <Sparkles size={16} /> },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!auth || !db) return;
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (u) {
        try {
          const userDoc = await getDoc(doc(db, 'users', u.uid));
          if (userDoc.exists() && userDoc.data().userType === 'admin') {
            setUser({ ...u, ...userDoc.data() });
          } else {
            await signOut(auth);
            router.push('/admin/login');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          router.push('/admin/login');
        }
      } else {
        router.push('/admin/login');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-hitm-red/20 border-t-hitm-red rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard': return <DashboardView />;
      case 'notices': return <NoticesManager />;
      case 'events': return <EventsManager />;
      case 'enquiries': return <EnquiriesManager />;
      case 'payments': return <PaymentsManager />;
      case 'careers': return <CareerManager />;
      case 'incubation': return <IncubationManager />;
      case 'popup': return <PopupManager />;
      default: return (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <Clock size={48} className="mb-4 opacity-40" />
          <h3 className="text-xl font-bold font-serif mb-2">Coming Soon</h3>
          <p className="text-sm">This section is under development</p>
        </div>
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 xl:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={cn(
        'fixed top-0 left-0 h-full w-64 bg-gray-950 z-50 flex flex-col transition-transform duration-300',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'
      )}>
        <div className="bg-hitm-red/80 px-4 py-5 text-center shrink-0">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white font-black text-xl font-serif mx-auto mb-2">A</div>
          <h2 className="text-white font-bold font-serif text-sm">HITM Admin</h2>
          <p className="text-white/60 text-[11px] mt-0.5">Management Portal</p>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-2">
          <p className="text-white/30 text-[10px] uppercase tracking-widest font-semibold px-3 mb-2">Main</p>
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
              className={cn('admin-sidebar-link w-full text-left mb-0.5', activeSection === item.id && 'active')}
            >
              {item.icon} {item.label}
            </button>
          ))}

          <p className="text-white/30 text-[10px] uppercase tracking-widest font-semibold px-3 mt-4 mb-2">Account</p>
          <Link href="/" className="admin-sidebar-link flex w-full">
            <Globe size={16} /> View Website
          </Link>
          <button onClick={handleSignOut} className="admin-sidebar-link w-full text-left text-red-400 hover:text-red-300 hover:bg-red-900/20">
            <LogOut size={16} /> Sign Out
          </button>
        </nav>
      </aside>

      <div className="flex-1 xl:ml-64 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-3">
            <button className="xl:hidden p-1.5 rounded-md hover:bg-gray-100" onClick={() => setSidebarOpen(true)}>
              <Menu size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="font-bold text-gray-900 text-sm leading-tight">
                {navItems.find((i) => i.id === activeSection)?.label || 'Dashboard'}
              </h1>
              <p className="text-xs text-gray-400">Welcome, {user?.name || user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-hitm-red flex items-center justify-center text-white font-bold text-sm cursor-pointer">
              {user?.email?.[0]?.toUpperCase() || 'A'}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
