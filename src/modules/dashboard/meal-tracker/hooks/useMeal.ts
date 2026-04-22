'use client';

import { useState, useEffect, useCallback } from 'react';
import { mealService } from '../services/meal.service';
import { DayNutrition } from '../types';
import { toast } from 'react-toastify';

export function useMeal() {
  const [data, setData] = useState<DayNutrition | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const fetchDayData = useCallback(async (date: string) => {
    try {
      setLoading(true);
      const res = await mealService.getDayData(date);
      if (res.success && res.data) {
        setData(res.data);
      } else if (!res.success && res.error) {
        toast.error(res.error);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to load meal data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDayData(selectedDate);
  }, [selectedDate, fetchDayData]);

  useEffect(() => {
    const handleSync = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.refreshModules?.includes('meal')) {
        fetchDayData(selectedDate);
      }
    };
    const onVisible = () => {
      if (document.visibilityState === 'visible') fetchDayData(selectedDate);
    };
    window.addEventListener('gym-arc-sync', handleSync);
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      window.removeEventListener('gym-arc-sync', handleSync);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [selectedDate, fetchDayData]);

  const addMeal = async (values: any) => {
    try {
      const res = await mealService.addMeal({
        date: selectedDate,
        mealType: values.mealType,
        title: values.name,
        items: [
          {
            foodName: values.name,
            quantity: 1,
            unit: 'serving',
            calories: Number(values.calories),
            protein: Number(values.protein),
            carbs: Number(values.carbs),
            fat: Number(values.fat)
          }
        ]
      });

      if (res.success) {
        toast.success("Meal added successfully!");
        fetchDayData(selectedDate);
        setShowForm(false);
        return true;
      } else {
        toast.error(res.error || "Failed to add meal.");
      }
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred.");
    }
    return false;
  };

  return {
    data,
    loading,
    showForm,
    setShowForm,
    selectedDate,
    setSelectedDate,
    addMeal,
    refreshData: () => fetchDayData(selectedDate)
  };
}
