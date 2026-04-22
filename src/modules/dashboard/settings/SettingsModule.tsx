'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import DashboardTopbar from '../components/Topbar';
import { getSession } from '@/modules/auth';
import { useSettings } from './hooks/useSettings';
import { ProfileTab } from './components/ProfileTab';
import { PasswordTab } from './components/PasswordTab';

const TABS = ['Profile', 'Password'];

export function SettingsModule() {
  const user = getSession();
  const {
    tab,
    setTab,
    savedStatus,
    setSavedStatus,
    error,
    setError,
    handleUpdateProfile,
    handleChangePassword
  } = useSettings();

  const initialProfileValues = { 
    name: user?.name || '', 
    email: user?.email || '', 
    goal: (user as any)?.goal || 'muscle', 
    weight: (user as any)?.weight || 70, 
    height: (user as any)?.height || 175 
  };

  return (
    <div className="flex flex-col flex-1 overflow-y-auto bg-[#05051a]">
      <DashboardTopbar title="Profile Settings" />
      <div className="flex-1 p-6 max-w-2xl mx-auto w-full">

        {/* Status Messages */}
        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3">
              <AlertCircle size={18} />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-2xl mb-8 w-fit mx-auto"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
          {TABS.map(t => (
            <button key={t} onClick={() => { setTab(t); setError(''); }}
              className="px-8 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 uppercase tracking-widest"
              style={tab === t ? { background: 'linear-gradient(135deg,#00d4ff,#9b59ff)', color: 'white', boxShadow: '0 0 20px rgba(0,212,255,0.3)' } : { color: 'rgba(255,255,255,0.4)' }}>
              {t}
            </button>
          ))}
        </div>

        <motion.div key={tab} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          {tab === 'Profile' && (
            <ProfileTab 
              initialValues={initialProfileValues as any}
              onSave={handleUpdateProfile}
              savedStatus={savedStatus}
              setSavedStatus={setSavedStatus}
              setError={setError}
            />
          )}

          {tab === 'Password' && (
            <PasswordTab 
              onSave={handleChangePassword}
              savedStatus={savedStatus}
              setSavedStatus={setSavedStatus}
              setError={setError}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}
