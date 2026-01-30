/**
 * Calculation Utilities Barrel Export
 */

// Average Price
export {
  calculateNewAveragePrice,
  calculateInitialAveragePrice,
  calculateCostBasis,
  calculateAveragePriceAfterSale,
} from './averagePrice';

// Profit/Loss
export type { ProfitLossResult } from './profitLoss';
export {
  calculateUnrealizedPL,
  calculateRealizedPL,
  calculateTotalPL,
  calculateTotalPLWithPercent,
  calculateBreakEvenPrice,
  calculatePriceForTargetProfit,
} from './profitLoss';

// ROI
export {
  calculateROI,
  calculateAnnualizedROI,
  calculateWinRate,
  calculateTradingStats,
  findBestTrade,
  findWorstTrade,
  calculateAverageTradePL,
  calculateProfitFactor,
} from './roi';

// Portfolio
export type { PortfolioValue } from './portfolio';
export {
  calculatePortfolioValue,
  calculatePortfolioBreakdown,
  calculateMaxBuyShares,
  calculateBuyCost,
  calculateSellProceeds,
  calculateSharesForAmount,
  calculateAllocation,
  calculateCashAfterBuy,
  calculateCashAfterSell,
} from './portfolio';
