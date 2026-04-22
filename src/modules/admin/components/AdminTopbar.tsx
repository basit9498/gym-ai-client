'use client';

import { Bell, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Mock getSession and logout for now, or import from auth module if ready
// For now, I'll assume they will be in @/modules/auth
import { logout } from '@/modules/auth'; 

interface AdminTopbarProps {
  title: string;
  userName?: string;
}

export function AdminTopbar({ title, userName = 'Admin' }: AdminTopbarProps) {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-30 flex items-center gap-4 px-6 py-4"
      style={{ background: 'rgba(5,5,26,0.85)', borderBottom: '1px solid rgba(155,89,255,0.1)', backdropFilter: 'blur(20px)' }}>
      <h2 className="text-white font-bold text-lg flex-1">{title}</h2>
      <div className="flex items-center gap-3">
        <button className="w-9 h-9 flex items-center justify-center rounded-xl"
          style={{ background: 'rgba(155,89,255,0.08)', border: '1px solid rgba(155,89,255,0.15)' }}>
          <Bell size={15} style={{ color: '#9b59ff' }} />
        </button>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
          style={{ background: 'rgba(155,89,255,0.08)', border: '1px solid rgba(155,89,255,0.15)' }}>
          <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold text-white"
            style={{ background: 'linear-gradient(135deg,#9b59ff,#ff6b9d)' }}>
            {userName.charAt(0)}
          </div>
          <span className="text-sm text-white/70 hidden sm:block">{userName}</span>
        </div>
        <button onClick={handleLogout}
          className="w-9 h-9 flex items-center justify-center rounded-xl text-red-400/60 hover:text-red-400 hover:bg-red-400/10 transition-all"
          style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
          <LogOut size={15} />
        </button>
      </div>
    </header>
  );
}
