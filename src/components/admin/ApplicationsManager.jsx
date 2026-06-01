'use client';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, collection, onSnapshot, query, orderBy, updateDoc, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { Trash2, Eye, X, AlertCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import SubmittedDetailsView from '@/components/admissions/SubmittedDetailsView';

export default function ApplicationsManager() {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState('');
  const [verifyModal, setVerifyModal] = useState(null);
  const [viewDetails, setViewDetails] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, 'applications'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setApplications(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsubscribe();
  }, []);

  const filtered = applications.filter(e => {
    const name = e.personalDetails?.name || e.name || '';
    const program = e.programSelection?.program || e.program || '';
    return name.toLowerCase().includes(search.toLowerCase()) || 
           program.toLowerCase().includes(search.toLowerCase()) || 
           e.phone?.includes(search);
  });

  const handleDelete = async (id) => {
    if (confirm('Delete this application?')) {
      await deleteDoc(doc(db, 'applications', id));
    }
  };

  const handleVerifyNow = async (id) => {
     setSaving(true);
     try {
        await updateDoc(doc(db, 'applications', id), { status: 'Verified', 'payment.status': 'Verified', updatedAt: serverTimestamp() });
        setVerifyModal(null);
     } catch (err) {
        console.error("Error verifying:", err);
     }
     setSaving(false);
  };

  if (viewDetails) {
    return (
      <div className="bg-gray-50 -m-4 p-4 min-h-screen print:bg-white print:m-0 print:p-0">
        <SubmittedDetailsView 
          applicationData={viewDetails} 
          onCancel={() => setViewDetails(null)} 
        />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <h2 className="text-xl font-bold font-serif">Admission Applications</h2>
        <Input placeholder="Search by name, program or phone..." className="w-full md:w-64" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
              <tr>
                {['#', 'Student Details', 'Program & Academic', 'Files', 'Payment', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length > 0 ? filtered.map((e, i) => {
                const name = e.personalDetails?.name || e.name;
                const fatherName = e.personalDetails?.fatherName || e.fatherName;
                const email = e.personalDetails?.email || e.email;
                const program = e.programSelection?.program || e.program;
                const branch = e.programSelection?.branch || e.branch;
                const qual = e.academicDetails?.qualification || e.qualification;
                const board = e.academicDetails?.board || e.board;
                const perc = e.academicDetails?.percentage || e.percentage;

                return (
                  <tr key={e.id} className="hover:bg-gray-50 transition-colors animate-fade-in">
                    <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900 leading-tight">{name || 'Draft Application'} <span className="text-gray-400 font-normal italic text-xs">{fatherName ? `(${fatherName})` : ''}</span></p>
                      <p className="text-[10px] text-gray-500">{email}</p>
                      <p className="text-[10px] text-gray-500 font-medium">{e.phone}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                       <p className="font-medium">{program || 'N/A'} {branch ? `- ${branch}` : ''}</p>
                       {qual && (
                          <p className="text-[10px] text-gray-400">{qual} from {board} • {perc}%</p>
                       )}
                    </td>
                    <td className="px-4 py-3">
                       {e.documentUrl && e.documentUrl !== 'N/A' ? (
                           <a href={e.documentUrl} target="_blank" rel="noreferrer" className="text-[10px] font-bold text-hitm-navy hover:text-hitm-red flex items-center gap-1"><Eye size={12} /> View Doc</a>
                       ) : <span className="text-[10px] text-gray-400">N/A</span>}
                    </td>
                    <td className="px-4 py-3">
                       {e.payment?.receiptUrl && e.payment.receiptUrl !== 'N/A' ? (
                           <div className="flex flex-col gap-1">
                               <a href={e.payment.receiptUrl} target="_blank" rel="noreferrer" className="text-[10px] font-bold text-hitm-navy hover:text-hitm-red flex items-center gap-1"><Eye size={12} /> Receipt</a>
                               <span className="text-[9px] text-gray-500 bg-gray-100 px-1 py-0.5 rounded truncate max-w-[100px]">{e.payment.transactionId}</span>
                           </div>
                       ) : <span className="text-[10px] text-gray-400">{e.payment?.status || 'Not Initiated'}</span>}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter ${
                        e.status === 'Verified' ? 'bg-green-100 text-green-700' : 
                        e.status === 'Draft' ? 'bg-gray-100 text-gray-700' :
                        e.status === 'Payment Pending' ? 'bg-amber-100 text-amber-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {e.status || 'Draft'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1.5">
                        <Button variant="outline" size="sm" className="h-7 text-[10px] px-2 text-hitm-navy" onClick={() => setViewDetails(e)}>
                          <Eye size={12} className="mr-1" /> View
                        </Button>
                        {e.status === 'Payment Pending' && (
                           <Button variant="default" size="sm" className="h-7 text-[10px] bg-hitm-navy hover:bg-hitm-red px-2" onClick={() => setVerifyModal(e)}>Verify</Button>
                        )}
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors" onClick={() => handleDelete(e.id)}><Trash2 size={14} /></Button>
                      </div>
                    </td>
                  </tr>
                );
              }) : (
                <tr><td colSpan="7" className="text-center py-20 text-gray-400 font-serif">No Applications Found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {verifyModal && (
         <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden">
               <div className="bg-hitm-navy p-4 text-white flex justify-between items-center">
                  <h3 className="font-bold font-serif flex items-center gap-2"><AlertCircle size={18} className="text-hitm-gold" /> Verify Payment</h3>
                  <button onClick={() => setVerifyModal(null)} className="text-white/50 hover:text-white"><X size={18} /></button>
               </div>
               <div className="p-6">
                  <p className="text-gray-700 mb-6 font-medium text-sm leading-relaxed">
                    Verify the application manually. This will mark the payment and application status as "Verified".
                  </p>
                  
                  <div className="bg-gray-50 p-4 border rounded-xl space-y-2 mb-6">
                     <p className="text-xs text-gray-500 flex justify-between">Student: <span className="font-bold text-gray-900">{verifyModal.personalDetails?.name || verifyModal.name}</span></p>
                     <p className="text-xs text-gray-500 flex justify-between">Phone ID: <span className="font-bold text-gray-900">{verifyModal.phone}</span></p>
                     <p className="text-xs text-gray-500 flex justify-between">Program: <span className="font-bold text-gray-900">{verifyModal.programSelection?.program || verifyModal.program}</span></p>
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
