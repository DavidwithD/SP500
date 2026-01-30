import type { GameSession, Transaction, TransactionType, TradePreview, GameSessionComputed, GameHistory } from '../types';
import { dataService } from './dataService';

// ============================================================================
// Game Service - Core game logic and state management
// ============================================================================

/**
 * Generate a simple UUID v4
 */
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Round number to specified decimal places
 */
function roundTo(value: number, decimals: number): number {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

/**
 * Format currency
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format shares (up to 4 decimal places)
 */
export function formatShares(shares: number): string {
  return shares.toFixed(4).replace(/\.?0+$/, '');
}

/**
 * Format percentage
 */
export function formatPercent(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

class GameService {
  /**
   * Create a new game session
   */
  createGame(
    userId: string,
    gameName: string,
    startDate: Date,
    startingCash: number = 10000
  ): GameSession {
    const now = new Date();

    return {
      gameId: generateUUID(),
      userId,
      gameName,
      status: 'active',
      startDate,
      currentDate: startDate,
      createdAt: now,
      updatedAt: now,
      startingCash,
      currentCash: startingCash,
      shares: 0,
      averageHoldingPrice: 0,
      totalInvested: 0,
      totalDivested: 0,
      realizedProfitLoss: 0,
      transactionCount: 0,
      buyCount: 0,
      sellCount: 0,
    };
  }

  /**
   * Calculate computed fields for a game session
   */
  computeGameStats(game: GameSession): GameSessionComputed {
    const priceData = dataService.getPriceByDate(game.currentDate);
    const currentPrice = priceData?.close || 0;

    const sharesValue = game.shares * currentPrice;
    const currentValue = sharesValue + game.currentCash;

    const unrealizedProfitLoss = game.shares > 0 
      ? (currentPrice - game.averageHoldingPrice) * game.shares 
      : 0;

    const totalProfitLoss = game.realizedProfitLoss + unrealizedProfitLoss;

    const daysPlayed = Math.floor(
      (game.currentDate.getTime() - game.startDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    const unrealizedProfitLossPercent = game.shares > 0 && game.averageHoldingPrice > 0
      ? ((currentPrice - game.averageHoldingPrice) / game.averageHoldingPrice) * 100
      : 0;

    const totalInvestment = game.startingCash;
    const totalProfitLossPercent = totalInvestment > 0
      ? (totalProfitLoss / totalInvestment) * 100
      : 0;

    return {
      currentValue,
      unrealizedProfitLoss,
      totalProfitLoss,
      daysPlayed,
      currentPrice,
      unrealizedProfitLossPercent,
      totalProfitLossPercent,
    };
  }

  /**
   * Preview a trade before executing
   */
  previewTrade(
    game: GameSession,
    type: TransactionType,
    shares: number
  ): TradePreview | { error: string } {
    const priceData = dataService.getPriceByDate(game.currentDate);
    if (!priceData) {
      return { error: 'No price data available for current date' };
    }

    const pricePerShare = roundTo(priceData.close, 2);
    shares = roundTo(shares, 4); // Support fractional shares up to 4 decimals

    if (shares <= 0) {
      return { error: 'Share amount must be greater than 0' };
    }

    if (type === 'buy') {
      const totalAmount = roundTo(shares * pricePerShare, 2);
      
      if (totalAmount > game.currentCash) {
        return { error: `Insufficient funds. Need ${formatCurrency(totalAmount)}, have ${formatCurrency(game.currentCash)}` };
      }

      const newCash = roundTo(game.currentCash - totalAmount, 2);
      const newShares = roundTo(game.shares + shares, 4);
      const newAvgPrice = roundTo(
        (game.averageHoldingPrice * game.shares + totalAmount) / newShares,
        2
      );
      const newPortfolioValue = roundTo(newCash + (newShares * pricePerShare), 2);

      return {
        type: 'buy',
        shares,
        pricePerShare,
        totalAmount,
        newCash,
        newShares,
        newAvgPrice,
        newPortfolioValue,
      };
    } else {
      // Sell
      if (shares > game.shares) {
        return { error: `Insufficient shares. Trying to sell ${formatShares(shares)}, have ${formatShares(game.shares)}` };
      }

      const totalAmount = roundTo(shares * pricePerShare, 2);
      const newCash = roundTo(game.currentCash + totalAmount, 2);
      const newShares = roundTo(game.shares - shares, 4);
      
      // Average price stays the same (or becomes 0 if selling all)
      const newAvgPrice = newShares > 0 ? game.averageHoldingPrice : 0;
      
      const profitLoss = roundTo((pricePerShare - game.averageHoldingPrice) * shares, 2);
      const profitLossPercent = game.averageHoldingPrice > 0
        ? roundTo((profitLoss / (game.averageHoldingPrice * shares)) * 100, 2)
        : 0;

      const newPortfolioValue = roundTo(newCash + (newShares * pricePerShare), 2);

      return {
        type: 'sell',
        shares,
        pricePerShare,
        totalAmount,
        newCash,
        newShares,
        newAvgPrice,
        newPortfolioValue,
        profitLoss,
        profitLossPercent,
      };
    }
  }

  /**
   * Execute a buy transaction
   */
  buyShares(game: GameSession, shares: number): { game: GameSession; transaction: Transaction } | { error: string } {
    const preview = this.previewTrade(game, 'buy', shares);
    
    if ('error' in preview) {
      return preview;
    }

    const now = new Date();
    const transaction: Transaction = {
      transactionId: generateUUID(),
      gameId: game.gameId,
      date: game.currentDate,
      timestamp: now,
      type: 'buy',
      shares: preview.shares,
      pricePerShare: preview.pricePerShare,
      totalAmount: preview.totalAmount,
      cashBefore: game.currentCash,
      sharesBefore: game.shares,
      avgPriceBefore: game.averageHoldingPrice,
      cashAfter: preview.newCash,
      sharesAfter: preview.newShares,
      avgPriceAfter: preview.newAvgPrice,
    };

    const updatedGame: GameSession = {
      ...game,
      currentCash: preview.newCash,
      shares: preview.newShares,
      averageHoldingPrice: preview.newAvgPrice,
      totalInvested: roundTo(game.totalInvested + preview.totalAmount, 2),
      transactionCount: game.transactionCount + 1,
      buyCount: game.buyCount + 1,
      updatedAt: now,
    };

    return { game: updatedGame, transaction };
  }

  /**
   * Execute a sell transaction
   */
  sellShares(game: GameSession, shares: number): { game: GameSession; transaction: Transaction } | { error: string } {
    const preview = this.previewTrade(game, 'sell', shares);
    
    if ('error' in preview) {
      return preview;
    }

    const now = new Date();
    const transaction: Transaction = {
      transactionId: generateUUID(),
      gameId: game.gameId,
      date: game.currentDate,
      timestamp: now,
      type: 'sell',
      shares: preview.shares,
      pricePerShare: preview.pricePerShare,
      totalAmount: preview.totalAmount,
      cashBefore: game.currentCash,
      sharesBefore: game.shares,
      avgPriceBefore: game.averageHoldingPrice,
      cashAfter: preview.newCash,
      sharesAfter: preview.newShares,
      avgPriceAfter: preview.newAvgPrice,
      profitLoss: preview.profitLoss,
      profitLossPercent: preview.profitLossPercent,
    };

    const updatedGame: GameSession = {
      ...game,
      currentCash: preview.newCash,
      shares: preview.newShares,
      averageHoldingPrice: preview.newAvgPrice,
      totalDivested: roundTo(game.totalDivested + preview.totalAmount, 2),
      realizedProfitLoss: roundTo(game.realizedProfitLoss + (preview.profitLoss || 0), 2),
      transactionCount: game.transactionCount + 1,
      sellCount: game.sellCount + 1,
      updatedAt: now,
    };

    return { game: updatedGame, transaction };
  }

  /**
   * Advance the simulation date
   */
  advanceDate(
    game: GameSession,
    increment: 'day' | 'week' | 'month' | 'year',
    count: number = 1
  ): GameSession | { error: string } {
    const newDate = dataService.advanceDate(game.currentDate, increment, count);
    
    if (!newDate) {
      return { error: 'Cannot advance date further - reached end of available data' };
    }

    return {
      ...game,
      currentDate: newDate,
      updatedAt: new Date(),
    };
  }

  /**
   * Pause a game
   */
  pauseGame(game: GameSession): GameSession {
    return {
      ...game,
      status: 'paused',
      updatedAt: new Date(),
    };
  }

  /**
   * Resume a paused game
   */
  resumeGame(game: GameSession): GameSession {
    return {
      ...game,
      status: 'active',
      updatedAt: new Date(),
    };
  }

  /**
   * End a game and create history record
   */
  endGame(game: GameSession): { game: GameSession; history: GameHistory } {
    const now = new Date();
    const computed = this.computeGameStats(game);

    const endedGame: GameSession = {
      ...game,
      status: 'ended',
      endedAt: now,
      updatedAt: now,
    };

    const history: GameHistory = {
      gameId: game.gameId,
      gameName: game.gameName,
      userId: game.userId,
      startDate: game.startDate,
      endDate: game.currentDate,
      daysPlayed: computed.daysPlayed,
      startingCash: game.startingCash,
      finalCash: game.currentCash,
      finalShares: game.shares,
      finalValue: computed.currentValue,
      totalProfitLoss: computed.totalProfitLoss,
      totalProfitLossPercent: computed.totalProfitLossPercent,
      realizedProfitLoss: game.realizedProfitLoss,
      unrealizedProfitLoss: computed.unrealizedProfitLoss,
      transactionCount: game.transactionCount,
      buyCount: game.buyCount,
      sellCount: game.sellCount,
      completedAt: now,
    };

    return { game: endedGame, history };
  }

  /**
   * Calculate maximum shares that can be bought with available cash
   */
  calculateMaxBuyShares(game: GameSession): number {
    const priceData = dataService.getPriceByDate(game.currentDate);
    if (!priceData) return 0;

    const pricePerShare = priceData.close;
    const maxShares = game.currentCash / pricePerShare;
    return roundTo(maxShares, 4);
  }
}

// Export singleton instance
export const gameService = new GameService();
