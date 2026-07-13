export const metadata = {
  title: 'Edit Blog | HITM Admin',
  robots: { index: false, follow: false },
};

import BlogEditPageWrapper from '@/components/dashboard/BlogEditPageWrapper';

export default function DashboardBlogEditPage({ params }) {
  return <BlogEditPageWrapper params={params} />;
}
