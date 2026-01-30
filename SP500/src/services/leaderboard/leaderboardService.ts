import type { GameSession } from '../../types';
import type { 
  LeaderboardEntry, 
  LeaderboardPeriod, 
  LeaderboardFilters 
} from '../../types/leaderboard.types';

const STORAGE_KEY = 'sp500_leaderboard';

// Load leaderboard from localStorage
const loadLeaderboard = (): LeaderboardEntry[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((entry: LeaderboardEntry) => ({
        ...entry,
        startDate: new Date(entry.startDate),
        endDate: new Date(entry.endDate),
        submittedAt: new Date(entry.submittedAt),
      }));
    }
  } catch (e) {
    console.error('Failed to load leaderboard:', e);
  }
  return [];
};

// Save leaderboard to localStorage
const saveLeaderboard = (entries: LeaderboardEntry[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (e) {
    console.error('Failed to save leaderboard:', e);
  }
};

// Generate unique ID
const generateId = (): string => {
  return `lb-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Submit a completed game to the leaderboard
export const submitScore = (
  game: GameSession,
  username: string = 'Player'
): LeaderboardEntry | null => {
  // Only submit ended games
  if (game.status !== 'ended') {
    console.warn('Can only submit ended games to leaderboard');
    return null;
  }

  const entries = loadLeaderboard();

  // Check if this game was already submitted
  if (entries.some(e => e.gameId === game.gameId)) {
    console.warn('Game already submitted to leaderboard');
    return null;
  }

  // Calculate final stats
  const finalValue = game.cashBalance + (game.sharesOwned * (game.currentPrice || 0));
  const profit = finalValue - game.initialCash;
  const roi = (profit / game.initialCash) * 100;
  
  const startDate = new Date(game.startDate);
  const endDate = new Date(game.endedAt || game.currentDate);
  const daysPlayed = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  const entry: LeaderboardEntry = {
    id: generateId(),
    rank: 0, // Will be calculated when fetching
    username,
    gameId: game.gameId,
    gameName: game.gameName,
    roi,
    profit,
    trades: game.totalTrades,
    startDate,
    endDate,
    initialCash: game.initialCash,
    finalValue,
    daysPlayed,
    submittedAt: new Date(),
  };

  entries.push(entry);
  saveLeaderboard(entries);

  return entry;
};

// Get filtered and sorted leaderboard
export const getLeaderboard = (filters: Partial<LeaderboardFilters> = {}): LeaderboardEntry[] => {
  const {
    period = 'all-time',
    sortBy = 'roi',
    limit = 100,
  } = filters;

  let entries = loadLeaderboard();

  // Filter by period
  const now = new Date();
  if (period === 'this-week') {
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    entries = entries.filter(e => e.submittedAt >= weekAgo);
  } else if (period === 'this-month') {
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    entries = entries.filter(e => e.submittedAt >= monthAgo);
  }

  // Sort
  entries.sort((a, b) => {
    switch (sortBy) {
      case 'profit':
        return b.profit - a.profit;
      case 'trades':
        return b.trades - a.trades;
      case 'roi':
      default:
        return b.roi - a.roi;
    }
  });

  // Assign ranks
  entries.forEach((entry, index) => {
    entry.rank = index + 1;
  });

  // Limit results
  return entries.slice(0, limit);
};

// Get user's rank on leaderboard
export const getUserRank = (username: string, period: LeaderboardPeriod = 'all-time'): number | null => {
  const leaderboard = getLeaderboard({ period, limit: 1000 });
  const userEntry = leaderboard.find(e => e.username === username);
  return userEntry?.rank || null;
};

// Get user's best scores
export const getUserBestScores = (username: string, limit: number = 5): LeaderboardEntry[] => {
  const entries = loadLeaderboard()
    .filter(e => e.username === username)
    .sort((a, b) => b.roi - a.roi);
  
  return entries.slice(0, limit);
};

// Get leaderboard stats
export const getLeaderboardStats = () => {
  const entries = loadLeaderboard();
  
  if (entries.length === 0) {
    return {
      totalEntries: 0,
      averageROI: 0,
      highestROI: 0,
      totalProfit: 0,
    };
  }

  const totalROI = entries.reduce((sum, e) => sum + e.roi, 0);
  const highestROI = Math.max(...entries.map(e => e.roi));
  const totalProfit = entries.reduce((sum, e) => sum + e.profit, 0);

  return {
    totalEntries: entries.length,
    averageROI: totalROI / entries.length,
    highestROI,
    totalProfit,
  };
};

// Delete a leaderboard entry (by game ID)
export const deleteEntry = (gameId: string): boolean => {
  const entries = loadLeaderboard();
  const filtered = entries.filter(e => e.gameId !== gameId);
  
  if (filtered.length < entries.length) {
    saveLeaderboard(filtered);
    return true;
  }
  return false;
};

// Clear all leaderboard entries
export const clearLeaderboard = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export const leaderboardService = {
  submitScore,
  getLeaderboard,
  getUserRank,
  getUserBestScores,
  getLeaderboardStats,
  deleteEntry,
  clearLeaderboard,
};

export default leaderboardService;
