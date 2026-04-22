import { AdminOverviewResult } from '../types';

const API_URL = 'http://localhost:5001/api/admin';

const getHeaders = () => {
  if (typeof window === 'undefined') return {};
  const session = localStorage.getItem('agentic_session');
  const token = session ? JSON.parse(session).token : '';
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
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
