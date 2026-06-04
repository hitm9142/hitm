'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoginView from '@/components/admissions/LoginView';
import UserPanel from '@/components/admissions/UserPanel';
import ApplicationForm from '@/components/admissions/ApplicationForm';
import PaymentView from '@/components/admissions/PaymentView';
import SubmittedDetailsView from '@/components/admissions/SubmittedDetailsView';
import { db, auth } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function AdmissionApplyClient() {
  const [viewState, setViewState] = useState('LOGIN'); // LOGIN, PANEL, FORM, PAYMENT, DETAILS
  const [paymentType, setPaymentType] = useState('application'); // application, admission
  const [applicationData, setApplicationData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadApplication = async (phoneId) => {
    try {
      const docSnap = await getDoc(doc(db, 'applications', phoneId));
      if (docSnap.exists()) {
         setApplicationData({ phone: phoneId, ...docSnap.data() });
         
         const params = new URLSearchParams(window.location.search);
         if (params.get('form') === '1' && (!docSnap.data().status || docSnap.data().status === 'Draft')) {
            setViewState('FORM');
         } else {
            setViewState('PANEL');
         }
      } else {
         setViewState('LOGIN');
      }
    } catch (error) {
      console.error('Error fetching existing application:', error);
      setViewState('LOGIN');
    }
    setLoading(false);
  };

  useEffect(() => {
    let firebaseUserFound = false;

    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user && user.phoneNumber) {
          firebaseUserFound = true;
          const phoneId = user.phoneNumber.replace('+91', '').slice(-10);
          await loadApplication(phoneId);
        } else {
          // Check local storage fallback if firebase user not found
          const localPhone = localStorage.getItem('admission_session_phone');
          if (localPhone && !firebaseUserFound) {
             await loadApplication(localPhone);
          } else {
             setViewState('LOGIN');
             setLoading(false);
          }
        }
      });
      return () => unsubscribe();
    } else {
       const localPhone = localStorage.getItem('admission_session_phone');
       if (localPhone) {
          loadApplication(localPhone);
       } else {
          setViewState('LOGIN');
          setLoading(false);
       }
    }
  }, []);

  const handleLoginSuccess = (phone, data) => {
    setApplicationData({ phone, ...data });
    
    // If they were passed a form URL parameter, maybe go straight to form
    const params = new URLSearchParams(window.location.search);
    if (params.get('form') === '1' && (!data.status || data.status === 'Draft')) {
       setViewState('FORM');
    } else {
       setViewState('PANEL');
    }
  };

  const handlePanelAction = async (action) => {
    switch (action) {
      case 'CONTINUE_FORM':
        setViewState('FORM');
        break;
      case 'PAY':
        setPaymentType('application');
        setViewState('PAYMENT');
        break;
      case 'PAY_ADMISSION':
        setPaymentType('admission');
        setViewState('PAYMENT');
        break;
      case 'VIEW_APPLICATION':
        setViewState('DETAILS');
        break;
      case 'LOGOUT':
        if (auth && auth.currentUser) {
          await signOut(auth);
        }
        localStorage.removeItem('admission_session_phone');
        setApplicationData(null);
        setViewState('LOGIN');
        break;
      default:
        break;
    }
  };

  const refreshApplicationData = async () => {
    if (!applicationData?.phone) return;
    try {
       const docSnap = await getDoc(doc(db, 'applications', applicationData.phone));
       if (docSnap.exists()) {
          setApplicationData({ phone: applicationData.phone, ...docSnap.data() });
       }
    } catch (err) {
       console.error("Error refreshing data:", err);
    }
  };

  const handleFormComplete = async () => {
    await refreshApplicationData();
    setPaymentType('application');
    setViewState('PAYMENT');
  };

  const handleReturnToPanel = async () => {
    await refreshApplicationData();
    setViewState('PANEL');
  };

  return (
    <main className="flex flex-col min-h-screen">
      <div className="print:hidden"><Navbar /></div>
      <div className="flex-1 bg-gray-50 pt-24 pb-20 relative min-h-[80vh] print:pt-0 print:pb-0 print:bg-white">
        <div className="container mx-auto px-4 print:px-0">
          
          {loading ? (
             <div className="flex justify-center items-center h-64 print:hidden">
                <div className="w-10 h-10 border-4 border-hitm-red/20 border-t-hitm-red rounded-full animate-spin"></div>
             </div>
          ) : (
            <>
              {viewState === 'LOGIN' && (
                <LoginView onLoginSuccess={handleLoginSuccess} />
              )}
              
              {viewState === 'PANEL' && applicationData && (
                <UserPanel 
                  applicationData={applicationData} 
                  onAction={handlePanelAction} 
                />
              )}

              {viewState === 'FORM' && applicationData && (
                <ApplicationForm 
                  applicationData={applicationData}
                  onComplete={handleFormComplete}
                  onCancel={handleReturnToPanel}
                />
              )}

              {viewState === 'PAYMENT' && applicationData && (
                <PaymentView 
                  applicationData={applicationData}
                  feeType={paymentType}
                  onCancel={handleReturnToPanel}
                />
              )}

              {viewState === 'DETAILS' && applicationData && (
                <SubmittedDetailsView 
                  applicationData={applicationData}
                  onCancel={handleReturnToPanel}
                />
              )}
            </>
          )}

        </div>
      </div>
      <div className="print:hidden"><Footer /></div>
    </main>
  );
}

