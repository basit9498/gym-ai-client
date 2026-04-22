import { ProfileData, PasswordData } from '../types';

const API_URL = 'http://localhost:5001/api';

const getHeaders = () => {
  if (typeof window === 'undefined') return {};
  const session = localStorage.getItem('agentic_session');
  const token = session ? JSON.parse(session).token : '';
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const settingsService = {
  async updateProfile(data: ProfileData): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const res = await fetch(`${API_URL}/users/profile`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify(data)
      });
      if (res.ok) {
        const result = await res.json();
        return { success: true, data: result };
      }
      const errData = await res.json();
      return { success: false, error: errData.message || 'Failed to update profile' };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  },

  async changePassword(data: PasswordData): Promise<{ success: boolean; error?: string }> {
    try {
      const res = await fetch(`${API_URL}/users/change-password`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify(data)
      });
      if (res.ok) return { success: true };
      const errData = await res.json();
      return { success: false, error: errData.message || 'Failed to change password' };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }
};
