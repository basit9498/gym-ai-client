import { WalletDetail } from '../types';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/wallet`;

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
