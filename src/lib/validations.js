import { z } from 'zod';

// ─── Auth ──────────────────────────────────────────────────────────────────────

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Please enter a valid email address')
    .toLowerCase(),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional().default(false),
});

// ─── Blog / Post ───────────────────────────────────────────────────────────────

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const postSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .trim()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title cannot exceed 200 characters'),
  slug: z
    .string({ required_error: 'Slug is required' })
    .trim()
    .toLowerCase()
    .min(3, 'Slug must be at least 3 characters')
    .max(200, 'Slug cannot exceed 200 characters')
    .regex(slugRegex, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  shortDescription: z
    .string()
    .trim()
    .max(500, 'Short description cannot exceed 500 characters')
    .optional()
    .default(''),
  content: z.string().optional().default(''),
  featuredImage: z
    .object({
      url: z.string().optional().default(''),
      alt: z.string().optional().default(''),
    })
    .optional()
    .default({ url: '', alt: '' }),
  author: z
    .string()
    .trim()
    .max(100, 'Author name cannot exceed 100 characters')
    .optional()
    .default('HITM Admin'),
  category: z
    .string()
    .trim()
    .max(100, 'Category cannot exceed 100 characters')
    .optional()
    .default('General'),
  tags: z.array(z.string().trim().toLowerCase()).optional().default([]),
  focusKeyword: z.string().trim().max(100).optional().default(''),
  metaTitle: z.string().trim().max(70, 'Meta title cannot exceed 70 characters').optional().default(''),
  metaDescription: z
    .string()
    .trim()
    .max(160, 'Meta description cannot exceed 160 characters')
    .optional()
    .default(''),
  metaKeywords: z.string().trim().optional().default(''),
  canonicalUrl: z.string().trim().optional().default(''),
  ogImage: z.string().trim().optional().default(''),
  status: z.enum(['draft', 'published']).optional().default('draft'),
});

export const postUpdateSchema = postSchema.partial().extend({
  title: z
    .string()
    .trim()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title cannot exceed 200 characters')
    .optional(),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(slugRegex, 'Slug can only contain lowercase letters, numbers, and hyphens')
    .optional(),
});

// ─── Image upload ──────────────────────────────────────────────────────────────

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export function validateImageFile(file) {
  const errors = [];

  if (!file || typeof file.size === 'undefined') {
    errors.push('No file provided');
    return { valid: false, errors };
  }

  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    errors.push(`Invalid file type "${file.type}". Allowed: JPG, PNG, WebP`);
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    errors.push(`File size ${(file.size / 1024 / 1024).toFixed(1)} MB exceeds the ${MAX_FILE_SIZE_MB} MB limit`);
  }

  return { valid: errors.length === 0, errors };
}
