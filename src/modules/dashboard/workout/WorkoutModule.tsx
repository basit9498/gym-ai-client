'use client';

import { motion } from 'framer-motion';
import { Sparkles, Dumbbell, Loader2 } from 'lucide-react';
import DashboardTopbar from '../components/Topbar';
import { useWorkout } from './hooks/useWorkout';
import { WeeklySchedule } from './components/WeeklySchedule';
import { SessionDetail } from './components/SessionDetail';
import { ExerciseList } from './components/ExerciseList';

export function WorkoutModule() {
  const {
    plan,
    loading,
    generating,
    activeDayIdx,
    setActiveDayIdx,
    expanded,
    toggleExpand,
    handleGeneratePlan,
    toggleExercise,
  } = useWorkout();

  if (loading) {
    return (
      <div className="flex flex-col flex-1 h-screen items-center justify-center space-y-4 bg-[#05051a]">
        <Loader2 className="w-10 h-10 text-[#00d4ff] animate-spin" />
        <p className="text-white/40 text-sm italic">Loading your training plan...</p>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="flex flex-col flex-1 overflow-y-auto bg-[#05051a]">
        <DashboardTopbar title="Workout Plan" />
        <div className="flex-1 flex items-center justify-center p-6">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00d4ff] to-[#9b59ff] flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20">
              <Dumbbell className="text-white w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white mb-2">Ready to start?</h2>
              <p className="text-white/50 text-sm">You don't have an active workout plan yet. Let our AI build one for you based on your body goals.</p>
            </div>
            <button onClick={handleGeneratePlan} disabled={generating}
              className="w-full py-4 rounded-2xl bg-[#00d4ff] text-black font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform disabled:opacity-50">
              {generating ? <Loader2 className="animate-spin" size={20} /> : <><Sparkles size={18} /> Generate My Plan</>}
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  const sessions = plan.sessions || [];
  const currentSession = sessions[activeDayIdx] || sessions[0];

  return (
    <div className="flex flex-col flex-1 overflow-y-auto bg-[#05051a]">
      <DashboardTopbar title="Workout Plan" />
      <div className="flex-1 p-6 space-y-6">
        <WeeklySchedule 
          sessions={sessions} 
          activeDayIdx={activeDayIdx} 
          onActiveDayChange={setActiveDayIdx} 
        />
        
        {currentSession && (
          <SessionDetail 
            session={currentSession} 
            planTitle={plan.title} 
            activeDayIdx={activeDayIdx} 
          />
        )}
        
        {currentSession && (
          <ExerciseList 
            session={currentSession} 
            expanded={expanded} 
            onToggleExpand={toggleExpand} 
            onToggleExercise={toggleExercise} 
          />
        )}
      </div>
    </div>
  );
}
