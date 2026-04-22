'use client';

import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ElementType;
  color: string;
  glow: string;
  trend?: { value: string; positive: boolean };
  index?: number;
}

export default function StatCard({ title, value, subtitle, icon: Icon, color, glow, trend, index = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative rounded-2xl p-5 overflow-hidden group cursor-default"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid rgba(255,255,255,0.07)`,
      }}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 0% 0%, ${glow} 0%, transparent 60%)` }} />

      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: glow, border: `1px solid ${color}25` }}>
          <Icon size={18} style={{ color }} />
        </div>
        {trend && (
          <span className="text-xs font-semibold px-2 py-1 rounded-full"
            style={{
              background: trend.positive ? 'rgba(0,255,128,0.1)' : 'rgba(239,68,68,0.1)',
              color: trend.positive ? '#00ff80' : '#f87171',
            }}>
            {trend.positive ? '↑' : '↓'} {trend.value}
          </span>
        )}
      </div>

      {/* Value */}
      <p className="text-3xl font-black text-white mb-1">{value}</p>
      <p className="text-sm font-medium text-white/70">{title}</p>
      {subtitle && <p className="text-xs text-white/40 mt-0.5">{subtitle}</p>}

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${color}40, transparent)` }} />
    </motion.div>
  );
}
