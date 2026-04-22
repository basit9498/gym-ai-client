'use client';

import { AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import DashboardTopbar from '../components/Topbar';
import { useMeal } from './hooks/useMeal';
import { NutritionSummary } from './components/NutritionSummary';
import { MacroDistribution } from './components/MacroDistribution';
import { AddMealForm } from './components/AddMealForm';
import { MealList } from './components/MealList';

export function MealTrackerModule() {
  const {
    data,
    loading,
    showForm,
    setShowForm,
    selectedDate,
    setSelectedDate,
    addMeal
  } = useMeal();

  const totals = data?.totals || { calories: 0, protein: 0, carbs: 0, fat: 0 };
  const goals = data?.goals || { caloriesTarget: 2000, proteinTarget: 150, carbsTarget: 200, fatTarget: 65, waterTarget: 2000 };
  const meals = data?.meals || [];

  return (
    <div className="flex flex-col flex-1 overflow-y-auto bg-[#05051a]">
      <DashboardTopbar title="Meal Tracker" />
      <div className="flex-1 p-6 space-y-5">
        {/* Date Selector */}
        <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/10">
          <h3 className="text-white font-bold">Nutrition Summary</h3>
          <input 
            type="date" 
            value={selectedDate} 
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-transparent text-white border border-white/20 rounded-lg px-3 py-1 text-sm outline-none"
          />
        </div>

        <NutritionSummary totals={totals} goals={goals} />
        
        <MacroDistribution totals={totals} />

        {/* Meals list + add button */}
        <div className="flex items-center justify-between">
          <h3 className="text-white font-bold">Today's Meals</h3>
          <button onClick={() => setShowForm(v => !v)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105"
            style={{ background: showForm ? 'rgba(239,68,68,0.1)' : 'rgba(0,212,255,0.1)', color: showForm ? '#f87171' : '#00d4ff', border: `1px solid ${showForm ? 'rgba(239,68,68,0.2)' : 'rgba(0,212,255,0.2)'}` }}>
            {showForm ? <><X size={14} /> Cancel</> : <><Plus size={14} /> Add Meal</>}
          </button>
        </div>

        <AnimatePresence>
          {showForm && (
            <AddMealForm onAddMeal={addMeal} />
          )}
        </AnimatePresence>

        <div className="space-y-3">
          <MealList meals={meals} loading={loading} />
        </div>
      </div>
    </div>
  );
}
