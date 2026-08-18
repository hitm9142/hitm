import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { getCache, setCache } from '@/lib/cache';

export async function getLatestBlogs(limit = 4) {
  const cacheKey = `blogs:latest:${limit}`;
  const cached = await getCache(cacheKey);
  if (cached) return cached;

  try {
    await connectDB();

    const blogs = await Blog.find({ status: 'published' })
      .select('title slug shortDescription featuredImage author category publishedAt readingTime')
      .sort({ publishedAt: -1 })
      .limit(limit)
      .lean();

    const result = blogs || [];
    await setCache(cacheKey, result, 300); // 5 min cache
    return result;
  } catch (error) {
    console.error('[GET LATEST BLOGS ERROR]:', error);
    return [];
  }
}

export async function getBlogWithRelated(slug) {
  const cacheKey = `blog:detail:${slug}`;
  const cached = await getCache(cacheKey);
  if (cached) return cached;

  await connectDB();

  const blog = await Blog.findOne({ slug, status: 'published' }).lean();
  if (!blog) return null;

  const related = await Blog.find({
    status: 'published',
    slug: { $ne: slug },
    $or: [
      { category: blog.category },
      { tags: { $in: blog.tags || [] } },
    ],
  })
    .sort('-publishedAt')
    .limit(3)
    .select('title slug shortDescription featuredImage publishedAt author category readingTime')
    .lean();

  const result = {
    blog: JSON.parse(JSON.stringify(blog)),
    related: JSON.parse(JSON.stringify(related)),
  };

  await setCache(cacheKey, result, 300); // 5 min cache
  return result;
}

