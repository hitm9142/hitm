import './globals.css';
import 'leaflet/dist/leaflet.css';
import FloatingApply from '@/components/FloatingApply';
import pageMeta from '@/lib/metadata.json';

const SITE_URL = 'https://www.hitmranchi.ac.in';

// Shared base metadata (icons, keywords, fb domain verification)
const BASE_META = {
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

// Fallback if a page has no entry in metadata.json
const FALLBACK_META = {
  title: 'HITM Ranchi | AICTE Approved Institution',
  description:
    'Haider Institute of Technology and Management (HITM Ranchi) is a premier AICTE-approved engineering and management institution in Jharkhand, offering B.Tech, Diploma, MBA, MCA, BBA, and BCA programmes',
};

/**
 * generateMetadata is called by Next.js per page request.
 * params.pathname is automatically provided when using the App Router.
 * We match it against metadata.json to get page-specific title & description.
 */
export async function generateMetadata({ params, searchParams }, parent) {
  // Next.js passes the resolved URL via the internal mechanism;
  // we read the pathname from the headers helper.
  const { headers } = await import('next/headers');
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '/';

  // Look up the page entry; fall back to root or default
  const pageMeta_ = pageMeta[pathname] || pageMeta['/'] || FALLBACK_META;

  return {
    ...BASE_META,
    title: pageMeta_.title,
    description: pageMeta_.description,
    alternates: {
      canonical: `${SITE_URL}${pathname === '/' ? '' : pathname}`,
    },
  };
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-WDC2BN7G');`,
          }}
        />
        {/* End Google Tag Manager */}
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
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WDC2BN7G"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        <FloatingApply />
      </body>
    </html>
  );
}
