'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Salad } from 'lucide-react';
import { Meal } from '../types';

interface MealListProps {
  meals: Meal[];
  loading: boolean;
}

export function MealList({ meals, loading }: MealListProps) {
  if (loading) {
    return <div className="text-center py-10 opacity-30 italic text-sm">Loading nutrition data...</div>;
  }

  if (meals.length === 0) {
    return <div className="text-center py-10 opacity-30 italic text-sm">No meals logged for this date.</div>;
  }

  return (
    <AnimatePresence>
      {meals.map((meal, i) => (
        <motion.div key={meal._id}
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ delay: i * 0.06 }}
          className="flex items-center gap-4 p-4 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(255,184,0,0.1)', border: '1px solid rgba(255,184,0,0.2)' }}>
            <Salad size={18} style={{ color: '#ffb800' }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm truncate">{meal.title}</p>
            <p className="text-white/40 text-xs uppercase tracking-tighter font-bold">{meal.mealType}</p>
          </div>
          <div className="flex gap-4 text-right">
            <div><p className="text-sm font-bold" style={{ color: '#ffb800' }}>{meal.totalCalories}</p><p className="text-xs text-white/30">kcal</p></div>
            <div className="hidden sm:block"><p className="text-sm font-bold" style={{ color: '#00d4ff' }}>{meal.totalProtein}g</p><p className="text-xs text-white/30">protein</p></div>
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
