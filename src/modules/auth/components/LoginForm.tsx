'use client';

import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Globe, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { login } from '../lib/auth';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await login(values.email, values.password);
        if (result.success && result.user) {
          router.push(result.user.role === 'admin' ? '/admin' : '/dashboard');
        } else {
          setError(result.error || 'Invalid credentials');
        }
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="w-full max-w-md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-8 border border-white/10 shadow-2xl relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#00d4ff]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#9b59ff]/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-white mb-2">Welcome Back</h2>
            <p className="text-white/50 text-sm">Enter your credentials to access your trainer</p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 text-sm"
              >
                <AlertCircle size={16} />
                {error}
              </motion.div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#00d4ff] transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white outline-none focus:border-[#00d4ff]/50 focus:bg-white/[0.08] transition-all placeholder:text-white/20"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <p className="text-[10px] text-red-400 mt-1 ml-1">{formik.errors.email}</p>
                ) : null}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold text-white/50 uppercase tracking-widest">Password</label>
                <a href="#" className="text-[10px] text-[#00d4ff] hover:underline">Forgot?</a>
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#9b59ff] transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white outline-none focus:border-[#9b59ff]/50 focus:bg-white/[0.08] transition-all placeholder:text-white/20"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <p className="text-[10px] text-red-400 mt-1 ml-1">{formik.errors.password}</p>
                ) : null}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-4 rounded-2xl flex items-center justify-center gap-2 group mt-2"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <span>Sign In</span>
                  <LogIn size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#07071a] px-2 text-white/30 font-bold tracking-widest">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl text-white text-sm transition-all">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl text-white text-sm transition-all">
              <Mail size={16} />
              <span>GitHub</span>
            </button>
          </div>

          <p className="text-center text-white/40 text-sm mt-8">
            Don't have an account?{' '}
            <a href="/register" className="text-white font-bold hover:text-[#00d4ff] transition-colors">
              Sign up free
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
