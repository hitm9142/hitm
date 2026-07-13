import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { getAuthFromCookies } from '@/lib/auth';
import { postUpdateSchema } from '@/lib/validations';
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
  notFoundResponse,
  validationError,
} from '@/lib/apiResponse';

// ─── GET /api/blog/[id] — Single blog by id or slug ──────────────────────────
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    // Try by MongoDB ID first, then by slug
    const isObjectId = /^[a-f0-9]{24}$/i.test(id);
    const blog = isObjectId
      ? await Blog.findById(id)
      : await Blog.findOne({ slug: id });

    if (!blog) return notFoundResponse('Blog not found');

    // Increment view count (fire-and-forget)
    if (!isObjectId || blog.status === 'published') {
      Blog.findByIdAndUpdate(blog._id, { $inc: { views: 1 } }).catch(() => {});
    }

    return successResponse(blog);
  } catch (error) {
    console.error('[BLOG GET ERROR]', error);
    return errorResponse('Failed to fetch blog', 500);
  }
}

// ─── PUT /api/blog/[id] — Full update (protected) ────────────────────────────
export async function PUT(request, { params }) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) return unauthorizedResponse();

    const { id } = await params;
    const body = await request.json();

    const parsed = postUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return validationError(parsed.error.flatten().fieldErrors);
    }

    await connectDB();

    const blog = await Blog.findById(id);
    if (!blog) return notFoundResponse('Blog not found');

    // Check slug uniqueness (excluding this doc)
    if (parsed.data.slug && parsed.data.slug !== blog.slug) {
      const existing = await Blog.findOne({
        slug: parsed.data.slug,
        _id: { $ne: id },
      });
      if (existing) {
        return validationError({ slug: ['This slug is already taken.'] });
      }
    }

    // Handle publish timestamp
    const updateData = { ...parsed.data };
    if (parsed.data.status === 'published' && blog.status !== 'published') {
      updateData.publishedAt = new Date();
    } else if (parsed.data.status === 'draft') {
      updateData.publishedAt = null;
    }

    // Recalculate reading time if content changed
    if (parsed.data.content !== undefined) {
      const wordCount = parsed.data.content
        ? parsed.data.content.replace(/<[^>]+>/g, '').split(/\s+/).filter(Boolean).length
        : 0;
      updateData.readingTime = Math.max(1, Math.ceil(wordCount / 200));
    }

    const updated = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    return successResponse(updated, 'Blog updated successfully');
  } catch (error) {
    console.error('[BLOG UPDATE ERROR]', error);
    if (error.code === 11000) {
      return validationError({ slug: ['This slug is already taken.'] });
    }
    return errorResponse('Failed to update blog', 500);
  }
}

// ─── PATCH /api/blog/[id] — Partial update, e.g. status toggle (protected) ───
export async function PATCH(request, { params }) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) return unauthorizedResponse();

    const { id } = await params;
    const body = await request.json();

    await connectDB();

    const blog = await Blog.findById(id);
    if (!blog) return notFoundResponse('Blog not found');

    const updateData = { ...body };

    // Handle publish timestamp on status change
    if (body.status === 'published' && blog.status !== 'published') {
      updateData.publishedAt = new Date();
    } else if (body.status === 'draft') {
      updateData.publishedAt = null;
    }

    const updated = await Blog.findByIdAndUpdate(id, updateData, { new: true });

    return successResponse(updated, 'Blog updated successfully');
  } catch (error) {
    console.error('[BLOG PATCH ERROR]', error);
    return errorResponse('Failed to update blog', 500);
  }
}

// ─── DELETE /api/blog/[id] — Delete blog (protected) ─────────────────────────
export async function DELETE(request, { params }) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) return unauthorizedResponse();

    const { id } = await params;
    await connectDB();

    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) return notFoundResponse('Blog not found');

    return successResponse({ id }, 'Blog deleted successfully');
  } catch (error) {
    console.error('[BLOG DELETE ERROR]', error);
    return errorResponse('Failed to delete blog', 500);
  }
}
