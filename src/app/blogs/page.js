import { getMetaDataStatic } from '@/_services/seoService';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogsListPage from '@/components/blogs/BlogsListPage';

export async function generateMetadata() {
  return await getMetaDataStatic({
    title: 'Blog | HITM Ranchi — Insights on Engineering, Management & Career',
    description:
      'Read the latest articles from HITM Ranchi on engineering, management, career guidance, campus life and more.',
    meta_keywords: 'HITM Ranchi blog, engineering articles, management insights, career tips Jharkhand',
    slug: 'blogs',
  });
}

export default function BlogsPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">
        <BlogsListPage />
      </div>
      <Footer />
    </main>
  );
}
