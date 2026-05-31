'use client';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, collection, onSnapshot, query, orderBy, addDoc, updateDoc, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { Bell, Plus, Trash2, Pencil, X, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';

export default function NoticesManager() {
  const [notices, setNotices] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', category: 'Admissions', content: '', date: '', active: true });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, 'notices'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNotices(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await updateDoc(doc(db, 'notices', editingId), { 
          ...form, 
          updatedAt: serverTimestamp() 
        });
      } else {
        await addDoc(collection(db, 'notices'), {
          ...form,
          createdAt: serverTimestamp(),
        });
      }
      setForm({ title: '', category: 'Admissions', content: '', date: '', active: true });
      setShowForm(false);
      setEditingId(null);
    } catch (e) { console.error(e); }
    setSaving(false);
  };

  const handleEdit = (notice) => {
    setForm({ title: notice.title, category: notice.category, content: notice.content, date: notice.date, active: notice.active });
    setEditingId(notice.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this notice?')) {
      await deleteDoc(doc(db, 'notices', id));
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold font-serif">Notice Board</h2>
        <Button variant="default" size="sm" onClick={() => { setShowForm(!showForm); if(showForm) setEditingId(null); }}>
          {showForm ? <><X size={14} /> Cancel</> : <><Plus size={14} /> Add Notice</>}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader><CardTitle className="text-base">{editingId ? 'Edit Notice' : 'Add New Notice'}</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Notice Title *</Label>
                  <Input required placeholder="Notice title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label>Category *</Label>
                  <Select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                    {['Admissions', 'Examination', 'Placement', 'Events', 'Administration', 'Scholarship'].map(c => <option key={c}>{c}</option>)}
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Date</Label>
                  <Input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Content</Label>
                <Textarea placeholder="Notice content..." value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} />
              </div>
              <Button type="submit" variant="default" disabled={saving}>
                {saving ? 'Saving...' : <><CheckCircle size={14} /> {editingId ? 'Update Notice' : 'Save Notice'}</>}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Card className="overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">All Notices ({notices.length})</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
              <tr>
                <th className="text-left px-4 py-2.5">#</th>
                <th className="text-left px-4 py-2.5">Title</th>
                <th className="text-left px-4 py-2.5">Category</th>
                <th className="text-left px-4 py-2.5">Date</th>
                <th className="text-left px-4 py-2.5">Status</th>
                <th className="text-left px-4 py-2.5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {notices.map((n, i) => (
                <tr key={n.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                  <td className="px-4 py-3 font-medium text-gray-800 max-w-[260px] truncate">{n.title}</td>
                  <td className="px-4 py-3"><Badge variant="gold" className="text-xs">{n.category}</Badge></td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{n.date}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${n.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {n.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <Button variant="ghost" size="sm" className="h-7 text-xs text-hitm-navy" onClick={() => handleEdit(n)}>
                        <Pencil size={12} />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 text-xs text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDelete(n.id)}>
                        <Trash2 size={12} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
