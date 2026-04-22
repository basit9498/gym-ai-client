'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { WorkoutSession, Exercise } from '../types';

const MUSCLE_COLORS: Record<string, string> = {
  Chest: '#00d4ff', Triceps: '#9b59ff', Back: '#ff6b9d', Biceps: '#00ff80',
  Legs: '#ffb800', Shoulders: '#ff6b3d', Core: '#22d3ee',
};

interface ExerciseListProps {
  session: WorkoutSession;
  expanded: string | null;
  onToggleExpand: (id: string) => void;
  onToggleExercise: (session: WorkoutSession, exercise: Exercise) => void;
}

export function ExerciseList({ session, expanded, onToggleExpand, onToggleExercise }: ExerciseListProps) {
  const exercises = session?.exercises || [];

  return (
    <div className="space-y-3 pb-8">
      {exercises.map((ex, i) => {
        const done = ex.isCompleted;
        const open = expanded === ex._id;
        const color = MUSCLE_COLORS['Chest'] || '#00d4ff'; // Mocking color selection since we don't have muscle target in exercise yet

        return (
          <motion.div key={ex._id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07 }} className="rounded-2xl overflow-hidden"
            style={{ background: done ? 'rgba(0,255,128,0.04)' : 'rgba(255,255,255,0.03)', border: `1px solid ${done ? 'rgba(0,255,128,0.2)' : 'rgba(255,255,255,0.07)'}` }}>
            <div className="flex items-center gap-4 p-4">
              <button onClick={() => onToggleExercise(session, ex)} disabled={done}
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
                style={{ background: done ? '#00ff80' : 'rgba(255,255,255,0.06)', border: done ? 'none' : '1px solid rgba(255,255,255,0.12)' }}>
                <AnimatePresence>{done && <Check size={14} className="text-black" strokeWidth={3} />}</AnimatePresence>
              </button>

              <div className="flex-1 min-w-0 pointer-events-none">
                <p className={`font-semibold text-sm ${done ? 'line-through text-white/40' : 'text-white'}`}>{ex.name}</p>
                <span className="text-[10px] px-2 py-0.5 rounded-full inline-block mt-1 uppercase font-bold tracking-tight"
                  style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}>
                  {session.focusArea || 'Exercise'}
                </span>
              </div>

              <div className="flex items-center gap-3 text-sm text-right">
                <div>
                  <p className="text-white font-bold">{ex.sets}×{ex.reps}</p>
                  <p className="text-white/40 text-xs">{ex.weight}</p>
                </div>
                <button onClick={() => onToggleExpand(ex._id)} className="text-white/30 hover:text-white/70">
                  {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {open && (
                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                  <div className="px-4 pb-4 pt-0 grid grid-cols-3 gap-3">
                    {[['Sets', ex.sets], ['Reps', ex.reps], ['Weight', ex.weight]].map(([l, v]) => (
                      <div key={l as string} className="text-center p-2.5 rounded-xl bg-white/5">
                        <p className="text-sm font-bold text-white uppercase">{v}</p>
                        <p className="text-[10px] text-white/40">{l}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
