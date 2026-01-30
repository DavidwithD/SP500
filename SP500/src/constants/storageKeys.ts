/**
 * localStorage Keys
 * 
 * Centralized storage key constants for the application.
 * This prevents typos and makes refactoring easier.
 */

export const STORAGE_KEYS = {
  // Price Data
  PRICE_DATA: 'sp500sim_price_data',
  PRICE_DATA_VERSION: 'sp500sim_price_data_version',
  
  // User Data
  USER_PROFILE: 'sp500sim_user_profile',
  USER_SETTINGS: 'sp500sim_settings',
  
  // Game Sessions
  GAMES: 'sp500sim_games',
  ACTIVE_GAME_ID: 'sp500sim_active_game_id',
  
  // Transactions (per game)
  TRANSACTIONS_PREFIX: 'sp500sim_transactions_',
  
  // Achievements
  ACHIEVEMENTS: 'sp500sim_achievements',
  UNLOCKED_ACHIEVEMENTS: 'sp500sim_unlocked_achievements',
  
  // Leaderboard
  LEADERBOARD: 'sp500sim_leaderboard',
  
  // System
  LAST_SAVE: 'sp500sim_last_save',
  APP_VERSION: 'sp500sim_app_version',
  BACKUP: 'sp500sim_backup',
} as const;

/**
 * Get transaction storage key for a specific game
 */
export function getTransactionKey(gameId: string): string {
  return `${STORAGE_KEYS.TRANSACTIONS_PREFIX}${gameId}`;
}

/**
 * Storage version for data migration
 */
export const STORAGE_VERSION = '1.0.0';

/**
 * Cache expiration time (24 hours in milliseconds)
 */
export const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000;
