'use client';

import { useState, useEffect, useCallback } from 'react';
import { overviewService } from '../services/overview.service';
import { OverviewData } from '../types';

export function useOverview() {
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOverview = useCallback(async () => {
    setLoading(true);
    const res = await overviewService.getOverview();
    if (res.success && res.data) {
      setData(res.data);
      setError(null);
    } else {
      setError(res.error || 'Failed to fetch overview');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchOverview();

    const onCoachSync = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.refreshModules?.includes('overview')) {
        overviewService.getOverview().then((res) => {
          if (res.success && res.data) setData(res.data);
        });
      }
    };
    
    window.addEventListener('gym-arc-sync', onCoachSync as EventListener);
    return () => window.removeEventListener('gym-arc-sync', onCoachSync as EventListener);
  }, [fetchOverview]);

  return { data, loading, error, refreshOverview: fetchOverview };
}
