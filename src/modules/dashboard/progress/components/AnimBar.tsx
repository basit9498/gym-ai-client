'use client';

import { motion } from 'framer-motion';

interface AnimBarProps {
  label: string;
  current: number;
  max: number;
  color: string;
}

export function AnimBar({ label, current, max, color }: AnimBarProps) {
  const pct = Math.min((current / max) * 100, 100);
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="text-white/70">{label}</span>
        <span className="font-bold" style={{ color }}>{current.toFixed(1)}</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <motion.div className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}80)` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }} />
      </div>
    </div>
  );
}
