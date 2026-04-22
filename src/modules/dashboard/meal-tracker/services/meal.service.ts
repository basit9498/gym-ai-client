import { DayNutrition } from '../types';

const API_URL = 'http://localhost:5001/api/meals';

const getHeaders = () => {
  if (typeof window === 'undefined') return {};
  const session = localStorage.getItem('agentic_session');
  const token = session ? JSON.parse(session).token : '';
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const mealService = {
  async getDayData(date: string): Promise<{ success: boolean; data?: DayNutrition; error?: string }> {
    try {
      const res = await fetch(`${API_URL}/day?date=${date}`, { headers: getHeaders() });
      const data = await res.json();
      if (res.ok) {
        return { success: true, data };
      }
      return { success: false, error: data.message };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  },

  async addMeal(data: any): Promise<{ success: boolean; error?: string }> {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
      });
      if (res.ok) return { success: true };
      return { success: false, error: 'Failed to add meal' };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }
};
