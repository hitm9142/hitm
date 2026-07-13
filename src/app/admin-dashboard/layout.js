export const metadata = {
  title: 'Dashboard | HITM Admin',
  description: 'HITM content management dashboard',
  robots: { index: false, follow: false },
};

import DashboardShell from '@/components/dashboard/DashboardShell';

export default function DashboardLayout({ children }) {
  return <DashboardShell>{children}</DashboardShell>;
}
