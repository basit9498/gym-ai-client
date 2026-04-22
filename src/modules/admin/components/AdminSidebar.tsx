'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Users, BarChart3, Settings, FileText, LogOut, Shield, ChevronLeft, ChevronRight, Menu, Wallet } from 'lucide-react';
import { logout } from '@/modules/auth';

const NAV = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Users', href: '/admin/users', icon: Users },
  { label: 'Finance', href: '/admin/finance', icon: Wallet },
  // { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => { logout(); router.push('/login'); };

  const Content = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center gap-3 px-5 py-6 ${collapsed ? 'justify-center' : ''}`}
        style={{ borderBottom: '1px solid rgba(155,89,255,0.1)' }}>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg,#9b59ff,#ff6b9d)' }}>
          <Shield size={15} className="text-white" />
        </div>
        {!collapsed && (
          <div>
            <p className="font-bold text-white text-sm leading-none">Admin Panel</p>
            <p className="text-xs mt-0.5" style={{ color: '#9b59ff' }}>BodyForgeAI</p>
          </div>
        )}
      </div>

      <nav className="flex-1 px-2.5 py-4 space-y-1">
        {NAV.map(item => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <a key={item.href} href={item.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${collapsed ? 'justify-center' : ''}`}
              style={active
                ? { background: 'rgba(155,89,255,0.12)', border: '1px solid rgba(155,89,255,0.25)' }
                : { border: '1px solid transparent' }
              }>
              <Icon size={17} style={{ color: active ? '#9b59ff' : 'rgba(255,255,255,0.35)', flexShrink: 0 }}
                className="group-hover:text-white transition-colors" />
              {!collapsed && (
                <span className={`text-sm font-medium ${active ? 'text-white' : 'text-white/45'} group-hover:text-white transition-colors`}>
                  {item.label}
                </span>
              )}
            </a>
          );
        })}
      </nav>

      <div className="p-2.5 mb-2">
        <button onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all ${collapsed ? 'justify-center' : ''}`}>
          <LogOut size={17} className="flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Sign Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <motion.aside
        animate={{ width: collapsed ? 68 : 230 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="hidden md:flex flex-col flex-shrink-0 h-screen sticky top-0 relative"
        style={{ background: '#05051a', borderRight: '1px solid rgba(155,89,255,0.1)' }}>
        <Content />
        <button onClick={() => setCollapsed(v => !v)}
          className="absolute -right-4 top-20 w-8 h-8 rounded-full flex items-center justify-center z-10 transition-all hover:scale-110"
          style={{ background: '#05051a', border: '1px solid rgba(155,89,255,0.2)', color: 'rgba(255,255,255,0.4)' }}>
          {collapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
        </button>
      </motion.aside>

      <button onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 w-10 h-10 flex items-center justify-center rounded-xl"
        style={{ background: '#05051a', border: '1px solid rgba(155,89,255,0.2)' }}>
        <Menu size={17} className="text-white" />
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 z-40 bg-black/60" onClick={() => setMobileOpen(false)} />
            <motion.aside initial={{ x: -240 }} animate={{ x: 0 }} exit={{ x: -240 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="md:hidden fixed left-0 top-0 bottom-0 w-60 z-50 flex flex-col"
              style={{ background: '#05051a', borderRight: '1px solid rgba(155,89,255,0.15)' }}>
              <Content />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
