'use client';

import { AlertCircle } from 'lucide-react';

interface InputFieldProps {
  id: string;
  label: string;
  name: string;
  type?: string;
  formik: any;
  disabled?: boolean;
  rightSlot?: React.ReactNode;
  placeholder?: string;
}

export function InputField({ id, label, name, type = 'text', formik, disabled = false, rightSlot, placeholder }: InputFieldProps) {
  const val = formik.values as Record<string, string>;
  const touched = (formik.touched as Record<string, boolean>)[name];
  const error = (formik.errors as Record<string, string>)[name];
  
  return (
    <div>
      <label className="text-xs font-medium text-white/50 uppercase tracking-wider block mb-2">{label}</label>
      <div className="relative">
        <input id={id} type={type} placeholder={placeholder} disabled={disabled}
          value={val[name]} onChange={e => formik.setFieldValue(name, e.target.value)}
          onBlur={() => formik.setFieldTouched(name)}
          className={`w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition-all ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${touched && error ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.08)'}` }} />
        {rightSlot && <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightSlot}</div>}
      </div>
      {touched && error && <p className="text-xs text-red-500 mt-1 flex items-center gap-1.5"><AlertCircle size={12} /> {error}</p>}
    </div>
  );
}
