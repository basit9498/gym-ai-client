'use client';

import { motion } from 'framer-motion';
import { Timer, Flame } from 'lucide-react';
import { WorkoutSession } from '../types';

interface SessionDetailProps {
  session: WorkoutSession;
  planTitle: string;
  activeDayIdx: number;
}

export function SessionDetail({ session, planTitle, activeDayIdx }: SessionDetailProps) {
  const exercises = session?.exercises || [];
  const completedCount = exercises.filter((e) => e.isCompleted).length;
  const pct = exercises.length > 0 ? Math.round((completedCount / exercises.length) * 100) : 0;

  return (
    <motion.div key={activeDayIdx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
      className="rounded-3xl p-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, rgba(0,102,255,0.2), rgba(155,89,255,0.15))', border: '1px solid rgba(0,212,255,0.25)' }}>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold mb-3 uppercase tracking-wider"
            style={{ background: 'rgba(0,212,255,0.15)', color: '#00d4ff', border: '1px solid rgba(0,212,255,0.3)' }}>
            {session?.dayName || 'Workout'}
          </div>
          <h1 className="text-2xl font-black text-white">{session?.title || planTitle}</h1>
          <div className="flex items-center gap-4 mt-2">
            <span className="flex items-center gap-1.5 text-sm font-medium text-white/50"><Timer size={14} />{session?.estimatedMinutes || 45} min</span>
            <span className="flex items-center gap-1.5 text-sm font-medium text-white/50"><Flame size={14} />350 kcal</span>
            {session?.focusArea && <span className="flex items-center gap-1.5 text-sm font-medium text-white/50 px-2 py-0.5 rounded-lg bg-white/5">{session.focusArea}</span>}
          </div>
        </div>
        <div className="text-right">
          <p className="text-5xl font-black text-white">{pct}%</p>
          <p className="text-xs font-bold text-white/40 uppercase tracking-tighter mt-1">{completedCount}/{exercises.length} Exercises done</p>
        </div>
      </div>

      <div className="mt-6 h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
        <motion.div className="h-full rounded-full" style={{ background: 'linear-gradient(90deg,#00d4ff,#9b59ff)' }}
          animate={{ width: `${pct}%` }} transition={{ duration: 0.8, ease: 'easeOut' }} />
      </div>
    </motion.div>
  );
}
