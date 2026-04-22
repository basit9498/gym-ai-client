'use client';

import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Loader2, Check, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { PasswordData } from '../types';

const passSchema = Yup.object({
  current: Yup.string().min(6).required('Current password required'),
  newPass: Yup.string().min(8, 'Min 8 chars').required('New password required'),
  confirm: Yup.string().oneOf([Yup.ref('newPass')], 'Passwords do not match').required('Confirm your password'),
});

interface PasswordTabProps {
  onSave: (values: PasswordData) => Promise<{ success: boolean; error?: string }>;
  savedStatus: string;
  setSavedStatus: (status: string) => void;
  setError: (error: string) => void;
}

export function PasswordTab({ onSave, savedStatus, setSavedStatus, setError }: PasswordTabProps) {
  const [showPass, setShowPass] = useState(false);

  const passForm = useFormik({
    initialValues: { current: '', newPass: '', confirm: '' },
    validationSchema: passSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setError('');
      const res = await onSave({
        currentPassword: values.current,
        newPassword: values.newPass
      });

      if (res.success) {
        setSavedStatus('pass');
        resetForm();
        setTimeout(() => setSavedStatus(''), 2500);
      } else {
        setError(res.error || 'Failed to change password');
      }
      setSubmitting(false);
    },
  });

  return (
    <form onSubmit={passForm.handleSubmit} className="space-y-6">
      {[
        { id: 'p-current', label: 'Current Password', name: 'current' },
        { id: 'p-new', label: 'New Password', name: 'newPass' },
        { id: 'p-confirm', label: 'Confirm New Password', name: 'confirm' },
      ].map(f => {
        const val = (passForm.values as Record<string, string>)[f.name];
        const touched = (passForm.touched as Record<string, boolean>)[f.name];
        const error = (passForm.errors as Record<string, string>)[f.name];
        return (
          <div key={f.name}>
            <label className="text-xs font-medium text-white/50 uppercase tracking-wider block mb-2">{f.label}</label>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input id={f.id} type={showPass ? 'text' : 'password'} value={val}
                onChange={e => passForm.setFieldValue(f.name, e.target.value)}
                onBlur={() => passForm.setFieldTouched(f.name)}
                placeholder={`Enter ${f.label.toLowerCase()}`}
                className="w-full pl-11 pr-11 py-3.5 rounded-xl text-white text-sm outline-none transition-all"
                style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${touched && error ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.08)'}` }} />
              {f.name === 'confirm' && (
                <button type="button" onClick={() => setShowPass(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              )}
            </div>
            {touched && error && <p className="text-xs text-red-500 mt-1 flex items-center gap-1.5"><AlertCircle size={12} /> {error}</p>}
          </div>
        );
      })}
      <button id="save-pass" type="submit" disabled={passForm.isSubmitting}
        className="btn-primary w-full py-4 text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-60 shadow-[0_0_30px_rgba(155,89,255,0.2)]">
        {passForm.isSubmitting ? <Loader2 className="animate-spin" size={18} /> : 
         savedStatus === 'pass' ? <><Check size={18} /> Password Updated</> : <span>Update Credentials →</span>}
      </button>
    </form>
  );
}
