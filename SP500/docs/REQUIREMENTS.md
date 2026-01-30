# SP500 Fund Trading Simulator - Requirements Document

**Version:** 1.1  
**Date:** January 30, 2026  
**Status:** Requirements Confirmed

---

## 📋 Overview

A web-based game that simulates fund trading, allowing users to practice buying and selling fund shares using historical price data. Users can test different trading strategies across multiple game sessions.

---

## ✅ Core Requirements

### 1. User Authentication & Session Management

#### 1.1 User Login

- Users can log into the game
- User sessions persist across browser refreshes

#### 1.2 Game Management

- Users can create multiple game sessions
- Users can pause an active game
- Users can switch between existing games
- Users can restart and create a new game at any time
- Users can end a game session, which creates a game history record

### 2. Game Initialization

#### 2.1 Start Date Selection

- When starting a new game, users can choose a starting date from available historical data
- The selected date becomes the "current date" in the game simulation
- **[CLARIFICATION NEEDED]**: Should there be a default starting date? Earliest/latest date limits?

#### 2.2 Initial Capital

- **✅ CONFIRMED**: Default starting cash is $10,000
- **✅ CONFIRMED**: Users can configure this amount in a settings page
- Settings page will allow users to customize the initial capital amount for new games

#### 2.3 Simulation Date Display

- **[REQUIRED]**: Prominently display the current simulation date during gameplay
- Display format should include: Date, day of week, and days played counter
- Users should always know what "today" is in the simulation
- Visual indicators for time progression (progress bar through available data range)

### 3. Market Context & Information

#### 3.1 Current Market Status Display

- Display current S&P 500 price at the simulation date
- Show daily price change (percentage and dollar amount)
- Display 52-week high and low prices for context
- Show market trend indicator (bullish/bearish/neutral)
- Display current quarter and year

### 4. Price Visualization

#### 3.1 Historical Chart

- Users can view a chart showing fund prices from the starting date up to the current simulation date
- Future prices (beyond the current simulation date) are hidden from the user
- Chart updates dynamically as the current date advances

#### 3.2 Average Holding Price Chart

- Users can see a chart of their average holding price
- This chart updates every time a purchase is made
- Shows the cost basis across different time periods

### 5. Time Control

#### 5.1 Date Advancement

- Users can fast-forward the current simulation date
- **✅ CONFIRMED**: Available increment options:
  - +1 day
  - +1 week
  - +1 month
  - +1 year
  - Custom (user-specified increment)
- Maximum date limit is the end of available historical data

### 6. Trading Functions

#### 6.1 Trade Input & Confirmation

- **[REQUIRED]**: Provide clear trade input interface with:
  - Input field for number of shares OR dollar amount to invest
  - Real-time preview of trade impact before execution
  - Quick action buttons: "Buy Max" (all available cash), "Sell All" (all shares)
  - Preset percentage buttons: 25%, 50%, 75%, 100% of cash/shares
- **[REQUIRED]**: Show trade preview before confirmation:
  - Shares to buy/sell
  - Price per share
  - Total cost/proceeds
  - New cash balance
  - New share count
  - New average holding price (for buys)
  - Impact on portfolio value
- **[REQUIRED]**: Confirmation dialog for all trades
- **[REQUIRED]**: Clear success/error feedback after trade execution

#### 6.2 Buy Shares

- Users can purchase fund shares using available cash
- Purchases are executed at the current simulation date's price
- System calculates and updates the average holding price after each purchase
- **✅ CONFIRMED**: Fractional shares are allowed (e.g., 0.5 shares, 1.234 shares)
- **✅ CONFIRMED**: No transaction fees or commissions

#### 6.3 Sell Shares

- Users can sell shares they currently hold
- Sales are executed at the current simulation date's price
- Cannot sell more shares than currently held
- **✅ CONFIRMED**: Fractional shares can be sold (e.g., sell 0.5 shares)
- **✅ CONFIRMED**: No transaction fees or commissions

### 7. Portfolio Display

#### 7.1 Current Holdings

- Display current cash balance
- Display number of shares held
- Display average holding price per share
- Display total profit/loss (realized + unrealized)
- Display current portfolio value (cash + shares value)

#### 7.2 Profit Calculation

- Show unrealized profit/loss based on current price vs. average holding price
- **✅ CONFIRMED**: Track and display realized profit/loss from completed sales separately
- **✅ CONFIRMED**: Display both dollar amount and percentage gain/loss for better clarity
- Profit display should clearly distinguish between:
  - **Realized profit/loss**: From completed sell transactions
  - **Unrealized profit/loss**: From current holdings at current price

### 8. Game History

#### 8.1 History Records

- When a game ends, create a history record
- **✅ CONFIRMED**: Save the following information:
  - Final profit/loss (realized + unrealized)
  - Number of transactions
  - Date range played (start date to end date)
  - Best and worst trades
  - Total ROI percentage
  - Final portfolio value
  - Complete transaction log
  - Game duration (days played)

### 9. Navigation & Core UX

#### 9.1 Application Navigation

- **[REQUIRED]**: Users can navigate between main sections:
  - Active game/trading view (dashboard)
  - Portfolio overview
  - Transaction history
  - Game selector/switcher
  - Leaderboard
  - Achievements
  - Settings
- Navigation should be consistent and accessible from all views

#### 9.2 Zero States

- **[REQUIRED]**: Design for empty states:
  - No games created yet: Welcome screen with "Create First Game" CTA
  - No transactions: Helpful prompt to make first trade
  - No shares held: Display cash-only portfolio
  - Empty leaderboard: Encouraging message
  - No achievements yet: Show locked achievements as goals

#### 9.3 Comparison Features

- **[ADVISOR]**: Show performance comparison vs. buy-and-hold strategy
- **[ADVISOR]**: Compare current game performance vs. user's past games
- **[ADVISOR]**: Display "what if" scenarios (e.g., if you held instead of selling)

---

## 💡 Additional Recommended Requirements (Advisor Suggestions)

### 10. Data Management ⭐

- **✅ CONFIRMED**: Load SP500 historical data from `backup-2026-01-30/data/sp500.csv` or `backup-2026-01-30/data/sp500.json`
- **[ADVISOR]** Validate data integrity on app load
- **[ADVISOR]** Handle missing data points gracefully
- **[ADVISOR]** Copy data files from backup to new project structure

### 11. Transaction History ⭐

- **[ADVISOR]** Maintain a transaction log for each game showing:
  - Date, action (buy/sell), shares, price, total cost/proceeds
- **[ADVISOR]** Allow users to view transaction history during gameplay
- **[ADVISOR]** Export transaction history as CSV/JSON

### 12. Input Validation ⭐

- **[ADVISOR]** Validate buy amount doesn't exceed available cash
- **[ADVISOR]** Validate sell amount doesn't exceed held shares
- **[ADVISOR]** Prevent negative or zero transaction amounts
- **[ADVISOR]** Show clear error messages for invalid actions

### 13. User Interface Enhancements ⭐

- **[ADVISOR]** Show loading states during data operations
- **[ADVISOR]** Provide confirmation dialogs for major actions (sell all, end game, restart)
- **[ADVISOR]** Display real-time calculation preview before executing trades
- **[ADVISOR]** Responsive design for mobile/tablet devices

### 14. Game Statistics ⭐

- **[ADVISOR]** Track and display:
  - Total number of trades made
  - Win rate (profitable trades / total trades)
  - Best single trade
  - Worst single trade
  - Total days played
  - Return on investment (ROI)

### 15. Data Persistence ⭐

- **[ADVISOR]** Save game state to localStorage/sessionStorage
- **[ADVISOR]** Auto-save feature at regular intervals
- **[ADVISOR]** Warning before closing browser with unsaved game

### 16. Multiple Game Sessions ⭐

- **[ADVISOR]** Maximum number of concurrent games per user
- **[ADVISOR]** Game naming/labeling system for easy identification
- **[ADVISOR]** Sort/filter games by date created, profit, etc.

### 17. Chart Enhancements ⭐

- **[ADVISOR]** Zoom and pan capabilities on price charts
- **[ADVISOR]** Toggle between different chart types (line, candlestick)
- **[ADVISOR]** Add transaction markers on the price chart
- **[ADVISOR]** Show volume data if available

### 18. Accessibility ⭐

- **[ADVISOR]** Keyboard navigation support
- **[ADVISOR]** Screen reader compatibility
- **[ADVISOR]** High contrast mode option
- **[ADVISOR]** Clear focus indicators

---

## ✅ Requirements Clarification - CONFIRMED

### Core Decisions:

1. **Initial Capital**: ✅ $10,000 as default, configurable via settings page

2. **Transaction Units**: ✅ Fractional shares allowed

3. **Transaction Costs**: ✅ No transaction fees or commissions

4. **Date Range**: ✅ Use data from `backup-2026-01-30/data/sp500.json` and `sp500.csv`

5. **Fast-Forward Options**: ✅ +1 day, +1 week, +1 month, +1 year, and custom increment

6. **Realized vs Unrealized Profit**: ✅ Track separately

7. **Game History Details**: ✅ Save all stats, transaction log, ROI, date range, best/worst trades

8. **Authentication Type**: ✅ Simple username login for now (password later if needed)

### Additional Features - PRIORITIZED:

9. **Leaderboard**: ✅ **APPROVED** - Track best performances across all users/games

10. **Achievement System**: ✅ **APPROVED** - Badges for milestones (first trade, 100% profit, etc.)

11. **Educational Mode**: ✅ **APPROVED** - Tips and explanations for beginners

12. **Strategy Templates**: ❌ **DEFERRED** - Not now, maybe later

13. **News Events**: ❌ **DEFERRED** - Not now

### New Requirements Based on Decisions:

#### Settings Page (New Section)

- Users can access a settings page
- Configurable options:
  - Initial capital amount (default: $10,000)
  - Other game preferences as needed
- Settings persist across sessions

#### Achievement System (New Section)

- Track and award achievements for:
  - First trade executed
  - 10% profit milestone
  - 50% profit milestone
  - 100% profit milestone
  - 10 trades completed
  - 50 trades completed
  - 100 trades completed
  - Perfect timing (buy low, sell high within same week)
  - Long-term holder (hold shares for 30+ days)
- Display achievements in user profile
- Visual badges/icons for each achievement

#### Leaderboard (New Section)

- Display top performers across all games
- Ranking criteria:
  - Highest ROI percentage
  - Highest total profit
  - Most successful trades
- Filter options: All-time, This month, This week
- Anonymous or username-based rankings

#### Educational Mode (New Section)

- Contextual tips during gameplay:
  - When viewing charts: Explain technical indicators
  - Before first trade: Trading basics
  - After losses: Risk management tips
  - Success stories: Highlight good strategies
- Glossary of trading terms
- Tutorial mode for first-time users
- Optional tooltips that can be toggled on/off

---

## 📊 Data Model Considerations

Based on requirements, the app will need to manage:

### Game Session

```typescript
{
  gameId: string;
  userId: string;
  gameName: string;
  startDate: Date;
  currentDate: Date;
  startingCash: number;
  currentCash: number;
  shares: number;
  averageHoldingPrice: number;
  status: "active" | "paused" | "ended";
  createdAt: Date;
  updatedAt: Date;
}
```

### Transaction

```typescript
{
  transactionId: string;
  gameId: string;
  date: Date;
  type: "buy" | "sell";
  shares: number;
  pricePerShare: number;
  totalAmount: number;
  cashBefore: number;
  cashAfter: number;
  sharesBefore: number;
  sharesAfter: number;
}
```

### Price Data

```typescript
{
  date: Date;
  price: number;
  // Additional fields from sp500.csv if available
}
```

---

## 🎯 Success Criteria

The application is considered successful when:

1. ✅ Users can complete a full game lifecycle (create → trade → end)
2. ✅ All buy/sell transactions are accurately calculated
3. ✅ Price charts correctly hide future data
4. ✅ Average holding price is correctly calculated and displayed
5. ✅ Multiple game sessions can be managed simultaneously
6. ✅ Game history is preserved and viewable
7. ✅ UI is intuitive and responsive
8. ✅ No data loss occurs during gameplay

---

## 📝 Notes

- This is a simulation/educational tool, not real trading
- Consider adding disclaimers about this being a game
- Historical performance doesn't guarantee future results (standard disclaimer)
- Review existing `data/` folder for available SP500 data structure

---

**Next Steps:**

1. Review and answer clarification questions
2. Prioritize features (MVP vs future enhancements)
3. Create technical architecture document
4. Begin implementation with core features
