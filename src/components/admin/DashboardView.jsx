'use client';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { Users, CalendarDays, Bell, TrendingUp, ChevronRight, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const statusColors = {
  New: 'bg-red-100 text-red-700',
  Contacted: 'bg-blue-100 text-blue-700',
  Converted: 'bg-green-100 text-green-700',
};

export default function DashboardView() {
  const [noticesCount, setNoticesCount] = useState(0);
  const [enquiriesCount, setEnquiriesCount] = useState(0);
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [recentNotices, setRecentNotices] = useState([]);
  const [eventsCount, setEventsCount] = useState(0);
  const [recentEvents, setRecentEvents] = useState([]);

  useEffect(() => {
    if (!db) return;
    const qNotices = query(collection(db, 'notices'), orderBy('createdAt', 'desc'));
    const unsubNotices = onSnapshot(qNotices, (snapshot) => {
      setNoticesCount(snapshot.size);
      setRecentNotices(snapshot.docs.slice(0, 4).map(d => ({ id: d.id, ...d.data() })));
    });

    const qEnquiries = query(collection(db, 'enquiries'), orderBy('createdAt', 'desc'));
    const unsubEnquiries = onSnapshot(qEnquiries, (snapshot) => {
      setEnquiriesCount(snapshot.size);
      setRecentEnquiries(snapshot.docs.slice(0, 4).map(d => ({ id: d.id, ...d.data() })));
    });

    const qEvents = query(collection(db, 'events'), orderBy('createdAt', 'desc'));
    const unsubEvents = onSnapshot(qEvents, (snapshot) => {
      setEventsCount(snapshot.size);
      setRecentEvents(snapshot.docs.slice(0, 4).map(d => ({ id: d.id, ...d.data() })));
    });

    return () => { unsubNotices(); unsubEnquiries(); unsubEvents(); };
  }, []);

  const stats = [
    { icon: <Users size={22} />, label: 'Total Enquiries', value: enquiriesCount.toString(), change: 'Real-time', color: 'text-hitm-red bg-hitm-red/10' },
    { icon: <CalendarDays size={22} />, label: 'Active Events', value: eventsCount.toString(), change: 'Live', color: 'text-hitm-navy bg-hitm-navy/10' },
    { icon: <Bell size={22} />, label: 'Active Notices', value: noticesCount.toString(), change: 'Live', color: 'text-amber-600 bg-amber-50' },
    { icon: <TrendingUp size={22} />, label: 'Admissions Status', value: 'Open', change: '2026', color: 'text-emerald-600 bg-emerald-50' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow transition-all duration-300">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${s.color}`}>
                {s.icon}
              </div>
              <div>
                <p className="text-xs text-gray-500">{s.label}</p>
                <p className="text-2xl font-black text-gray-900 leading-tight">{s.value}</p>
                <p className="text-xs text-emerald-600 font-medium">{s.change}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Enquiries */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center justify-between">
              Recent Enquiries
              <Button variant="ghost" size="sm" className="text-xs text-hitm-red">View All <ChevronRight size={12} /></Button>
            </CardTitle>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                <tr>
                  <th className="text-left px-4 py-2.5">Name</th>
                  <th className="text-left px-4 py-2.5">Program</th>
                  <th className="text-left px-4 py-2.5">Status</th>
                  <th className="text-left px-4 py-2.5">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentEnquiries.length > 0 ? recentEnquiries.map((e) => (
                  <tr key={e.id} className="hover:bg-gray-50 transition-colors animate-fade-in">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{e.name}</p>
                      <p className="text-xs text-gray-400">{e.phone}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{e.program}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[e.status] || 'bg-gray-100'}`}>
                        {e.status || 'New'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Button size="sm" variant="ghost" className="h-7 text-xs text-hitm-navy">
                        <Eye size={12} className="mr-1" /> View
                      </Button>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="4" className="text-center py-10 text-gray-400 text-xs">No recent enquiries</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Recent Notices */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center justify-between">
              Active Notices
              <Button variant="ghost" size="sm" className="text-xs text-hitm-red">Manage <ChevronRight size={12} /></Button>
            </CardTitle>
          </CardHeader>
          <div className="divide-y divide-gray-100">
            {recentNotices.length > 0 ? recentNotices.map((n, i) => (
              <div key={n.id || i} className="flex items-start gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors animate-fade-in">
                <Bell size={14} className="text-hitm-red shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-800 truncate">{n.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{n.category} · {n.date}</p>
                </div>
                <Badge variant={n.active ? 'green' : 'default'} className="text-[10px] shrink-0">
                  {n.active ? 'Active' : 'Off'}
                </Badge>
              </div>
            )) : (
              <p className="text-center py-10 text-gray-400 text-xs text-center w-full">No active notices</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
