import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function SitemapPage() {
  const links = [
    { name: 'Home', href: '/' },
    { name: 'About Overview', href: '/about/overview' },
    { name: 'Programs (Engineering)', href: '/programs/engineering' },
    { name: 'Programs (MBA)', href: '/programs/mba' },
    { name: 'Apply Now', href: '/admissions/apply?form=1' },
    { name: 'Eligibility', href: '/admissions/eligibility' },
    { name: 'Notice Board', href: '/notice' },
    { name: 'Placement Cell', href: '/placement/overview' },
    { name: 'Contact US', href: '/contact' },
    { name: 'Careers', href: '/career' },
    { name: 'Admin Login', href: '/admin/login' },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-32 max-w-4xl">
        <h1 className="text-4xl font-black font-serif text-hitm-navy mb-12">Website Sitemap</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          {links.map((l, i) => (
            <Link key={i} href={l.href} className="text-lg text-gray-600 hover:text-hitm-red flex items-center gap-3 py-2 border-b border-gray-50">
              <span className="w-2 h-2 rounded-full bg-hitm-gold" />
              {l.name}
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
