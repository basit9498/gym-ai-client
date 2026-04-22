'use client';

import { motion } from 'framer-motion';
import { Flame, Utensils, Zap, Trophy, Brain, Loader2 } from 'lucide-react';
import DashboardTopbar from '../components/Topbar';
import StatCard from '../components/StatCard';
import { getSession } from '@/modules/auth';
import { useOverview } from './hooks/useOverview';
import { BarChart } from './components/BarChart';
import { DualBarChart } from './components/DualBarChart';
import { AIChatBox } from './components/AIChatBox';

export function OverviewModule() {
  const user = getSession();
  const { data, loading } = useOverview();

  if (loading || !data) {
    return (
      <div className="flex flex-col flex-1 bg-[#05051a]">
        <DashboardTopbar title="Overview" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="animate-spin text-[#00d4ff] mx-auto mb-4" size={32} />
            <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">Synchronizing Bio-Data...</p>
          </div>
        </div>
      </div>
    );
  }

  const { userStats, workoutPlan, weeklyProgress, calorieData } = data;

  const STAT_CARDS = [
    { title: "Today's Workout", value: workoutPlan?.name || 'Rest Day', subtitle: workoutPlan ? `${workoutPlan.duration} min · Targeted Session` : 'Recovery in progress', icon: Flame, color: '#ff6b9d', glow: 'rgba(255,107,157,0.1)', trend: { value: 'Today', positive: true } },
    { title: 'Calories Consumed', value: userStats.caloriesConsumed, subtitle: `Goal: ${userStats.caloriesGoal} kcal`, icon: Utensils, color: '#00d4ff', glow: 'rgba(0,212,255,0.1)', trend: { value: `${Math.round((userStats.caloriesConsumed / userStats.caloriesGoal) * 100)}%`, positive: true } },
    { title: 'Streak Days', value: `${userStats.streak} 🔥`, subtitle: 'Current active streak', icon: Zap, color: '#9b59ff', glow: 'rgba(155,89,255,0.1)', trend: { value: 'Global Ranking #4', positive: true } },
    { title: 'AI Motivation Score', value: `${userStats.motivationScore}/100`, subtitle: 'Analysis complete', icon: Trophy, color: '#00ff80', glow: 'rgba(0,255,128,0.1)', trend: { value: '+2 optimized', positive: true } },
  ];

  return (
    <div className="flex flex-col flex-1 overflow-y-auto bg-[#05051a]">
      <DashboardTopbar title="Overview" />

      <div className="flex-1 p-6 space-y-6">
        {/* Greeting */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-2xl font-black text-white">
            Hello, <span className="gradient-text">{user?.name?.split(' ')[0]}</span> 👋
          </h1>
          <p className="text-white/50 text-sm mt-1 uppercase tracking-widest text-[10px] font-black">AI Fitness Command Center Integrated</p>
        </motion.div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {STAT_CARDS.map((card, i) => <StatCard key={card.title} {...card} index={i} />)}
        </div>

        {/* Charts row */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* Weekly progress */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="rounded-3xl p-6" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-white font-black text-xs uppercase tracking-widest">Consistency Matrix</h3>
                <p className="text-white/20 text-[10px] font-bold uppercase mt-1">7-Day Performance Log</p>
              </div>
              <span className="text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest" style={{ background: 'rgba(0,212,255,0.08)', color: '#00d4ff', border: '1px solid rgba(0,212,255,0.15)' }}>
                Live Stream
              </span>
            </div>
            <BarChart data={weeklyProgress} valueKey="score" color="#00d4ff" />
          </motion.div>

          {/* Calories */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="rounded-3xl p-6" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-white font-black text-xs uppercase tracking-widest">Energy Balance</h3>
                <p className="text-white/20 text-[10px] font-bold uppercase mt-1">Intake vs Expenditure</p>
              </div>
              <div className="flex gap-4">
                <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-white/30"><span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: 'rgba(0,212,255,0.6)' }} />In</span>
                <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-white/30"><span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: 'rgba(155,89,255,0.7)' }} />Out</span>
              </div>
            </div>
            <DualBarChart data={calorieData} />
          </motion.div>
        </div>

        {/* Bottom row */}
        <div className="grid md:grid-cols-3 gap-5">
          {/* Today's plan preview */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
            className="rounded-3xl p-6" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-black text-xs uppercase tracking-widest">Active Exercises</h3>
              <a href="/dashboard/workout" className="text-[10px] font-black uppercase tracking-widest transition-colors hover:text-white" style={{ color: '#00d4ff' }}>Module →</a>
            </div>
            <div className="space-y-3">
              {workoutPlan?.exercises ? (
                workoutPlan.exercises.slice(0, 4).map((ex: any) => (
                  <div key={ex.id} className="flex items-center gap-4 group">
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all ${ex.complete ? 'bg-[#00ff80] shadow-[0_0_8px_#00ff80]' : 'bg-white/10'}`} />
                    <p className={`text-xs font-bold transition-all flex-1 ${ex.complete ? 'text-white/30 line-through' : 'text-white/80 group-hover:text-white'}`}>{ex.name}</p>
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-tighter">{ex.sets}×{ex.reps}</span>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center border-2 border-dashed border-white/5 rounded-2xl">
                    <p className="text-[10px] font-black text-white/10 uppercase tracking-widest">Rest Protocol Initiated</p>
                </div>
              )}
              {workoutPlan?.exercises && (
                <div className="pt-4 border-t border-white/5 mt-2">
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-white/20 mb-2">
                    <span>Protocol Status</span>
                    <span className="text-white/40">{Math.round((workoutPlan.exercises.filter((e: any) => e.complete).length / workoutPlan.exercises.length) * 100)}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden bg-white/5 border border-white/[0.02]">
                    <motion.div className="h-full rounded-full" style={{ background: 'linear-gradient(90deg,#00d4ff,#9b59ff)' }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(workoutPlan.exercises.filter((e: any) => e.complete).length / workoutPlan.exercises.length) * 100}%` }}
                      transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }} />
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* AI Chat takes 2 cols */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="md:col-span-2 rounded-3xl p-6 flex flex-col"
            style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', minHeight: 280 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center shadow-lg"
                style={{ background: 'linear-gradient(135deg,#00d4ff,#9b59ff)' }}>
                <Brain size={16} className="text-white" />
              </div>
              <div>
                <h3 className="text-white font-black text-xs uppercase tracking-widest leading-none">AI Bio-Coach Interface</h3>
                <p className="text-[9px] font-black uppercase tracking-tighter mt-1" style={{ color: '#00d4ff' }}>● Encryption Active · Synchronized</p>
              </div>
              <a href="/dashboard/ai-coach" className="ml-auto text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors" style={{ color: '#00d4ff' }}>Terminal →</a>
            </div>
            <AIChatBox />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
