'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Dumbbell, Brain, Salad, TrendingUp,
  Settings, LogOut, Zap, ChevronLeft, ChevronRight, Menu, Wallet
} from 'lucide-react';
import { logout } from '@/modules/auth';

const NAV_ITEMS = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Wallet', href: '/dashboard/wallet', icon: Wallet },
  { label: 'Workout Plan', href: '/dashboard/workout', icon: Dumbbell },
  { label: 'AI Coach Chat', href: '/dashboard/ai-coach', icon: Brain },
  { label: 'Meal Tracker', href: '/dashboard/meal-tracker', icon: Salad },

  { label: 'Progress', href: '/dashboard/progress', icon: TrendingUp },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => { logout(); router.push('/login'); };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center gap-3 px-6 py-6 ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #00d4ff, #9b59ff)' }}>
          <Zap size={16} className="text-white" fill="white" />
        </div>
        {!collapsed && (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-bold text-white">
            BodyForge<span className="gradient-text-blue">AI</span>
          </motion.span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <a key={item.href} href={item.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative
                ${collapsed ? 'justify-center' : ''}`}
              style={active
                ? { background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)' }
                : { border: '1px solid transparent' }
              }
            >
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full"
                  style={{ background: 'linear-gradient(to bottom, #00d4ff, #9b59ff)' }} />
              )}
              <Icon size={18} style={{ color: active ? '#00d4ff' : 'rgba(255,255,255,0.4)', flexShrink: 0 }}
                className="group-hover:text-white transition-colors" />
              {!collapsed && (
                <span className={`text-sm font-medium ${active ? 'text-white' : 'text-white/50'} group-hover:text-white transition-colors`}>
                  {item.label}
                </span>
              )}
              {active && !collapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff' }} />
              )}
            </a>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-3 space-y-1">
        <button onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-white/40 hover:text-red-400
            hover:bg-red-400/10 transition-all duration-200 ${collapsed ? 'justify-center' : ''}`}>
          <LogOut size={18} className="flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Sign Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 240 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="hidden md:flex flex-col relative flex-shrink-0 h-screen sticky top-0 z-40"
        style={{
          background: 'rgba(7,7,26,0.95)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <SidebarContent />
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(v => !v)}
          className="absolute -right-4 top-20 w-8 h-8 rounded-full flex items-center justify-center z-10 transition-all duration-200 hover:scale-110"
          style={{ background: '#07071a', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </motion.aside>

      {/* Mobile: hamburger + slide drawer */}
      <button onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 w-10 h-10 flex items-center justify-center rounded-xl"
        style={{ background: 'rgba(7,7,26,0.9)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <Menu size={18} className="text-white" />
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)} />
            <motion.aside initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="md:hidden fixed left-0 top-0 bottom-0 w-64 z-50 flex flex-col"
              style={{ background: '#07071a', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
