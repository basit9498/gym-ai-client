import { ProgressData } from '../types';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/general`;

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
