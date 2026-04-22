'use client';

import { useState, useEffect, useCallback } from 'react';
import { progressService } from '../services/progress.service';
import { ProgressData } from '../types';
import { toast } from 'react-toastify';

export function useProgress() {
  const [data, setData] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProgress = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await progressService.getProgress();
      if (res.success && res.data) {
        setData(res.data);
      } else {
        const errMsg = res.error || "Failed to load progress data.";
        setError(errMsg);
        if (res.error) toast.error(res.error);
      }
    } catch (err: any) {
      console.error(err);
      const errMsg = err.message || "Failed to connect to the server.";
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProgress();

    const handleSync = (e: Event) => {
        const detail = (e as CustomEvent).detail;
        if (detail?.refreshModules?.includes('progress')) {
            fetchProgress();
        }
    };
    const onVisible = () => {
      if (document.visibilityState === 'visible') fetchProgress();
    };
    window.addEventListener('gym-arc-sync', handleSync);
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      window.removeEventListener('gym-arc-sync', handleSync);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [fetchProgress]);

  return {
    data,
    loading,
    error,
    refreshProgress: fetchProgress
  };
}
