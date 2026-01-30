/**
 * Date Formatting Utilities
 *
 * Format dates consistently throughout the application.
 */

/**
 * Format a date for simulation display.
 *
 * @param date - Date to format
 * @returns Full date string (e.g., "Thursday, March 15, 2018")
 */
export function formatSimulationDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format a date in abbreviated form.
 *
 * @param date - Date to format
 * @returns Abbreviated date (e.g., "Mar 15, 2018")
 */
export function formatDateShort(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format a date as ISO string (YYYY-MM-DD).
 *
 * @param date - Date to format
 * @returns ISO date string (e.g., "2018-03-15")
 */
export function formatDateISO(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Format a date for transaction history.
 *
 * @param date - Date to format
 * @returns Transaction date format (e.g., "03/15/2018")
 */
export function formatTransactionDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

/**
 * Get the quarter for a date.
 *
 * @param date - Date to check
 * @returns Quarter string (e.g., "Q1 2018")
 */
export function getQuarter(date: Date): string {
  const month = date.getMonth();
  const quarter = Math.floor(month / 3) + 1;
  const year = date.getFullYear();
  return `Q${quarter} ${year}`;
}

/**
 * Get the season for a date.
 *
 * @param date - Date to check
 * @returns Season info with emoji
 */
export function getSeason(date: Date): { name: string; emoji: string } {
  const month = date.getMonth();

  if (month >= 2 && month <= 4) {
    return { name: 'Spring', emoji: '🌸' };
  } else if (month >= 5 && month <= 7) {
    return { name: 'Summer', emoji: '☀️' };
  } else if (month >= 8 && month <= 10) {
    return { name: 'Fall', emoji: '🍂' };
  } else {
    return { name: 'Winter', emoji: '❄️' };
  }
}

/**
 * Calculate days between two dates.
 *
 * @param startDate - Start date
 * @param endDate - End date
 * @returns Number of days between dates
 */
export function daysBetween(startDate: Date, endDate: Date): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  const diffMs = endDate.getTime() - startDate.getTime();
  return Math.floor(diffMs / msPerDay);
}

/**
 * Format days played counter.
 *
 * @param startDate - Game start date
 * @param currentDate - Current simulation date
 * @returns Days played string (e.g., "Day 45")
 */
export function formatDaysPlayed(startDate: Date, currentDate: Date): string {
  const days = daysBetween(startDate, currentDate);
  return `Day ${days + 1}`;
}

/**
 * Add days to a date.
 *
 * @param date - Starting date
 * @param days - Number of days to add
 * @returns New date
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Add weeks to a date.
 *
 * @param date - Starting date
 * @param weeks - Number of weeks to add
 * @returns New date
 */
export function addWeeks(date: Date, weeks: number): Date {
  return addDays(date, weeks * 7);
}

/**
 * Add months to a date.
 *
 * @param date - Starting date
 * @param months - Number of months to add
 * @returns New date
 */
export function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

/**
 * Add years to a date.
 *
 * @param date - Starting date
 * @param years - Number of years to add
 * @returns New date
 */
export function addYears(date: Date, years: number): Date {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
}

/**
 * Check if a date is a weekend.
 *
 * @param date - Date to check
 * @returns True if Saturday or Sunday
 */
export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

/**
 * Get the next trading day (skip weekends).
 *
 * @param date - Starting date
 * @returns Next trading day
 */
export function getNextTradingDay(date: Date): Date {
  let result = new Date(date);
  result = addDays(result, 1);

  while (isWeekend(result)) {
    result = addDays(result, 1);
  }

  return result;
}

/**
 * Format a date range.
 *
 * @param startDate - Start date
 * @param endDate - End date
 * @returns Formatted range (e.g., "Jan 1, 2018 - Dec 31, 2023")
 */
export function formatDateRange(startDate: Date, endDate: Date): string {
  return `${formatDateShort(startDate)} - ${formatDateShort(endDate)}`;
}

/**
 * Parse a date string to Date object.
 *
 * @param dateString - Date string to parse
 * @returns Date object or null if invalid
 */
export function parseDate(dateString: string): Date | null {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
}

/**
 * Check if two dates are the same day.
 *
 * @param date1 - First date
 * @param date2 - Second date
 * @returns True if same day
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
