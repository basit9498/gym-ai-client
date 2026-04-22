'use client';

import { motion } from 'framer-motion';

interface BarChartProps {
  data: any[];
  valueKey: string;
  color: string;
}

export function BarChart({ data, valueKey, color }: BarChartProps) {
  if (!data || data.length === 0) return <div className="h-16 flex items-center justify-center text-[10px] text-white/10 uppercase font-black">No Data Points</div>;
  const max = Math.max(...data.map(d => d[valueKey] || 0), 1);
  return (
    <div className="flex items-end gap-1.5 h-16">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <motion.div
            className="w-full rounded-t-sm"
            style={{ background: i === data.length - 1 ? `linear-gradient(to top, ${color}, ${color}80)` : 'rgba(255,255,255,0.08)' }}
            initial={{ height: 0 }}
            animate={{ height: `${((d[valueKey] || 0) / max) * 100}%` }}
            transition={{ delay: 0.3 + i * 0.06, duration: 0.7, ease: 'easeOut' }}
          />
          <span className="text-[10px] text-white/30">{d.day}</span>
        </div>
      ))}
    </div>
  );
}
