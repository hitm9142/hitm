import './globals.css';
import 'leaflet/dist/leaflet.css';
import FloatingApply from '@/components/FloatingApply';

export const metadata = {
  title: 'HITM Ranchi | AICTE Approved Institution',
  description: 'Haider Institute of Technology and Management (HITM Ranchi) is a premier AICTE-approved engineering and management institution in Jharkhand, offering B.Tech, Diploma, MBA, MCA, BBA, and BCA programmes.',
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
        <link rel="icon" type="image/png" href="/images/logo/ahct-logo.png" />
        <script src="https://www.google.com/recaptcha/enterprise.js?render=6LcYmgQtAAAAAN5GE7TwWZBxmam9muSvi2RLVOOE" async defer></script>
      </head>
      <body className="antialiased">
        {children}
        <FloatingApply />
      </body>
    </html>
  );
}

