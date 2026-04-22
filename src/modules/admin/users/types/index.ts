export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
  updatedAt: string;
}

export interface AdminUsersResult {
  success: boolean;
  data: {
    users: User[];
    page: number;
    totalPages: number;
    totalUsers: number;
  };
  error: string;
}

export interface UserQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  status?: string;
}
