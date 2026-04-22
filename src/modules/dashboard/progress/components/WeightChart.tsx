'use client';

import { motion } from 'framer-motion';
import { WeeklyStat } from '../types';

interface WeightChartProps {
  data: WeeklyStat[];
}

export function WeightChart({ data }: WeightChartProps) {
  if (!data || data.length < 2) return <div className="h-20 flex items-center justify-center text-[10px] text-white/20 uppercase font-black">Establishing Baseline...</div>;
  
  const weights = data.map(d => d.weight);
  const min = Math.min(...weights) - 2;
  const max = Math.max(...weights) + 2;
  const range = max - min;
  const width = 300;
  const height = 80;
  const pts = data.map((d, i) => ({
    x: (i / (data.length - 1)) * width,
    y: height - ((d.weight - min) / range) * height,
  }));
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const area = `${path} L ${pts[pts.length - 1].x} ${height} L 0 ${height} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ height: 80 }} preserveAspectRatio="none">
      <defs>
        <linearGradient id="wg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path d={area} fill="url(#wg)"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }} />
      <motion.path d={path} fill="none" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ delay: 0.3, duration: 1.5, ease: 'easeOut' }} />
      {pts.map((p, i) => (
        <motion.circle key={i} cx={p.x} cy={p.y} r="3" fill="#00d4ff"
          initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + i * 0.1 }} />
      ))}
    </svg>
  );
}
