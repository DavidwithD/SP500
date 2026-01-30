import type { GameSession, Transaction } from '../../types';
import type { 
  AchievementContext, 
  UnlockedAchievement, 
  AchievementState,
  AchievementDefinition 
} from '../../types/achievement.types';
import { ACHIEVEMENT_DEFINITIONS, getAchievementById } from './achievementDefinitions';

const STORAGE_KEY = 'sp500_achievements';

// Load achievement state from localStorage
const loadAchievementState = (): AchievementState => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        unlocked: parsed.unlocked.map((u: { id: string; unlockedAt: string; gameId?: string }) => ({
          ...u,
          unlockedAt: new Date(u.unlockedAt),
        })),
        progress: new Map(Object.entries(parsed.progress || {})),
      };
    }
  } catch (e) {
    console.error('Failed to load achievements:', e);
  }
  return { unlocked: [], progress: new Map() };
};

// Save achievement state to localStorage
const saveAchievementState = (state: AchievementState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      unlocked: state.unlocked,
      progress: Object.fromEntries(state.progress),
    }));
  } catch (e) {
    console.error('Failed to save achievements:', e);
  }
};

// Build achievement context from game state
export const buildAchievementContext = (
  games: GameSession[],
  currentGame: GameSession | null,
  transactions: Transaction[],
  additionalContext?: Partial<AchievementContext>
): AchievementContext => {
  const totalTrades = transactions.length;
  const profitableTrades = transactions.filter(t => 
    t.type === 'sell' && t.profitLoss && t.profitLoss > 0
  ).length;
  
  // Calculate current ROI
  let currentROI = 0;
  let totalProfit = 0;
  if (currentGame) {
    totalProfit = currentGame.realizedProfitLoss + currentGame.unrealizedProfitLoss;
    currentROI = (totalProfit / currentGame.initialCash) * 100;
  }

  // Calculate days held (if currently holding shares)
  let daysHeld = 0;
  if (currentGame && currentGame.sharesOwned > 0) {
    // Find the first buy transaction
    const buyTransactions = transactions
      .filter(t => t.type === 'buy')
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    if (buyTransactions.length > 0) {
      const firstBuy = new Date(buyTransactions[0].date);
      const currentDate = new Date(currentGame.currentDate);
      daysHeld = Math.floor((currentDate.getTime() - firstBuy.getTime()) / (1000 * 60 * 60 * 24));
    }
  }

  // Calculate days advanced
  let daysAdvanced = 0;
  if (currentGame) {
    const start = new Date(currentGame.startDate);
    const current = new Date(currentGame.currentDate);
    daysAdvanced = Math.floor((current.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  }

  // Calculate consecutive profitable trades
  let consecutiveProfitableTrades = 0;
  const sellTransactions = transactions
    .filter(t => t.type === 'sell')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  for (const t of sellTransactions) {
    if (t.profitLoss && t.profitLoss > 0) {
      consecutiveProfitableTrades++;
    } else {
      break;
    }
  }

  return {
    totalTrades,
    profitableTrades,
    currentROI,
    totalProfit,
    gamesPlayed: games.length,
    gamesCompleted: games.filter(g => g.status === 'ended').length,
    daysHeld,
    daysAdvanced,
    boughtAt52WeekLow: additionalContext?.boughtAt52WeekLow || false,
    soldAt52WeekHigh: additionalContext?.soldAt52WeekHigh || false,
    consecutiveProfitableTrades,
    sharesHeld: currentGame?.sharesOwned || 0,
  };
};

// Check all achievements and return newly unlocked ones
export const checkAchievements = (
  context: AchievementContext,
  gameId?: string
): UnlockedAchievement[] => {
  const state = loadAchievementState();
  const unlockedIds = new Set(state.unlocked.map(u => u.id));
  const newlyUnlocked: UnlockedAchievement[] = [];

  for (const achievement of ACHIEVEMENT_DEFINITIONS) {
    // Skip already unlocked
    if (unlockedIds.has(achievement.id)) continue;

    // Check if condition is met
    if (achievement.checkCondition(context)) {
      const unlocked: UnlockedAchievement = {
        id: achievement.id,
        unlockedAt: new Date(),
        gameId,
      };
      newlyUnlocked.push(unlocked);
      state.unlocked.push(unlocked);
    }

    // Update progress for target-based achievements
    if (achievement.target) {
      const progressValue = getProgressValue(achievement, context);
      state.progress.set(achievement.id, progressValue);
    }
  }

  // Save updated state
  if (newlyUnlocked.length > 0 || state.progress.size > 0) {
    saveAchievementState(state);
  }

  return newlyUnlocked;
};

// Get progress value for a specific achievement
const getProgressValue = (achievement: AchievementDefinition, context: AchievementContext): number => {
  switch (achievement.id) {
    case 'ten-trades':
    case 'fifty-trades':
    case 'hundred-trades':
      return context.totalTrades;
    case 'five-games':
      return context.gamesPlayed;
    default:
      return 0;
  }
};

// Get all unlocked achievements
export const getUnlockedAchievements = (): UnlockedAchievement[] => {
  const state = loadAchievementState();
  return state.unlocked;
};

// Get achievement progress
export const getAchievementProgress = (): Map<string, number> => {
  const state = loadAchievementState();
  return state.progress;
};

// Check if a specific achievement is unlocked
export const isAchievementUnlocked = (achievementId: string): boolean => {
  const state = loadAchievementState();
  return state.unlocked.some(u => u.id === achievementId);
};

// Manually unlock an achievement (for special cases)
export const unlockAchievement = (achievementId: string, gameId?: string): boolean => {
  const achievement = getAchievementById(achievementId);
  if (!achievement) return false;

  const state = loadAchievementState();
  if (state.unlocked.some(u => u.id === achievementId)) {
    return false; // Already unlocked
  }

  state.unlocked.push({
    id: achievementId,
    unlockedAt: new Date(),
    gameId,
  });

  saveAchievementState(state);
  return true;
};

// Reset all achievements (for testing/debug)
export const resetAchievements = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

// Get full achievement data with unlock status
export const getAchievementsWithStatus = () => {
  const state = loadAchievementState();
  const unlockedMap = new Map(state.unlocked.map(u => [u.id, u]));

  return ACHIEVEMENT_DEFINITIONS.map(def => ({
    ...def,
    unlocked: unlockedMap.has(def.id),
    unlockedAt: unlockedMap.get(def.id)?.unlockedAt,
    progress: state.progress.get(def.id) || 0,
  }));
};

export const achievementService = {
  buildAchievementContext,
  checkAchievements,
  getUnlockedAchievements,
  getAchievementProgress,
  isAchievementUnlocked,
  unlockAchievement,
  resetAchievements,
  getAchievementsWithStatus,
};

export default achievementService;
