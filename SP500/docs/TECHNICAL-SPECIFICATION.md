# Technical Specification Document

**Version:** 1.0  
**Date:** January 30, 2026  
**Related:** REQUIREMENTS.md, UI-UX-SPECIFICATION.md

---

## 📋 Overview

This document provides technical specifications for implementing the SP500 Fund Trading Simulator, including data formats, precision requirements, calculations, and technical constraints.

---

## 🔢 Data Formats & Precision

### Number Formatting Standards

#### Prices (Currency)

- **Format**: $X,XXX.XX
- **Decimal Places**: 2
- **Example**: $2,752.01
- **Storage**: Float/Double
- **Display**: Comma-separated thousands, always show 2 decimals

#### Share Count

- **Format**: X.XXXX
- **Decimal Places**: 4 (supports fractional shares)
- **Example**: 3.2456 shares
- **Storage**: Float/Double (minimum precision: 0.0001)
- **Display**: Up to 4 decimal places, trailing zeros optional

#### Percentages

- **Format**: XX.XX%
- **Decimal Places**: 2
- **Example**: +18.75%
- **Display**: Always show sign (+/-), include % symbol
- **Calculation**: Round to 2 decimal places after calculation

#### Large Numbers (Portfolio Value)

- **Format**: $X,XXX,XXX.XX
- **Thousands Separator**: Comma
- **Example**: $1,234,567.89
- **Alternative**: Consider "K" notation for values > $100K (e.g., "$125.5K")

### Date/Time Formats

#### Simulation Date Display

- **Format**: Day, Month DD, YYYY
- **Example**: "Thursday, March 15, 2018"
- **Storage**: ISO 8601 (YYYY-MM-DD)
- **Display Alternative**: "Mar 15, 2018" (abbreviated)

#### Timestamp (System)

- **Format**: ISO 8601 with timezone
- **Example**: "2018-03-15T14:30:00Z"
- **Storage**: UTC timestamp
- **Display**: Convert to user's local timezone if needed

---

## 💾 Data Models (Detailed)

### Game Session

```typescript
interface GameSession {
  // Identification
  gameId: string; // UUID v4
  userId: string; // User identifier
  gameName: string; // User-provided name (max 100 chars)

  // Game State
  status: "active" | "paused" | "ended";

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

  // Computed Fields (not stored, calculated on demand)
  // - currentValue: shares × currentPrice + currentCash
  // - unrealizedProfitLoss: (currentPrice - averageHoldingPrice) × shares
  // - totalProfitLoss: realizedProfitLoss + unrealizedProfitLoss
  // - daysPlayed: currentDate - startDate (in days)
}
```

### Transaction

```typescript
interface Transaction {
  // Identification
  transactionId: string; // UUID v4
  gameId: string; // Reference to game

  // Transaction Details
  date: Date; // Simulation date of transaction
  timestamp: Date; // System timestamp (when executed)
  type: "buy" | "sell";

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
```

### Price Data

```typescript
interface PriceData {
  date: Date; // Trading date (YYYY-MM-DD)
  open: number; // Opening price (if available)
  close: number; // Closing price (primary)
  high: number; // Intraday high (if available)
  low: number; // Intraday low (if available)
  volume?: number; // Trading volume (optional)

  // Additional computed fields
  change?: number; // close - previous close
  changePercent?: number; // change / previous close
}
```

### User Profile

```typescript
interface UserProfile {
  userId: string; // UUID v4
  username: string; // Display name (max 50 chars)
  email?: string; // Optional for future auth
  createdAt: Date;
  lastLoginAt: Date;

  // Settings
  settings: UserSettings;

  // Achievements
  unlockedAchievements: string[]; // Array of achievement IDs

  // Statistics (across all games)
  totalGamesPlayed: number;
  totalGamesCompleted: number;
  bestROI: number; // Best return on investment
  totalTrades: number;
}
```

### User Settings

```typescript
interface UserSettings {
  // Game Defaults
  defaultInitialCapital: number; // Default: 10000

  // UI Preferences
  theme: "light" | "dark" | "auto";
  chartType: "line" | "candlestick";
  showTips: boolean; // Educational mode

  // Notifications
  showTradeConfirmation: boolean;
  showAchievementNotifications: boolean;

  // Number Formatting
  useCompactNumbers: boolean; // "$125.5K" vs "$125,500.00"

  // Accessibility
  reducedMotion: boolean;
  highContrast: boolean;
}
```

### Achievement

```typescript
interface Achievement {
  achievementId: string;
  title: string;
  description: string;
  iconUrl: string;
  category: "trading" | "profit" | "milestone" | "special";

  // Unlock Criteria
  criteria: {
    type:
      | "trade_count"
      | "profit_percent"
      | "profit_amount"
      | "days_held"
      | "custom";
    threshold: number;
    condition?: string; // For complex criteria
  };

  // Rewards (future)
  rewardPoints?: number;
}
```

### Leaderboard Entry

```typescript
interface LeaderboardEntry {
  userId: string;
  username: string;
  gameId: string;
  gameName: string;

  // Performance Metrics
  roi: number; // Return on investment (%)
  profitAmount: number; // Total profit ($)
  tradeCount: number;
  winRate: number; // Profitable trades / total trades
  daysPlayed: number;

  // Ranking
  rank: number;
  period: "all_time" | "month" | "week";
}
```

---

## 🧮 Calculation Formulas

### Average Holding Price Calculation

When **buying** shares:

```typescript
function calculateNewAveragePrice(
  currentShares: number,
  currentAvgPrice: number,
  newShares: number,
  newPrice: number,
): number {
  const currentValue = currentShares * currentAvgPrice;
  const newValue = newShares * newPrice;
  const totalShares = currentShares + newShares;

  if (totalShares === 0) return 0;

  return (currentValue + newValue) / totalShares;
}
```

**Example**:

- Currently hold: 2 shares at $100 avg = $200 total
- Buy: 3 shares at $120 = $360
- New avg: ($200 + $360) / 5 = $112 per share

### Profit/Loss Calculations

#### Unrealized Profit/Loss

```typescript
function calculateUnrealizedPL(
  sharesHeld: number,
  avgHoldingPrice: number,
  currentPrice: number,
): { amount: number; percent: number } {
  const costBasis = sharesHeld * avgHoldingPrice;
  const currentValue = sharesHeld * currentPrice;
  const amount = currentValue - costBasis;
  const percent = costBasis > 0 ? (amount / costBasis) * 100 : 0;

  return { amount, percent };
}
```

#### Realized Profit/Loss (on sell)

```typescript
function calculateRealizedPL(
  sharesSold: number,
  avgHoldingPrice: number,
  sellPrice: number,
): { amount: number; percent: number } {
  const costBasis = sharesSold * avgHoldingPrice;
  const proceeds = sharesSold * sellPrice;
  const amount = proceeds - costBasis;
  const percent = costBasis > 0 ? (amount / costBasis) * 100 : 0;

  return { amount, percent };
}
```

### Portfolio Value

```typescript
function calculatePortfolioValue(
  cash: number,
  shares: number,
  currentPrice: number,
): number {
  return cash + shares * currentPrice;
}
```

### Return on Investment (ROI)

```typescript
function calculateROI(currentValue: number, initialInvestment: number): number {
  if (initialInvestment === 0) return 0;
  return ((currentValue - initialInvestment) / initialInvestment) * 100;
}
```

### Win Rate

```typescript
function calculateWinRate(transactions: Transaction[]): number {
  const sells = transactions.filter((t) => t.type === "sell");
  if (sells.length === 0) return 0;

  const profitableSells = sells.filter((t) => t.profitLoss && t.profitLoss > 0);
  return (profitableSells.length / sells.length) * 100;
}
```

---

## 📦 Data Storage

### Storage Strategy: localStorage

**Why localStorage**:

- No backend required for MVP
- Persists across sessions
- Sufficient for single-user application
- ~5-10MB storage limit (more than enough)

### Storage Keys

```typescript
const STORAGE_KEYS = {
  USER_PROFILE: "sp500sim_user_profile",
  GAMES: "sp500sim_games", // Array of GameSession
  TRANSACTIONS: "sp500sim_transactions_{gameId}",
  PRICE_DATA: "sp500sim_price_data", // Full historical data
  SETTINGS: "sp500sim_settings",
  ACHIEVEMENTS: "sp500sim_achievements",
  LEADERBOARD: "sp500sim_leaderboard",
  LAST_SAVE: "sp500sim_last_save", // Timestamp
};
```

### Data Persistence Pattern

```typescript
// Auto-save after each state change
function autoSave(gameSession: GameSession): void {
  try {
    const games = loadGames();
    const index = games.findIndex((g) => g.gameId === gameSession.gameId);

    if (index >= 0) {
      games[index] = gameSession;
    } else {
      games.push(gameSession);
    }

    localStorage.setItem(STORAGE_KEYS.GAMES, JSON.stringify(games));
    localStorage.setItem(STORAGE_KEYS.LAST_SAVE, new Date().toISOString());
  } catch (error) {
    console.error("Auto-save failed:", error);
    // Show user-friendly error message
  }
}
```

### Storage Limits & Management

- Monitor storage usage
- Implement cleanup for old/ended games (archive after 30 days)
- Export feature for backing up data
- Clear storage option in settings

---

## 📊 Price Data Management

### Data Source

**File**: `backup-2026-01-30/data/sp500.csv` or `sp500.json`

### Data Loading Strategy

```typescript
// Load price data on app initialization
async function loadPriceData(): Promise<PriceData[]> {
  try {
    // Check localStorage cache first
    const cached = localStorage.getItem(STORAGE_KEYS.PRICE_DATA);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      // Cache valid for 24 hours
      if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
        return data;
      }
    }

    // Load from JSON file
    const response = await fetch("/data/sp500.json");
    const data = await response.json();

    // Validate and parse
    const priceData = data.map((item) => ({
      date: new Date(item.date),
      close: parseFloat(item.close),
      // ... other fields
    }));

    // Cache in localStorage
    localStorage.setItem(
      STORAGE_KEYS.PRICE_DATA,
      JSON.stringify({
        data: priceData,
        timestamp: Date.now(),
      }),
    );

    return priceData;
  } catch (error) {
    console.error("Failed to load price data:", error);
    throw new Error("Unable to load historical data");
  }
}
```

### Price Data Access

```typescript
// Get price for specific date
function getPriceForDate(date: Date, priceData: PriceData[]): number | null {
  const dateStr = date.toISOString().split("T")[0];
  const entry = priceData.find(
    (p) => p.date.toISOString().split("T")[0] === dateStr,
  );
  return entry ? entry.close : null;
}

// Get price data range
function getPriceRange(
  startDate: Date,
  endDate: Date,
  priceData: PriceData[],
): PriceData[] {
  return priceData.filter((p) => p.date >= startDate && p.date <= endDate);
}
```

---

## 🔐 Data Validation

### Input Validation Rules

#### Buy Transaction

```typescript
interface BuyValidation {
  valid: boolean;
  errors: string[];
}

function validateBuyTransaction(
  shares: number,
  pricePerShare: number,
  availableCash: number,
): BuyValidation {
  const errors: string[] = [];

  if (shares <= 0) {
    errors.push("Share count must be greater than 0");
  }

  if (shares > 99999) {
    errors.push("Share count exceeds maximum (99,999)");
  }

  const totalCost = shares * pricePerShare;
  if (totalCost > availableCash) {
    const shortfall = totalCost - availableCash;
    errors.push(`Insufficient funds. You need $${shortfall.toFixed(2)} more.`);
  }

  if (!Number.isFinite(shares) || !Number.isFinite(pricePerShare)) {
    errors.push("Invalid number format");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
```

#### Sell Transaction

```typescript
function validateSellTransaction(
  shares: number,
  sharesHeld: number,
): BuyValidation {
  const errors: string[] = [];

  if (shares <= 0) {
    errors.push("Share count must be greater than 0");
  }

  if (shares > sharesHeld) {
    errors.push(
      `Cannot sell more than you own (${sharesHeld.toFixed(4)} shares)`,
    );
  }

  if (!Number.isFinite(shares)) {
    errors.push("Invalid number format");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
```

### Date Validation

```typescript
function validateDateRange(
  selectedDate: Date,
  minDate: Date,
  maxDate: Date,
): BuyValidation {
  const errors: string[] = [];

  if (selectedDate < minDate) {
    errors.push(`Date cannot be before ${minDate.toLocaleDateString()}`);
  }

  if (selectedDate > maxDate) {
    errors.push(`Date cannot be after ${maxDate.toLocaleDateString()}`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
```

---

## ⚡ Performance Considerations

### Optimization Strategies

1. **Lazy Loading**: Load transactions only when viewing history
2. **Memoization**: Cache calculated values (portfolio value, P/L)
3. **Debouncing**: Input fields (wait 300ms before recalculating previews)
4. **Virtual Scrolling**: For long transaction lists
5. **Chart Optimization**: Limit data points rendered (sample if > 1000 points)

### Chart Performance

```typescript
// Downsample data for better performance
function downsampleData(
  data: PriceData[],
  maxPoints: number = 500,
): PriceData[] {
  if (data.length <= maxPoints) return data;

  const step = Math.ceil(data.length / maxPoints);
  return data.filter((_, index) => index % step === 0);
}
```

---

## 🐛 Error Handling

### Error Categories

1. **User Input Errors**: Invalid amounts, insufficient funds
2. **Data Errors**: Missing price data, corrupted storage
3. **System Errors**: localStorage quota exceeded, network failures

### Error Recovery

```typescript
// Graceful degradation
function handleStorageError(error: Error): void {
  console.error("Storage error:", error);

  if (error.name === "QuotaExceededError") {
    // Prompt user to export and clear old data
    showStorageFullDialog();
  } else {
    // Generic error fallback
    showErrorToast("Failed to save game. Please try again.");
  }
}

// Data recovery
function recoverCorruptedData(): void {
  try {
    // Attempt to load backup
    const backup = localStorage.getItem("sp500sim_backup");
    if (backup) {
      // Restore from backup
      restoreFromBackup(backup);
    } else {
      // Reset to fresh state
      initializeFreshState();
    }
  } catch (error) {
    // Last resort: clear all data
    confirmClearAllData();
  }
}
```

---

## 🧪 Testing Considerations

### Unit Test Coverage

- Calculation functions (average price, P/L, ROI)
- Validation functions
- Data parsing and formatting
- Date utilities

### Integration Test Scenarios

- Complete trade flow (buy → sell → calculate profit)
- Time advancement with price updates
- Multiple game sessions
- Data persistence across page reloads

### Edge Cases to Test

- Buying with exact available cash (no fractional cents remaining)
- Selling all shares (ensure 0.0000 shares, not 0.0001)
- Date jumps across missing data points
- localStorage quota exceeded
- Concurrent game sessions
- Very large numbers (JavaScript Number.MAX_SAFE_INTEGER)

---

## 📐 Technical Constraints

### Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Required APIs**: localStorage, Fetch API, ES6+
- **Progressive Enhancement**: Core features work without JavaScript animations

### Dependencies

**Core**:

- React 18+
- TypeScript 5+
- Vite (build tool)

**Charts**:

- Chart.js or Recharts (TBD based on requirements)

**Utilities**:

- date-fns (date manipulation)
- uuid (ID generation)

**Optional**:

- Papa Parse (CSV parsing, if needed)
- Zustand or Context API (state management)

---

## 🔄 Data Migration Strategy

### Version Compatibility

```typescript
interface DataVersion {
  version: string; // Semantic versioning
  migrateFrom?: (oldData: any) => any;
}

const DATA_VERSIONS: DataVersion[] = [
  {
    version: "1.0.0",
    // Initial version, no migration
  },
  {
    version: "1.1.0",
    migrateFrom: (oldData) => {
      // Example: Add new field
      return {
        ...oldData,
        newField: defaultValue,
      };
    },
  },
];
```

### Migration Execution

```typescript
function migrateData(): void {
  const currentVersion = localStorage.getItem("sp500sim_version");
  const latestVersion = DATA_VERSIONS[DATA_VERSIONS.length - 1].version;

  if (currentVersion !== latestVersion) {
    // Perform migration
    runMigrations(currentVersion, latestVersion);
    localStorage.setItem("sp500sim_version", latestVersion);
  }
}
```

---

This technical specification should be used alongside REQUIREMENTS.md and UI-UX-SPECIFICATION.md for complete implementation.
