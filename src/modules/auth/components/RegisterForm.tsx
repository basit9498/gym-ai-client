'use client';

import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { Mail, Lock, User, UserPlus, ArrowRight, AlertCircle, Loader2, Wallet } from 'lucide-react';
import { register, getWalletSettings } from '../lib/auth';
import { useRouter } from 'next/navigation';

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [walletSettings, setWalletSettings] = useState<any[]>([]);

  useEffect(() => {
    const fetchSettings = async () => {
      const result = await getWalletSettings();
      if (result.success) {
        setWalletSettings(result.data);
      }
    };
    fetchSettings();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      walletNetworkId: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Full name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      walletNetworkId: Yup.string().required('Please select a wallet network'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await register(values.name, values.email, values.password, values.walletNetworkId);
        if (result.success && result.user) {
          router.push('/dashboard');
        } else {
          setError(result.error || 'Registration failed');
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
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-white mb-2">Join BodyForgeAI</h2>
            <p className="text-white/50 text-sm">Start your journey with your pro AI trainer</p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
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

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#00d4ff] transition-colors">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white outline-none focus:border-[#00d4ff]/50 transition-all placeholder:text-white/20"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-[10px] text-red-400 mt-1 ml-1">{formik.errors.name}</p>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#00d4ff] transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white outline-none focus:border-[#00d4ff]/50 transition-all placeholder:text-white/20"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-[10px] text-red-400 mt-1 ml-1">{formik.errors.email}</p>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#9b59ff] transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white outline-none focus:border-[#9b59ff]/50 transition-all placeholder:text-white/20"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-[10px] text-red-400 mt-1 ml-1">{formik.errors.password}</p>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Wallet Network</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#00d4ff] transition-colors pointer-events-none">
                  <Wallet size={18} />
                </div>
                <select
                  name="walletNetworkId"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white outline-none focus:border-[#00d4ff]/50 transition-all appearance-none"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.walletNetworkId}
                >
                  <option value="" className="bg-[#07071a]">Select Network</option>
                  {walletSettings.map((s) => (
                    <option key={s._id} value={s._id} className="bg-[#07071a]">
                      {s.name} 
                    </option>
                  ))}
                </select>
                {formik.touched.walletNetworkId && formik.errors.walletNetworkId && (
                  <p className="text-[10px] text-red-400 mt-1 ml-1">{formik.errors.walletNetworkId}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-4 rounded-2xl flex items-center justify-center gap-2 group mt-4 shadow-lg shadow-[#00d4ff]/10"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <span>Create Account</span>
                  <UserPlus size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-white/40 text-sm mt-8">
            Already have an account?{' '}
            <a href="/login" className="text-white font-bold hover:text-[#00d4ff] transition-colors">
              Sign in
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
