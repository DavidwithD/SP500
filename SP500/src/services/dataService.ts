import type { PriceData, SP500Data } from '../types';

// ============================================================================
// Data Service - Handles loading and querying S&P 500 price data
// ============================================================================

class DataService {
  private priceData: PriceData[] = [];
  private priceMap: Map<string, PriceData> = new Map();
  private isLoaded: boolean = false;

  /**
   * Load S&P 500 data from JSON file
   */
  async loadData(): Promise<void> {
    if (this.isLoaded) {
      return; // Already loaded
    }

    try {
      const response = await fetch('/data/sp500.json');
      if (!response.ok) {
        throw new Error(`Failed to load data: ${response.statusText}`);
      }

      const rawData: SP500Data[] = await response.json();
      
      // Transform and sort data
      this.priceData = rawData
        .map(item => this.transformData(item))
        .sort((a, b) => a.date.getTime() - b.date.getTime()); // Sort ascending by date

      // Build date lookup map for O(1) access
      this.priceData.forEach(item => {
        const dateKey = this.getDateKey(item.date);
        this.priceMap.set(dateKey, item);
      });

      this.isLoaded = true;
      console.log(`Loaded ${this.priceData.length} price data points`);
    } catch (error) {
      console.error('Error loading S&P 500 data:', error);
      throw error;
    }
  }

  /**
   * Transform raw CSV data to PriceData format
   */
  private transformData(raw: SP500Data): PriceData {
    return {
      date: this.parseDate(raw.date),
      open: raw.open,
      high: raw.high,
      low: raw.low,
      close: raw.close,
      adjClose: raw.adj_close,
      volume: raw.volume,
    };
  }

  /**
   * Parse date string from CSV format "Jun 18, 2024" to Date object
   */
  private parseDate(dateStr: string): Date {
    return new Date(dateStr);
  }

  /**
   * Get date key for map lookup (YYYY-MM-DD format)
   */
  private getDateKey(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  /**
   * Get price data for a specific date
   * Returns undefined if no data exists for that date
   */
  getPriceByDate(date: Date): PriceData | undefined {
    const dateKey = this.getDateKey(date);
    return this.priceMap.get(dateKey);
  }

  /**
   * Get price data for a date range (inclusive)
   */
  getPriceRange(startDate: Date, endDate: Date): PriceData[] {
    return this.priceData.filter(item => {
      const time = item.date.getTime();
      return time >= startDate.getTime() && time <= endDate.getTime();
    });
  }

  /**
   * Get all available price data (sorted by date ascending)
   */
  getAllPrices(): PriceData[] {
    return [...this.priceData];
  }

  /**
   * Get the earliest available date in the dataset
   */
  getEarliestDate(): Date | undefined {
    return this.priceData[0]?.date;
  }

  /**
   * Get the latest available date in the dataset
   */
  getLatestDate(): Date | undefined {
    return this.priceData[this.priceData.length - 1]?.date;
  }

  /**
   * Get the next trading day after a given date
   * Returns undefined if no next trading day exists
   */
  getNextTradingDay(date: Date): Date | undefined {
    const currentTime = date.getTime();
    const nextDay = this.priceData.find(item => item.date.getTime() > currentTime);
    return nextDay?.date;
  }

  /**
   * Get the previous trading day before a given date
   * Returns undefined if no previous trading day exists
   */
  getPreviousTradingDay(date: Date): Date | undefined {
    const currentTime = date.getTime();
    // Search backwards
    for (let i = this.priceData.length - 1; i >= 0; i--) {
      if (this.priceData[i].date.getTime() < currentTime) {
        return this.priceData[i].date;
      }
    }
    return undefined;
  }

  /**
   * Advance date by a specific increment
   * Returns the actual trading day after advancing (skips weekends/holidays)
   */
  advanceDate(currentDate: Date, increment: 'day' | 'week' | 'month' | 'year', count: number = 1): Date | undefined {
    let targetDate = new Date(currentDate);
    
    switch (increment) {
      case 'day':
        targetDate.setDate(targetDate.getDate() + count);
        break;
      case 'week':
        targetDate.setDate(targetDate.getDate() + (count * 7));
        break;
      case 'month':
        targetDate.setMonth(targetDate.getMonth() + count);
        break;
      case 'year':
        targetDate.setFullYear(targetDate.getFullYear() + count);
        break;
    }

    // Find the next available trading day at or after targetDate
    const targetTime = targetDate.getTime();
    const nextTradingDay = this.priceData.find(item => item.date.getTime() >= targetTime);
    
    return nextTradingDay?.date;
  }

  /**
   * Get 52-week high and low from a given date
   */
  get52WeekHighLow(currentDate: Date): { high: number; low: number; highDate: Date; lowDate: Date } | undefined {
    const oneYearAgo = new Date(currentDate);
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const yearData = this.getPriceRange(oneYearAgo, currentDate);
    
    if (yearData.length === 0) {
      return undefined;
    }

    let high = yearData[0].high;
    let low = yearData[0].low;
    let highDate = yearData[0].date;
    let lowDate = yearData[0].date;

    yearData.forEach(item => {
      if (item.high > high) {
        high = item.high;
        highDate = item.date;
      }
      if (item.low < low) {
        low = item.low;
        lowDate = item.date;
      }
    });

    return { high, low, highDate, lowDate };
  }

  /**
   * Check if data is loaded
   */
  isDataLoaded(): boolean {
    return this.isLoaded;
  }

  /**
   * Get total number of data points
   */
  getDataPointCount(): number {
    return this.priceData.length;
  }
}

// Export singleton instance
export const dataService = new DataService();
