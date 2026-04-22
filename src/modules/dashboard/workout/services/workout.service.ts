import { WorkoutPlan } from '../types';

const API_URL = 'http://localhost:5001/api/workouts';

const getHeaders = () => {
  if (typeof window === 'undefined') return {};
  const session = localStorage.getItem('agentic_session');
  const token = session ? JSON.parse(session).token : '';
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const workoutService = {
  async getActivePlan(): Promise<{ success: boolean; data?: WorkoutPlan; error?: string }> {
    try {
      const res = await fetch(`${API_URL}/active-plan`, { headers: getHeaders() });
      const data = await res.json();
      if (res.ok) {
        return { success: true, data };
      }
      
      console.log(data);
      return { success: false, error: data.message };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  },

  async generatePlan(params: any): Promise<{ success: boolean; error?: string }> {
    try {
      const res = await fetch(`${API_URL}/generate-plan`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(params),
      });
      if (res.ok) return { success: true };
      return { success: false, error: 'Failed to generate plan' };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  },

  async logExercise(data: { workoutSessionId: string, exerciseId: string, actualSets: number, actualReps: number, actualWeight: number, rpe: number }): Promise<{ success: boolean; error?: string }> {
    try {
      const res = await fetch(`${API_URL}/log-exercise`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      if (res.ok) return { success: true };
      return { success: false, error: 'Failed to log exercise' };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }
};
