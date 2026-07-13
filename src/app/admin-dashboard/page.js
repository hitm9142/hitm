export const metadata = {
  title: 'Dashboard | HITM Admin',
  robots: { index: false, follow: false },
};

import DashboardHome from '@/components/dashboard/DashboardHome';

export default function DashboardPage() {
  return <DashboardHome />;
}
