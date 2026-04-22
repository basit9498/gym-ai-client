'use client';

import { useState, useEffect, useCallback } from 'react';
import { walletService } from '../services/wallet.service';
import { WalletDetail } from '../types';
import { getSession } from '@/modules/auth';

export function useWallet() {
  const [walletDetail, setWalletDetail] = useState<WalletDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const user = getSession();
  const userId = user?.id;

  const fetchWalletDetail = useCallback(async (p: number) => {
    setLoading(true);
    const result = await walletService.getWalletDetail(p);
    if (result.success && result.data) {
      setWalletDetail(result.data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchWalletDetail(page);
  }, [fetchWalletDetail, page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const transactions = walletDetail?.transactions || [];

  const chartData = (walletDetail?.chartData || []).map(d => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dateObj = new Date(d.date);
    return {
      day: !isNaN(dateObj.getTime()) ? days[dateObj.getDay()] : '???',
      amount: Number(d.amount.toFixed(4))
    };
  });

  return {
    walletDetail,
    loading,
    userId,
    transactions,
    chartData,
    todayStats: {
      spent: walletDetail?.stats?.spentToday || 0,
      credit: walletDetail?.stats?.creditToday || 0,
    },
    pagination: walletDetail?.pagination,
    handlePageChange
  };
}
