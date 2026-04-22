'use client';

import { motion } from 'framer-motion';
import { Loader2, TrendingUp } from 'lucide-react';
import { KpiCards } from './components/KpiCards';
import { GrowthChart } from './components/GrowthChart';
import { ActivityFeed } from './components/ActivityFeed';
import { useAnalytics } from './hooks/useAnalytics';
import { AdminTopbar } from '../components/AdminTopbar';

export function AnalyticsModule() {
  const { data, loading, error } = useAnalytics();

  if (loading || !data) {
    return (
        <div className="flex flex-col flex-1 bg-[#05051a]">
            <AdminTopbar title="Admin Overview" />
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="animate-spin text-[#9b59ff] mx-auto mb-4" size={32} />
                    <p className="text-white/40 text-sm font-medium">Initializing Analysis Engine...</p>
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 overflow-y-auto bg-[#05051a]">
      <AdminTopbar title="Admin Analytics Hub" />
      <div className="flex-1 p-6 space-y-6">

        <KpiCards data={data} />

        <div className="grid gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="rounded-3xl p-6 shadow-2xl relative overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-white font-black text-xs uppercase tracking-[0.2em]">Platform Growth Trend</h3>
                <p className="text-[10px] text-white/20 font-bold uppercase mt-1 tracking-widest">Last 7 Cycles</p>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest" style={{ color: '#00ff80' }}>
                <TrendingUp size={12} /> Live Multi-Agent Sync
              </div>
            </div>
            <GrowthChart data={data.growthTrend} />
          </motion.div>
        </div>

        <ActivityFeed activities={data.recentActivity} />
      </div>
    </div>
  );
}
