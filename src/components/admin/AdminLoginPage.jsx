'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Loader2, LayoutDashboard, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('from') || '/admin-dashboard';

  const [form, setForm] = useState({ email: '', password: '', rememberMe: false });
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // If already authenticated, redirect immediately
  useEffect(() => {
    fetch('/api/admin/me', { credentials: 'include', cache: 'no-store' })
      .then((r) => r.ok && router.replace(redirectTo))
      .catch(() => {});
  }, []);

  const set = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
    setGlobalError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setGlobalError('');

    const localErrors = {};
    if (!form.email) localErrors.email = 'Email is required';
    if (!form.password) localErrors.password = 'Password is required';
    if (Object.keys(localErrors).length) {
      setErrors(localErrors);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setGlobalError(data.message || 'Login failed. Please try again.');
        }
        return;
      }

      router.replace(redirectTo);
    } catch {
      setGlobalError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6f9] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#e2e8f0] overflow-hidden">
          {/* Header */}
          <div className="bg-[#8B1A1A] px-8 py-8 text-center">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <LayoutDashboard className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">HITM Admin</h1>
            <p className="text-white/70 text-sm mt-1">Blog Management Portal</p>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            <h2 className="text-[18px] font-bold text-[#222222] mb-1">Sign in to continue</h2>
            <p className="text-[13px] text-[#77838f] mb-6">Enter your admin credentials below.</p>

            {/* Global error */}
            {globalError && (
              <div className="mb-5 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 text-[13px] rounded-lg px-4 py-3">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{globalError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-[13px] font-semibold text-[#222222] mb-1.5">Email address</label>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="admin@example.com"
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                  disabled={loading}
                  className={cn(
                    'w-full px-3 py-2.5 rounded-lg border text-[14px] text-[#222222] bg-[#f8f9fa] placeholder:text-[#bbb] focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/30 focus:border-[#8B1A1A] transition disabled:opacity-60',
                    errors.email ? 'border-red-400' : 'border-[#e2e8f0]',
                  )}
                />
                {errors.email && (
                  <p className="mt-1 text-[12px] text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {Array.isArray(errors.email) ? errors.email[0] : errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-[13px] font-semibold text-[#222222] mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => set('password', e.target.value)}
                    disabled={loading}
                    className={cn(
                      'w-full px-3 py-2.5 pr-10 rounded-lg border text-[14px] text-[#222222] bg-[#f8f9fa] placeholder:text-[#bbb] focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/30 focus:border-[#8B1A1A] transition disabled:opacity-60',
                      errors.password ? 'border-red-400' : 'border-[#e2e8f0]',
                    )}
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#77838f] hover:text-[#222222] transition"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-[12px] text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />{' '}
                    {Array.isArray(errors.password) ? errors.password[0] : errors.password}
                  </p>
                )}
              </div>

              {/* Remember me */}
              <div className="flex items-center gap-2">
                <input
                  id="rememberMe"
                  type="checkbox"
                  checked={form.rememberMe}
                  onChange={(e) => set('rememberMe', e.target.checked)}
                  disabled={loading}
                  className="w-4 h-4 accent-[#8B1A1A] rounded cursor-pointer"
                />
                <label htmlFor="rememberMe" className="text-[13px] text-[#4a5568] cursor-pointer select-none">
                  Remember me for 30 days
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#8B1A1A] hover:bg-[#6B1212] text-white font-semibold text-[14px] rounded-lg transition disabled:opacity-60 shadow-sm cursor-pointer"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {loading ? 'Signing in…' : 'Sign in'}
              </button>
            </form>
          </div>
        </div>

        <p className="text-center text-[12px] text-[#77838f] mt-6">HITM Blog Admin — restricted access only.</p>
      </div>
    </div>
  );
}
