'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Loader2, Check } from 'lucide-react';
import { InputField } from './InputField';
import { ProfileData } from '../types';

const profileSchema = Yup.object({
  name: Yup.string().min(2).required('Name required'),
  email: Yup.string().email('Invalid email').required('Email required'),
  goal: Yup.string().required('Select a goal'),
  weight: Yup.number().positive().required('Weight required'),
  height: Yup.number().positive().required('Height required'),
});

interface ProfileTabProps {
  initialValues: ProfileData & { email: string };
  onSave: (values: ProfileData) => Promise<{ success: boolean; error?: string }>;
  savedStatus: string;
  setSavedStatus: (status: string) => void;
  setError: (error: string) => void;
}

export function ProfileTab({ initialValues, onSave, savedStatus, setSavedStatus, setError }: ProfileTabProps) {
  const profileForm = useFormik({
    initialValues,
    validationSchema: profileSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setError('');
      const res = await onSave({
        name: values.name,
        weight: Number(values.weight),
        height: Number(values.height),
        goal: values.goal
      });

      if (res.success) {
        setSavedStatus('profile');
        setTimeout(() => setSavedStatus(''), 2500);
      } else {
        setError(res.error || 'Failed to update profile');
      }
      setSubmitting(false);
    },
  });

  return (
    <form onSubmit={profileForm.handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <InputField id="s-name" label="Full Name" name="name" formik={profileForm} placeholder="Enter your name" />
        <InputField id="s-email" label="Email Address" name="email" type="email" formik={profileForm} disabled={true} />
        <InputField id="s-weight" label="Weight (kg)" name="weight" type="number" formik={profileForm} placeholder="e.g. 75" />
        <InputField id="s-height" label="Height (cm)" name="height" type="number" formik={profileForm} placeholder="e.g. 180" />
      </div>
      <div>
        <label className="text-xs font-medium text-white/50 uppercase tracking-wider block mb-2">Fitness Goal</label>
        <select id="s-goal" value={profileForm.values.goal} onChange={e => profileForm.setFieldValue('goal', e.target.value)}
          className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none cursor-pointer hover:bg-white/5 transition-colors"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          {['muscle', 'fat_loss', 'endurance', 'maintain'].map(g => (
            <option key={g} value={g} className="bg-[#0b0b2e]">
              {g === 'fat_loss' ? '🔥 Fat Loss' : g === 'muscle' ? '💪 Muscle Gain' : g === 'endurance' ? '🏃 Endurance' : '⚖️ Maintain'}
            </option>
          ))}
        </select>
      </div>
      <button id="save-profile" type="submit" disabled={profileForm.isSubmitting}
        className="btn-primary w-full py-4 text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-60 shadow-[0_0_30px_rgba(0,212,255,0.2)]">
        {profileForm.isSubmitting ? <Loader2 className="animate-spin" size={18} /> : 
         savedStatus === 'profile' ? <><Check size={18} /> Profile Saved</> : <span>Sync Profile →</span>}
      </button>
    </form>
  );
}
