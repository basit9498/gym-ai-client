import { DayNutrition } from '../types';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/meals`;

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
