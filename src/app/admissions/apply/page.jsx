import dynamic from 'next/dynamic';

const AdmissionApplyClient = dynamic(() => import('./AdmissionApplyClient'), {
  ssr: false,
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading...</div>,
});

export default function AdmissionApplyPage() {
  return <AdmissionApplyClient />;
}
