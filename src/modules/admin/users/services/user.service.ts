import { AdminUsersResult, UserQueryParams } from '../types';

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

export const adminUserService = {
  async getUsers(params: UserQueryParams = {}): Promise<AdminUsersResult> {
    try {
      const query = new URLSearchParams();
      if (params.page) query.append('page', params.page.toString());
      if (params.limit) query.append('limit', params.limit.toString());
      if (params.search) query.append('search', params.search);
      if (params.role) query.append('role', params.role);
      if (params.status) query.append('status', params.status);

      const res = await fetch(`${API_URL}/users?${query.toString()}`, {
        method: 'GET',
        headers: getHeaders(),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        return { 
          success: false, 
          data: { users: [], page: 1, totalPages: 0, totalUsers: 0 }, 
          error: data.message || 'Failed to fetch users' 
        };
      }
      
      return { success: true, data: data.data, error: '' };
    } catch (error: any) {
      return { 
        success: false, 
        data: { users: [], page: 1, totalPages: 0, totalUsers: 0 }, 
        error: error.message || 'Network Error' 
      };
    }
  }
};
