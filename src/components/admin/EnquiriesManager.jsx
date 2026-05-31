'use client';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, collection, onSnapshot, query, orderBy, updateDoc, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { Trash2, Eye, X, AlertCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export default function EnquiriesManager() {
  const [enquiries, setEnquiries] = useState([]);
  const [search, setSearch] = useState('');
  const [verifyModal, setVerifyModal] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, 'enquiries'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setEnquiries(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsubscribe();
  }, []);

  const filtered = enquiries.filter(e => e.name?.toLowerCase().includes(search.toLowerCase()) || e.program?.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = async (id) => {
    if (confirm('Delete this enquiry?')) {
      await deleteDoc(doc(db, 'enquiries', id));
    }
  };

  const handleVerifyNow = async (id) => {
     setSaving(true);
     try {
        await updateDoc(doc(db, 'enquiries', id), { status: 'Verified', 'payment.status': 'Verified', updatedAt: serverTimestamp() });
        setVerifyModal(null);
     } catch (err) {
        console.error("Error verifying:", err);
     }
     setSaving(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <h2 className="text-xl font-bold font-serif">Student Enquiries</h2>
        <Input placeholder="Search by name or program..." className="w-full md:w-64" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
              <tr>
                {['#', 'Student Details', 'Program', 'Files', 'Payment', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3">{h}</th>

                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length > 0 ? filtered.map((e, i) => (
                <tr key={e.id} className="hover:bg-gray-50 transition-colors animate-fade-in">
                  <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900 leading-tight">{e.name} <span className="text-gray-400 font-normal italic text-xs">({e.fatherName})</span></p>
                    <p className="text-[10px] text-gray-500">{e.email}</p>
                    <p className="text-[10px] text-gray-500 font-medium">{e.phone}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                     <p className="font-medium">{e.program}</p>
                     <p className="text-[10px] text-gray-400">{e.qualification} • {e.percentage}%</p>
                  </td>
                  <td className="px-4 py-3">
                     {e.documentUrl ? (
                         <a href={e.documentUrl} target="_blank" rel="noreferrer" className="text-[10px] font-bold text-hitm-navy hover:text-hitm-red flex items-center gap-1"><Eye size={12} /> Document</a>
                     ) : <span className="text-[10px] text-gray-400">N/A</span>}
                  </td>
                  <td className="px-4 py-3">
                     {e.payment?.receiptUrl ? (
                         <div className="flex flex-col gap-1">
                             <a href={e.payment.receiptUrl} target="_blank" rel="noreferrer" className="text-[10px] font-bold text-hitm-navy hover:text-hitm-red flex items-center gap-1"><Eye size={12} /> Receipt</a>
                             <span className="text-[9px] text-gray-500 bg-gray-100 px-1 py-0.5 rounded truncate max-w-[100px]">{e.payment.transactionId}</span>
                         </div>
                     ) : <span className="text-[10px] text-gray-400">Pending</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter ${e.status === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{e.status || 'New'}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1.5">
                      {e.status !== 'Verified' && (
                         <Button variant="default" size="sm" className="h-7 text-[10px] bg-hitm-navy hover:bg-hitm-red px-2" onClick={() => setVerifyModal(e)}>Verify Now</Button>
                      )}
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors" onClick={() => handleDelete(e.id)}><Trash2 size={14} /></Button>
                    </div>
                  </td>
                </tr>

              )) : (
                <tr><td colSpan="7" className="text-center py-20 text-gray-400 font-serif">Empty Inbox</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {verifyModal && (
         <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden">
               <div className="bg-hitm-navy p-4 text-white flex justify-between items-center">
                  <h3 className="font-bold font-serif flex items-center gap-2"><AlertCircle size={18} className="text-hitm-gold" /> Verify Application</h3>
                  <button onClick={() => setVerifyModal(null)} className="text-white/50 hover:text-white"><X size={18} /></button>
               </div>
               <div className="p-6">
                  <p className="text-gray-700 mb-6 font-medium text-sm leading-relaxed">
                    Please use the student&apos;s mail ID (<span className="text-hitm-red font-bold">{verifyModal.email}</span>) to manually share the confirmation message first, then verify here.
                    If you have already sent the confirmation, you can verify now.
                  </p>
                  
                  <div className="bg-gray-50 p-4 border rounded-xl space-y-2 mb-6">
                     <p className="text-xs text-gray-500 flex justify-between">Student: <span className="font-bold text-gray-900">{verifyModal.name}</span></p>
                     <p className="text-xs text-gray-500 flex justify-between">Phone ID: <span className="font-bold text-gray-900">{verifyModal.phone}</span></p>
                     <p className="text-xs text-gray-500 flex justify-between">Trx ID: <span className="font-bold text-gray-900">{verifyModal.payment?.transactionId || 'N/A'}</span></p>
                  </div>

                  <div className="flex gap-3 justify-end">
                     <Button variant="outline" onClick={() => setVerifyModal(null)}>Cancel</Button>
                     <Button className="bg-green-600 hover:bg-green-700 text-white" disabled={saving} onClick={() => handleVerifyNow(verifyModal.id)}>
                        {saving ? 'Verifying...' : 'Yes, Verify Now'}
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      )}
    </div>
  );
}
