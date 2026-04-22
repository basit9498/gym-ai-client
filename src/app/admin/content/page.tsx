'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Check, Dumbbell, Salad } from 'lucide-react';
import { mockWorkoutTemplates, mockMealPlans } from '@/modules/admin';

type TmplItem = typeof mockWorkoutTemplates[number];
type MealItem = typeof mockMealPlans[number];

const LEVEL_COLORS: Record<string, string> = {
  Beginner: '#00ff80', Intermediate: '#00d4ff', Advanced: '#ff6b9d',
};

export default function AdminContentPage() {
  const [tab, setTab] = useState<'workouts' | 'meals'>('workouts');
  const [workouts, setWorkouts] = useState(mockWorkoutTemplates);
  const [meals, setMeals] = useState(mockMealPlans);
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  const deleteWorkout = (id: string) => setWorkouts(w => w.filter(t => t.id !== id));
  const deleteMeal = (id: string) => setMeals(m => m.filter(t => t.id !== id));

  return (
    <div className="flex flex-col flex-1 overflow-y-auto">
      <header className="sticky top-0 z-30 flex items-center gap-4 px-6 py-4"
        style={{ background: 'rgba(5,5,26,0.85)', borderBottom: '1px solid rgba(155,89,255,0.1)', backdropFilter: 'blur(20px)' }}>
        <h2 className="text-white font-bold text-lg">Content Control</h2>
      </header>

      <div className="flex-1 p-6 space-y-5">
        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-2xl w-fit"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
          {['workouts', 'meals'].map(t => (
            <button key={t} onClick={() => setTab(t as 'workouts' | 'meals')}
              className="px-5 py-2.5 rounded-xl text-sm font-medium capitalize transition-all duration-200"
              style={tab === t ? { background: 'linear-gradient(135deg,#9b59ff,#00d4ff)', color: 'white' } : { color: 'rgba(255,255,255,0.4)' }}>
              {t === 'workouts' ? '💪 Workout Templates' : '🥗 Meal Plans'}
            </button>
          ))}
        </div>

        {/* Add button */}
        <div className="flex justify-between items-center">
          <p className="text-white/50 text-sm">{tab === 'workouts' ? workouts.length : meals.length} templates</p>
          <button onClick={() => setAdding(v => !v)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105"
            style={{ background: 'rgba(155,89,255,0.1)', color: '#9b59ff', border: '1px solid rgba(155,89,255,0.2)' }}>
            {adding ? <><X size={14} /> Cancel</> : <><Plus size={14} /> Add {tab === 'workouts' ? 'Template' : 'Plan'}</>}
          </button>
        </div>

        {/* Add form placeholder */}
        <AnimatePresence>
          {adding && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="rounded-2xl p-5" style={{ background: 'rgba(155,89,255,0.05)', border: '1px solid rgba(155,89,255,0.15)' }}>
              <h4 className="text-sm font-bold text-white mb-3">New {tab === 'workouts' ? 'Workout Template' : 'Meal Plan'}</h4>
              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                {['Name', 'Category', tab === 'workouts' ? 'Level' : 'Goal', 'Description'].map(field => (
                  <div key={field}>
                    <label className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">{field}</label>
                    <input placeholder={`Enter ${field.toLowerCase()}…`}
                      className="w-full px-3.5 py-2.5 rounded-xl text-white text-sm outline-none"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }} />
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button className="btn-primary px-5 py-2 text-sm font-bold flex items-center gap-2" onClick={() => setAdding(false)}>
                  <span><Check size={13} /> Save Template</span>
                </button>
                <button onClick={() => setAdding(false)} className="px-5 py-2 rounded-xl text-sm text-white/50 hover:text-white transition-colors"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Workout templates */}
        {tab === 'workouts' && (
          <div className="space-y-3">
            <AnimatePresence>
              {workouts.map((tmpl, i) => (
                <motion.div key={tmpl.id}
                  initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 15 }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-4 p-4 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.025)', border: editing === tmpl.id ? '1px solid rgba(155,89,255,0.3)' : '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(155,89,255,0.1)', border: '1px solid rgba(155,89,255,0.2)' }}>
                    <Dumbbell size={17} style={{ color: '#9b59ff' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-white">{tmpl.name}</p>
                      <span className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: `${LEVEL_COLORS[tmpl.level]}15`, color: LEVEL_COLORS[tmpl.level], border: `1px solid ${LEVEL_COLORS[tmpl.level]}30` }}>
                        {tmpl.level}
                      </span>
                    </div>
                    <p className="text-xs text-white/40 mt-0.5">{tmpl.category} · {tmpl.days} days/week · {tmpl.exercises} exercises</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditing(editing === tmpl.id ? null : tmpl.id)}
                      className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                      style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.15)' }}>
                      <Pencil size={13} style={{ color: '#00d4ff' }} />
                    </button>
                    <button onClick={() => deleteWorkout(tmpl.id)}
                      className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                      style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)' }}>
                      <Trash2 size={13} className="text-red-400" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Meal plans */}
        {tab === 'meals' && (
          <div className="space-y-3">
            <AnimatePresence>
              {meals.map((plan, i) => (
                <motion.div key={plan.id}
                  initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 15 }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-4 p-4 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(255,184,0,0.1)', border: '1px solid rgba(255,184,0,0.2)' }}>
                    <Salad size={17} style={{ color: '#ffb800' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white">{plan.name}</p>
                    <p className="text-xs text-white/40 mt-0.5">{plan.goal} · {plan.calories} kcal · {plan.protein}g protein · {plan.meals} meals/day</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                      style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.15)' }}>
                      <Pencil size={13} style={{ color: '#00d4ff' }} />
                    </button>
                    <button onClick={() => deleteMeal(plan.id)}
                      className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                      style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)' }}>
                      <Trash2 size={13} className="text-red-400" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
