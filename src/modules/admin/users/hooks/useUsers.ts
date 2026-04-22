'use client';

import { useState, useEffect, useCallback } from 'react';
import { adminUserService } from '../services/user.service';
import { User } from '../types';

export function useUsers() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    const result = await adminUserService.getUsers({ 
      page, 
      limit: 10, 
      search, 
      role: filter === 'admin' ? 'admin' : (filter === 'user' ? 'user' : 'all') 
    });
    
    if (result.success) {
      setUsers(result.data.users);
      setTotalPages(result.data.totalPages);
      setTotalUsers(result.data.totalUsers);
    }
    setLoading(false);
  }, [page, search, filter]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleFilterChange = (value: string) => {
    setFilter(value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return {
    users,
    loading,
    page,
    totalPages,
    totalUsers,
    search,
    filter,
    handleSearchChange,
    handleFilterChange,
    handlePageChange,
    refreshUsers: fetchUsers,
  };
}
