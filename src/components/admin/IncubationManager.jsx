'use client';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { Trash2, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function IncubationManager() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, 'incubation_enquiries'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setLeads(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsubscribe();
  }, []);

  const filtered = leads.filter((lead) =>
    lead.name?.toLowerCase().includes(search.toLowerCase()) ||
    lead.email?.toLowerCase().includes(search.toLowerCase()) ||
    lead.interest?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (confirm('Delete this incubation enquiry?')) {
      await deleteDoc(doc(db, 'incubation_enquiries', id));
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold font-serif">Incubation Enquiries</h2>
          <p className="text-sm text-gray-500">Review new startup leads submitted from the incubation page.</p>
        </div>
        <Input
          placeholder="Search by name, email, or interest..."
          className="w-full md:w-72"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
              <tr>
                {['#', 'Founder', 'Contact', 'Interest', 'Created', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length > 0 ? (
                filtered.map((lead, index) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-400">{index + 1}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{lead.name}</p>
                      <p className="text-[11px] text-gray-500 uppercase tracking-[0.18em]">{lead.status || 'New'}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-700">{lead.email}</p>
                      <p className="text-sm text-gray-500">{lead.phone}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{lead.interest}</td>
                    <td className="px-4 py-3 text-gray-500 text-[11px] uppercase">{lead.createdAt?.toDate ? lead.createdAt.toDate().toLocaleString() : lead.createdAt || 'N/A'}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50 hover:text-red-700" onClick={() => handleDelete(lead.id)}>
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-20 text-gray-400 font-serif">
                    No incubation enquiries yet.
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
