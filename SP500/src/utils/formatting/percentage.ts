/**
 * Percentage Formatting Utilities
 *
 * Format percentage values consistently throughout the application.
 */

/**
 * Format a number as a percentage.
 *
 * @param value - The percentage value (e.g., 18.75 for 18.75%)
 * @param options - Formatting options
 * @returns Formatted percentage string (e.g., "+18.75%")
 *
 * @example
 * formatPercentage(18.75) // "+18.75%"
 * formatPercentage(-5.5) // "-5.50%"
 * formatPercentage(0) // "0.00%"
 */
export function formatPercentage(
  value: number,
  options?: {
    /** Always show sign (+ or -), default: true */
    showSign?: boolean;
    /** Number of decimal places, default: 2 */
    decimals?: number;
    /** Include % symbol, default: true */
    includeSymbol?: boolean;
  }
): string {
  const { showSign = true, decimals = 2, includeSymbol = true } = options || {};

  const absValue = Math.abs(value);
  const formatted = absValue.toFixed(decimals);

  let sign = '';
  if (value < 0) {
    sign = '-';
  } else if (showSign && value > 0) {
    sign = '+';
  }

  const symbol = includeSymbol ? '%' : '';

  return `${sign}${formatted}${symbol}`;
}

/**
 * Format a decimal as a percentage.
 * Use this when you have a decimal (0.1875) instead of a percentage (18.75).
 *
 * @param decimal - The decimal value (e.g., 0.1875 for 18.75%)
 * @param options - Formatting options
 * @returns Formatted percentage string
 *
 * @example
 * formatDecimalAsPercentage(0.1875) // "+18.75%"
 * formatDecimalAsPercentage(-0.055) // "-5.50%"
 */
export function formatDecimalAsPercentage(
  decimal: number,
  options?: {
    showSign?: boolean;
    decimals?: number;
    includeSymbol?: boolean;
  }
): string {
  return formatPercentage(decimal * 100, options);
}

/**
 * Format a percentage change with appropriate styling class name.
 *
 * @param value - The percentage value
 * @returns Object with formatted string and className
 */
export function formatPercentageWithClass(value: number): {
  formatted: string;
  className: 'positive' | 'negative' | 'neutral';
} {
  return {
    formatted: formatPercentage(value),
    className: value > 0 ? 'positive' : value < 0 ? 'negative' : 'neutral',
  };
}

/**
 * Parse a percentage string back to a number.
 *
 * @param value - Percentage string to parse
 * @returns Numeric value (e.g., 18.75 from "18.75%")
 *
 * @example
 * parsePercentage("+18.75%") // 18.75
 * parsePercentage("-5.5%") // -5.5
 */
export function parsePercentage(value: string): number {
  const cleaned = value.replace(/[%+]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Format a ratio as a percentage.
 *
 * @param numerator - The numerator
 * @param denominator - The denominator
 * @param decimals - Number of decimal places
 * @returns Formatted percentage string
 *
 * @example
 * formatRatioAsPercentage(7, 10) // "70.00%"
 */
export function formatRatioAsPercentage(
  numerator: number,
  denominator: number,
  decimals = 2
): string {
  if (denominator === 0) {
    return '0.00%';
  }

  const percentage = (numerator / denominator) * 100;
  return formatPercentage(percentage, { showSign: false, decimals });
}
