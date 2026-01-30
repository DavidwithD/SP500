import type { AchievementDefinition, AchievementContext } from '../../types/achievement.types';

// All achievement definitions
export const ACHIEVEMENT_DEFINITIONS: AchievementDefinition[] = [
  // Trading Achievements
  {
    id: 'first-trade',
    name: 'First Steps',
    description: 'Complete your first trade',
    icon: '🎯',
    category: 'trading',
    points: 10,
    checkCondition: (ctx: AchievementContext) => ctx.totalTrades >= 1,
  },
  {
    id: 'ten-trades',
    name: 'Getting Started',
    description: 'Complete 10 trades',
    icon: '📈',
    category: 'trading',
    points: 25,
    target: 10,
    checkCondition: (ctx: AchievementContext) => ctx.totalTrades >= 10,
  },
  {
    id: 'fifty-trades',
    name: 'Active Trader',
    description: 'Complete 50 trades',
    icon: '📊',
    category: 'trading',
    points: 50,
    target: 50,
    checkCondition: (ctx: AchievementContext) => ctx.totalTrades >= 50,
  },
  {
    id: 'hundred-trades',
    name: 'Trading Pro',
    description: 'Complete 100 trades',
    icon: '🏆',
    category: 'trading',
    points: 100,
    target: 100,
    checkCondition: (ctx: AchievementContext) => ctx.totalTrades >= 100,
  },

  // Profit Achievements
  {
    id: 'first-profit',
    name: 'In the Green',
    description: 'Make your first profitable trade',
    icon: '💵',
    category: 'profit',
    points: 15,
    checkCondition: (ctx: AchievementContext) => ctx.profitableTrades >= 1,
  },
  {
    id: 'ten-percent',
    name: 'Double Digits',
    description: 'Achieve 10% ROI in a game',
    icon: '📈',
    category: 'profit',
    points: 25,
    checkCondition: (ctx: AchievementContext) => ctx.currentROI >= 10,
  },
  {
    id: 'fifty-percent',
    name: 'Half Way There',
    description: 'Achieve 50% ROI in a game',
    icon: '🚀',
    category: 'profit',
    points: 75,
    checkCondition: (ctx: AchievementContext) => ctx.currentROI >= 50,
  },
  {
    id: 'hundred-percent',
    name: 'Doubled Up',
    description: 'Achieve 100% ROI in a game',
    icon: '💰',
    category: 'profit',
    points: 150,
    checkCondition: (ctx: AchievementContext) => ctx.currentROI >= 100,
  },
  {
    id: 'thousand-profit',
    name: 'Big Winner',
    description: 'Earn $1,000 profit in a single game',
    icon: '💎',
    category: 'profit',
    points: 50,
    checkCondition: (ctx: AchievementContext) => ctx.totalProfit >= 1000,
  },
  {
    id: 'five-thousand-profit',
    name: 'Major Gains',
    description: 'Earn $5,000 profit in a single game',
    icon: '💎',
    category: 'profit',
    points: 100,
    checkCondition: (ctx: AchievementContext) => ctx.totalProfit >= 5000,
  },

  // Milestone Achievements
  {
    id: 'first-game',
    name: 'New Investor',
    description: 'Start your first game',
    icon: '🎮',
    category: 'milestone',
    points: 5,
    checkCondition: (ctx: AchievementContext) => ctx.gamesPlayed >= 1,
  },
  {
    id: 'five-games',
    name: 'Experienced',
    description: 'Play 5 different games',
    icon: '⭐',
    category: 'milestone',
    points: 30,
    target: 5,
    checkCondition: (ctx: AchievementContext) => ctx.gamesPlayed >= 5,
  },
  {
    id: 'complete-game',
    name: 'Finisher',
    description: 'Complete a game from start to end',
    icon: '🏁',
    category: 'milestone',
    points: 25,
    checkCondition: (ctx: AchievementContext) => ctx.gamesCompleted >= 1,
  },
  {
    id: 'long-hold',
    name: 'Patient Investor',
    description: 'Hold shares for 30+ days',
    icon: '⏳',
    category: 'milestone',
    points: 40,
    checkCondition: (ctx: AchievementContext) => ctx.daysHeld >= 30,
  },
  {
    id: 'year-played',
    name: 'Time Traveler',
    description: 'Advance through 1 year of simulation',
    icon: '📅',
    category: 'milestone',
    points: 50,
    checkCondition: (ctx: AchievementContext) => ctx.daysAdvanced >= 365,
  },

  // Special Achievements
  {
    id: 'buy-low',
    name: 'Bottom Fisher',
    description: 'Buy at a 52-week low',
    icon: '🎣',
    category: 'special',
    points: 75,
    checkCondition: (ctx: AchievementContext) => ctx.boughtAt52WeekLow,
  },
  {
    id: 'sell-high',
    name: 'Peak Seller',
    description: 'Sell at a 52-week high',
    icon: '🏔️',
    category: 'special',
    points: 75,
    checkCondition: (ctx: AchievementContext) => ctx.soldAt52WeekHigh,
  },
  {
    id: 'perfect-timing',
    name: 'Perfect Timing',
    description: 'Buy low and sell high in the same game',
    icon: '⏰',
    category: 'special',
    points: 200,
    checkCondition: (ctx: AchievementContext) => ctx.boughtAt52WeekLow && ctx.soldAt52WeekHigh,
  },
  {
    id: 'win-streak',
    name: 'Hot Streak',
    description: '5 profitable trades in a row',
    icon: '🔥',
    category: 'special',
    points: 60,
    checkCondition: (ctx: AchievementContext) => ctx.consecutiveProfitableTrades >= 5,
  },
  {
    id: 'diamond-hands',
    name: 'Diamond Hands',
    description: 'Hold shares for 100+ days',
    icon: '💎',
    category: 'special',
    points: 100,
    checkCondition: (ctx: AchievementContext) => ctx.daysHeld >= 100,
  },
];

export const getAchievementById = (id: string): AchievementDefinition | undefined => {
  return ACHIEVEMENT_DEFINITIONS.find(a => a.id === id);
};

export const getAchievementsByCategory = (category: string): AchievementDefinition[] => {
  return ACHIEVEMENT_DEFINITIONS.filter(a => a.category === category);
};

export default ACHIEVEMENT_DEFINITIONS;
