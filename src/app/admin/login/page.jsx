'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, LogIn, AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Check Firestore for admin status
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (userDoc.exists() && userDoc.data().userType === 'admin') {
        router.push('/admin/dashboard');
      } else {
        await signOut(auth);
        setError('Access denied. No admin privileges found for this account.');
      }
    } catch (err) {
      setError(
        err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password'
          ? 'Invalid email or password.'
          : err.code === 'auth/user-not-found'
          ? 'No admin account found with this email.'
          : 'Login failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-hitm-red to-hitm-navy p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center pb-2">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-hitm-red to-hitm-navy flex items-center justify-center text-white font-black text-2xl font-serif mx-auto mb-4 shadow-lg">
            A
          </div>
          <CardTitle className="text-2xl">HITM Ranchi</CardTitle>
          <CardDescription>Admin Portal — Secure Login</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-5 text-sm">
              <AlertCircle size={16} className="shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="admin-email" className="flex items-center gap-1.5">
                <Mail size={13} /> Email Address
              </Label>
              <Input
                id="admin-email"
                type="email"
                placeholder="admin@hitmranchi.ac.in"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="admin-password" className="flex items-center gap-1.5">
                <Lock size={13} /> Password
              </Label>
              <Input
                id="admin-password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            <Button
              id="admin-login-btn"
              type="submit"
              variant="default"
              className="w-full mt-2"
              size="lg"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <LogIn size={16} /> Sign In to Admin Panel
                </span>
              )}
            </Button>
          </form>

          <div className="mt-5 text-center">
            <Link href="/" className="flex items-center justify-center gap-1.5 text-sm text-gray-500 hover:text-hitm-red transition-colors">
              <ArrowLeft size={14} /> Back to Website
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
