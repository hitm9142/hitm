import './globals.css';
import 'leaflet/dist/leaflet.css';
import FloatingApply from '@/components/FloatingApply';

export const metadata = {
  title: 'Haider Institute of Technology and Management | Admissions Open 2026 - HITM',
  description: 'Haider Institute of Technology and Management (HITM) — Premier institution in Jharkhand for Engineering, Management & Technology. Apply for 2026 admissions.',
  keywords: 'HITM Ranchi, Haider Institute of Technology and Management, engineering college Jharkhand, management institute Ranchi, BCA BTech MBA admissions 2026',
  icons: {
    icon: [
      { url: '/images/logo/ahct-logo.png', type: 'image/jpeg' },
    ],
    shortcut: [
      { url: '/images/logo/ahct-logo.png', type: 'image/jpeg' },
    ],
    apple: [
      { url: '/images/logo/ahct-logo.png', type: 'image/jpeg' },
    ],
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://www.google.com/recaptcha/enterprise.js?render=6LcYmgQtAAAAAN5GE7TwWZBxmam9muSvi2RLVOOE" async defer></script>
      </head>
      <body className="antialiased">
        {children}
        <FloatingApply />
      </body>
    </html>
  );
}

