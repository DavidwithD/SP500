/**
 * usePriceData Hook
 * 
 * React hook for loading and accessing S&P 500 price data.
 * Handles loading state, error handling, and provides convenient access to price queries.
 */

import { useState, useEffect, useCallback } from 'react';
import type { PriceData, DateRange, WeekRange52, DataLoadResult } from '../types';
import { DataLoadStatus, MarketTrend } from '../types';
import {
  loadPriceData,
  getPriceForDate,
  getPriceRange,
  getDateRange,
  get52WeekRange,
  getMarketTrend,
  clearCache,
} from '../services/data/priceDataService';

interface UsePriceDataReturn {
  // Data
  data: PriceData[] | null;
  dateRange: DateRange | null;
  
  // Loading state
  status: DataLoadStatus;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: string | null;
  
  // Actions
  refresh: () => Promise<void>;
  clearCache: () => void;
  
  // Query functions
  getPriceForDate: (date: Date) => PriceData | null;
  getPriceRange: (startDate: Date, endDate: Date) => PriceData[];
  get52WeekRange: (date: Date) => WeekRange52 | null;
  getMarketTrend: (date: Date) => MarketTrend;
}

/**
 * Hook to load and access S&P 500 price data
 * 
 * @param autoLoad - Whether to automatically load data on mount (default: true)
 * @returns Price data, loading state, and query functions
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { data, isLoading, isError, getPriceForDate } = usePriceData();
 *   
 *   if (isLoading) return <div>Loading...</div>;
 *   if (isError) return <div>Error loading data</div>;
 *   
 *   const todayPrice = getPriceForDate(new Date());
 *   return <div>Today's price: ${todayPrice?.close}</div>;
 * }
 * ```
 */
export function usePriceData(autoLoad = true): UsePriceDataReturn {
  const [data, setData] = useState<PriceData[] | null>(null);
  const [status, setStatus] = useState<DataLoadStatus>(DataLoadStatus.IDLE);
  const [error, setError] = useState<string | null>(null);
  
  // Load data
  const loadData = useCallback(async (forceRefresh = false) => {
    setStatus(DataLoadStatus.LOADING);
    setError(null);
    
    try {
      const result: DataLoadResult = await loadPriceData(forceRefresh);
      
      if (result.status === DataLoadStatus.SUCCESS && result.data) {
        setData(result.data);
        setStatus(DataLoadStatus.SUCCESS);
      } else if (result.status === DataLoadStatus.ERROR) {
        setError(result.error || 'Failed to load price data');
        setStatus(DataLoadStatus.ERROR);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      setStatus(DataLoadStatus.ERROR);
      console.error('Failed to load price data:', err);
    }
  }, []);
  
  // Auto-load on mount
  useEffect(() => {
    if (autoLoad && status === DataLoadStatus.IDLE) {
      loadData(false);
    }
  }, [autoLoad, status, loadData]);
  
  // Compute date range when data changes
  const dateRange = data ? getDateRange(data) : null;
  
  // Query functions with data baked in
  const getPriceForDateFn = useCallback(
    (date: Date) => getPriceForDate(date, data || undefined),
    [data]
  );
  
  const getPriceRangeFn = useCallback(
    (startDate: Date, endDate: Date) => getPriceRange(startDate, endDate, data || undefined),
    [data]
  );
  
  const get52WeekRangeFn = useCallback(
    (date: Date) => get52WeekRange(date, data || undefined),
    [data]
  );
  
  const getMarketTrendFn = useCallback(
    (date: Date) => getMarketTrend(date, data || undefined),
    [data]
  );
  
  // Refresh action
  const refresh = useCallback(() => loadData(true), [loadData]);
  
  // Clear cache action
  const clearCacheFn = useCallback(() => {
    clearCache();
    setData(null);
    setStatus(DataLoadStatus.IDLE);
    setError(null);
  }, []);
  
  return {
    // Data
    data,
    dateRange,
    
    // Loading state
    status,
    isLoading: status === DataLoadStatus.LOADING,
    isSuccess: status === DataLoadStatus.SUCCESS,
    isError: status === DataLoadStatus.ERROR,
    error,
    
    // Actions
    refresh,
    clearCache: clearCacheFn,
    
    // Query functions
    getPriceForDate: getPriceForDateFn,
    getPriceRange: getPriceRangeFn,
    get52WeekRange: get52WeekRangeFn,
    getMarketTrend: getMarketTrendFn,
  };
}
