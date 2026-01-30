/**
 * Price Data Type Definitions
 * 
 * Types for S&P 500 historical price data used throughout the application.
 */

/**
 * Raw price data entry from the JSON file
 */
export interface RawPriceDataEntry {
  date: string;
  ' "open"': string;
  ' "high"': string;
  low: string;
  ' "close"': string;
  ' "adj close"': string;
  ' "volume"': string;
}

/**
 * Parsed and validated price data entry
 */
export interface PriceData {
  /** Trading date in ISO 8601 format (YYYY-MM-DD) */
  date: Date;
  /** Date string for display (YYYY-MM-DD) */
  dateString: string;
  /** Opening price */
  open: number;
  /** Highest price of the day */
  high: number;
  /** Lowest price of the day */
  low: number;
  /** Closing price (primary price used for trading) */
  close: number;
  /** Adjusted closing price */
  adjClose: number;
  /** Trading volume */
  volume: number;
  /** Daily change from previous close */
  change?: number;
  /** Daily change percentage */
  changePercent?: number;
}

/**
 * Date range bounds
 */
export interface DateRange {
  /** Earliest available date */
  minDate: Date;
  /** Latest available date */
  maxDate: Date;
  /** Total number of trading days */
  totalDays: number;
}

/**
 * 52-week high/low range
 */
export interface WeekRange52 {
  /** 52-week high price */
  high: number;
  /** Date of 52-week high */
  highDate: Date;
  /** 52-week low price */
  low: number;
  /** Date of 52-week low */
  lowDate: Date;
  /** Current price position in range (0-100%) */
  rangePercent: number;
}

/**
 * Market trend indicator
 */
export enum MarketTrend {
  BULLISH = 'bullish',
  BEARISH = 'bearish',
  NEUTRAL = 'neutral',
}

/**
 * Cached price data structure for localStorage
 */
export interface CachedPriceData {
  /** Cached price data array */
  data: PriceData[];
  /** Cache timestamp */
  timestamp: number;
  /** Data version for migration */
  version: string;
}

/**
 * Price data query options
 */
export interface PriceDataQuery {
  /** Start date (inclusive) */
  startDate?: Date;
  /** End date (inclusive) */
  endDate?: Date;
  /** Maximum number of results */
  limit?: number;
  /** Include calculated fields (change, changePercent) */
  includeCalculatedFields?: boolean;
}

/**
 * Data loading status
 */
export enum DataLoadStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

/**
 * Data load result
 */
export interface DataLoadResult {
  status: DataLoadStatus;
  data?: PriceData[];
  error?: string;
}
