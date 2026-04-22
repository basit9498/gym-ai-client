import { OverviewData } from '../types';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/general`;

const getHeaders = () => {
  if (typeof window === 'undefined') return {};
  const session = localStorage.getItem('agentic_session');
  const token = session ? JSON.parse(session).token : '';
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
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
