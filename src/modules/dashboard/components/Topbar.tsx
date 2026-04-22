'use client';

import { useState, useEffect } from 'react';
import { Bell, Search, ChevronDown, LogOut } from 'lucide-react';
import { getSession, logout } from '@/modules/auth';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { topbarNotifications } from '../data/topbar-notifications';

export default function DashboardTopbar({ title }: { title?: string }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const user = getSession();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const unreadCount = topbarNotifications.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-30 flex items-center gap-4 px-6 py-4"
      style={{ background: 'rgba(3,3,15,0.8)', borderBottom: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)' }}>
      {/* Title */}
      <h2 className="text-white font-bold text-lg hidden md:block flex-shrink-0">{title || 'Dashboard'}</h2>

      {/* Search */}
      <div className="flex-1 max-w-xs hidden md:flex items-center gap-2 px-4 py-2.5 rounded-2xl ml-4"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <Search size={14} className="text-white/30" />
        <input placeholder="Search workouts, meals…" className="bg-transparent text-white/60 text-sm outline-none placeholder-white/25 flex-1" />
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {/* Notifications */}
        <div className="relative">
          <button onClick={() => { setNotifOpen(v => !v); setProfileOpen(false); }}
            className="relative w-9 h-9 flex items-center justify-center rounded-xl transition-all hover:bg-white/5"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            <Bell size={16} className="text-white/60" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center text-white font-bold"
                style={{ background: 'linear-gradient(135deg, #00d4ff, #9b59ff)', fontSize: 10 }}>
                {unreadCount}
              </span>
            )}
          </button>
          <AnimatePresence>
            {notifOpen && (
              <motion.div initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.95 }}
                className="absolute right-0 top-12 w-80 rounded-2xl p-2 z-50"
                style={{ background: '#07071a', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
                <p className="text-xs font-bold text-white/50 uppercase tracking-wider px-3 py-2">Notifications</p>
                {topbarNotifications.map((n) => (
                  <div key={n.id} className="flex gap-3 px-3 py-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                      style={{ background: n.unread ? '#00d4ff' : 'transparent', border: n.unread ? 'none' : '1px solid rgba(255,255,255,0.2)' }} />
                    <div>
                      <p className={`text-sm ${n.unread ? 'text-white/90' : 'text-white/50'}`}>{n.msg}</p>
                      <p className="text-xs text-white/30 mt-0.5">{n.time}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="relative">
          <button onClick={() => { setProfileOpen(v => !v); setNotifOpen(false); }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all hover:bg-white/5"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #00d4ff, #9b59ff)' }}>
              {mounted ? (user?.name?.charAt(0) ?? 'U') : 'U'}
            </div>
            <span className="text-sm text-white/80 hidden sm:block max-w-[100px] truncate">
              {mounted ? user?.name : 'Guest'}
            </span>
            <ChevronDown size={13} className="text-white/40" />
          </button>
          <AnimatePresence>
            {profileOpen && (
              <motion.div initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.95 }}
                className="absolute right-0 top-12 w-48 rounded-2xl p-1.5 z-50"
                style={{ background: '#07071a', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
                <div className="px-3 py-2.5 border-b border-white/5 mb-1">
                  <p className="text-xs font-semibold text-white">{mounted ? user?.name : '...'}</p>
                  <p className="text-xs text-white/40">{mounted ? user?.email : '...'}</p>
                </div>
                <a href="/dashboard/settings" className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all">
                  Settings
                </a>
                <button onClick={() => { logout(); router.push('/login'); }}
                  className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-400/10 transition-all">
                  <LogOut size={13} /> Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
