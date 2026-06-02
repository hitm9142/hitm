'use client';
import { useState, useEffect } from 'react';
import { db, storage } from '@/lib/firebase';
import { doc, collection, onSnapshot, query, orderBy, deleteDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Trash2, FileText, Plus, Loader2, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const syllabusStructure = {
  'B.Tech': {
    branches: [
      'Computer Science (CSE)',
      'Data Science',
      'Artificial Intelligence',
      'Mechanical Engineering',
      'Civil Engineering',
      'Electrical & Electronics',
    ],
    semesters: 8
  },
  'Diploma (Polytechnic)': {
    branches: [
      'Computer Science',
      'Mechanical Engineering',
      'Civil Engineering',
      'Electrical Engineering',
    ],
    semesters: 6
  },
  'MBA': {
    branches: ['Core & Specialization'],
    semesters: 4
  },
  'MCA': {
    branches: ['Core curriculum'],
    semesters: 4
  },
  'BCA': {
    branches: ['Core curriculum'],
    semesters: 6
  },
  'BBA': {
    branches: ['Core curriculum'],
    semesters: 6
  }
};

export default function SyllabusManager() {
  const [syllabuses, setSyllabuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  
  const [form, setForm] = useState({
    course: '',
    branch: '',
    semester: ''
  });
  const [pdfFile, setPdfFile] = useState(null);
  const [customLink, setCustomLink] = useState('');

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, 'syllabuses'), orderBy('updatedAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      setSyllabuses(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setPdfFile(e.target.files[0]);
    }
  };

  const handleUploadSyllabus = async (e) => {
    e.preventDefault();
    if (!form.course || !form.branch || !form.semester) {
      alert('Please select course, branch, and semester.');
      return;
    }

    if (!pdfFile && !customLink) {
      alert('Please upload a PDF file or enter an external document link.');
      return;
    }

    setLoading(true);
    try {
      let finalUrl = customLink;
      let finalName = pdfFile ? pdfFile.name : 'External Document Link';

      // 1. Upload to Firebase Storage if a local file is provided
      if (pdfFile) {
        const storagePath = `syllabuses/${Date.now()}_${form.course.replace(/\s+/g, '_')}_${form.branch.replace(/\s+/g, '_')}_Sem${form.semester}.pdf`;
        const storageRef = ref(storage, storagePath);
        const snapshot = await uploadBytes(storageRef, pdfFile);
        finalUrl = await getDownloadURL(snapshot.ref);
      }

      // 2. Save metadata to Firestore
      const docId = `${form.course}_${form.branch}_Sem_${form.semester}`;
      await setDoc(doc(db, 'syllabuses', docId), {
        course: form.course,
        branch: form.branch,
        semester: Number(form.semester),
        fileUrl: finalUrl,
        fileName: finalName,
        updatedAt: serverTimestamp()
      });

      alert('Syllabus uploaded and linked successfully!');
      setForm({ course: '', branch: '', semester: '' });
      setPdfFile(null);
      setCustomLink('');
      
      // Reset input element
      const fileInput = document.getElementById('syllabus-file-input');
      if (fileInput) fileInput.value = '';
    } catch (err) {
      console.error('Error uploading syllabus:', err);
      alert('Upload failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this syllabus? Users will fall back to dynamic PDF generation.')) {
      try {
        await deleteDoc(doc(db, 'syllabuses', id));
      } catch (err) {
        console.error('Error deleting syllabus:', err);
        alert('Delete failed.');
      }
    }
  };

  const filteredSyllabuses = syllabuses.filter(s => 
    s.course?.toLowerCase().includes(search.toLowerCase()) || 
    s.branch?.toLowerCase().includes(search.toLowerCase()) || 
    `Semester ${s.semester}`.toLowerCase().includes(search.toLowerCase())
  );

  const availableBranches = form.course ? syllabusStructure[form.course].branches : [];
  const maxSemesters = form.course ? syllabusStructure[form.course].semesters : 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h2 className="text-xl font-bold font-serif text-hitm-navy flex items-center gap-2">
          <BookOpen size={20} className="text-hitm-red" /> Dynamic Syllabus Manager
        </h2>
        <Input 
          placeholder="Search syllabuses..." 
          className="w-full md:w-64 bg-white" 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Form Card */}
        <div className="lg:col-span-1">
          <Card className="shadow-md border border-gray-100 rounded-2xl overflow-hidden">
            <CardContent className="p-6">
              <h3 className="font-bold font-serif mb-4 flex items-center gap-2 text-hitm-navy">
                <Plus size={18} className="text-hitm-red"/> Upload Syllabus
              </h3>
              <form onSubmit={handleUploadSyllabus} className="space-y-4">
                {/* Course Selection */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500">Course *</label>
                  <select
                    className="w-full h-10 border rounded-lg px-3 bg-gray-50 text-sm focus:ring-1 focus:ring-hitm-red outline-none"
                    value={form.course}
                    onChange={e => setForm({ course: e.target.value, branch: '', semester: '' })}
                    required
                  >
                    <option value="">-- Select Course --</option>
                    {Object.keys(syllabusStructure).map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Branch Selection */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500">Branch *</label>
                  <select
                    className="w-full h-10 border rounded-lg px-3 bg-gray-50 text-sm disabled:opacity-50 focus:ring-1 focus:ring-hitm-red outline-none"
                    value={form.branch}
                    onChange={e => setForm({ ...form, branch: e.target.value, semester: '' })}
                    disabled={!form.course}
                    required
                  >
                    <option value="">-- Select Branch --</option>
                    {availableBranches.map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                {/* Semester Selection */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500">Semester *</label>
                  <select
                    className="w-full h-10 border rounded-lg px-3 bg-gray-50 text-sm disabled:opacity-50 focus:ring-1 focus:ring-hitm-red outline-none"
                    value={form.semester}
                    onChange={e => setForm({ ...form, semester: e.target.value })}
                    disabled={!form.branch}
                    required
                  >
                    <option value="">-- Select Semester --</option>
                    {maxSemesters > 0 && [...Array(maxSemesters)].map((_, i) => (
                      <option key={i} value={i + 1}>Semester {i + 1}</option>
                    ))}
                  </select>
                </div>

                <div className="h-px bg-gray-100 my-4" />

                {/* File Upload Option */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500">Option A: Upload PDF Syllabus File</label>
                  <Input 
                    id="syllabus-file-input"
                    type="file" 
                    accept=".pdf" 
                    onChange={handleFileChange}
                    className="h-10 text-sm bg-white"
                    disabled={loading}
                  />
                  <p className="text-[10px] text-gray-400">Supported format: PDF only. Stored securely on Firebase Storage.</p>
                </div>

                <div className="text-center text-xs font-bold text-gray-400 my-2 select-none">- OR -</div>

                {/* External Link Option */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500">Option B: External Document Link</label>
                  <Input 
                    placeholder="https://drive.google.com/.../view" 
                    value={customLink} 
                    onChange={e => setCustomLink(e.target.value)}
                    className="h-10 text-sm bg-white"
                    disabled={loading}
                  />
                  <p className="text-[10px] text-gray-400">Use this if you already have the syllabus uploaded elsewhere.</p>
                </div>

                {loading ? (
                  <div className="w-full flex items-center justify-center gap-2 bg-hitm-navy text-white rounded-lg py-3 text-sm font-bold animate-pulse mt-6">
                    <Loader2 className="animate-spin" size={16} /> Uploading & Saving...
                  </div>
                ) : (
                  <Button type="submit" className="w-full mt-6 bg-hitm-navy hover:bg-hitm-red font-bold">
                    Upload & Publish Syllabus
                  </Button>
                )}
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Syllabus Table List */}
        <div className="lg:col-span-2">
          <Card className="shadow-md border border-gray-100 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-xs text-gray-500 uppercase font-semibold">
                  <tr>
                    {['Syllabus Details', 'FileName / Source', 'Modified', 'Actions'].map(h => (
                      <th key={h} className="text-left px-4 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredSyllabuses.length > 0 ? filteredSyllabuses.map(s => (
                    <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-bold text-gray-900">{s.course} - {s.branch}</p>
                        <Badge variant="outline" className="mt-1 bg-hitm-red/5 text-hitm-red border-hitm-red/10 text-[10px] font-bold">
                          Semester {s.semester}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-xs">
                        <a 
                          href={s.fileUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-hitm-navy hover:text-hitm-red font-bold flex items-center gap-1 hover:underline truncate max-w-[200px]"
                        >
                          <FileText size={14} className="shrink-0" /> {s.fileName}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-400">
                        {s.updatedAt ? new Date(s.updatedAt.seconds * 1000).toLocaleDateString('en-IN', {
                          day: '2-digit', month: 'short', year: 'numeric'
                        }) : 'Just now'}
                      </td>
                      <td className="px-4 py-3">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-red-400 hover:text-red-600 hover:bg-red-50" 
                          onClick={() => handleDelete(s.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="4" className="py-20 text-center text-gray-400 font-medium">
                        No dynamic syllabuses uploaded yet. Users will fall back to generated preview PDFs.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
