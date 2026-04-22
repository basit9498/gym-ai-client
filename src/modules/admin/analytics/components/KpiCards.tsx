'use client';

import { motion } from 'framer-motion';
import { Users, Activity, DollarSign, Cpu } from 'lucide-react';
import { Counter } from './Counter';

interface KpiCardsProps {
  data: {
    totalUsers: number;
    activeToday: number;
    totalRevenue: number;
    aiRequests: number;
  };
}

export function KpiCards({ data }: KpiCardsProps) {
  const KPI_CARDS = [
    { label: 'Total Users', value: data.totalUsers, icon: Users, color: '#9b59ff', glow: 'rgba(155,89,255,0.12)', prefix: '', suffix: '', trend: 'Real-time Sync' },
    { label: 'Active Today', value: data.activeToday, icon: Activity, color: '#00d4ff', glow: 'rgba(0,212,255,0.1)', prefix: '', suffix: '', trend: 'Interactions' },
    { label: 'Total Revenue', value: data.totalRevenue, icon: DollarSign, color: '#00ff80', glow: 'rgba(0,255,128,0.1)', prefix: '$', suffix: '', trend: 'Completed' },
    { label: 'AI Agent Requests', value: data.aiRequests, icon: Cpu, color: '#ff6b9d', glow: 'rgba(255,107,157,0.1)', prefix: '', suffix: '', trend: 'LLM Response' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {KPI_CARDS.map((card, i) => {
        const Icon = card.icon;
        return (
          <motion.div key={card.label}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            whileHover={{ y: -4 }}
            className="relative rounded-2xl p-6 overflow-hidden group shadow-2xl"
            style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid rgba(255,255,255,0.07)` }}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `radial-gradient(ellipse at 0% 0%, ${card.glow} 0%, transparent 60%)` }} />
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                style={{ background: card.glow, border: `1px solid ${card.color}25` }}>
                <Icon size={18} style={{ color: card.color }} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/30">{card.trend}</span>
            </div>
            <p className="text-3xl font-black text-white mb-0.5">
              <Counter target={card.value} prefix={card.prefix} suffix={card.suffix} />
            </p>
            <p className="text-xs font-bold uppercase tracking-tighter text-white/40">{card.label}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
