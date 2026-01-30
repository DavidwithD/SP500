import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { AchievementDefinition, AchievementContext as AchievementCtx } from '../../types/achievement.types';
import type { GameSession } from '../../types';
import { checkAchievements, getAchievementsWithStatus } from '../../services/achievements';
import { AchievementNotification } from '../common';

interface AchievementProviderState {
  checkForAchievements: (game: GameSession) => void;
  getAchievements: () => ReturnType<typeof getAchievementsWithStatus>;
  pendingNotification: AchievementDefinition | null;
  dismissNotification: () => void;
}

const AchievementContext = createContext<AchievementProviderState | null>(null);

interface AchievementProviderProps {
  children: ReactNode;
}

export const AchievementProvider: React.FC<AchievementProviderProps> = ({ children }) => {
  const [notificationQueue, setNotificationQueue] = useState<AchievementDefinition[]>([]);
  const [pendingNotification, setPendingNotification] = useState<AchievementDefinition | null>(null);

  // Show next notification from queue
  const showNextNotification = useCallback(() => {
    setNotificationQueue(prev => {
      if (prev.length > 0) {
        const [next, ...rest] = prev;
        setPendingNotification(next);
        return rest;
      }
      return prev;
    });
  }, []);

  // Check for new achievements after game actions
  const checkForAchievements = useCallback((game: GameSession) => {
    const context: AchievementCtx = {
      totalTrades: game.totalTrades,
      totalBuys: game.transactions.filter(t => t.type === 'buy').length,
      totalSells: game.transactions.filter(t => t.type === 'sell').length,
      totalProfit: (game.cashBalance + game.sharesOwned * (game.currentPrice || 0)) - game.initialCash,
      currentROI: ((game.cashBalance + game.sharesOwned * (game.currentPrice || 0)) - game.initialCash) / game.initialCash * 100,
      maxROI: 0, // Would need to track this over time
      portfolioValue: game.cashBalance + game.sharesOwned * (game.currentPrice || 0),
      sharesOwned: game.sharesOwned,
      cashBalance: game.cashBalance,
      daysPlayed: Math.floor(
        (new Date(game.currentDate).getTime() - new Date(game.startDate).getTime()) / (1000 * 60 * 60 * 24)
      ),
      gamesCompleted: game.status === 'ended' ? 1 : 0,
      consecutiveProfitDays: 0, // Would need to track
      largestSingleTrade: Math.max(
        ...game.transactions.map(t => t.shares * t.price),
        0
      ),
      hasHeldThroughCrash: false, // Would need market context
      perfectTimingCount: 0, // Would need to track
    };

    const newlyUnlocked = checkAchievements(context);

    if (newlyUnlocked.length > 0) {
      setNotificationQueue(prev => [...prev, ...newlyUnlocked]);
      if (!pendingNotification) {
        const [first, ...rest] = newlyUnlocked;
        setPendingNotification(first);
        setNotificationQueue(rest);
      }
    }
  }, [pendingNotification]);

  const dismissNotification = useCallback(() => {
    setPendingNotification(null);
    // Show next notification after a short delay
    setTimeout(showNextNotification, 500);
  }, [showNextNotification]);

  const getAchievements = useCallback(() => {
    return getAchievementsWithStatus();
  }, []);

  return (
    <AchievementContext.Provider
      value={{
        checkForAchievements,
        getAchievements,
        pendingNotification,
        dismissNotification,
      }}
    >
      {children}
      <AchievementNotification
        achievement={pendingNotification}
        onClose={dismissNotification}
      />
    </AchievementContext.Provider>
  );
};

export const useAchievements = (): AchievementProviderState => {
  const context = useContext(AchievementContext);
  if (!context) {
    throw new Error('useAchievements must be used within an AchievementProvider');
  }
  return context;
};

export default AchievementProvider;
