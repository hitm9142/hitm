import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { getAuthFromCookies } from '@/lib/auth';
import { postSchema } from '@/lib/validations';
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
  validationError,
} from '@/lib/apiResponse';

// ─── GET /api/blog — List blogs (public + dashboard) ─────────────────────────
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '10')));
    const status = searchParams.get('status') || '';
    const category = searchParams.get('category') || '';
    const search = searchParams.get('search') || '';
    const sort = searchParams.get('sort') || '-publishedAt';

    // Build filter
    const filter = {};
    if (status && ['draft', 'published'].includes(status)) {
      filter.status = status;
    }
    if (category) {
      filter.category = { $regex: category, $options: 'i' };
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const skip = (page - 1) * limit;

    const [docs, totalDocs, publishedCount, draftCount] = await Promise.all([
      Blog.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .select('-content')
        .lean(),
      Blog.countDocuments(filter),
      Blog.countDocuments({ ...filter, status: 'published' }),
      Blog.countDocuments({ ...filter, status: 'draft' }),
    ]);

    const totalPages = Math.ceil(totalDocs / limit);

    return successResponse({
      docs,
      totalDocs,
      publishedCount,
      draftCount,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    });
  } catch (error) {
    console.error('[BLOG LIST ERROR]', error);
    return errorResponse('Failed to fetch blogs', 500);
  }
}

// ─── POST /api/blog — Create blog (protected) ─────────────────────────────────
export async function POST(request) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) return unauthorizedResponse();

    const body = await request.json();
    const parsed = postSchema.safeParse(body);
    if (!parsed.success) {
      return validationError(parsed.error.flatten().fieldErrors);
    }

    await connectDB();

    // Check slug uniqueness
    const existing = await Blog.findOne({ slug: parsed.data.slug });
    if (existing) {
      return validationError({ slug: ['This slug is already taken. Please choose a different one.'] });
    }

    // Calculate reading time (~200 words/min)
    const wordCount = parsed.data.content
      ? parsed.data.content.replace(/<[^>]+>/g, '').split(/\s+/).filter(Boolean).length
      : 0;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    const blog = await Blog.create({
      ...parsed.data,
      readingTime,
      publishedAt:
        parsed.data.status === 'published' ? new Date() : null,
    });

    return successResponse(blog, 'Blog created successfully', 201);
  } catch (error) {
    console.error('[BLOG CREATE ERROR]', error);
    if (error.code === 11000) {
      return validationError({ slug: ['This slug is already taken.'] });
    }
    return errorResponse('Failed to create blog', 500);
  }
}
