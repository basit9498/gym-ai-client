import { AdminOverviewResult } from '../types';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/admin`;

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

export const adminAnalyticsService = {
  async getOverview(): Promise<AdminOverviewResult> {
    try {
      const res = await fetch(`${API_URL}/overview`, {
        method: 'GET',
        headers: getHeaders(),
      });
      const data = await res.json();
      
      if (!res.ok) {
        return { 
          success: false, 
          data: { 
            totalUsers: 0, 
            totalTransactions: 0, 
            totalRevenue: 0, 
            aiRequests: 0, 
            activeToday: 0, 
            growthTrend: [], 
            recentActivity: [] 
          }, 
          error: data.message || 'Failed to fetch overview' 
        };
      }
      
      return { success: true, data: data.data, error: '' };
    } catch (error: any) {
      return { 
        success: false, 
        data: { 
          totalUsers: 0, 
          totalTransactions: 0, 
          totalRevenue: 0, 
          aiRequests: 0, 
          activeToday: 0, 
          growthTrend: [], 
          recentActivity: [] 
        }, 
        error: error.message || 'Network Error' 
      };
    }
  }
};
