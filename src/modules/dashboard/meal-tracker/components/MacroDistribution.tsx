'use client';

import { motion } from 'framer-motion';

const MACRO_COLORS = { protein: '#00d4ff', carbs: '#9b59ff', fat: '#ff6b9d' };

interface MacroDistributionProps {
  totals: { protein: number; carbs: number; fat: number; };
}

export function MacroDistribution({ totals }: MacroDistributionProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
      className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
      <p className="text-sm font-bold text-white mb-3">Macro Distribution</p>
      <div className="flex rounded-full overflow-hidden h-3 gap-0.5 mb-3 bg-white/5">
        {(['protein', 'carbs', 'fat'] as const).map(macro => {
          const total = totals.protein + totals.carbs + totals.fat;
          const pct = total > 0 ? (totals[macro] / total) * 100 : 0;
          return (
            <motion.div key={macro} className="h-full" style={{ background: MACRO_COLORS[macro] }}
              initial={{ width: 0 }} animate={{ width: `${pct}%` }}
              transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }} />
          );
        })}
      </div>
      <div className="flex gap-4 text-xs text-white/50">
        {(['protein', 'carbs', 'fat'] as const).map(macro => (
          <span key={macro} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: MACRO_COLORS[macro] }} />
            {macro.charAt(0).toUpperCase() + macro.slice(1)}: {totals[macro]}g
          </span>
        ))}
      </div>
    </motion.div>
  );
}
