'use client';

import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { RecentActivity } from '../types';

interface ActivityFeedProps {
  activities: RecentActivity[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  const colors: Record<string, string> = { info: '#00d4ff', warn: '#ffb800', ok: '#00ff80' };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
      className="rounded-3xl p-6 shadow-2xl"
      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
            <Shield size={18} style={{ color: '#9b59ff' }} />
            <h3 className="text-white font-black text-xs uppercase tracking-[0.2em]">Agentic System Activity Feed</h3>
        </div>
        <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Global Audit Log</span>
      </div>
      <div className="grid gap-3">
        {activities.map((a, i) => (
          <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + (i * 0.05) }}
              className="flex items-center gap-4 p-3.5 rounded-2xl group hover:bg-white/[0.03] transition-all cursor-default"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.03)' }}>
            <div className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse" 
              style={{ 
                background: colors[a.type] || colors.info, 
                boxShadow: `0 0 10px ${colors[a.type] || colors.info}` 
              }} 
            />
            <p className="text-sm font-medium text-white/70 flex-1 group-hover:text-white transition-colors">{a.msg}</p>
            <span className="text-[10px] font-black uppercase tracking-widest text-white/20 border-l border-white/5 pl-4">
              {new Date(a.time).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
