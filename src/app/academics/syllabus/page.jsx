'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Download } from 'lucide-react';
import { generatePagePDF } from '@/lib/pdf-service';
import { Button } from '@/components/ui/button';

export default function SyllabusPage() {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');

  const handleDownload = () => {
    if (!selectedCourse || !selectedBranch || !selectedSemester) return;
    
    generatePagePDF(
      `${selectedCourse}_${selectedBranch}_Sem_${selectedSemester}_Syllabus`,
      `Syllabus: ${selectedCourse} - ${selectedBranch} (Semester ${selectedSemester})`,
      {
        sections: [
          { 
            title: "Course Objectives", 
            content: `This syllabus for ${selectedCourse} ${selectedBranch} Semester ${selectedSemester} is designed to provide comprehensive knowledge in the core subjects. The curriculum focuses on both theoretical foundations and practical applications as per JUT and AICTE norms.` 
          },
          {
            title: "Core Subjects",
            content: "1. Advanced Engineering Mathematics\n2. Core Subject I (Department Specific)\n3. Core Subject II (Department Specific)\n4. Professional Elective I\n5. Open Elective / Humanities\n6. Laboratory Sessions"
          },
          {
            title: "Assessment Pattern",
            content: "Internal Assessment: 30% | End Semester Examination: 70%. Minimum 75% attendance is required to appear for the examination."
          }
        ]
      },
      'text'
    );
  };

  const syllabusData = {
    'B.Tech': {
      'Computer Science (CSE)': 8,
      'Data Science': 8,
      'Artificial Intelligence': 8,
      'Mechanical Engineering': 8,
      'Civil Engineering': 8,
      'Electrical & Electronics': 8,
    },
    'Diploma (Polytechnic)': {
      'Computer Science': 6,
      'Mechanical Engineering': 6,
      'Civil Engineering': 6,
      'Electrical Engineering': 6,
    },
    'MBA': {
      'Core & Specialization': 4,
    },
    'MCA': {
      'Core curriculum': 4,
    },
    'BCA': {
      'Core curriculum': 6,
    },
    'BBA': {
      'Core curriculum': 6,
    }
  };

  const syllabusPreview = [
    { title: 'Computer Science', subjects: ['Data Structures', 'Operating Systems', 'Cloud Computing', 'Computer Networks'] },
    { title: 'Management', subjects: ['Marketing Management', 'Digital Marketing', 'HR Analytics', 'Financial Accounting'] },
    { title: 'Mechanical', subjects: ['Thermodynamics', 'Machine Design', 'Automobile Engg', 'Robotics & Automation'] },
    { title: 'Applied Sciences', subjects: ['Engineering Physics', 'Calculus', 'Matrix & Vector Space', 'Discrete Maths'] },
  ];

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 bg-gray-50 pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-black font-serif text-hitm-navy mb-4">Curriculum & Syllabus</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Designed as per AICTE Choice Based Credit System (CBCS) and Jharkhand University of Technology (JUT) norms to ensure global competency.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-black text-hitm-navy mb-6 flex items-center gap-2">
                <Download size={20} className="text-hitm-red" /> Download Syllabus PDF
              </h2>
              <div className="bg-white rounded-[32px] shadow-xl border border-gray-100 p-8 space-y-6">
                 {/* Course Dropdown */}
                 <div className="space-y-2">
                   <label className="text-sm font-bold text-gray-700">Select Course</label>
                   <select 
                     className="w-full h-12 border rounded-xl px-4 bg-gray-50 focus:ring-2 focus:ring-hitm-red focus:outline-none"
                     value={selectedCourse} 
                     onChange={e => {
                       setSelectedCourse(e.target.value);
                       setSelectedBranch('');
                       setSelectedSemester('');
                     }}
                   >
                     <option value="">-- Choose Course --</option>
                     {Object.keys(syllabusData).map(course => (
                       <option key={course} value={course}>{course}</option>
                     ))}
                   </select>
                 </div>

                 {/* Branch Dropdown */}
                 <div className="space-y-2">
                   <label className="text-sm font-bold text-gray-700">Select Branch / Specialization</label>
                   <select 
                     className="w-full h-12 border rounded-xl px-4 bg-gray-50 disabled:opacity-50 focus:ring-2 focus:ring-hitm-red focus:outline-none"
                     disabled={!selectedCourse}
                     value={selectedBranch} 
                     onChange={e => {
                       setSelectedBranch(e.target.value);
                       setSelectedSemester('');
                     }}
                   >
                     <option value="">-- Choose Branch --</option>
                     {selectedCourse && Object.keys(syllabusData[selectedCourse]).map(branch => (
                       <option key={branch} value={branch}>{branch}</option>
                     ))}
                   </select>
                 </div>

                 {/* Semester Dropdown */}
                 <div className="space-y-2">
                   <label className="text-sm font-bold text-gray-700">Select Semester</label>
                   <select 
                     className="w-full h-12 border rounded-xl px-4 bg-gray-50 disabled:opacity-50 focus:ring-2 focus:ring-hitm-red focus:outline-none"
                     disabled={!selectedBranch}
                     value={selectedSemester} 
                     onChange={e => setSelectedSemester(e.target.value)}
                   >
                     <option value="">-- Choose Semester --</option>
                     {selectedBranch && [...Array(syllabusData[selectedCourse][selectedBranch])].map((_, i) => (
                       <option key={i} value={i + 1}>Semester {i + 1}</option>
                     ))}
                   </select>
                 </div>

                 {/* Download Button Rendering */}
                 {selectedSemester && (
                    <div className="pt-6 border-t border-gray-100 mt-6 animate-in slide-in-from-bottom-2 fade-in duration-300">
                      <div className="flex flex-col xl:flex-row items-center justify-between p-4 bg-hitm-navy/5 rounded-2xl border border-hitm-red/10 gap-4">
                        <div className="flex gap-4 items-center">
                          <div className="w-12 h-12 rounded-xl bg-white shadow-sm text-hitm-red flex items-center justify-center shrink-0">
                            <BookOpen size={24} />
                          </div>
                          <div>
                            <h3 className="font-bold text-hitm-navy leading-tight">{selectedCourse} - {selectedBranch}</h3>
                            <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">Semester {selectedSemester} Syllabus</p>
                          </div>
                        </div>
                        <button 
                          onClick={handleDownload}
                          className="shrink-0 px-6 py-3 bg-hitm-red text-white font-bold rounded-xl hover:bg-hitm-navy transition-all shadow-lg flex items-center gap-2 w-full xl:w-auto justify-center"
                        >
                          <Download size={18} /> Download PDF
                        </button>
                      </div>
                    </div>
                 )}
              </div>
            </div>

            <div className="space-y-6">
               <h2 className="text-xl font-black text-hitm-navy mb-6">Course Content Overview</h2>
               {syllabusPreview.map((s, i) => (
                 <div key={i} className="bg-white p-6 rounded-[32px] shadow-lg border-l-4 border-hitm-red">
                   <h3 className="font-bold text-hitm-navy mb-4">{s.title}</h3>
                   <div className="flex flex-wrap gap-2">
                     {s.subjects.map(item => (
                       <span key={item} className="text-[10px] font-bold bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full uppercase tracking-wider">{item}</span>
                     ))}
                   </div>
                 </div>
               ))}
               <div className="bg-hitm-navy rounded-[32px] p-8 text-white">
                 <h4 className="font-bold mb-4">Academic Standards</h4>
                 <p className="text-xs text-white/60 leading-relaxed mb-4">Following the industry 4.0 roadmap, our curriculum is integrated with hands-on projects, industry internships, and professional skill certifications.</p>
                 <Button asChild variant="gold" size="sm" className="w-full">
                   <a href="/hitm.pdf" download>Request Brochure</a>
                 </Button>
               </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
