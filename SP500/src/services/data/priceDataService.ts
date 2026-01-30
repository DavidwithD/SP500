/**
 * Price Data Service
 * 
 * Handles loading, parsing, caching, and querying S&P 500 historical price data.
 */

import type {
  PriceData,
  RawPriceDataEntry,
  DateRange,
  WeekRange52,
  CachedPriceData,
  PriceDataQuery,
  DataLoadResult,
} from '../../types/priceData.types';
import { DataLoadStatus, MarketTrend } from '../../types/priceData.types';
import { STORAGE_KEYS, STORAGE_VERSION, CACHE_EXPIRATION_TIME } from '../../constants/storageKeys';

/**
 * In-memory cache of price data
 */
let priceDataCache: PriceData[] | null = null;

/**
 * Parse a string with commas to a number
 * Example: "5,487.03" -> 5487.03
 */
function parseNumberWithCommas(value: string): number {
  const cleaned = value.replace(/,/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Parse date string to Date object
 * Handles format: "Jun 18, 2024"
 */
function parseDate(dateString: string): Date {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date format: ${dateString}`);
  }
  return date;
}

/**
 * Format date to YYYY-MM-DD string
 */
function formatDateString(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Parse raw price data entry to PriceData
 */
function parseRawEntry(raw: RawPriceDataEntry): PriceData {
  try {
    const date = parseDate(raw.date);
    
    return {
      date,
      dateString: formatDateString(date),
      open: parseNumberWithCommas(raw[' "open"'] || '0'),
      high: parseNumberWithCommas(raw[' "high"'] || '0'),
      low: parseNumberWithCommas(raw.low || '0'),
      close: parseNumberWithCommas(raw[' "close"'] || '0'),
      adjClose: parseNumberWithCommas(raw[' "adj close"'] || '0'),
      volume: parseNumberWithCommas(raw[' "volume"'] || '0'),
    };
  } catch (error) {
    throw new Error(`Failed to parse price data entry: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Calculate daily changes for price data
 */
function calculateChanges(data: PriceData[]): PriceData[] {
  // Sort by date ascending
  const sorted = [...data].sort((a, b) => a.date.getTime() - b.date.getTime());
  
  for (let i = 1; i < sorted.length; i++) {
    const current = sorted[i];
    const previous = sorted[i - 1];
    
    if (previous.close && current.close) {
      current.change = current.close - previous.close;
      current.changePercent = (current.change / previous.close) * 100;
    }
  }
  
  return sorted;
}

/**
 * Load price data from localStorage cache
 */
function loadFromCache(): PriceData[] | null {
  try {
    const cached = localStorage.getItem(STORAGE_KEYS.PRICE_DATA);
    if (!cached) return null;
    
    const parsed: CachedPriceData = JSON.parse(cached);
    
    // Check if cache is expired
    if (Date.now() - parsed.timestamp > CACHE_EXPIRATION_TIME) {
      console.log('Price data cache expired');
      return null;
    }
    
    // Check version
    if (parsed.version !== STORAGE_VERSION) {
      console.log('Price data cache version mismatch');
      return null;
    }
    
    // Parse dates (they're stored as strings in localStorage)
    const data = parsed.data.map(entry => ({
      ...entry,
      date: new Date(entry.date),
    }));
    
    console.log(`Loaded ${data.length} price entries from cache`);
    return data;
  } catch (error) {
    console.error('Failed to load price data from cache:', error);
    return null;
  }
}

/**
 * Save price data to localStorage cache
 */
function saveToCache(data: PriceData[]): void {
  try {
    const cached: CachedPriceData = {
      data,
      timestamp: Date.now(),
      version: STORAGE_VERSION,
    };
    
    localStorage.setItem(STORAGE_KEYS.PRICE_DATA, JSON.stringify(cached));
    console.log(`Cached ${data.length} price entries`);
  } catch (error) {
    console.error('Failed to save price data to cache:', error);
    // If quota exceeded, try to clear old data
    if (error instanceof Error && error.name === 'QuotaExceededError') {
      console.warn('localStorage quota exceeded, clearing cache');
      localStorage.removeItem(STORAGE_KEYS.PRICE_DATA);
    }
  }
}

/**
 * Load price data from JSON file
 */
async function loadFromFile(): Promise<PriceData[]> {
  try {
    const response = await fetch('/data/sp500.json');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch price data: ${response.status} ${response.statusText}`);
    }
    
    const rawData: RawPriceDataEntry[] = await response.json();
    
    if (!Array.isArray(rawData) || rawData.length === 0) {
      throw new Error('Invalid price data format: expected non-empty array');
    }
    
    console.log(`Loaded ${rawData.length} raw price entries from file`);
    
    // Parse and validate each entry
    const parsedData = rawData.map(parseRawEntry);
    
    // Calculate changes
    const dataWithChanges = calculateChanges(parsedData);
    
    // Sort by date descending (newest first) for typical usage
    dataWithChanges.sort((a, b) => b.date.getTime() - a.date.getTime());
    
    console.log(`Parsed and processed ${dataWithChanges.length} price entries`);
    return dataWithChanges;
  } catch (error) {
    throw new Error(`Failed to load price data from file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Load price data (from cache or file)
 * This is the main entry point for loading data
 */
export async function loadPriceData(forceRefresh = false): Promise<DataLoadResult> {
  try {
    // Return in-memory cache if available
    if (!forceRefresh && priceDataCache) {
      return {
        status: DataLoadStatus.SUCCESS,
        data: priceDataCache,
      };
    }
    
    // Try localStorage cache
    if (!forceRefresh) {
      const cached = loadFromCache();
      if (cached) {
        priceDataCache = cached;
        return {
          status: DataLoadStatus.SUCCESS,
          data: cached,
        };
      }
    }
    
    // Load from file
    const data = await loadFromFile();
    
    // Cache in memory and localStorage
    priceDataCache = data;
    saveToCache(data);
    
    return {
      status: DataLoadStatus.SUCCESS,
      data,
    };
  } catch (error) {
    console.error('Failed to load price data:', error);
    return {
      status: DataLoadStatus.ERROR,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get price for a specific date
 * Returns null if no data available for that date
 */
export function getPriceForDate(date: Date, data?: PriceData[]): PriceData | null {
  const dataset = data || priceDataCache;
  if (!dataset) {
    console.warn('Price data not loaded yet');
    return null;
  }
  
  const dateString = formatDateString(date);
  const found = dataset.find(entry => entry.dateString === dateString);
  
  return found || null;
}

/**
 * Get price data for a date range
 * Returns data sorted by date descending (newest first)
 */
export function getPriceRange(
  startDate: Date,
  endDate: Date,
  data?: PriceData[]
): PriceData[] {
  const dataset = data || priceDataCache;
  if (!dataset) {
    console.warn('Price data not loaded yet');
    return [];
  }
  
  const start = startDate.getTime();
  const end = endDate.getTime();
  
  return dataset.filter(entry => {
    const entryTime = entry.date.getTime();
    return entryTime >= start && entryTime <= end;
  });
}

/**
 * Get the available date range from the dataset
 */
export function getDateRange(data?: PriceData[]): DateRange | null {
  const dataset = data || priceDataCache;
  if (!dataset || dataset.length === 0) {
    return null;
  }
  
  // Data is already sorted descending, so:
  // First item = newest (maxDate)
  // Last item = oldest (minDate)
  const maxDate = dataset[0].date;
  const minDate = dataset[dataset.length - 1].date;
  
  return {
    minDate,
    maxDate,
    totalDays: dataset.length,
  };
}

/**
 * Get 52-week high/low range for a specific date
 */
export function get52WeekRange(date: Date, data?: PriceData[]): WeekRange52 | null {
  const dataset = data || priceDataCache;
  if (!dataset) {
    return null;
  }
  
  // Calculate date 52 weeks ago
  const endDate = new Date(date);
  const startDate = new Date(date);
  startDate.setDate(startDate.getDate() - (52 * 7));
  
  // Get data for the past 52 weeks
  const rangeData = getPriceRange(startDate, endDate, dataset);
  
  if (rangeData.length === 0) {
    return null;
  }
  
  // Find high and low
  let high = rangeData[0];
  let low = rangeData[0];
  
  for (const entry of rangeData) {
    if (entry.high > high.high) {
      high = entry;
    }
    if (entry.low < low.low) {
      low = entry;
    }
  }
  
  // Get current price
  const currentPrice = getPriceForDate(date, dataset);
  const current = currentPrice?.close || 0;
  
  // Calculate position in range
  const range = high.high - low.low;
  const rangePercent = range > 0 ? ((current - low.low) / range) * 100 : 50;
  
  return {
    high: high.high,
    highDate: high.date,
    low: low.low,
    lowDate: low.date,
    rangePercent: Math.max(0, Math.min(100, rangePercent)),
  };
}

/**
 * Determine market trend based on recent price movements
 * Compares current price to 20-day and 50-day moving averages
 */
export function getMarketTrend(date: Date, data?: PriceData[]): MarketTrend {
  const dataset = data || priceDataCache;
  if (!dataset) {
    return MarketTrend.NEUTRAL;
  }
  
  const currentPrice = getPriceForDate(date, dataset);
  if (!currentPrice) {
    return MarketTrend.NEUTRAL;
  }
  
  // Get data for the past 50 days
  const endDate = new Date(date);
  const startDate = new Date(date);
  startDate.setDate(startDate.getDate() - 50);
  
  const recentData = getPriceRange(startDate, endDate, dataset);
  
  if (recentData.length < 20) {
    return MarketTrend.NEUTRAL;
  }
  
  // Calculate 20-day moving average
  const last20 = recentData.slice(0, 20);
  const ma20 = last20.reduce((sum, entry) => sum + entry.close, 0) / last20.length;
  
  // Calculate 50-day moving average if enough data
  let ma50 = ma20;
  if (recentData.length >= 50) {
    ma50 = recentData.slice(0, 50).reduce((sum, entry) => sum + entry.close, 0) / 50;
  }
  
  const current = currentPrice.close;
  
  // Determine trend
  // Bullish: price above both MAs and MA20 > MA50
  // Bearish: price below both MAs and MA20 < MA50
  // Neutral: mixed signals
  
  if (current > ma20 && current > ma50 && ma20 > ma50) {
    return MarketTrend.BULLISH;
  } else if (current < ma20 && current < ma50 && ma20 < ma50) {
    return MarketTrend.BEARISH;
  } else {
    return MarketTrend.NEUTRAL;
  }
}

/**
 * Query price data with flexible options
 */
export function queryPriceData(query: PriceDataQuery, data?: PriceData[]): PriceData[] {
  const dataset = data || priceDataCache;
  if (!dataset) {
    return [];
  }
  
  let result = dataset;
  
  // Filter by date range
  if (query.startDate || query.endDate) {
    const start = query.startDate?.getTime() || 0;
    const end = query.endDate?.getTime() || Infinity;
    result = result.filter(entry => {
      const time = entry.date.getTime();
      return time >= start && time <= end;
    });
  }
  
  // Apply limit
  if (query.limit && query.limit > 0) {
    result = result.slice(0, query.limit);
  }
  
  // Strip calculated fields if not needed
  if (query.includeCalculatedFields === false) {
    result = result.map(({ change, changePercent, ...rest }) => rest as PriceData);
  }
  
  return result;
}

/**
 * Clear all caches (useful for testing or troubleshooting)
 */
export function clearCache(): void {
  priceDataCache = null;
  localStorage.removeItem(STORAGE_KEYS.PRICE_DATA);
  console.log('Price data cache cleared');
}

/**
 * Get the current in-memory cache status
 */
export function getCacheStatus(): {
  inMemory: boolean;
  hasLocalStorage: boolean;
  entryCount: number;
} {
  const inMemory = priceDataCache !== null;
  const localStorageData = localStorage.getItem(STORAGE_KEYS.PRICE_DATA);
  const hasLocalStorage = localStorageData !== null;
  const entryCount = priceDataCache?.length || 0;
  
  return { inMemory, hasLocalStorage, entryCount };
}
