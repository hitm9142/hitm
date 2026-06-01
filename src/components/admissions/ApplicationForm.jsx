'use client';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2, ArrowRight, ArrowLeft, Loader2, UploadCloud } from 'lucide-react';
import { db } from '@/lib/firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';

const branchOptions = {
  'B.Tech': ['Computer Science & Engineering (CSE)', 'Data Sciences', 'Artificial Intelligence (AI)', 'Electrical & Electronics Engineering', 'Mechanical Engineering', 'Civil Engineering'],
  Diploma: ['Computer Science & Engineering', 'Data Sciences', 'Artificial Intelligence', 'Mechanical Engineering', 'Electrical & Electronics Engineering', 'Civil Engineering'],
  MBA: ['Finance Management', 'Marketing Management', 'Human Resource Management', 'Information Technology'],
};

export default function ApplicationForm({ applicationData, onComplete, onCancel }) {
  const [step, setStep] = useState(applicationData.step || 1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Initial Form State
  const [formData, setFormData] = useState({
    personalDetails: {
      name: applicationData.personalDetails?.name || '',
      fatherName: applicationData.personalDetails?.fatherName || '',
      email: applicationData.personalDetails?.email || '',
      dob: applicationData.personalDetails?.dob || '',
      gender: applicationData.personalDetails?.gender || '',
    },
    programSelection: {
      program: applicationData.programSelection?.program || '',
      branch: applicationData.programSelection?.branch || '',
    },
    academicDetails: {
      qualification: applicationData.academicDetails?.qualification || '',
      percentage: applicationData.academicDetails?.percentage || '',
      passingYear: applicationData.academicDetails?.passingYear || '',
      board: applicationData.academicDetails?.board || '',
    },
    documentUrl: applicationData.documentUrl || 'N/A'
  });

  const updateNestedField = (category, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const handleNextStep = async (e) => {
    e.preventDefault();
    setError('');
    
    // Custom validation for step 2
    if (step === 2) {
       const { qualification, percentage, passingYear, board } = formData.academicDetails;
       if (!qualification || !percentage || !passingYear || !board) {
          setError('Please fill all mandatory academic details.');
          return;
       }
    }

    setLoading(true);
    try {
      // Save progress to DB
      await updateDoc(doc(db, 'applications', applicationData.phone), {
        ...formData,
        step: step + 1,
        updatedAt: serverTimestamp()
      });
      setStep(prev => prev + 1);
    } catch (err) {
      console.error(err);
      setError('Failed to save progress. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await updateDoc(doc(db, 'applications', applicationData.phone), {
        ...formData,
        status: 'Payment Pending',
        step: 4,
        updatedAt: serverTimestamp()
      });
      onComplete(); // Move to payment screen
    } catch (err) {
      console.error(err);
      setError('Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <button onClick={onCancel} className="text-gray-500 hover:text-hitm-navy flex items-center text-sm font-bold mb-4">
          <ArrowLeft size={16} className="mr-1" /> Back to Dashboard
        </button>
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-black font-serif text-hitm-navy">Application Form</h2>
          <div className="text-sm font-bold text-gray-500">Step {step} of 3</div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2 rounded-full mt-4 overflow-hidden">
          <div 
            className="bg-hitm-red h-full transition-all duration-500" 
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      <Card className="border border-gray-200 shadow-xl rounded-3xl overflow-hidden bg-white">
        <CardContent className="p-8 md:p-10">
          {error && <p className="mb-6 text-red-500 text-sm font-bold bg-red-50 p-4 rounded-xl border border-red-100">{error}</p>}
          
          <form onSubmit={step === 3 ? handleFinalSubmit : handleNextStep} className="space-y-6">
            
            {/* STEP 1: Personal Details */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h3 className="text-xl font-bold text-hitm-navy mb-4 border-b pb-2">Personal Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2"><Label>Student Name *</Label><Input required value={formData.personalDetails.name} onChange={e => updateNestedField('personalDetails', 'name', e.target.value)} /></div>
                  <div className="space-y-2"><Label>Father's Name *</Label><Input required value={formData.personalDetails.fatherName} onChange={e => updateNestedField('personalDetails', 'fatherName', e.target.value)} /></div>
                  <div className="space-y-2"><Label>Email Address *</Label><Input type="email" required value={formData.personalDetails.email} onChange={e => updateNestedField('personalDetails', 'email', e.target.value)} /></div>
                  <div className="space-y-2"><Label>Date of Birth *</Label><Input type="date" required value={formData.personalDetails.dob} onChange={e => updateNestedField('personalDetails', 'dob', e.target.value)} /></div>
                  
                  <div className="space-y-2">
                    <Label>Gender *</Label>
                    <select className="w-full h-10 border rounded-md px-3 bg-white" required value={formData.personalDetails.gender} onChange={e => updateNestedField('personalDetails', 'gender', e.target.value)}>
                      <option value="">Select Gender...</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-hitm-navy mb-4 border-b pb-2 pt-6">Program Selection</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Preferred Programme *</Label>
                    <select className="w-full h-10 border rounded-md px-3 bg-white" required value={formData.programSelection.program} onChange={e => { updateNestedField('programSelection', 'program', e.target.value); updateNestedField('programSelection', 'branch', ''); }}>
                      <option value="">Choose Programme...</option>
                      <option value="B.Tech">B.Tech (Bachelor of Technology)</option>
                      <option value="Diploma">Diploma in Polytechnic</option>
                      <option value="MBA">MBA</option>
                      <option value="BBA">BBA</option>
                      <option value="MCA">MCA</option>
                      <option value="BCA">BCA</option>
                    </select>
                  </div>

                  {branchOptions[formData.programSelection.program] ? (
                    <div className="space-y-2 animate-in fade-in duration-200">
                      <Label>Specialization / Branch *</Label>
                      <select className="w-full h-10 border rounded-md px-3 bg-white" required value={formData.programSelection.branch} onChange={e => updateNestedField('programSelection', 'branch', e.target.value)}>
                        <option value="">Choose Branch...</option>
                        {branchOptions[formData.programSelection.program].map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>
                  ) : <div className="hidden md:block" />}
                </div>
              </div>
            )}

            {/* STEP 2: Academic Details */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h3 className="text-xl font-bold text-hitm-navy mb-4 border-b pb-2">Academic Details</h3>
                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 mb-6">
                   <p className="text-sm text-blue-800">Please provide the details of your latest/highest qualification.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Qualification Level *</Label>
                    <select className="w-full h-10 border rounded-md px-3 bg-white" required value={formData.academicDetails.qualification} onChange={e => updateNestedField('academicDetails', 'qualification', e.target.value)}>
                      <option value="">Select Qualification...</option>
                      <option value="10th">10th Standard</option>
                      <option value="12th">12th Standard</option>
                      <option value="Diploma">Diploma</option>
                      <option value="UG Degree">Undergraduate Degree</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                     <Label>Board / University *</Label>
                     <Input required placeholder="e.g. CBSE, State Board" value={formData.academicDetails.board} onChange={e => updateNestedField('academicDetails', 'board', e.target.value)} />
                  </div>

                  <div className="space-y-2">
                     <Label>Year of Passing *</Label>
                     <Input type="number" required placeholder="YYYY" min="2000" max="2026" value={formData.academicDetails.passingYear} onChange={e => updateNestedField('academicDetails', 'passingYear', e.target.value)} />
                  </div>

                  <div className="space-y-2">
                     <Label>Percentage / CGPA *</Label>
                     <Input required placeholder="e.g. 85%" value={formData.academicDetails.percentage} onChange={e => updateNestedField('academicDetails', 'percentage', e.target.value)} />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Document Upload */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex justify-between items-end border-b pb-2 mb-4">
                  <h3 className="text-xl font-bold text-hitm-navy">Document Upload</h3>
                  <span className="text-xs font-bold text-gray-400 uppercase">Optional</span>
                </div>
                
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center hover:bg-gray-50 transition-colors">
                  <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                     <UploadCloud size={32} />
                  </div>
                  <h4 className="text-lg font-bold text-gray-700 mb-2">Upload Marksheets / ID Proof</h4>
                  <p className="text-sm text-gray-500 mb-6">Drag and drop your files here, or click to browse. You can skip this step and provide documents later during admission.</p>
                  
                  <Button type="button" variant="outline" className="border-gray-300 text-gray-600 bg-white" onClick={() => alert('Document upload UI is ready. Firebase Storage integration pending.')}>
                     Browse Files
                  </Button>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t mt-8">
              {step > 1 ? (
                <Button type="button" variant="outline" onClick={() => setStep(prev => prev - 1)} disabled={loading}>
                  <ArrowLeft size={16} className="mr-2" /> Back
                </Button>
              ) : <div></div>}
              
              <Button type="submit" disabled={loading} className="bg-hitm-navy hover:bg-hitm-red text-white uppercase font-bold tracking-widest px-8">
                {loading ? (
                  <span className="flex items-center gap-2"><Loader2 className="animate-spin" size={16} /> Saving...</span>
                ) : step === 3 ? (
                  <span className="flex items-center gap-2">Submit & Proceed to Pay <CheckCircle2 size={16} /></span>
                ) : (
                  <span className="flex items-center gap-2">Save & Continue <ArrowRight size={16} /></span>
                )}
              </Button>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}
