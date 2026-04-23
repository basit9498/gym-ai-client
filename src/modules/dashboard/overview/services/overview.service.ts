import { OverviewData } from '../types';

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
}

export const overviewService = {
  async getOverview(): Promise<{ success: boolean; data?: OverviewData; error?: string }> {
    try {
      const res = await fetch(`${API_URL}/overview`, {
        headers: getHeaders(),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Failed to fetch overview');
      return { success: true, data: result.data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
};
