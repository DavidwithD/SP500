/**
 * Profit/Loss Calculations
 *
 * Functions for calculating realized and unrealized profit/loss
 * from trading activities.
 */

/**
 * Result of a profit/loss calculation
 */
export interface ProfitLossResult {
  /** Profit or loss amount in dollars */
  amount: number;
  /** Profit or loss as a percentage */
  percent: number;
  /** Whether this is a profit (true) or loss (false) */
  isProfit: boolean;
}

/**
 * Calculate unrealized profit/loss for current holdings.
 * This is the "paper" gain or loss that would be realized if sold now.
 *
 * Formula:
 * - Amount: (currentPrice - avgHoldingPrice) × sharesHeld
 * - Percent: (amount / costBasis) × 100
 *
 * @param sharesHeld - Number of shares currently held
 * @param avgHoldingPrice - Average cost per share
 * @param currentPrice - Current market price per share
 * @returns Profit/loss amount and percentage
 *
 * @example
 * // Hold 10 shares at $100 avg, current price is $120
 * calculateUnrealizedPL(10, 100, 120)
 * // Returns { amount: 200, percent: 20, isProfit: true }
 */
export function calculateUnrealizedPL(
  sharesHeld: number,
  avgHoldingPrice: number,
  currentPrice: number
): ProfitLossResult {
  if (sharesHeld <= 0) {
    return { amount: 0, percent: 0, isProfit: true };
  }

  const costBasis = sharesHeld * avgHoldingPrice;
  const currentValue = sharesHeld * currentPrice;
  const amount = currentValue - costBasis;
  const percent = costBasis > 0 ? (amount / costBasis) * 100 : 0;

  return {
    amount: Math.round(amount * 100) / 100,
    percent: Math.round(percent * 100) / 100,
    isProfit: amount >= 0,
  };
}

/**
 * Calculate realized profit/loss from a sell transaction.
 * This is the actual gain or loss locked in when shares are sold.
 *
 * Formula:
 * - Amount: (sellPrice - avgHoldingPrice) × sharesSold
 * - Percent: (amount / costBasis) × 100
 *
 * @param sharesSold - Number of shares being sold
 * @param avgHoldingPrice - Average cost per share (cost basis)
 * @param sellPrice - Price at which shares are sold
 * @returns Profit/loss amount and percentage
 *
 * @example
 * // Sell 5 shares, avg cost $100, selling at $130
 * calculateRealizedPL(5, 100, 130)
 * // Returns { amount: 150, percent: 30, isProfit: true }
 */
export function calculateRealizedPL(
  sharesSold: number,
  avgHoldingPrice: number,
  sellPrice: number
): ProfitLossResult {
  if (sharesSold <= 0) {
    return { amount: 0, percent: 0, isProfit: true };
  }

  const costBasis = sharesSold * avgHoldingPrice;
  const proceeds = sharesSold * sellPrice;
  const amount = proceeds - costBasis;
  const percent = costBasis > 0 ? (amount / costBasis) * 100 : 0;

  return {
    amount: Math.round(amount * 100) / 100,
    percent: Math.round(percent * 100) / 100,
    isProfit: amount >= 0,
  };
}

/**
 * Calculate total profit/loss (realized + unrealized).
 *
 * @param realizedPL - Cumulative realized P/L from all sales
 * @param unrealizedPL - Current unrealized P/L from holdings
 * @returns Combined profit/loss
 */
export function calculateTotalPL(
  realizedPL: number,
  unrealizedPL: number
): ProfitLossResult {
  const amount = realizedPL + unrealizedPL;

  return {
    amount: Math.round(amount * 100) / 100,
    percent: 0, // Total percent needs initial investment context
    isProfit: amount >= 0,
  };
}

/**
 * Calculate total profit/loss with percentage based on initial investment.
 *
 * @param realizedPL - Cumulative realized P/L
 * @param unrealizedPL - Current unrealized P/L
 * @param initialInvestment - Starting capital
 * @returns Combined profit/loss with percentage
 */
export function calculateTotalPLWithPercent(
  realizedPL: number,
  unrealizedPL: number,
  initialInvestment: number
): ProfitLossResult {
  const amount = realizedPL + unrealizedPL;
  const percent = initialInvestment > 0 ? (amount / initialInvestment) * 100 : 0;

  return {
    amount: Math.round(amount * 100) / 100,
    percent: Math.round(percent * 100) / 100,
    isProfit: amount >= 0,
  };
}

/**
 * Calculate the break-even price for current holdings.
 * This is the price at which unrealized P/L would be zero.
 *
 * @param avgHoldingPrice - Current average holding price
 * @returns The break-even price (same as average holding price)
 */
export function calculateBreakEvenPrice(avgHoldingPrice: number): number {
  return avgHoldingPrice;
}

/**
 * Calculate the price needed to achieve a target profit percentage.
 *
 * @param avgHoldingPrice - Current average holding price
 * @param targetPercent - Desired profit percentage (e.g., 10 for 10%)
 * @returns Price per share needed to achieve target profit
 */
export function calculatePriceForTargetProfit(
  avgHoldingPrice: number,
  targetPercent: number
): number {
  const multiplier = 1 + targetPercent / 100;
  return Math.round(avgHoldingPrice * multiplier * 100) / 100;
}
