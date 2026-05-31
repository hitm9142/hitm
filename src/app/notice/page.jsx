'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, Calendar, ChevronRight, Search, Filter } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import Link from 'next/link';

const isOpeningRelated = (n) => {
  const keywords = ['opening', 'career', 'job', 'vacancy', 'hiring', 'recruitment', 'join us', 'walk-in', 'walkin', 'interview'];
  const text = `${n.title || ''} ${n.content || ''} ${n.tag || ''} ${n.category || ''}`.toLowerCase();
  return keywords.some(k => text.includes(k));
};

export default function NoticePage() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'notices'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNotices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredNotices = notices.filter(n => 
    n.title?.toLowerCase().includes(search.toLowerCase()) || 
    n.dept?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      {/* Banner */}
      <div className="bg-hitm-navy pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-hitm-red/10 skew-x-12 transform translate-x-1/2" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge variant="gold" className="mb-4">Information Center</Badge>
          <h1 className="text-4xl md:text-5xl font-black font-serif text-white mb-6">Notice Board</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Stay updated with the latest announcements, examination schedules, and campus news from HITM Ranchi.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-4xl mx-auto">
          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search notices..." 
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-hitm-red outline-none shadow-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Notices List */}
          <div className="space-y-4">
            {loading ? (
              <div className="py-20 text-center">
                <div className="w-12 h-12 border-4 border-hitm-red/20 border-t-hitm-red rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-500">Loading announcements...</p>
              </div>
            ) : filteredNotices.length > 0 ? (
              filteredNotices.map((n) => {
                const openingRelated = isOpeningRelated(n);
                const CardInner = (
                  <CardContent className="p-0 flex flex-col md:flex-row cursor-pointer">
                    <div className="bg-hitm-red md:w-24 p-6 flex items-center justify-center text-center text-white shrink-0">
                      <div>
                        <div className="text-3xl font-black">{new Date(n.date || n.createdAt?.toDate()).getDate()}</div>
                        <div className="text-xs uppercase font-bold opacity-80">
                          {new Date(n.date || n.createdAt?.toDate()).toLocaleString('default', { month: 'short' })}
                        </div>
                      </div>
                    </div>
                    <div className="p-6 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-[10px] text-hitm-red border-hitm-red/20">{n.tag || 'General'}</Badge>
                        <span className="text-[10px] text-gray-400 flex items-center gap-1">
                          <Filter size={10} /> {n.dept || 'All Departments'}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{n.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">{n.content}</p>
                      {n.link && (
                        <span className="inline-flex items-center gap-1.5 text-hitm-red font-bold text-xs hover:gap-3 transition-all">
                          Download Document <ChevronRight size={14} />
                        </span>
                      )}
                    </div>
                  </CardContent>
                );

                if (openingRelated) {
                  return (
                    <Link key={n.id} href="/career" className="block">
                      <Card className="hover:shadow-lg transition-all border-none shadow-sm overflow-hidden">
                        {CardInner}
                      </Card>
                    </Link>
                  );
                }

                return (
                  <Card key={n.id} className="hover:shadow-lg transition-all border-none shadow-sm overflow-hidden">
                    {n.link ? (
                      <a href={n.link} target="_blank" rel="noreferrer" className="block">
                        {CardInner}
                      </a>
                    ) : CardInner}
                  </Card>
                );
              })
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-gray-100">
                <Bell className="mx-auto text-gray-300 mb-4" size={48} />
                <h3 className="text-xl font-bold text-gray-400">No notices found</h3>
                <p className="text-gray-500 text-sm">Try searching with a different keyword.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
