/**
 * Share Count Formatting Utilities
 *
 * Format share quantities consistently throughout the application.
 * Supports fractional shares with 4 decimal precision.
 */

/**
 * Format share count with up to 4 decimal places.
 * Trailing zeros are removed for cleaner display.
 *
 * @param shares - Number of shares
 * @param options - Formatting options
 * @returns Formatted share count (e.g., "3.2456", "10", "0.5")
 *
 * @example
 * formatShares(3.2456) // "3.2456"
 * formatShares(10) // "10"
 * formatShares(0.5) // "0.5"
 * formatShares(1.2000) // "1.2"
 */
export function formatShares(
  shares: number,
  options?: {
    /** Maximum decimal places (default: 4) */
    maxDecimals?: number;
    /** Minimum decimal places (default: 0) */
    minDecimals?: number;
    /** Always show all 4 decimals */
    showAllDecimals?: boolean;
    /** Include "shares" text */
    includeLabel?: boolean;
  }
): string {
  const { maxDecimals = 4, minDecimals = 0, showAllDecimals = false, includeLabel = false } = options || {};

  let formatted: string;

  if (showAllDecimals) {
    formatted = shares.toFixed(4);
  } else {
    formatted = shares.toLocaleString('en-US', {
      minimumFractionDigits: minDecimals,
      maximumFractionDigits: maxDecimals,
    });
  }

  if (includeLabel) {
    const label = shares === 1 ? 'share' : 'shares';
    return `${formatted} ${label}`;
  }

  return formatted;
}

/**
 * Format shares with full precision (always 4 decimals).
 *
 * @param shares - Number of shares
 * @returns Formatted share count with 4 decimals (e.g., "3.2456")
 */
export function formatSharesFull(shares: number): string {
  return formatShares(shares, { showAllDecimals: true });
}

/**
 * Format shares with label.
 *
 * @param shares - Number of shares
 * @returns Formatted string with "shares" label (e.g., "3.5 shares")
 */
export function formatSharesWithLabel(shares: number): string {
  return formatShares(shares, { includeLabel: true });
}

/**
 * Parse a share count string back to a number.
 *
 * @param value - Share count string to parse
 * @returns Numeric value
 *
 * @example
 * parseShares("3.2456") // 3.2456
 * parseShares("10 shares") // 10
 */
export function parseShares(value: string): number {
  const cleaned = value.replace(/[^0-9.-]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Round shares to 4 decimal places (standard precision).
 *
 * @param shares - Number of shares
 * @returns Shares rounded to 4 decimals
 */
export function roundShares(shares: number): number {
  return Math.round(shares * 10000) / 10000;
}

/**
 * Floor shares to 4 decimal places (for max buy calculations).
 *
 * @param shares - Number of shares
 * @returns Shares floored to 4 decimals
 */
export function floorShares(shares: number): number {
  return Math.floor(shares * 10000) / 10000;
}

/**
 * Check if a share amount is valid (positive, finite, within precision).
 *
 * @param shares - Number of shares to validate
 * @returns True if valid
 */
export function isValidShareAmount(shares: number): boolean {
  return (
    typeof shares === 'number' &&
    isFinite(shares) &&
    shares > 0 &&
    shares <= 999999 // Max reasonable share count
  );
}

/**
 * Format a share count for display in a compact form.
 *
 * @param shares - Number of shares
 * @returns Compact share string (e.g., "1.2K shares")
 */
export function formatSharesCompact(shares: number): string {
  if (shares >= 1000) {
    const compact = (shares / 1000).toFixed(1);
    return `${compact}K shares`;
  }
  return formatSharesWithLabel(shares);
}
