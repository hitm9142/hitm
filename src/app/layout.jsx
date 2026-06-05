import './globals.css';
import 'leaflet/dist/leaflet.css';
import FloatingApply from '@/components/FloatingApply';

export const metadata = {
  title: 'HITM Ranchi | AICTE Approved Institution',
  description:
    'Haider Institute of Technology and Management (HITM Ranchi) is a premier AICTE-approved engineering and management institution in Jharkhand, offering B.Tech, Diploma, MBA, MCA, BBA, and BCA programmes.',
  keywords:
    'HITM Ranchi, Haider Institute of Technology and Management, engineering college Jharkhand, management institute Ranchi, BCA BTech MBA admissions 2026',
  other: {
    'facebook-domain-verification': 'ocs6znof45zmx8woan8np8zl32p9mv',
  },
  icons: {
    icon: [{ url: '/images/logo/ahct-logo.png', type: 'image/jpeg' }],
    shortcut: [{ url: '/images/logo/ahct-logo.png', type: 'image/jpeg' }],
    apple: [{ url: '/images/logo/ahct-logo.png', type: 'image/jpeg' }],
  },
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
        <script
          src="https://www.google.com/recaptcha/enterprise.js?render=6LcYmgQtAAAAAN5GE7TwWZBxmam9muSvi2RLVOOE"
          async
          defer
        ></script>
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '4448499865479117');fbq('track', 'PageView');`,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=4448499865479117&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </head>
      <body className="antialiased">
        {children}
        <FloatingApply />
      </body>
    </html>
  );
}
