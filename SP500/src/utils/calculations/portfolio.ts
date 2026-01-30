/**
 * Portfolio Value Calculations
 *
 * Functions for calculating total portfolio value and related metrics.
 */

/**
 * Portfolio value breakdown
 */
export interface PortfolioValue {
  /** Total portfolio value */
  total: number;
  /** Cash component */
  cash: number;
  /** Value of shares held */
  sharesValue: number;
  /** Percentage in cash */
  cashPercent: number;
  /** Percentage in shares */
  sharesPercent: number;
}

/**
 * Calculate total portfolio value.
 *
 * Formula: cash + (shares × currentPrice)
 *
 * @param cash - Available cash balance
 * @param shares - Number of shares held
 * @param currentPrice - Current price per share
 * @returns Total portfolio value
 *
 * @example
 * // $5,000 cash + 10 shares at $500 each
 * calculatePortfolioValue(5000, 10, 500) // Returns 10000
 */
export function calculatePortfolioValue(
  cash: number,
  shares: number,
  currentPrice: number
): number {
  const sharesValue = shares * currentPrice;
  const total = cash + sharesValue;
  return Math.round(total * 100) / 100;
}

/**
 * Calculate detailed portfolio breakdown.
 *
 * @param cash - Available cash balance
 * @param shares - Number of shares held
 * @param currentPrice - Current price per share
 * @returns Detailed portfolio breakdown
 */
export function calculatePortfolioBreakdown(
  cash: number,
  shares: number,
  currentPrice: number
): PortfolioValue {
  const sharesValue = shares * currentPrice;
  const total = cash + sharesValue;

  return {
    total: Math.round(total * 100) / 100,
    cash: Math.round(cash * 100) / 100,
    sharesValue: Math.round(sharesValue * 100) / 100,
    cashPercent: total > 0 ? Math.round((cash / total) * 100 * 100) / 100 : 100,
    sharesPercent: total > 0 ? Math.round((sharesValue / total) * 100 * 100) / 100 : 0,
  };
}

/**
 * Calculate the maximum shares that can be purchased.
 *
 * @param availableCash - Cash available for purchase
 * @param pricePerShare - Current price per share
 * @returns Maximum shares (fractional allowed, 4 decimal places)
 *
 * @example
 * // $1,000 available, price is $250 per share
 * calculateMaxBuyShares(1000, 250) // Returns 4.0000
 */
export function calculateMaxBuyShares(
  availableCash: number,
  pricePerShare: number
): number {
  if (pricePerShare <= 0 || availableCash <= 0) {
    return 0;
  }

  const maxShares = availableCash / pricePerShare;
  // Round down to 4 decimal places to ensure we don't exceed available cash
  return Math.floor(maxShares * 10000) / 10000;
}

/**
 * Calculate the cost of purchasing shares.
 *
 * @param shares - Number of shares to purchase
 * @param pricePerShare - Price per share
 * @returns Total cost of purchase
 */
export function calculateBuyCost(
  shares: number,
  pricePerShare: number
): number {
  if (shares <= 0 || pricePerShare <= 0) {
    return 0;
  }

  return Math.round(shares * pricePerShare * 100) / 100;
}

/**
 * Calculate the proceeds from selling shares.
 *
 * @param shares - Number of shares to sell
 * @param pricePerShare - Price per share
 * @returns Total proceeds from sale
 */
export function calculateSellProceeds(
  shares: number,
  pricePerShare: number
): number {
  if (shares <= 0 || pricePerShare <= 0) {
    return 0;
  }

  return Math.round(shares * pricePerShare * 100) / 100;
}

/**
 * Calculate shares for a given dollar amount investment.
 *
 * @param dollarAmount - Amount to invest
 * @param pricePerShare - Price per share
 * @returns Number of shares that can be purchased
 */
export function calculateSharesForAmount(
  dollarAmount: number,
  pricePerShare: number
): number {
  if (pricePerShare <= 0 || dollarAmount <= 0) {
    return 0;
  }

  const shares = dollarAmount / pricePerShare;
  return Math.floor(shares * 10000) / 10000;
}

/**
 * Calculate portfolio allocation percentages.
 *
 * @param shares - Number of shares held
 * @param avgPrice - Average holding price
 * @param currentPrice - Current market price
 * @param cash - Cash balance
 * @returns Allocation percentages
 */
export function calculateAllocation(
  shares: number,
  avgPrice: number,
  currentPrice: number,
  cash: number
): {
  investedPercent: number;
  cashPercent: number;
  atRiskValue: number;
} {
  const costBasis = shares * avgPrice;
  const currentValue = shares * currentPrice;
  const total = currentValue + cash;

  return {
    investedPercent: total > 0 ? Math.round((currentValue / total) * 100 * 100) / 100 : 0,
    cashPercent: total > 0 ? Math.round((cash / total) * 100 * 100) / 100 : 100,
    atRiskValue: Math.round(costBasis * 100) / 100,
  };
}

/**
 * Calculate cash remaining after a buy.
 *
 * @param currentCash - Current cash balance
 * @param shares - Shares to buy
 * @param pricePerShare - Price per share
 * @returns Remaining cash after purchase
 */
export function calculateCashAfterBuy(
  currentCash: number,
  shares: number,
  pricePerShare: number
): number {
  const cost = shares * pricePerShare;
  const remaining = currentCash - cost;
  return Math.round(remaining * 100) / 100;
}

/**
 * Calculate cash after a sell.
 *
 * @param currentCash - Current cash balance
 * @param shares - Shares to sell
 * @param pricePerShare - Price per share
 * @returns Cash balance after sale
 */
export function calculateCashAfterSell(
  currentCash: number,
  shares: number,
  pricePerShare: number
): number {
  const proceeds = shares * pricePerShare;
  const newCash = currentCash + proceeds;
  return Math.round(newCash * 100) / 100;
}
