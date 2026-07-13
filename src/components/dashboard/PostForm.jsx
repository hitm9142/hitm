'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import {
  Save,
  Eye,
  Send,
  Trash2,
  Upload,
  X,
  ChevronDown,
  ChevronUp,
  Loader2,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Copy,
} from 'lucide-react';
import toast from 'react-hot-toast';
import slugify from 'slugify';
import { cn } from '@/lib/utils';

// Dynamically import editor to avoid SSR issues
const RichTextEditor = dynamic(() => import('./RichTextEditor'), {
  ssr: false,
  loading: () => (
    <div className="border border-[#e2e8f0] rounded-lg h-48 flex items-center justify-center bg-[#f8f9fa]">
      <Loader2 className="w-5 h-5 text-[#8B1A1A] animate-spin" />
    </div>
  ),
});

const AUTOSAVE_DELAY = 30000; // 30 seconds

// ─── Field components ──────────────────────────────────────────────────────────

function FormField({ label, required, error, hint, children }) {
  return (
    <div>
      <label className="block text-[13px] font-semibold text-[#222222] mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-[11px] text-[#77838f]">{hint}</p>}
      {error && (
        <p className="mt-1 text-[12px] text-red-600 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {Array.isArray(error) ? error[0] : error}
        </p>
      )}
    </div>
  );
}

function TextInput({ className, ...props }) {
  return (
    <input
      {...props}
      className={cn(
        'w-full px-3 py-2.5 rounded-lg border border-[#e2e8f0] text-[14px] text-[#222222] bg-[#f8f9fa] placeholder:text-[#bbb] focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/30 focus:border-[#8B1A1A] transition disabled:opacity-60',
        className,
      )}
    />
  );
}

function TextArea({ className, rows = 3, ...props }) {
  return (
    <textarea
      rows={rows}
      {...props}
      className={cn(
        'w-full px-3 py-2.5 rounded-lg border border-[#e2e8f0] text-[14px] text-[#222222] bg-[#f8f9fa] placeholder:text-[#bbb] focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/30 focus:border-[#8B1A1A] transition resize-none disabled:opacity-60',
        className,
      )}
    />
  );
}

// ─── Section accordion ─────────────────────────────────────────────────────────
function Section({ title, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#f8f9fa] transition cursor-pointer"
      >
        <span className="text-[14px] font-bold text-[#222222]">{title}</span>
        {open ? <ChevronUp className="w-4 h-4 text-[#77838f]" /> : <ChevronDown className="w-4 h-4 text-[#77838f]" />}
      </button>
      {open && <div className="px-5 pb-5 space-y-4">{children}</div>}
    </div>
  );
}

// ─── Image Upload ──────────────────────────────────────────────────────────────
function ImageUpload({ value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;
    setUploading(true);
    const toastId = toast.loading('Uploading image…');
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      onChange({ url: data.data.url, alt: '' });
      toast.success('Image uploaded', { id: toastId });
    } catch (err) {
      toast.error(err.message || 'Upload failed', { id: toastId });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {value?.url ? (
        <div className="relative rounded-lg overflow-hidden border border-[#e2e8f0] bg-[#f4f6f9]">
          <div className="relative w-full h-48">
            <img src={value.url} alt={value.alt || 'Featured image'} className="w-full h-full object-cover" />
          </div>
          <div className="p-3 flex items-center justify-between gap-2 bg-white border-t border-[#e2e8f0]">
            <TextInput
              placeholder="Alt text (for SEO)"
              value={value.alt || ''}
              onChange={(e) => onChange({ ...value, alt: e.target.value })}
              className="text-[12px] py-1.5"
            />
            <button
              type="button"
              onClick={() => onChange({ url: '', alt: '' })}
              className="shrink-0 p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => !uploading && fileRef.current?.click()}
          className={cn(
            'border-2 border-dashed border-[#e2e8f0] rounded-lg p-8 text-center cursor-pointer hover:border-[#8B1A1A]/50 hover:bg-[#8B1A1A]/5 transition',
            uploading && 'opacity-60 cursor-wait',
          )}
        >
          {uploading ? (
            <Loader2 className="w-8 h-8 text-[#8B1A1A] animate-spin mx-auto mb-2" />
          ) : (
            <Upload className="w-8 h-8 text-[#77838f] mx-auto mb-2" />
          )}
          <p className="text-[13px] font-medium text-[#222222]">
            {uploading ? 'Uploading…' : 'Click to upload featured image'}
          </p>
          <p className="text-[11px] text-[#77838f] mt-1">JPG, PNG, WebP · Max 5 MB</p>
        </div>
      )}
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}

// ─── Tags Input ────────────────────────────────────────────────────────────────
function TagsInput({ value = [], onChange }) {
  const [input, setInput] = useState('');

  const addTag = (tag) => {
    const t = tag.trim().toLowerCase();
    if (t && !value.includes(t)) onChange([...value, t]);
    setInput('');
  };

  const removeTag = (tag) => onChange(value.filter((t) => t !== tag));

  return (
    <div className="border border-[#e2e8f0] rounded-lg bg-[#f8f9fa] px-3 py-2 flex flex-wrap gap-1.5 min-h-[42px] focus-within:ring-2 focus-within:ring-[#8B1A1A]/30 focus-within:border-[#8B1A1A] transition">
      {value.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 bg-[#8B1A1A]/10 text-[#8B1A1A] text-[12px] font-medium px-2 py-0.5 rounded"
        >
          {tag}
          <button type="button" onClick={() => removeTag(tag)} className="cursor-pointer">
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTag(input);
          } else if (e.key === 'Backspace' && !input && value.length) {
            removeTag(value[value.length - 1]);
          }
        }}
        onBlur={() => input && addTag(input)}
        placeholder={value.length === 0 ? 'Type and press Enter to add tags' : ''}
        className="flex-1 min-w-[120px] bg-transparent text-[13px] text-[#222222] placeholder:text-[#bbb] focus:outline-none"
      />
    </div>
  );
}

// ─── Main PostForm ─────────────────────────────────────────────────────────────
export default function PostForm({ initialData = null, id = null }) {
  const router = useRouter();
  const apiBase = '/api/blog';
  const listPath = '/admin-dashboard/blogs';
  const frontendBase = '/blogs';
  const isEdit = !!id;

  const defaultValues = {
    title: '',
    slug: '',
    shortDescription: '',
    content: '',
    featuredImage: { url: '', alt: '' },
    author: 'HITM Admin',
    category: 'General',
    tags: [],
    focusKeyword: '',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    canonicalUrl: '',
    ogImage: '',
    status: 'draft',
  };

  const [formData, setFormData] = useState(initialData ? { ...defaultValues, ...initialData } : defaultValues);
  const [fieldErrors, setFieldErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(''); // '', 'saved', 'error'
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(isEdit);
  const autosaveTimerRef = useRef(null);
  const hasChangesRef = useRef(false);

  // Auto-generate slug from title
  useEffect(() => {
    if (!slugManuallyEdited && formData.title) {
      const generated = slugify(formData.title, { lower: true, strict: true, trim: true });
      setFormData((prev) => ({ ...prev, slug: generated }));
    }
  }, [formData.title, slugManuallyEdited]);

  // Auto-fill meta title from title
  useEffect(() => {
    if (!formData.metaTitle && formData.title) {
      setFormData((prev) => ({ ...prev, metaTitle: formData.title.slice(0, 70) }));
    }
  }, [formData.title]);

  // Auto-fill meta description from shortDescription
  useEffect(() => {
    if (!formData.metaDescription && formData.shortDescription) {
      setFormData((prev) => ({
        ...prev,
        metaDescription: formData.shortDescription.slice(0, 160),
      }));
    }
  }, [formData.shortDescription]);

  const set = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    hasChangesRef.current = true;
    if (fieldErrors[field]) setFieldErrors((prev) => ({ ...prev, [field]: '' }));
  };

  // Autosave for existing drafts
  const triggerAutosave = useCallback(() => {
    if (!isEdit || !hasChangesRef.current) return;
    clearTimeout(autosaveTimerRef.current);
    autosaveTimerRef.current = setTimeout(async () => {
      if (!hasChangesRef.current) return;
      try {
        const res = await fetch(`${apiBase}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, status: 'draft' }),
        });
        if (res.ok) {
          setSaveStatus('saved');
          hasChangesRef.current = false;
          setTimeout(() => setSaveStatus(''), 3000);
        }
      } catch {
        /* silent autosave failure */
      }
    }, AUTOSAVE_DELAY);
  }, [isEdit, id, formData]);

  useEffect(() => {
    triggerAutosave();
    return () => clearTimeout(autosaveTimerRef.current);
  }, [triggerAutosave]);

  const handleSubmit = async (statusOverride) => {
    setSaving(true);
    setFieldErrors({});

    const payload = { ...formData, status: statusOverride || formData.status };

    try {
      const url = isEdit ? `${apiBase}/${id}` : apiBase;
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setFieldErrors(data.errors);
          toast.error('Please fix the validation errors');
        } else {
          toast.error(data.message || 'Save failed');
        }
        return;
      }

      toast.success(isEdit ? 'Post updated!' : 'Post created!');
      hasChangesRef.current = false;

      if (!isEdit) {
        router.push(`${listPath}/${data.data._id}/edit`);
      } else {
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus(''), 3000);
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    if (!confirm('Delete this post permanently? This cannot be undone.')) return;
    try {
      const res = await fetch(`${apiBase}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      toast.success('Post deleted');
      router.push(listPath);
    } catch {
      toast.error('Failed to delete post');
    }
  };

  const handleDuplicate = async () => {
    if (!id) return;
    const newSlug = formData.slug + '-copy-' + Date.now().toString(36);
    const payload = { ...formData, title: formData.title + ' (Copy)', slug: newSlug, status: 'draft' };
    try {
      const res = await fetch(apiBase, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success('Post duplicated!');
      router.push(`${listPath}/${data.data._id}/edit`);
    } catch (err) {
      toast.error(err.message || 'Failed to duplicate');
    }
  };

  const previewUrl = `${frontendBase}/${formData.slug}`;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="text-[20px] font-bold text-[#222222]">{isEdit ? 'Edit Blog Post' : 'New Blog Post'}</h1>
          {saveStatus === 'saved' && (
            <span className="text-[12px] text-green-600 flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Autosaved
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {isEdit && (
            <>
              <button
                type="button"
                onClick={handleDuplicate}
                className="flex items-center gap-1.5 px-3 py-2 text-[13px] text-[#77838f] border border-[#e2e8f0] rounded-lg hover:bg-[#f4f6f9] transition cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                Duplicate
              </button>
              <a
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 text-[13px] text-[#77838f] border border-[#e2e8f0] rounded-lg hover:bg-[#f4f6f9] transition"
              >
                <Eye className="w-3.5 h-3.5" />
                Preview
              </a>
              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center gap-1.5 px-3 py-2 text-[13px] text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
            </>
          )}
          <button
            type="button"
            onClick={() => handleSubmit('draft')}
            disabled={saving}
            className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold text-[#222222] border border-[#e2e8f0] rounded-lg hover:bg-[#f4f6f9] transition disabled:opacity-60 cursor-pointer"
          >
            {saving && formData.status !== 'published' ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            Save Draft
          </button>
          <button
            type="button"
            onClick={() => handleSubmit('published')}
            disabled={saving}
            className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold text-white bg-[#8B1A1A] hover:bg-[#6B1212] rounded-lg transition disabled:opacity-60 shadow-sm cursor-pointer"
          >
            {saving && formData.status === 'published' ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            {formData.status === 'published' ? 'Update' : 'Publish'}
          </button>
        </div>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Main content (2/3) */}
        <div className="lg:col-span-2 space-y-5">
          {/* Title & Slug */}
          <Section title="Post Details">
            <FormField label="Title" required error={fieldErrors.title}>
              <TextInput
                placeholder="Enter blog post title…"
                value={formData.title}
                onChange={(e) => set('title', e.target.value)}
              />
            </FormField>

            <FormField
              label="Slug (URL)"
              required
              error={fieldErrors.slug}
              hint={`URL: /blogs/${formData.slug || 'your-slug'}`}
            >
              <div className="flex gap-2">
                <TextInput
                  placeholder="your-post-slug"
                  value={formData.slug}
                  onChange={(e) => {
                    setSlugManuallyEdited(true);
                    set(
                      'slug',
                      e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9-]/g, '-')
                        .replace(/-+/g, '-'),
                    );
                  }}
                  className={fieldErrors.slug ? 'border-red-400' : ''}
                />
                <button
                  type="button"
                  title="Re-generate slug from title"
                  onClick={() => {
                    const generated = slugify(formData.title || '', {
                      lower: true,
                      strict: true,
                      trim: true,
                    });
                    set('slug', generated);
                    setSlugManuallyEdited(false);
                  }}
                  className="shrink-0 px-3 py-2 rounded-lg border border-[#e2e8f0] hover:bg-[#f4f6f9] text-[#77838f] transition cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </FormField>

            <FormField
              label="Short Description"
              error={fieldErrors.shortDescription}
              hint={`${formData.shortDescription?.length || 0}/500`}
            >
              <TextArea
                placeholder="A brief summary shown in listing pages…"
                value={formData.shortDescription}
                onChange={(e) => set('shortDescription', e.target.value)}
                rows={3}
                maxLength={500}
              />
            </FormField>
          </Section>

          {/* Content */}
          <Section title="Content">
            <FormField label="Body Content" error={fieldErrors.content}>
              <RichTextEditor
                value={formData.content}
                onChange={(val) => set('content', val)}
                placeholder="Start writing your content here…"
              />
            </FormField>
          </Section>

          {/* SEO */}
          <Section title="SEO & Meta" defaultOpen={false}>
            <FormField
              label="Focus Keyword"
              error={fieldErrors.focusKeyword}
              hint="The main keyword this post should rank for"
            >
              <TextInput
                placeholder="e.g. MBA admission Ranchi"
                value={formData.focusKeyword}
                onChange={(e) => set('focusKeyword', e.target.value)}
                maxLength={100}
              />
            </FormField>

            <FormField
              label="Meta Title"
              error={fieldErrors.metaTitle}
              hint={`${formData.metaTitle?.length || 0}/70 characters`}
            >
              <TextInput
                placeholder="SEO page title"
                value={formData.metaTitle}
                onChange={(e) => set('metaTitle', e.target.value)}
                maxLength={70}
              />
            </FormField>

            <FormField
              label="Meta Description"
              error={fieldErrors.metaDescription}
              hint={`${formData.metaDescription?.length || 0}/160 characters`}
            >
              <TextArea
                placeholder="SEO page description"
                value={formData.metaDescription}
                onChange={(e) => set('metaDescription', e.target.value)}
                rows={3}
                maxLength={160}
              />
            </FormField>

            <FormField label="Meta Keywords" error={fieldErrors.metaKeywords}>
              <TextInput
                placeholder="keyword1, keyword2, keyword3"
                value={formData.metaKeywords}
                onChange={(e) => set('metaKeywords', e.target.value)}
              />
            </FormField>

            <FormField label="Canonical URL" error={fieldErrors.canonicalUrl} hint="Leave blank to use the default URL">
              <TextInput
                placeholder={`https://www.hitmranchi.ac.in/blogs/${formData.slug || 'your-slug'}`}
                value={formData.canonicalUrl}
                onChange={(e) => set('canonicalUrl', e.target.value)}
              />
            </FormField>

            <FormField label="OG Image URL" error={fieldErrors.ogImage} hint="Leave blank to use the featured image">
              <TextInput
                placeholder="https://…"
                value={formData.ogImage}
                onChange={(e) => set('ogImage', e.target.value)}
              />
            </FormField>
          </Section>
        </div>

        {/* Right: Sidebar (1/3) */}
        <div className="space-y-5">
          {/* Publish settings */}
          <div className="bg-white rounded-xl border border-[#e2e8f0] p-5">
            <h3 className="text-[14px] font-bold text-[#222222] mb-4">Publish</h3>

            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-[12px] font-semibold text-[#77838f] mb-1.5 uppercase tracking-wide">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => set('status', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#e2e8f0] text-[14px] text-[#222222] bg-[#f8f9fa] focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/30 focus:border-[#8B1A1A] transition"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => handleSubmit('published')}
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-[13px] font-semibold text-white bg-[#8B1A1A] hover:bg-[#6B1212] rounded-lg transition disabled:opacity-60 cursor-pointer"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                {formData.status === 'published' ? 'Update' : 'Publish Now'}
              </button>
              <button
                type="button"
                onClick={() => handleSubmit('draft')}
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-[13px] font-medium text-[#77838f] border border-[#e2e8f0] rounded-lg hover:bg-[#f4f6f9] transition disabled:opacity-60 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                Save as Draft
              </button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-xl border border-[#e2e8f0] p-5">
            <h3 className="text-[14px] font-bold text-[#222222] mb-4">Featured Image</h3>
            <ImageUpload value={formData.featuredImage} onChange={(val) => set('featuredImage', val)} />
            {fieldErrors.featuredImage && <p className="mt-2 text-[12px] text-red-600">{fieldErrors.featuredImage}</p>}
          </div>

          {/* Post Meta */}
          <div className="bg-white rounded-xl border border-[#e2e8f0] p-5 space-y-4">
            <h3 className="text-[14px] font-bold text-[#222222]">Post Meta</h3>

            <FormField label="Author" error={fieldErrors.author}>
              <TextInput
                value={formData.author}
                onChange={(e) => set('author', e.target.value)}
                placeholder="Author name"
              />
            </FormField>

            <FormField label="Category" error={fieldErrors.category}>
              <TextInput
                value={formData.category}
                onChange={(e) => set('category', e.target.value)}
                placeholder="e.g. MBA, BBA, Career, Events"
              />
            </FormField>

            <FormField label="Tags" hint="Press Enter or comma to add">
              <TagsInput value={formData.tags} onChange={(val) => set('tags', val)} />
            </FormField>
          </div>
        </div>
      </div>
    </div>
  );
}
