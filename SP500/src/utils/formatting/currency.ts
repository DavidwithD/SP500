/**
 * Currency Formatting Utilities
 *
 * Format currency values consistently throughout the application.
 */

/**
 * Format a number as USD currency.
 *
 * @param amount - The amount to format
 * @param options - Formatting options
 * @returns Formatted currency string (e.g., "$2,752.01")
 *
 * @example
 * formatCurrency(2752.01) // "$2,752.01"
 * formatCurrency(-150.5) // "-$150.50"
 * formatCurrency(1234567.89) // "$1,234,567.89"
 */
export function formatCurrency(
  amount: number,
  options?: {
    /** Show + sign for positive numbers */
    showSign?: boolean;
    /** Use compact notation for large numbers (e.g., "$125.5K") */
    compact?: boolean;
    /** Minimum fraction digits (default: 2) */
    minDecimals?: number;
    /** Maximum fraction digits (default: 2) */
    maxDecimals?: number;
  }
): string {
  const { showSign = false, compact = false, minDecimals = 2, maxDecimals = 2 } = options || {};

  // Handle compact notation for large numbers
  if (compact && Math.abs(amount) >= 100000) {
    return formatCompactCurrency(amount, showSign);
  }

  const absAmount = Math.abs(amount);
  const formatted = absAmount.toLocaleString('en-US', {
    minimumFractionDigits: minDecimals,
    maximumFractionDigits: maxDecimals,
  });

  const sign = amount < 0 ? '-' : showSign && amount > 0 ? '+' : '';

  return `${sign}$${formatted}`;
}

/**
 * Format currency in compact notation (K, M, B).
 *
 * @param amount - The amount to format
 * @param showSign - Whether to show + for positive numbers
 * @returns Compact currency string (e.g., "$125.5K")
 */
function formatCompactCurrency(amount: number, showSign: boolean): string {
  const absAmount = Math.abs(amount);
  let value: number;
  let suffix: string;

  if (absAmount >= 1e9) {
    value = absAmount / 1e9;
    suffix = 'B';
  } else if (absAmount >= 1e6) {
    value = absAmount / 1e6;
    suffix = 'M';
  } else if (absAmount >= 1e3) {
    value = absAmount / 1e3;
    suffix = 'K';
  } else {
    value = absAmount;
    suffix = '';
  }

  const formatted = value.toLocaleString('en-US', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  const sign = amount < 0 ? '-' : showSign && amount > 0 ? '+' : '';

  return `${sign}$${formatted}${suffix}`;
}

/**
 * Format currency change (always shows sign).
 *
 * @param amount - The change amount
 * @returns Formatted change string (e.g., "+$150.00" or "-$50.25")
 */
export function formatCurrencyChange(amount: number): string {
  return formatCurrency(amount, { showSign: true });
}

/**
 * Parse a currency string back to a number.
 *
 * @param value - Currency string to parse
 * @returns Numeric value
 *
 * @example
 * parseCurrency("$2,752.01") // 2752.01
 * parseCurrency("-$150.50") // -150.5
 */
export function parseCurrency(value: string): number {
  const cleaned = value.replace(/[$,]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Format a price with 2 decimal places (no currency symbol).
 *
 * @param price - The price to format
 * @returns Formatted price string (e.g., "2,752.01")
 */
export function formatPrice(price: number): string {
  return price.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
