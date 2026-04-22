'use client';

import { useState, useEffect, useCallback } from 'react';
import { adminAnalyticsService } from '../services/analytics.service';
import { AdminOverviewData } from '../types';

export function useAnalytics() {
  const [data, setData] = useState<AdminOverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOverview = useCallback(async () => {
    setLoading(true);
    const result = await adminAnalyticsService.getOverview();
    if (result.success) {
      setData(result.data);
      setError(null);
    } else {
      setError(result.error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchOverview();
  }, [fetchOverview]);

  return {
    data,
    loading,
    error,
    refreshAnalytics: fetchOverview,
  };
}
