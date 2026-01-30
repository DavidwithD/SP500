/**
 * Return on Investment (ROI) Calculations
 *
 * Functions for calculating investment returns and win rates.
 */

import type { Transaction } from '../../types';

/**
 * Calculate Return on Investment (ROI).
 *
 * Formula: ((currentValue - initialInvestment) / initialInvestment) × 100
 *
 * @param currentValue - Current portfolio value
 * @param initialInvestment - Starting capital
 * @returns ROI as a percentage
 *
 * @example
 * // Started with $10,000, now worth $12,500
 * calculateROI(12500, 10000) // Returns 25
 */
export function calculateROI(
  currentValue: number,
  initialInvestment: number
): number {
  if (initialInvestment <= 0) {
    return 0;
  }

  const roi = ((currentValue - initialInvestment) / initialInvestment) * 100;
  return Math.round(roi * 100) / 100;
}

/**
 * Calculate annualized ROI based on days held.
 * Useful for comparing returns across different time periods.
 *
 * Formula: ((1 + ROI/100)^(365/days) - 1) × 100
 *
 * @param currentValue - Current portfolio value
 * @param initialInvestment - Starting capital
 * @param daysHeld - Number of days the investment was held
 * @returns Annualized ROI as a percentage
 *
 * @example
 * // 25% return over 180 days
 * calculateAnnualizedROI(12500, 10000, 180) // Returns ~56.25%
 */
export function calculateAnnualizedROI(
  currentValue: number,
  initialInvestment: number,
  daysHeld: number
): number {
  if (initialInvestment <= 0 || daysHeld <= 0) {
    return 0;
  }

  const totalReturn = currentValue / initialInvestment;
  const annualizedReturn = Math.pow(totalReturn, 365 / daysHeld) - 1;

  return Math.round(annualizedReturn * 100 * 100) / 100;
}

/**
 * Calculate win rate from transaction history.
 * Win rate = (profitable sells / total sells) × 100
 *
 * @param transactions - Array of transaction objects
 * @returns Win rate as a percentage (0-100)
 *
 * @example
 * // 7 profitable sells out of 10 total sells
 * calculateWinRate(transactions) // Returns 70
 */
export function calculateWinRate(transactions: Transaction[]): number {
  const sells = transactions.filter((t) => t.type === 'sell');

  if (sells.length === 0) {
    return 0;
  }

  const profitableSells = sells.filter(
    (t) => t.profitLoss !== undefined && t.profitLoss > 0
  );

  const winRate = (profitableSells.length / sells.length) * 100;
  return Math.round(winRate * 100) / 100;
}

/**
 * Calculate trading statistics from transaction history.
 *
 * @param transactions - Array of transaction objects
 * @returns Trading statistics
 */
export function calculateTradingStats(transactions: Transaction[]): {
  totalTrades: number;
  buyCount: number;
  sellCount: number;
  winRate: number;
  profitableTrades: number;
  losingTrades: number;
} {
  const buys = transactions.filter((t) => t.type === 'buy');
  const sells = transactions.filter((t) => t.type === 'sell');

  const profitableSells = sells.filter(
    (t) => t.profitLoss !== undefined && t.profitLoss > 0
  );
  const losingSells = sells.filter(
    (t) => t.profitLoss !== undefined && t.profitLoss < 0
  );

  return {
    totalTrades: transactions.length,
    buyCount: buys.length,
    sellCount: sells.length,
    winRate: sells.length > 0 ? (profitableSells.length / sells.length) * 100 : 0,
    profitableTrades: profitableSells.length,
    losingTrades: losingSells.length,
  };
}

/**
 * Find the best trade (highest profit) from transaction history.
 *
 * @param transactions - Array of transaction objects
 * @returns Best trade or null if no sells
 */
export function findBestTrade(transactions: Transaction[]): Transaction | null {
  const sells = transactions.filter(
    (t) => t.type === 'sell' && t.profitLoss !== undefined
  );

  if (sells.length === 0) {
    return null;
  }

  return sells.reduce((best, current) =>
    (current.profitLoss || 0) > (best.profitLoss || 0) ? current : best
  );
}

/**
 * Find the worst trade (largest loss) from transaction history.
 *
 * @param transactions - Array of transaction objects
 * @returns Worst trade or null if no sells
 */
export function findWorstTrade(transactions: Transaction[]): Transaction | null {
  const sells = transactions.filter(
    (t) => t.type === 'sell' && t.profitLoss !== undefined
  );

  if (sells.length === 0) {
    return null;
  }

  return sells.reduce((worst, current) =>
    (current.profitLoss || 0) < (worst.profitLoss || 0) ? current : worst
  );
}

/**
 * Calculate average trade profit/loss.
 *
 * @param transactions - Array of transaction objects
 * @returns Average P/L per trade
 */
export function calculateAverageTradePL(transactions: Transaction[]): number {
  const sells = transactions.filter(
    (t) => t.type === 'sell' && t.profitLoss !== undefined
  );

  if (sells.length === 0) {
    return 0;
  }

  const totalPL = sells.reduce((sum, t) => sum + (t.profitLoss || 0), 0);
  return Math.round((totalPL / sells.length) * 100) / 100;
}

/**
 * Calculate profit factor.
 * Profit Factor = Total Profits / Total Losses
 * A value > 1 means more profits than losses.
 *
 * @param transactions - Array of transaction objects
 * @returns Profit factor ratio
 */
export function calculateProfitFactor(transactions: Transaction[]): number {
  const sells = transactions.filter(
    (t) => t.type === 'sell' && t.profitLoss !== undefined
  );

  const totalProfits = sells
    .filter((t) => (t.profitLoss || 0) > 0)
    .reduce((sum, t) => sum + (t.profitLoss || 0), 0);

  const totalLosses = Math.abs(
    sells
      .filter((t) => (t.profitLoss || 0) < 0)
      .reduce((sum, t) => sum + (t.profitLoss || 0), 0)
  );

  if (totalLosses === 0) {
    return totalProfits > 0 ? Infinity : 0;
  }

  return Math.round((totalProfits / totalLosses) * 100) / 100;
}
