'use client';

import { motion } from 'framer-motion';

interface DualBarChartProps {
  data: any[];
}

export function DualBarChart({ data }: DualBarChartProps) {
  if (!data || data.length === 0) return <div className="h-20 flex items-center justify-center text-[10px] text-white/10 uppercase font-black">Syncing Cycles...</div>;
  const max = Math.max(...data.map(d => Math.max(d.consumed || 0, d.burned || 0)), 1);
  return (
    <div className="flex items-end gap-2 h-20">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
          <div className="w-full flex gap-0.5 items-end" style={{ height: 64 }}>
            <motion.div className="flex-1 rounded-t-sm"
              style={{ background: 'rgba(0,212,255,0.4)' }}
              initial={{ height: 0 }}
              animate={{ height: `${((d.consumed || 0) / max) * 100}%` }}
              transition={{ delay: 0.3 + i * 0.06, duration: 0.7, ease: 'easeOut' }} />
            <motion.div className="flex-1 rounded-t-sm"
              style={{ background: 'rgba(155,89,255,0.6)' }}
              initial={{ height: 0 }}
              animate={{ height: `${((d.burned || 0) / max) * 100}%` }}
              transition={{ delay: 0.35 + i * 0.06, duration: 0.7, ease: 'easeOut' }} />
          </div>
          <span className="text-[10px] text-white/30">{d.day}</span>
        </div>
      ))}
    </div>
  );
}
