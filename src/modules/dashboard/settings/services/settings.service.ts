import { ProfileData, PasswordData } from '../types';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

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
