'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, MoreVertical } from 'lucide-react';
import { User } from '../types';

const ROLE_COLORS: Record<string, { bg: string; text: string }> = {
  admin: { bg: 'rgba(155,89,255,0.12)', text: '#9b59ff' },
  user: { bg: 'rgba(0,212,255,0.08)', text: '#00d4ff' },
};

interface UserTableProps {
  users: User[];
  loading: boolean;
}

export function UserTable({ users, loading }: UserTableProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl overflow-hidden shadow-2xl" 
      style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}
    >
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 bg-white/[0.02]"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="col-span-4 lg:col-span-3">User Details</div>
        <div className="col-span-4 hidden lg:block">Email Address</div>
        <div className="col-span-2">Access Role</div>
        <div className="col-span-3 lg:col-span-2">Joined Date</div>
        <div className="col-span-1 text-right">Action</div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-white/[0.03] min-h-[400px] relative">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-[#05051a]/50 backdrop-blur-sm z-10"
            >
              <Loader2 className="animate-spin text-[#9b59ff] mb-2" size={32} />
              <p className="text-white/40 text-xs font-medium">Fetching User Directory...</p>
            </motion.div>
          ) : (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {users.length > 0 ? (
                users.map((user, i) => (
                  <motion.div key={user._id}
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="grid grid-cols-12 gap-4 items-center px-6 py-4 hover:bg-white/[0.02] transition-all group cursor-default"
                  >
                    <div className="col-span-4 lg:col-span-3 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-black text-white flex-shrink-0 shadow-lg"
                        style={{ 
                          background: user.role === 'admin' 
                            ? 'linear-gradient(135deg, #9b59ff 0%, #ff6b9d 100%)' 
                            : 'linear-gradient(135deg, #00d4ff 0%, #0066ff 100%)',
                          boxShadow: user.role === 'admin' ? '0 8px 15px rgba(155,89,255,0.2)' : '0 8px 15px rgba(0,212,255,0.2)'
                        }}>
                        {user.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-white group-hover:text-[#9b59ff] transition-colors truncate">{user.name}</p>
                        <p className="text-[10px] text-white/20 uppercase tracking-tighter">UID: {user._id.slice(-8)}</p>
                      </div>
                    </div>
                    <div className="col-span-4 hidden lg:block">
                      <p className="text-sm text-white/50 truncate font-medium">{user.email}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-wider shadow-sm"
                        style={ROLE_COLORS[user.role]}>
                        {user.role}
                      </span>
                    </div>
                    <div className="col-span-3 lg:col-span-2 text-xs text-white/30 font-medium">
                      {new Date(user.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <button className="w-9 h-9 rounded-2xl flex items-center justify-center transition-all bg-white/[0.02] border border-white/[0.05] hover:border-[#9b59ff]/30 hover:bg-[#9b59ff]/5 text-white/30 hover:text-white">
                        <MoreVertical size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-white/20">
                  <p className="text-sm italic">No users found in this sector.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
