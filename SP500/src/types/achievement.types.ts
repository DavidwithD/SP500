// Achievement Type Definitions

export type AchievementCategory = 'trading' | 'profit' | 'milestone' | 'special';

export interface AchievementDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  points: number; // Points earned when unlocked
  target?: number; // For progress-based achievements
  checkCondition: (context: AchievementContext) => boolean;
}

export interface UnlockedAchievement {
  id: string;
  unlockedAt: Date;
  gameId?: string;
}

export interface AchievementProgress {
  id: string;
  current: number;
  target: number;
}

export interface AchievementContext {
  totalTrades: number;
  profitableTrades: number;
  currentROI: number;
  totalProfit: number;
  gamesPlayed: number;
  gamesCompleted: number;
  daysHeld: number;
  daysAdvanced: number;
  boughtAt52WeekLow: boolean;
  soldAt52WeekHigh: boolean;
  consecutiveProfitableTrades: number;
  sharesHeld: number;
}

export interface AchievementState {
  unlocked: UnlockedAchievement[];
  progress: Map<string, number>;
}
