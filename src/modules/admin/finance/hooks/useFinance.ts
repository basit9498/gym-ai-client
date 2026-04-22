'use client';

import { useState, useEffect, useCallback } from 'react';
import { adminFinanceService } from '../services/finance.service';
import { Transaction, FinanceStats } from '../types';

export function useFinance() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<FinanceStats>({ totalVolume: 0, count: 0, successful: 0 });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const result = await adminFinanceService.getTransactions({ 
      page, 
      limit: 10, 
      search, 
      type: typeFilter,
      status: statusFilter
    });
    
    if (result.success) {
      setTransactions(result.data.transactions);
      setStats(result.data.stats);
      setTotalPages(result.data.totalPages);
      setTotalTransactions(result.data.totalTransactions);
      setError(null);
    } else {
      setError(result.error);
    }
    setLoading(false);
  }, [page, search, typeFilter, statusFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleTypeFilterChange = (value: string) => {
    setTypeFilter(value);
    setPage(1);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return {
    transactions,
    stats,
    loading,
    page,
    totalPages,
    totalTransactions,
    search,
    typeFilter,
    statusFilter,
    error,
    handleSearchChange,
    handleTypeFilterChange,
    handleStatusFilterChange,
    handlePageChange,
    refreshFinance: fetchData,
  };
}
