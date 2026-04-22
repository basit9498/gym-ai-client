import { WalletDetail } from '../types';

const API_URL = 'http://localhost:5001/api/wallet';

const getHeaders = () => {
  if (typeof window === 'undefined') return {};
  const session = localStorage.getItem('agentic_session');
  const token = session ? JSON.parse(session).token : '';
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const walletService = {
  async getWalletDetail(page: number = 1, limit: number = 10): Promise<{ success: boolean; data?: WalletDetail; error?: string }> {
    try {
      const res = await fetch(`${API_URL}?page=${page}&limit=${limit}`, { headers: getHeaders() });
      if (res.ok) {
        const result = await res.json();
        return { success: true, data: result.data };
      }
      return { success: false, error: 'Failed to fetch wallet detail' };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }
};
