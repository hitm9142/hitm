'use client';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { Trash2, Search, Filter, RefreshCw, Eye, CheckCircle, XCircle, AlertCircle, TrendingUp, CreditCard, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export default function PaymentsManager() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedTxn, setSelectedTxn] = useState(null);
  const [syncingId, setSyncingId] = useState(null);

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, 'transactions'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTransactions(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    }, (error) => {
      console.error("Error listening to transactions:", error);
    });
    return () => unsubscribe();
  }, []);

  const handleSyncStatus = async (orderId) => {
    setSyncingId(orderId);
    try {
      const res = await fetch(`/api/ccavenue/status?orderId=${orderId}`);
      const data = await res.json();
      if (data.success) {
        alert(`Status updated successfully: ${data.status}`);
      } else {
        alert(`Failed to query status: ${data.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error(err);
      alert('Error fetching transaction status from server.');
    } finally {
      setSyncingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this transaction record? This will not affect the actual payment at CCAvenue.')) {
      try {
        await deleteDoc(doc(db, 'transactions', id));
      } catch (err) {
        console.error("Error deleting transaction doc:", err);
      }
    }
  };

  // Filter calculations
  const filtered = transactions.filter(t => {
    const matchesSearch = 
      t.orderId?.toLowerCase().includes(search.toLowerCase()) ||
      t.trackingId?.toLowerCase().includes(search.toLowerCase()) ||
      t.billing_name?.toLowerCase().includes(search.toLowerCase()) ||
      t.billing_tel?.toLowerCase().includes(search.toLowerCase()) ||
      t.billing_email?.toLowerCase().includes(search.toLowerCase());
    
    if (statusFilter === 'All') return matchesSearch;
    if (statusFilter === 'Success') return matchesSearch && t.status === 'Success';
    if (statusFilter === 'Pending') return matchesSearch && t.status === 'Pending';
    if (statusFilter === 'Failed') return matchesSearch && t.status !== 'Success' && t.status !== 'Pending';
    return matchesSearch;
  });

  // Calculate statistics
  const totalSuccessAmount = transactions
    .filter(t => t.status === 'Success')
    .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);

  const admissionSuccessAmount = transactions
    .filter(t => t.status === 'Success' && t.type === 'admission')
    .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);

  const generalSuccessAmount = transactions
    .filter(t => t.status === 'Success' && t.type === 'general')
    .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);

  const pendingCount = transactions.filter(t => t.status === 'Pending').length;
  const failedCount = transactions.filter(t => t.status !== 'Success' && t.status !== 'Pending').length;

  const stats = [
    { label: 'Total Revenue', value: `₹${totalSuccessAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, icon: <DollarSign size={20} />, color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    { label: 'Admission Fees', value: `₹${admissionSuccessAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, icon: <TrendingUp size={20} />, color: 'bg-hitm-navy/5 text-hitm-navy border-hitm-navy/10' },
    { label: 'College Fees', value: `₹${generalSuccessAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, icon: <CreditCard size={20} />, color: 'bg-hitm-red/5 text-hitm-red border-hitm-red/10' },
    { label: 'Pending / Failed', value: `${pendingCount} / ${failedCount}`, icon: <AlertCircle size={20} />, color: 'bg-amber-50 text-amber-600 border-amber-100' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => (
          <Card key={idx} className={`border border-solid shadow-sm hover:shadow-md transition-all`}>
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">{s.label}</p>
                <p className="text-xl font-black text-gray-900 mt-1">{s.value}</p>
              </div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                {s.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters & Actions */}
      <div className="bg-white rounded-3xl p-5 border shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input 
            placeholder="Search by student, ID, phone..." 
            className="pl-10" 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto items-center justify-end">
          <Filter size={16} className="text-gray-400 shrink-0" />
          <select
            className="border rounded-md px-3 py-1.5 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-hitm-navy"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="All">All Transactions</option>
            <option value="Success">Successful Payments</option>
            <option value="Pending">Pending Verification</option>
            <option value="Failed">Failed / Aborted</option>
          </select>
        </div>
      </div>

      {/* Transaction Records Table */}
      <Card className="overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase font-semibold">
              <tr>
                {['#', 'Date & Time', 'Transaction IDs', 'Student Details', 'Type', 'Amount', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length > 0 ? filtered.map((t, i) => {
                const date = t.createdAt ? (t.createdAt.toDate ? t.createdAt.toDate().toLocaleString() : new Date(t.createdAt).toLocaleString()) : 'N/A';
                
                let statusColor = 'bg-gray-100 text-gray-700';
                if (t.status === 'Success') statusColor = 'bg-green-100 text-green-700';
                else if (t.status === 'Pending') statusColor = 'bg-amber-100 text-amber-700';
                else if (t.status === 'Failure' || t.status === 'Aborted') statusColor = 'bg-red-100 text-red-700';

                return (
                  <tr key={t.id} className="hover:bg-gray-50 transition-colors animate-fade-in">
                    <td className="px-4 py-3 text-gray-400 font-medium">{i + 1}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs font-medium">{date}</td>
                    <td className="px-4 py-3">
                      <p className="font-bold text-gray-900 leading-tight">Order: {t.orderId}</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">Track: {t.trackingId || 'N/A'}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-gray-900 leading-none">{t.billing_name || 'N/A'}</p>
                      <p className="text-[10px] text-gray-500 mt-1">{t.billing_tel || 'N/A'} · {t.billing_email || 'N/A'}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${t.type === 'admission' ? 'bg-indigo-50 text-indigo-700' : 'bg-rose-50 text-rose-700'}`}>
                        {t.type === 'admission' ? 'Admission Form' : 'College Fee'}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-bold text-gray-900">
                      ₹{parseFloat(t.amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-tighter ${statusColor}`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 w-7 p-0 text-hitm-navy hover:bg-gray-100" 
                          onClick={() => setSelectedTxn(t)}
                          title="View Payload details"
                        >
                          <Eye size={14} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className={`h-7 w-7 p-0 text-amber-600 hover:bg-amber-50 ${syncingId === t.orderId ? 'animate-spin' : ''}`}
                          onClick={() => handleSyncStatus(t.orderId)}
                          disabled={syncingId !== null}
                          title="Query CCAvenue status"
                        >
                          <RefreshCw size={14} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 w-7 p-0 text-red-500 hover:bg-red-50 hover:text-red-700" 
                          onClick={() => handleDelete(t.id)}
                          title="Delete Record"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan="8" className="text-center py-20 text-gray-400 font-serif">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Transaction Details Modal */}
      {selectedTxn && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-hitm-navy p-5 text-white flex justify-between items-center">
              <h3 className="font-bold font-serif flex items-center gap-2">
                <CreditCard size={18} /> Transaction details
              </h3>
              <button onClick={() => setSelectedTxn(null)} className="text-white/60 hover:text-white text-xl">&times;</button>
            </div>
            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500 text-xs font-semibold">Order ID</span>
                <span className="font-bold text-sm text-gray-900">{selectedTxn.orderId}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500 text-xs font-semibold">Tracking ID</span>
                <span className="font-bold text-sm text-gray-900">{selectedTxn.trackingId || 'N/A'}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500 text-xs font-semibold">Transaction Status</span>
                <Badge variant={selectedTxn.status === 'Success' ? 'green' : selectedTxn.status === 'Pending' ? 'amber' : 'destructive'}>
                  {selectedTxn.status}
                </Badge>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500 text-xs font-semibold">Amount</span>
                <span className="font-bold text-sm text-emerald-600">₹{parseFloat(selectedTxn.amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500 text-xs font-semibold">Student Name</span>
                <span className="font-bold text-sm text-gray-900">{selectedTxn.billing_name}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500 text-xs font-semibold">Mobile</span>
                <span className="font-bold text-sm text-gray-900">{selectedTxn.billing_tel}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500 text-xs font-semibold">Email</span>
                <span className="font-bold text-sm text-gray-900">{selectedTxn.billing_email}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500 text-xs font-semibold">Payment Mode</span>
                <span className="font-bold text-sm text-gray-900">{selectedTxn.paymentMode || 'N/A'}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500 text-xs font-semibold">Card/Bank Name</span>
                <span className="font-bold text-sm text-gray-900">{selectedTxn.cardName || 'N/A'}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500 text-xs font-semibold">Status Message</span>
                <span className="font-bold text-sm text-gray-600 text-right max-w-[60%] truncate">{selectedTxn.statusMessage || 'N/A'}</span>
              </div>
              
              <div className="pt-2 flex justify-end">
                <Button onClick={() => setSelectedTxn(null)} className="bg-hitm-navy text-white">
                  Close details
                </Button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
