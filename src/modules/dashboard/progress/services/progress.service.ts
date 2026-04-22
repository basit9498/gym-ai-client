import { ProgressData } from '../types';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/general`;

const getHeaders = () => {
  if (typeof window === 'undefined') return {};
  const session = localStorage.getItem('agentic_session');
  const token = session ? JSON.parse(session).token : '';
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const progressService = {
  async getProgress(): Promise<{ success: boolean; data?: ProgressData; error?: string }> {
    try {
      const res = await fetch(`${API_URL}/progress`, { headers: getHeaders() });
      const result = await res.json();
      if (res.ok) {
        return { success: true, data: result.data };
      }
      return { success: false, error: result.message };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }
};
