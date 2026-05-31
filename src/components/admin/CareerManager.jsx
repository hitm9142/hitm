'use client';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, collection, onSnapshot, query, orderBy, deleteDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { Trash2, FileText, Briefcase, Users, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export default function CareerManager() {
  const [activeTab, setActiveTab] = useState('jobs');
  const [apps, setApps] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  
  const [jobForm, setJobForm] = useState({
    title: '', category: '', type: 'Full Time', location: 'Ranchi Campus', exp: ''
  });

  useEffect(() => {
    if (!db) return;
    const qApps = query(collection(db, 'career_enquiries'), orderBy('createdAt', 'desc'));
    const unsubApps = onSnapshot(qApps, (snapshot) => {
      setApps(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    const qJobs = query(collection(db, 'careers'), orderBy('createdAt', 'desc'));
    const unsubJobs = onSnapshot(qJobs, (snapshot) => {
      setJobs(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => { unsubApps(); unsubJobs(); };
  }, []);

  const filteredApps = apps.filter(a => a.name?.toLowerCase().includes(search.toLowerCase()) || a.jobTitle?.toLowerCase().includes(search.toLowerCase()));
  const filteredJobs = jobs.filter(j => j.title?.toLowerCase().includes(search.toLowerCase()) || j.category?.toLowerCase().includes(search.toLowerCase()));

  const handleAddJob = async (e) => {
    e.preventDefault();
    if (!jobForm.title || !jobForm.category || !jobForm.exp) return;
    await addDoc(collection(db, 'careers'), {
      ...jobForm,
      createdAt: serverTimestamp()
    });
    setJobForm({ title: '', category: '', type: 'Full Time', location: 'Ranchi Campus', exp: '' });
  };

  const handleDelete = async (collectionName, id) => {
    if (confirm('Are you sure you want to delete this?')) {
      await deleteDoc(doc(db, collectionName, id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="flex gap-2 p-1 bg-gray-100 rounded-lg w-fit">
          <Button variant={activeTab === 'jobs' ? 'default' : 'ghost'} size="sm" onClick={() => setActiveTab('jobs')} className={activeTab === 'jobs' ? 'bg-white text-hitm-navy shadow' : 'text-gray-500'}>
            <Briefcase size={14} className="mr-2" /> Manage Jobs
          </Button>
          <Button variant={activeTab === 'apps' ? 'default' : 'ghost'} size="sm" onClick={() => setActiveTab('apps')} className={activeTab === 'apps' ? 'bg-white text-hitm-navy shadow' : 'text-gray-500'}>
            <Users size={14} className="mr-2" /> Applications
          </Button>
        </div>
        <Input placeholder="Search..." className="w-full md:w-64 bg-white" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {activeTab === 'jobs' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold font-serif mb-4 flex items-center gap-2"><Plus size={18} className="text-hitm-red"/> Post New Job</h3>
                <form onSubmit={handleAddJob} className="space-y-3">
                  <Input placeholder="Job Title (e.g. Professor)" value={jobForm.title} onChange={e => setJobForm({...jobForm, title: e.target.value})} required />
                  <Input placeholder="Category (e.g. Engineering)" value={jobForm.category} onChange={e => setJobForm({...jobForm, category: e.target.value})} required />
                  <Input placeholder="Experience (e.g. 5+ Years)" value={jobForm.exp} onChange={e => setJobForm({...jobForm, exp: e.target.value})} required />
                  <div className="grid grid-cols-2 gap-3">
                    <Input placeholder="Type" value={jobForm.type} onChange={e => setJobForm({...jobForm, type: e.target.value})} required />
                    <Input placeholder="Location" value={jobForm.location} onChange={e => setJobForm({...jobForm, location: e.target.value})} required />
                  </div>
                  <Button type="submit" className="w-full bg-hitm-navy hover:bg-hitm-red">Post Job</Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                    <tr>{['Role', 'Category', 'Details', 'Actions'].map(h => <th key={h} className="text-left px-4 py-3">{h}</th>)}</tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredJobs.length > 0 ? filteredJobs.map(j => (
                      <tr key={j.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-bold text-gray-900">{j.title}</td>
                        <td className="px-4 py-3"><Badge variant="outline">{j.category}</Badge></td>
                        <td className="px-4 py-3">
                          <p className="text-xs text-gray-500">{j.exp} • {j.type}</p>
                          <p className="text-[10px] text-gray-400">{j.location}</p>
                        </td>
                        <td className="px-4 py-3">
                          <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete('careers', j.id)}>
                            <Trash2 size={16} />
                          </Button>
                        </td>
                      </tr>
                    )) : <tr><td colSpan="4" className="py-10 text-center text-gray-400">No jobs posted yet.</td></tr>}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                <tr>{['#', 'Applicant', 'Applied For', 'Exp', 'Resume', 'Actions'].map(h => <th key={h} className="text-left px-4 py-3">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredApps.length > 0 ? filteredApps.map((a, i) => (
                  <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                    <td className="px-4 py-3">
                      <p className="font-bold text-gray-900">{a.name}</p>
                      <p className="text-[10px] text-gray-500">{a.email}</p>
                      <p className="text-[10px] text-gray-500">{a.phone}</p>
                    </td>
                    <td className="px-4 py-3"><Badge variant="outline">{a.jobTitle}</Badge></td>
                    <td className="px-4 py-3 text-gray-500">{a.exp}</td>
                    <td className="px-4 py-3">
                      {a.resumeUrl ? (
                        <a href={a.resumeUrl} target="_blank" rel="noreferrer" className="text-hitm-red font-bold flex items-center gap-1 hover:underline">
                          <FileText size={14} /> View CV
                        </a>
                      ) : <span className="text-gray-300">No Resume</span>}
                    </td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete('career_enquiries', a.id)}>
                        <Trash2 size={16} />
                      </Button>
                    </td>
                  </tr>
                )) : <tr><td colSpan="6" className="py-20 text-center text-gray-400">No applications found</td></tr>}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
