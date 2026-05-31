'use client';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, collection, onSnapshot, query, orderBy, deleteDoc } from 'firebase/firestore';
import { Trash2, Calendar, User, Phone, Mail, Box } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function PopupManager() {
  const [submissions, setSubmissions] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, 'modelPopup'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setSubmissions(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsubscribe();
  }, []);

  const filtered = submissions.filter(s => 
    s.name?.toLowerCase().includes(search.toLowerCase()) || 
    s.phone?.includes(search)
  );

  const handleDelete = async (id) => {
    if (confirm('Delete this submission?')) {
      await deleteDoc(doc(db, 'modelPopup', id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div>
           <h2 className="text-xl font-bold font-serif">Popup Leads</h2>
           <p className="text-xs text-gray-400">Student requests from the landing page popup.</p>
        </div>
        <Input 
          placeholder="Search by name or phone..." 
          className="w-full md:w-64" 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
        />
      </div>

      <Card className="overflow-hidden border-none shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
              <tr>
                <th className="text-left px-6 py-4">#</th>
                <th className="text-left px-6 py-4">Student Info</th>
                <th className="text-left px-6 py-4">Date</th>
                <th className="text-left px-6 py-4">Status</th>
                <th className="text-left px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {filtered.length > 0 ? filtered.map((s, i) => (
                <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-400 font-mono text-[10px]">{i + 1}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                       <span className="font-bold text-gray-900 flex items-center gap-2">
                          <User size={12} className="text-hitm-red" /> {s.name}
                       </span>
                       <span className="text-[11px] text-gray-500 flex items-center gap-2 mt-1">
                          <Phone size={10} /> {s.phone}
                       </span>
                       {s.email && (
                          <span className="text-[11px] text-gray-500 flex items-center gap-2">
                             <Mail size={10} /> {s.email}
                          </span>
                       )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                     <span className="text-[11px] text-gray-500 flex items-center gap-1">
                        <Calendar size={12} /> {s.createdAt?.toDate ? s.createdAt.toDate().toLocaleDateString() : 'Recent'}
                     </span>
                  </td>
                  <td className="px-6 py-4">
                     <span className="text-[10px] bg-amber-50 text-amber-600 px-2 py-1 rounded-full font-bold uppercase tracking-tight">Pending Contact</span>
                  </td>
                  <td className="px-6 py-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-red-500 hover:bg-red-50"
                      onClick={() => handleDelete(s.id)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="text-center py-24 text-gray-300">
                    <Box size={40} className="mx-auto mb-4 opacity-20" />
                    <p className="font-serif italic italic text-sm">No popup submissions yet</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
