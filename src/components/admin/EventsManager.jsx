'use client';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, collection, onSnapshot, query, orderBy, addDoc, updateDoc, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { Plus, Trash2, Pencil, X, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';

export default function EventsManager() {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: '', date: '', type: 'Academic', description: '', active: true });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, 'events'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setEvents(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await updateDoc(doc(db, 'events', editingId), { ...form, updatedAt: serverTimestamp() });
      } else {
        await addDoc(collection(db, 'events'), { ...form, createdAt: serverTimestamp() });
      }
      setForm({ title: '', date: '', type: 'Academic', description: '', active: true });
      setShowForm(false);
      setEditingId(null);
    } catch (e) { console.error(e); }
    setSaving(false);
  };

  const handleEdit = (event) => {
    setForm({ title: event.title, date: event.date, type: event.type, description: event.description, active: event.active });
    setEditingId(event.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this event?')) {
      await deleteDoc(doc(db, 'events', id));
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold font-serif">College Events</h2>
        <Button variant="default" size="sm" onClick={() => { setShowForm(!showForm); if(showForm) setEditingId(null); }}>
          {showForm ? <><X size={14} /> Cancel</> : <><Plus size={14} /> Add Event</>}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader><CardTitle className="text-base">{editingId ? 'Edit Event' : 'Add New Event'}</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label>Event Title *</Label>
                  <Input required placeholder="Event title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label>Event Type *</Label>
                  <Select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                    {['Academic', 'Technical', 'Sports', 'Cultural', 'Social', 'Placement'].map(t => <option key={t}>{t}</option>)}
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Date *</Label>
                  <Input type="date" required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Description</Label>
                <Textarea placeholder="Short description..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
              </div>
              <Button type="submit" variant="default" disabled={saving}>
                {saving ? 'Saving...' : <><CheckCircle size={14} /> {editingId ? 'Update Event' : 'Save Event'}</>}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
              <tr>
                <th className="text-left px-4 py-3">Event</th>
                <th className="text-left px-4 py-3">Type</th>
                <th className="text-left px-4 py-3">Date</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {events.length > 0 ? events.map((ev) => (
                <tr key={ev.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <p className="font-bold text-gray-900">{ev.title}</p>
                    <p className="text-[10px] text-gray-400 truncate max-w-[200px]">{ev.description}</p>
                  </td>
                  <td className="px-4 py-3"><Badge variant="outline" className="text-[10px] uppercase font-bold">{ev.type}</Badge></td>
                  <td className="px-4 py-3 text-xs text-gray-500">{ev.date}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${ev.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {ev.active ? 'Active' : 'Past'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-hitm-navy" onClick={() => handleEdit(ev)}><Pencil size={12} /></Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-500" onClick={() => handleDelete(ev.id)}><Trash2 size={12} /></Button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="5" className="text-center py-10 text-gray-400">No events found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
