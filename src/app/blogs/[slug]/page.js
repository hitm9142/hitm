import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogDetailPage from '@/components/blogs/BlogDetailPage';
import { getMetaDataDynamic } from '@/_services/seoService';
import { getBlogWithRelated } from '@/_services/dataService';

export async function generateMetadata({ params }) {
  // In Next.js 14 params is a plain object — no await needed
  const slug = params.slug;
  try {
    const result = await getBlogWithRelated(slug);
    if (!result) return { title: 'Blog | HITM Ranchi' };
    return getMetaDataDynamic({
      content: result.blog,
      pathPrefix: 'blogs',
      fallbackTitle: 'Blog | HITM Ranchi',
    });
  } catch {
    return { title: 'Blog | HITM Ranchi' };
  }
}

export default async function BlogSlugPage({ params }) {
  const slug = params.slug;

  let result = null;
  try {
    result = await getBlogWithRelated(slug);
  } catch (err) {
    console.error('[BlogSlugPage] fetch error:', err);
    notFound();
  }

  if (!result) notFound();

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">
        <BlogDetailPage blog={result.blog} related={result.related} />
      </div>
      <Footer />
    </main>
  );
}
