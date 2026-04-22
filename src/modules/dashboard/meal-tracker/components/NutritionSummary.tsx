'use client';

import { motion } from 'framer-motion';
import { Flame, Zap, Salad } from 'lucide-react';

interface NutritionSummaryProps {
  totals: { calories: number; protein: number; carbs: number; fat: number; };
  goals: { caloriesTarget: number; proteinTarget: number; carbsTarget: number; fatTarget: number; };
}

export function NutritionSummary({ totals, goals }: NutritionSummaryProps) {
  const data = [
    { label: 'Calories', val: totals.calories, target: goals.caloriesTarget, unit: 'kcal', color: '#ffb800', icon: Flame },
    { label: 'Protein', val: totals.protein, target: goals.proteinTarget, unit: 'g', color: '#00d4ff', icon: Zap },
    { label: 'Carbs', val: totals.carbs, target: goals.carbsTarget, unit: 'g', color: '#9b59ff', icon: Salad },
    { label: 'Fat', val: totals.fat, target: goals.fatTarget, unit: 'g', color: '#ff6b9d', icon: Salad },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {data.map(({ label, val, target, unit, color, icon: Icon }, i) => (
        <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-2 mb-2">
            <Icon size={14} style={{ color }} />
            <span className="text-xs text-white/50">{label}</span>
          </div>
          <p className="text-2xl font-black" style={{ color }}>{val}<span className="text-sm font-normal text-white/30 ml-1">/ {target}{unit}</span></p>
        </motion.div>
      ))}
    </div>
  );
}
