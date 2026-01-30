// ============================================================================
// Core Data Models
// ============================================================================

/**
 * Historical S&P 500 price data for a single trading day
 */
export interface PriceData {
  date: Date; // Trading date (YYYY-MM-DD)
  open: number; // Opening price
  high: number; // Highest price of the day
  low: number; // Lowest price of the day
  close: number; // Closing price (primary price used for trading)
  adjClose: number; // Adjusted closing price
  volume: number; // Trading volume
}

/**
 * Raw S&P 500 data from CSV (before transformation)
 */
export interface SP500Data {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  adj_close: number;
  volume: number;
}

// ============================================================================
// Game State Models
// ============================================================================

/**
 * Game session status
 */
export type GameStatus = "active" | "paused" | "ended";

/**
 * Main game session containing all game state
 */
export interface GameSession {
  // Identification
  gameId: string; // UUID v4
  userId: string; // User identifier
  gameName: string; // User-provided name (max 100 chars)

  // Game State
  status: GameStatus;

  // Date Tracking
  startDate: Date; // Simulation start (YYYY-MM-DD)
  currentDate: Date; // Current simulation date
  createdAt: Date; // When game was created (system time)
  updatedAt: Date; // Last update (system time)
  endedAt?: Date; // When game ended (optional)

  // Financial State
  startingCash: number; // Initial capital (default: 10000)
  currentCash: number; // Available cash
  shares: number; // Current share count (4 decimal precision)
  averageHoldingPrice: number; // Cost basis per share

  // Statistics
  totalInvested: number; // Sum of all buy transactions
  totalDivested: number; // Sum of all sell transactions
  realizedProfitLoss: number; // Profit/loss from sells
  transactionCount: number; // Total trades
  buyCount: number; // Total buys
  sellCount: number; // Total sells
}

/**
 * Computed fields for game session (derived from state)
 */
export interface GameSessionComputed {
  currentValue: number; // shares × currentPrice + currentCash
  unrealizedProfitLoss: number; // (currentPrice - averageHoldingPrice) × shares
  totalProfitLoss: number; // realizedProfitLoss + unrealizedProfitLoss
  daysPlayed: number; // currentDate - startDate (in days)
  currentPrice: number; // Current S&P 500 price at simulation date
  unrealizedProfitLossPercent: number; // Percentage of unrealized gain/loss
  totalProfitLossPercent: number; // Percentage of total gain/loss
}

// ============================================================================
// Transaction Models
// ============================================================================

/**
 * Transaction type
 */
export type TransactionType = "buy" | "sell";

/**
 * Single buy/sell transaction
 */
export interface Transaction {
  // Identification
  transactionId: string; // UUID v4
  gameId: string; // Reference to game

  // Transaction Details
  date: Date; // Simulation date of transaction
  timestamp: Date; // System timestamp (when executed)
  type: TransactionType;

  // Amounts
  shares: number; // Shares bought/sold (4 decimals)
  pricePerShare: number; // Price at execution (2 decimals)
  totalAmount: number; // shares × pricePerShare

  // State Before Transaction
  cashBefore: number;
  sharesBefore: number;
  avgPriceBefore: number;

  // State After Transaction
  cashAfter: number;
  sharesAfter: number;
  avgPriceAfter: number;

  // Profit/Loss (for sells only)
  profitLoss?: number; // (pricePerShare - avgPriceBefore) × shares
  profitLossPercent?: number; // profitLoss / (avgPriceBefore × shares)
}

// ============================================================================
// UI/Action Models
// ============================================================================

/**
 * Trade preview before confirmation
 */
export interface TradePreview {
  type: TransactionType;
  shares: number;
  pricePerShare: number;
  totalAmount: number;
  newCash: number;
  newShares: number;
  newAvgPrice: number;
  newPortfolioValue: number;
  profitLoss?: number; // For sells only
  profitLossPercent?: number; // For sells only
}

/**
 * Time increment options for advancing the simulation date
 */
export type TimeIncrement = "day" | "week" | "month" | "year" | "custom";

/**
 * Settings configuration
 */
export interface AppSettings {
  defaultStartingCash: number;
  theme: "light" | "dark" | "auto";
  showTradingTips: boolean;
  confirmAllTrades: boolean;
}

// ============================================================================
// History & Statistics
// ============================================================================

/**
 * Game history record (when game ends)
 */
export interface GameHistory {
  gameId: string;
  gameName: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  daysPlayed: number;
  startingCash: number;
  finalCash: number;
  finalShares: number;
  finalValue: number;
  totalProfitLoss: number;
  totalProfitLossPercent: number;
  realizedProfitLoss: number;
  unrealizedProfitLoss: number;
  transactionCount: number;
  buyCount: number;
  sellCount: number;
  completedAt: Date;
}
