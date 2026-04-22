'use client';

import { motion } from 'framer-motion';
import { GrowthTrend } from '../types';

interface GrowthChartProps {
  data: GrowthTrend[];
}

export function GrowthChart({ data }: GrowthChartProps) {
  if (!data || data.length === 0) return null;
  
  const max = Math.max(...data.map(d => d.users), 1);
  const width = 320;
  const height = 70;
  const pts = data.map((d, i) => ({
    x: (i / (data.length - 1)) * width,
    y: height - (d.users / max) * height,
  }));
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const area = `${path} L ${pts[pts.length - 1].x} ${height} L 0 ${height} Z`;

  return (
    <div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ height: 70 }} preserveAspectRatio="none">
        <defs>
          <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9b59ff" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#9b59ff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path d={area} fill="url(#ag)"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} />
        <motion.path d={path} fill="none" stroke="#9b59ff" strokeWidth="2" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ delay: 0.3, duration: 1.5 }} />
      </svg>
      <div className="flex justify-between mt-1 px-1">
        {data.map((d, i) => (
            i % 2 === 0 && <span key={d.date} className="text-[8px] text-white/25 uppercase font-black">{d.date}</span>
        ))}
      </div>
    </div>
  );
}
