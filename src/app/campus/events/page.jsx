'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { Calendar, MapPin, Clock, Star } from 'lucide-react';

export default function CampusEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'events'), orderBy('date', 'asc'));
    const unsub = onSnapshot(q, (snapshot) => {
      setEvents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 bg-white pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="gold" className="mb-4">Campus Life</Badge>
            <h1 className="text-4xl md:text-5xl font-black font-serif text-hitm-navy mb-4 italic uppercase tracking-tighter">Events & Fests</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Explore the vibrant culture and technical brilliance at HITM Ranchi through our year-round events.
            </p>
          </div>

          {loading ? (
             <div className="p-20 text-center text-gray-400">Loading events...</div>
          ) : events.length === 0 ? (
            <div className="p-20 text-center text-gray-400 italic">No upcoming events scheduled. Check back soon!</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((e) => (
                <Card key={e.id} className="border-none shadow-lg hover:shadow-2xl transition-all group overflow-hidden bg-gray-50">
                  <div className="h-48 bg-hitm-navy relative flex items-center justify-center overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-br from-hitm-red/20 to-transparent z-10" />
                     <Star size={80} className="text-white/5 absolute -right-4 -bottom-4 group-hover:scale-110 transition-transform" />
                     <div className="z-20 text-center px-6">
                        <Badge variant="gold" className="mb-3 uppercase tracking-widest text-[10px]">{e.type || 'Workshop'}</Badge>
                        <h3 className="text-white text-xl font-bold font-serif leading-tight">{e.title}</h3>
                     </div>
                  </div>
                  <CardContent className="p-8">
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">{e.description}</p>
                    <div className="space-y-3 pt-4 border-t border-gray-200">
                       <div className="flex items-center gap-3 text-sm font-bold text-hitm-navy">
                          <Calendar size={16} className="text-hitm-red" />
                          {e.date ? new Date(e.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) : 'To be announced'}
                       </div>
                       <div className="flex items-center gap-3 text-xs text-gray-500">
                          <Clock size={16} />
                          09:00 AM - 04:00 PM
                       </div>
                       <div className="flex items-center gap-3 text-xs text-gray-500">
                          <MapPin size={16} />
                          Main Auditorium, HITM Campus
                       </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}

