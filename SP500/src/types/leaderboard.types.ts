// Leaderboard Type Definitions

export interface LeaderboardEntry {
  id: string;
  rank: number;
  username: string;
  gameId: string;
  gameName: string;
  roi: number;
  profit: number;
  trades: number;
  startDate: Date;
  endDate: Date;
  initialCash: number;
  finalValue: number;
  daysPlayed: number;
  submittedAt: Date;
}

export type LeaderboardPeriod = 'all-time' | 'this-month' | 'this-week';

export type LeaderboardSortBy = 'roi' | 'profit' | 'trades';

export interface LeaderboardFilters {
  period: LeaderboardPeriod;
  sortBy: LeaderboardSortBy;
  limit: number;
}
