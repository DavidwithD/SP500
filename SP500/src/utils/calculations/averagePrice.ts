/**
 * Average Holding Price Calculations
 *
 * Calculates the weighted average cost basis when buying shares.
 * The average price updates with each purchase to reflect the true cost per share.
 */

/**
 * Calculate the new average holding price after a buy transaction.
 *
 * Formula: (currentShares × currentAvgPrice + newShares × newPrice) / totalShares
 *
 * @param currentShares - Number of shares currently held
 * @param currentAvgPrice - Current average price per share
 * @param newShares - Number of new shares being purchased
 * @param newPrice - Price per share for the new purchase
 * @returns The new weighted average price per share
 *
 * @example
 * // Currently hold 2 shares at $100 avg, buying 3 more at $120
 * calculateNewAveragePrice(2, 100, 3, 120) // Returns 112
 * // ($200 + $360) / 5 = $112 per share
 */
export function calculateNewAveragePrice(
  currentShares: number,
  currentAvgPrice: number,
  newShares: number,
  newPrice: number
): number {
  // Validate inputs
  if (newShares <= 0) {
    throw new Error('New shares must be greater than 0');
  }
  if (newPrice < 0) {
    throw new Error('Price cannot be negative');
  }

  const currentValue = currentShares * currentAvgPrice;
  const newValue = newShares * newPrice;
  const totalShares = currentShares + newShares;

  if (totalShares === 0) {
    return 0;
  }

  const newAvgPrice = (currentValue + newValue) / totalShares;

  // Round to 2 decimal places for currency precision
  return Math.round(newAvgPrice * 100) / 100;
}

/**
 * Calculate the average price when starting fresh (no existing shares).
 *
 * @param shares - Number of shares purchased
 * @param pricePerShare - Price per share
 * @returns The average price (same as purchase price for first buy)
 */
export function calculateInitialAveragePrice(
  shares: number,
  pricePerShare: number
): number {
  if (shares <= 0) {
    return 0;
  }
  return Math.round(pricePerShare * 100) / 100;
}

/**
 * Calculate the total cost basis (book value) of holdings.
 *
 * @param shares - Number of shares held
 * @param avgPrice - Average price per share
 * @returns Total cost basis
 */
export function calculateCostBasis(shares: number, avgPrice: number): number {
  if (shares <= 0 || avgPrice <= 0) {
    return 0;
  }
  return Math.round(shares * avgPrice * 100) / 100;
}

/**
 * Calculate the remaining average price after a partial sale.
 * Note: Selling shares does NOT change the average holding price.
 * The average price only changes when BUYING more shares.
 *
 * @param currentAvgPrice - Current average price (unchanged by sales)
 * @returns Same average price
 */
export function calculateAveragePriceAfterSale(currentAvgPrice: number): number {
  // Selling does not change average price
  return currentAvgPrice;
}
