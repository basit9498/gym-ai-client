import { WorkoutPlan } from '../types';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/workouts`;

const getHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (typeof window !== 'undefined') {
    const session = localStorage.getItem('agentic_session');
    if (session) {
      try {
        const token = JSON.parse(session).token;
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
      } catch (e) {}
    }
  }
  
  return headers;
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
