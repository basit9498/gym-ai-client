'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Scale, Target, Loader2 } from 'lucide-react';
import DashboardTopbar from '../components/Topbar';
import { useProgress } from './hooks/useProgress';
import { AnimBar } from './components/AnimBar';
import { WeightChart } from './components/WeightChart';

export function ProgressModule() {
  const { data, loading, error, refreshProgress } = useProgress();

  if (loading) {
    return (
      <div className="flex flex-col flex-1 bg-[#05051a]">
        <DashboardTopbar title="Progress Tracking" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="animate-spin text-[#00d4ff] mx-auto mb-4" size={32} />
            <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">Analyzing Journey History...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col flex-1 bg-[#05051a]">
        <DashboardTopbar title="Progress Tracking" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-8 rounded-3xl border border-white/5 bg-white/[0.02]">
            <p className="text-white/60 mb-6 text-sm font-medium">{error || "No progress data found."}</p>
            <button 
              onClick={() => refreshProgress()} 
              className="px-6 py-3 bg-[#00d4ff] hover:bg-[#00b8e6] transition-colors text-black text-[10px] font-black rounded-xl uppercase tracking-[0.2em]"
            >
              Retry Connection
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { startWeight, currentWeight, goalWeight, bodyFatStart, bodyFatCurrent, muscleMassStart, muscleMassCurrent, weeklyStats } = data;
  const lostKg = startWeight - currentWeight;
  const toGoKg = Math.max(0, currentWeight - goalWeight);
  const overallPct = Math.round(Math.min(100, (Math.abs(startWeight - currentWeight) / Math.abs(startWeight - goalWeight)) * 100));

  return (
    <div className="flex flex-col flex-1 overflow-y-auto bg-[#05051a]">
      <DashboardTopbar title="Journey Progress" />
      <div className="flex-1 p-6 space-y-5">
        {/* Top KPI cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Weight Differential', val: `${lostKg.toFixed(1)}kg`, icon: lostKg >= 0 ? TrendingDown : TrendingUp, color: lostKg >= 0 ? '#00ff80' : '#ff6b9d', sub: `${startWeight}kg → ${currentWeight}kg` },
            { label: 'Distance to Goal', val: `${toGoKg.toFixed(1)}kg`, icon: Target, color: '#00d4ff', sub: `Target: ${goalWeight}kg` },
            { label: 'Est. Body Fat', val: `${bodyFatCurrent}%`, icon: Scale, color: '#9b59ff', sub: `${bodyFatCurrent < bodyFatStart ? '↓' : '↑'} from ${bodyFatStart}%` },
            { label: 'Overall Journey', val: `${overallPct}%`, icon: TrendingUp, color: '#ffb800', sub: 'Completion state' },
          ].map(({ label, val, icon: Icon, color, sub }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="rounded-2xl p-4 relative overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="flex items-center gap-2 mb-2">
                <Icon size={14} style={{ color }} />
                <span className="text-xs text-white/50">{label}</span>
              </div>
              <p className="text-2xl font-black text-white">{val}</p>
              <p className="text-xs text-white/40 mt-0.5 uppercase tracking-tighter font-bold">{sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Weight trend chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="rounded-3xl p-6" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-white font-black text-xs uppercase tracking-widest">Biological Weight Trend</h3>
              <p className="text-[10px] text-white/20 font-bold uppercase mt-1">Lifecycle Tracking Active</p>
            </div>
            <span className="text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest" style={{ background: 'rgba(0,255,128,0.08)', color: '#00ff80', border: '1px solid rgba(0,255,128,0.15)' }}>
              {lostKg >= 0 ? '-' : '+'}{Math.abs(lostKg).toFixed(1)}kg Delta
            </span>
          </div>
          <WeightChart data={weeklyStats} />
          <div className="flex justify-between mt-4 px-1">
            {weeklyStats.map((w, i) => (
              <span key={i} className="text-[10px] font-black text-white/20 uppercase">{w.week}</span>
            ))}
          </div>
        </motion.div>

        {/* Body composition */}
        <div className="grid md:grid-cols-2 gap-5">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
            className="rounded-3xl p-6 space-y-6" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 className="text-white font-black text-xs uppercase tracking-widest mb-2">Composition Matrix</h3>
            <AnimBar label={`Body Fat Delta (start: ${bodyFatStart}%)`} current={bodyFatCurrent} max={bodyFatStart > 0 ? bodyFatStart : 100} color="#ff6b9d" />
            <AnimBar label={`Muscle Mass (start: ${muscleMassStart}kg)`} current={muscleMassCurrent} max={muscleMassCurrent + 10} color="#9b59ff" />
            <AnimBar label={`Weight Management (Current: ${currentWeight}kg)`} current={currentWeight} max={startWeight > currentWeight ? startWeight : currentWeight + 10} color="#00d4ff" />
          </motion.div>

          {/* Before/After placeholder */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.55 }}
            className="rounded-3xl p-6" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 className="text-white font-black text-xs uppercase tracking-widest mb-6">Visual Evolution</h3>
            <div className="grid grid-cols-2 gap-4">
              {['Baseline', 'Latest'].map((label, i) => (
                <div key={label}>
                  <div className="rounded-2xl flex flex-col items-center justify-center py-12 mb-3 shadow-inner"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '2px dashed rgba(255,255,255,0.05)' }}>
                    <span className="text-3xl mb-3">{i === 0 ? '📸' : '⚡'}</span>
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Upload Profile</span>
                  </div>
                  <p className="text-center text-xs font-black text-white uppercase tracking-tighter">{label}</p>
                  <p className="text-center text-[10px] font-bold text-white/30 uppercase mt-0.5">{i === 0 ? `${startWeight}kg` : `${currentWeight}kg`}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
