'use client';

import { useState, useEffect, useCallback } from 'react';
import { workoutService } from '../services/workout.service';
import { WorkoutPlan } from '../types';
import { toast } from 'react-toastify';

export function useWorkout() {
  const [plan, setPlan] = useState<WorkoutPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [activeDayIdx, setActiveDayIdx] = useState(0);
  const [expanded, setExpanded] = useState<string | null>(null);

  const fetchActivePlan = useCallback(async () => {
    try {
      setLoading(true);
      const res = await workoutService.getActivePlan();
      if (res.success && res.data) {
        setPlan(res.data);
      } else {
        setPlan(null);
        if (!res.success && res.error) {
          toast.error(res.error);
        }
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Unable to connect to the server. Please try again later.");
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchActivePlan();

    const handleSync = (e: Event) => {
        const detail = (e as CustomEvent).detail;
        if (detail?.refreshModules?.includes('workout')) {
            fetchActivePlan();
        }
    };
    const onVisible = () => {
      if (document.visibilityState === 'visible') fetchActivePlan();
    };
    window.addEventListener('gym-arc-sync', handleSync);
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      window.removeEventListener('gym-arc-sync', handleSync);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [fetchActivePlan]);

  const handleGeneratePlan = async () => {
    setGenerating(true);
    const res = await workoutService.generatePlan({
      goalType: 'muscle_gain',
      level: 'beginner',
      locationType: 'gym',
      daysPerWeek: 4
    });
    if (res.success) {
      toast.success("Workout plan generated! Syncing to your dashboard...");
      await fetchActivePlan();
    } else {
      toast.error(res.error || "Failed to generate workout plan.");
    }
    setGenerating(false);
  };

  const toggleExercise = async (session: any, ex: any) => {
    if (ex.isCompleted || !plan) return;

    // Optimistic update
    const updatedPlan = { ...plan };
    const sIdx = updatedPlan.sessions.findIndex((s: any) => s._id === session._id);
    const eIdx = updatedPlan.sessions[sIdx].exercises.findIndex((e: any) => e._id === ex._id);
    updatedPlan.sessions[sIdx].exercises[eIdx].isCompleted = true;
    setPlan(updatedPlan);

    const res = await workoutService.logExercise({
      workoutSessionId: session._id,
      exerciseId: ex._id,
      actualSets: ex.sets,
      actualReps: parseInt(ex.reps),
      actualWeight: parseFloat(ex.weight) || 0,
      rpe: 8
    });

    if (res.success) {
      toast.success("Exercise logged!");
    } else {
      toast.error(res.error || "Failed to log exercise.");
      fetchActivePlan(); // Revert on error
    }
  };

  const toggleExpand = (id: string) => {
    if (expanded === id) setExpanded(null);
    else setExpanded(id);
  }

  return {
    plan,
    loading,
    generating,
    activeDayIdx,
    setActiveDayIdx,
    expanded,
    toggleExpand,
    handleGeneratePlan,
    toggleExercise,
    refreshWorkout: fetchActivePlan
  };
}
