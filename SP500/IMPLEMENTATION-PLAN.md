# SP500 Fund Trading Simulator - Implementation Plan

**Version:** 1.0  
**Created:** January 30, 2026  
**Status:** Ready for Implementation

---

## 📋 Executive Summary

This document provides a step-by-step implementation plan for building the SP500 Fund Trading Simulator from scratch. The application is an educational web-based game that simulates fund trading using historical S&P 500 data.

**Project Type:** Web Application (React + TypeScript)  
**Complexity:** Medium  
**Estimated Timeline:** 4-6 weeks for MVP  
**Current Status:** Requirements Complete, Architecture Defined, Ready to Build

---

## 🎯 Project Overview

### What We're Building

A web-based educational game where users can:

- Practice trading S&P 500 shares using historical price data
- Manage multiple game sessions with different strategies
- Track portfolio performance with detailed metrics
- Compete on leaderboards and earn achievements
- Learn trading concepts through educational mode

### Key Features

1. **Trading Simulation** - Buy/sell shares at historical prices
2. **Time Control** - Fast-forward through dates (day/week/month/year)
3. **Portfolio Management** - Track cash, shares, profit/loss
4. **Multiple Games** - Create and manage multiple game sessions
5. **Historical Charts** - Visualize price history (future data hidden)
6. **Achievements** - Earn badges for milestones
7. **Leaderboard** - Compete with other players
8. **Educational Mode** - Tips and guidance for beginners

### Technical Stack

- **Framework:** React 19.2 + TypeScript 5.9
- **Build Tool:** Vite 7.2
- **Routing:** React Router DOM 7.13
- **Charts:** Recharts 3.7
- **Storage:** localStorage (no backend for MVP)
- **Styling:** CSS Modules + Global CSS

---

## 📚 Documentation Reference

All detailed specifications are documented:

- **[README.md](README.md)** - Project overview and quick start
- **[docs/REQUIREMENTS.md](docs/REQUIREMENTS.md)** - Complete feature requirements
- **[docs/TECHNICAL-SPECIFICATION.md](docs/TECHNICAL-SPECIFICATION.md)** - Data models, calculations, APIs
- **[docs/UI-UX-SPECIFICATION.md](docs/UI-UX-SPECIFICATION.md)** - UI layouts, components, interactions
- **[docs/architecture/project-structure.md](docs/architecture/project-structure.md)** - Code organization

---

## 🗂️ Project Structure

```
SP500/
├── data/                    # Historical price data
│   ├── sp500.csv           # Raw data
│   ├── sp500.json          # Parsed data (used by app)
│   └── readCsv.ts          # Data conversion script
├── docs/                    # Complete documentation
├── src/                     # Application source code
│   ├── components/         # React components (by domain)
│   ├── services/           # Business logic layer
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   ├── types/              # TypeScript definitions
│   ├── constants/          # App constants
│   ├── contexts/           # React Context providers
│   ├── pages/              # Top-level page components
│   └── styles/             # Global styles
└── public/                  # Static assets
```

---

## 🚀 Implementation Phases

### Phase 1: Foundation & Setup (Week 1)

**Goal:** Set up project infrastructure and core data layer

#### 1.1 Environment Setup ✅

- [x] Project structure initialized
- [x] Dependencies installed (React, TypeScript, Vite, etc.)
- [x] Documentation created

#### 1.2 Data Layer Implementation ✅

**Priority:** HIGH | **Effort:** Medium | **Dependencies:** None | **Status:** COMPLETE

**Tasks:**

- [x] Copy data files from backup folder to `data/` and `public/data/`
- [x] Verify `sp500.json` format and content
- [x] Create TypeScript interfaces in `src/types/priceData.types.ts`
- [x] Implement `priceDataService.ts` with functions:
  - `loadPriceData()` - Load from JSON file
  - `getPriceForDate(date)` - Get price for specific date
  - `getPriceRange(startDate, endDate)` - Get price data range
  - `getDateRange()` - Get min/max available dates
  - `get52WeekRange(date)` - Calculate 52-week high/low
- [x] Implement caching strategy in localStorage
- [x] Add data validation and error handling
- [ ] Write unit tests for data service

**Files to Create:**

```
src/types/priceData.types.ts
src/services/data/priceDataService.ts
src/services/data/dataCache.ts
src/constants/storageKeys.ts
```

**Acceptance Criteria:**

- ✓ Data loads successfully from JSON file
- ✓ Can query price for any date in range
- ✓ Data cached in localStorage for performance
- ✓ Handles missing dates gracefully

#### 1.3 Type Definitions ✅

**Priority:** HIGH | **Effort:** Low | **Dependencies:** None | **Status:** COMPLETE

**Tasks:**

- [x] Create `src/types/game.types.ts` (GameSession, GameStatus)
- [x] Create `src/types/transaction.types.ts` (Transaction, TransactionType)
- [x] Create `src/types/user.types.ts` (UserProfile, UserSettings)
- [ ] Create `src/types/achievement.types.ts` (Achievement definitions)
- [x] Create `src/types/index.ts` (barrel export)

**Reference:** See [TECHNICAL-SPECIFICATION.md](docs/TECHNICAL-SPECIFICATION.md) section "Data Models"

**Acceptance Criteria:**

- ✓ All TypeScript interfaces match specification
- ✓ No type errors in IDE
- ✓ Proper exports in index.ts

#### 1.4 Constants & Configuration ✅

**Priority:** HIGH | **Effort:** Low | **Dependencies:** None | **Status:** COMPLETE

**Tasks:**

- [x] Create `src/constants/defaults.ts` (DEFAULT_INITIAL_CAPITAL = 10000)
- [x] Create `src/constants/storageKeys.ts` (localStorage key names)
- [ ] Create `src/constants/messages.ts` (user-facing messages)
- [ ] Create `src/constants/routes.ts` (route paths)
- [x] Create `src/constants/index.ts` (barrel export)

**Acceptance Criteria:**

- ✓ All constants defined and typed
- ✓ No magic strings/numbers in code

---

### Phase 2: Core Business Logic (Week 2)

**Goal:** Implement trading logic, calculations, and storage

#### 2.1 Calculation Utilities ✅

**Priority:** HIGH | **Effort:** Medium | **Dependencies:** Type definitions | **Status:** COMPLETE

**Tasks:**

- [x] Implement `src/utils/calculations/averagePrice.ts`
  - `calculateNewAveragePrice()` - Update average holding price on buy
- [x] Implement `src/utils/calculations/profitLoss.ts`
  - `calculateUnrealizedPL()` - Current holdings P/L
  - `calculateRealizedPL()` - Completed trade P/L
- [x] Implement `src/utils/calculations/roi.ts`
  - `calculateROI()` - Return on investment
  - `calculateWinRate()` - Profitable trades percentage
- [x] Implement `src/utils/calculations/portfolio.ts`
  - `calculatePortfolioValue()` - Total value (cash + shares)
- [ ] Write comprehensive unit tests for all calculations

**Reference:** See [TECHNICAL-SPECIFICATION.md](docs/TECHNICAL-SPECIFICATION.md) section "Calculation Formulas"

**Acceptance Criteria:**

- ✓ All formulas match specification exactly
- ✓ Handle edge cases (zero shares, zero cash)
- ✓ Precision: prices (2 decimals), shares (4 decimals)
- ✓ 100% test coverage on calculations

#### 2.2 Formatting Utilities ✅

**Priority:** MEDIUM | **Effort:** Low | **Dependencies:** None | **Status:** COMPLETE

**Tasks:**

- [x] Implement `src/utils/formatting/currency.ts`
  - `formatCurrency(amount)` → "$2,752.01"
- [x] Implement `src/utils/formatting/percentage.ts`
  - `formatPercentage(value)` → "+18.75%"
- [x] Implement `src/utils/formatting/shares.ts`
  - `formatShares(count)` → "3.2456"
- [x] Implement `src/utils/formatting/dates.ts`
  - `formatSimulationDate(date)` → "Thursday, March 15, 2018"
- [ ] Write unit tests

**Reference:** See [TECHNICAL-SPECIFICATION.md](docs/TECHNICAL-SPECIFICATION.md) section "Data Formats & Precision"

**Acceptance Criteria:**

- ✓ Consistent formatting throughout app
- ✓ Proper thousand separators
- ✓ Correct decimal places

#### 2.3 Validation Logic

**Priority:** HIGH | **Effort:** Medium | **Dependencies:** None

**Tasks:**

- [ ] Implement `src/utils/validation/tradeValidation.ts`
  - `validateBuyTransaction()` - Check sufficient funds
  - `validateSellTransaction()` - Check sufficient shares
- [ ] Implement `src/utils/validation/dateValidation.ts`
  - `validateDateRange()` - Check date within available data
- [ ] Implement `src/utils/validation/inputValidation.ts`
  - Generic validation helpers
- [ ] Write unit tests for all validation rules

**Reference:** See [TECHNICAL-SPECIFICATION.md](docs/TECHNICAL-SPECIFICATION.md) section "Data Validation"

**Acceptance Criteria:**

- ✓ All validation rules implemented
- ✓ Clear error messages returned
- ✓ Handle fractional shares correctly

#### 2.4 Storage Service

**Priority:** HIGH | **Effort:** Medium | **Dependencies:** Type definitions

**Tasks:**

- [ ] Implement `src/services/storage/storageService.ts`
  - `saveGame(gameSession)` - Save game state
  - `loadGame(gameId)` - Load specific game
  - `loadAllGames(userId)` - Load user's games
  - `deleteGame(gameId)` - Remove game
  - `saveTransaction(transaction)` - Save trade
  - `loadTransactions(gameId)` - Load game transactions
  - `saveUserProfile(profile)` - Save user data
  - `loadUserProfile(userId)` - Load user data
- [ ] Implement auto-save functionality
- [ ] Handle storage quota errors
- [ ] Add data migration support
- [ ] Write unit tests

**Reference:** See [TECHNICAL-SPECIFICATION.md](docs/TECHNICAL-SPECIFICATION.md) section "Data Storage"

**Acceptance Criteria:**

- ✓ Data persists across browser sessions
- ✓ Handle localStorage quota exceeded
- ✓ Graceful error handling

#### 2.5 Game Service ✅

**Priority:** HIGH | **Effort:** High | **Dependencies:** Storage, Calculations | **Status:** COMPLETE

**Tasks:**

- [x] Implement `src/services/game/gameService.ts`
  - `createGame(userId, startDate, initialCash)` - Create new game
  - `loadGame(gameId)` - Load existing game
  - `pauseGame(gameId)` - Pause game
  - `resumeGame(gameId)` - Resume game
  - `endGame(gameId)` - End and archive game
  - `advanceDate(gameId, days)` - Fast-forward time
  - `getCurrentPrice(gameId)` - Get price at current date
- [x] Implement `src/services/game/gameCalculations.ts`
  - Portfolio value calculations
  - P/L calculations
  - Statistics aggregation
- [ ] Write integration tests

**Acceptance Criteria:**

- ✓ Full game lifecycle works
- ✓ State updates correctly
- ✓ Auto-save on every change

#### 2.6 Trading Service

**Priority:** HIGH | **Effort:** High | **Dependencies:** Game Service, Validation

**Tasks:**

- [ ] Implement `src/services/trading/tradingService.ts`
  - `buyShares(gameId, shares, pricePerShare)` - Execute buy
  - `sellShares(gameId, shares, pricePerShare)` - Execute sell
  - `previewBuy(gameId, shares)` - Calculate preview
  - `previewSell(gameId, shares)` - Calculate preview
- [ ] Implement `src/services/trading/transactionService.ts`
  - `createTransaction()` - Create transaction record
  - `getTransactionHistory(gameId)` - Get all trades
  - `getBestTrade(gameId)` - Find most profitable
  - `getWorstTrade(gameId)` - Find least profitable
- [ ] Write comprehensive tests

**Reference:** See [REQUIREMENTS.md](docs/REQUIREMENTS.md) section "Trading Functions"

**Acceptance Criteria:**

- ✓ Buy/sell transactions update all state correctly
- ✓ Average holding price calculated properly
- ✓ Fractional shares supported
- ✓ Transaction history maintained

---

### Phase 3: UI Components - Common (Week 3)

**Goal:** Build reusable UI component library

#### 3.1 Common Components ✅

**Priority:** HIGH | **Effort:** Medium | **Dependencies:** None | **Status:** COMPLETE

**Tasks:**

- [x] Create `src/components/common/Button/`
  - Primary, secondary, danger, success, ghost variants
  - Loading state, disabled state
  - Small, medium, large sizes
  - Icon support (left/right)
- [x] Create `src/components/common/Card/`
  - Container for sections
  - Optional header/footer
  - Variant options (default, outlined, elevated)
- [x] Create `src/components/common/Modal/`
  - Dialog overlay with portal
  - Close button and backdrop click
  - Focus management and keyboard (Escape) support
  - Size options (small, medium, large, fullscreen)
- [x] Create `src/components/common/Input/`
  - Text input with label
  - Error state display
  - Helper text support
  - Icon support (left/right)
- [x] Create `src/components/common/Loader/`
  - Spinner component
  - Dots loader variant
  - Skeleton loader for placeholders
- [x] Create `src/components/common/index.ts` (barrel export)

**Reference:** See [UI-UX-SPECIFICATION.md](docs/UI-UX-SPECIFICATION.md)

**Acceptance Criteria:**

- ✅ All components fully typed
- ✅ Consistent styling
- ✅ Accessible (ARIA labels, keyboard nav)
- ✅ Reusable and composable

#### 3.2 Layout Components ✅

**Priority:** MEDIUM | **Effort:** Medium | **Dependencies:** Common components | **Status:** COMPLETE

**Tasks:**

- [x] Create `src/components/layout/Header/`
  - Logo with link to home
  - Current game display
  - Navigation links
  - Responsive design
- [x] Create `src/components/layout/Layout/`
  - Main layout wrapper
  - Header + Content + Footer area
  - Sidebar support (left/right)
  - Max width options
- [x] Create `src/components/layout/Footer/`
  - Copyright info
  - Version display
- [x] Create `src/components/layout/index.ts` (barrel export)
- [x] Create `src/components/index.ts` (main barrel export)

**Acceptance Criteria:**

- ✅ Consistent layout across all pages
- ✅ Responsive on mobile/tablet/desktop
- ✅ Navigation works with React Router

---

### Phase 4: Feature Components (Week 3-4)

**Goal:** Build game-specific UI components

#### 4.1 Simulation Status & Market Context ✅

**Priority:** HIGH | **Effort:** Medium | **Dependencies:** Data Service, Formatting | **Status:** COMPLETE

**Tasks:**

- [x] Create `src/components/dashboard/SimulationStatus/`
  - Display current simulation date
  - Days played counter
  - Quarter/season indicator
  - Progress bar through data range
- [x] Create `src/components/dashboard/MarketContext/`
  - Current S&P 500 price
  - Daily change ($ and %)
  - 52-week high/low range
  - Market trend indicator
- [x] Style according to UI spec
- [ ] Write component tests

**Reference:** See [UI-UX-SPECIFICATION.md](docs/UI-UX-SPECIFICATION.md) sections 1 & 2

**Acceptance Criteria:**

- ✓ Real-time updates when date changes
- ✓ Color-coded positive/negative changes
- ✓ Clear visual hierarchy

#### 4.2 Portfolio Display ✅

**Priority:** HIGH | **Effort:** Medium | **Dependencies:** Game Service, Formatting | **Status:** COMPLETE

**Tasks:**

- [x] Create `src/components/dashboard/PortfolioSummary/`
  - Cash balance display
  - Shares held with avg price
  - Total portfolio value
  - Unrealized P/L (with $ and %)
  - Realized P/L (with $ and %)
  - Total P/L (with $ and %)
  - Visual indicators (green/red, arrows)
- [x] Handle zero states (no shares)
- [ ] Write component tests

**Reference:** See [UI-UX-SPECIFICATION.md](docs/UI-UX-SPECIFICATION.md) section 3

**Acceptance Criteria:**

- ✓ All metrics calculated correctly
- ✓ Updates immediately after trades
- ✓ Clear visual feedback for gains/losses

#### 4.3 Time Control ✅

**Priority:** HIGH | **Effort:** Low | **Dependencies:** Game Service | **Status:** COMPLETE

**Tasks:**

- [x] Create `src/components/trading/TimeControl/`
  - Buttons: +1 Day, +1 Week, +1 Month, +1 Year
  - Custom date increment input
  - Disable if at max date
  - Loading state during date change
- [ ] Write component tests

**Reference:** See [REQUIREMENTS.md](docs/REQUIREMENTS.md) section "Time Control"

**Acceptance Criteria:**

- ✓ Date advances correctly
- ✓ Cannot exceed max available date
- ✓ UI updates reflect new date

#### 4.4 Trading Panel ✅

**Priority:** HIGH | **Effort:** High | **Dependencies:** Trading Service, Validation | **Status:** COMPLETE

**Tasks:**

- [x] Create `src/components/trading/TradeDialog/`
  - Buy/Sell toggle
  - Input: number of shares OR dollar amount
  - Quick action buttons (25%, 50%, 75%, 100%)
  - "Buy Max" / "Sell All" buttons
- [x] Create `src/components/trading/TradePreview/`
  - Preview section showing:
    - Shares to trade
    - Price per share
    - Total cost/proceeds
    - New cash balance
    - New share count
    - New average price (for buys)
  - Real-time calculation as user types
- [x] Create confirmation dialog
- [x] Implement validation error display
- [ ] Write component tests

**Reference:** See [REQUIREMENTS.md](docs/REQUIREMENTS.md) section "Trading Functions" and [UI-UX-SPECIFICATION.md](docs/UI-UX-SPECIFICATION.md) section 4

**Acceptance Criteria:**

- ✓ Preview updates in real-time
- ✓ Validation prevents invalid trades
- ✓ Confirmation required before execution
- ✓ Clear success/error feedback

#### 4.5 Transaction History ✅

**Priority:** MEDIUM | **Effort:** Medium | **Dependencies:** Transaction Service | **Status:** COMPLETE

**Tasks:**

- [x] Create `src/components/trading/TransactionHistory/`
  - Table/list of all transactions
  - Columns: Date, Type, Shares, Price, Total, P/L
  - Sort by date (newest first)
  - Filter by type (buy/sell)
  - Export to CSV (optional)
- [x] Create transaction row component
- [x] Handle empty state (no transactions yet)
- [ ] Write component tests

**Acceptance Criteria:**

- ✓ Shows all transactions for current game
- ✓ Sortable and filterable
- ✓ Clear visual distinction between buy/sell

---

### Phase 5: Charts & Visualization (Week 4)

**Goal:** Implement price and performance charts

#### 5.1 Price Chart Component ✅

**Priority:** HIGH | **Effort:** High | **Dependencies:** Data Service, Recharts | **Status:** COMPLETE

**Tasks:**

- [x] Create `src/components/charts/PriceChart/`
  - Line chart of S&P 500 prices
  - Show only data from start date to current simulation date
  - Hide future prices (critical requirement)
  - X-axis: dates, Y-axis: price
  - Tooltip on hover
  - Zoom/pan controls (optional)
- [x] Add average holding price line overlay
- [x] Add transaction markers (buy/sell points)
- [x] Responsive sizing
- [ ] Write component tests

**Reference:** See [REQUIREMENTS.md](docs/REQUIREMENTS.md) section "Price Visualization"

**Acceptance Criteria:**

- ✓ Chart updates as current date advances
- ✓ Future data never shown
- ✓ Average price line shows cost basis
- ✓ Performant with large datasets

#### 5.2 Portfolio Value Chart (Optional)

**Priority:** LOW | **Effort:** Medium | **Dependencies:** Game Service

**Tasks:**

- [ ] Create `src/components/charts/PortfolioChart/`
  - Line chart of total portfolio value over time
  - Compare with buy-and-hold strategy
  - Show cash vs. shares value breakdown (optional)

**Acceptance Criteria:**

- ✓ Shows portfolio growth/decline
- ✓ Helpful for strategy evaluation

---

### Phase 6: Pages & Routing (Week 4-5)

**Goal:** Build top-level pages and implement routing

#### 6.1 Dashboard Page (Main Game View)

**Priority:** HIGH | **Effort:** High | **Dependencies:** All feature components

**Tasks:**

- [ ] Create `src/pages/Dashboard/Dashboard.tsx`
  - Integrate all dashboard components:
    - SimulationStatus
    - MarketContext
    - PortfolioSummary
    - PriceChart
    - TradingPanel
    - TimeControl
    - Recent transactions
  - Layout according to UI spec
  - Handle loading states
  - Handle no active game state
- [ ] Implement responsive layout
- [ ] Write integration tests

**Reference:** See [UI-UX-SPECIFICATION.md](docs/UI-UX-SPECIFICATION.md) "Dashboard Layout"

**Acceptance Criteria:**

- ✓ All components work together
- ✓ Real-time updates
- ✓ Responsive design
- ✓ Smooth user experience

#### 6.2 Game Management Pages ✅

**Priority:** HIGH | **Effort:** Medium | **Dependencies:** Game Service | **Status:** COMPLETE

**Tasks:**

- [x] Create `src/pages/GamesPage/` (Game Selector)
  - List all user's games
  - Show game status, date range, P/L
  - Switch between games
  - Create new game button
  - Delete game option
- [x] Create `src/components/game/NewGameWizard/`
  - Step 1: Choose start date
  - Step 2: Set initial capital (use default or custom)
  - Step 3: Name your game (optional)
  - Validation and preview
- [x] Create `src/pages/GamePage/` (Active Game View)
  - Integrates trading components
  - Real-time portfolio updates
- [ ] Create `src/pages/GameHistory/` (Ended Games)
  - Show completed games
  - Statistics and final results
  - Transaction log viewer
- [ ] Write tests

**Reference:** See [REQUIREMENTS.md](docs/REQUIREMENTS.md) sections on Game Management

**Acceptance Criteria:**

- ✓ Can create multiple games
- ✓ Easy to switch between games
- ✓ Game history preserved

#### 6.3 Settings Page ✅

**Priority:** MEDIUM | **Effort:** Low | **Dependencies:** User Service | **Status:** COMPLETE

**Tasks:**

- [x] Create `src/pages/Settings/SettingsPage.tsx`
  - Default initial capital setting
  - Theme preference (light/dark/system)
  - Educational mode toggle
  - Chart preferences (tooltips)
  - Confirm trades toggle
  - Clear cache/reset app option
- [x] Save settings to localStorage
- [x] Apply settings globally
- [ ] Write tests

**Reference:** See [REQUIREMENTS.md](docs/REQUIREMENTS.md) "Settings Page"

**Acceptance Criteria:**

- ✅ Settings persist across sessions
- ✅ Changes apply immediately
- ✅ Clear defaults

#### 6.4 Routing Setup ✅

**Priority:** HIGH | **Effort:** Low | **Dependencies:** All pages | **Status:** COMPLETE

**Tasks:**

- [x] Configure React Router in `src/App.tsx`
- [x] Define routes:
  - `/` - Games page (game selector)
  - `/game` - Active game view
  - `/settings` - Settings
  - `/leaderboard` - Leaderboard
  - `/achievements` - Achievements
  - `/demo` - Price data demo
- [x] Add navigation between routes
- [x] 404 Not Found page
- [ ] Protected routes (require game selected)

**Acceptance Criteria:**

- ✅ All routes work correctly
- ✅ Browser back/forward work
- ✅ URL updates on navigation

---

### Phase 7: Advanced Features (Week 5-6)

**Goal:** Leaderboard, achievements, educational mode

#### 7.1 Achievement System

**Priority:** MEDIUM | **Effort:** High | **Dependencies:** Game Service

**Tasks:**

- [ ] Create `src/services/achievements/achievementDefinitions.ts`
  - Define all achievements:
    - First Trade
    - 10% Profit, 50% Profit, 100% Profit
    - 10 Trades, 50 Trades, 100 Trades
    - Perfect Timing (buy low, sell high)
    - Long-term Holder (30+ days)
- [ ] Create `src/services/achievements/achievementService.ts`
  - `checkAchievements(gameSession)` - Check for unlocks
  - `unlockAchievement(userId, achievementId)` - Award badge
  - `getUnlockedAchievements(userId)` - Get user's badges
- [ ] Create `src/components/achievements/AchievementBadge/`
  - Badge UI component
  - Locked vs. unlocked states
- [ ] Create `src/components/achievements/AchievementNotification/`
  - Toast notification on unlock
- [ ] Create `src/pages/Achievements/Achievements.tsx`
  - Grid of all achievements
  - Progress towards locked achievements
- [ ] Integrate achievement checks into game flow
- [ ] Write tests

**Reference:** See [REQUIREMENTS.md](docs/REQUIREMENTS.md) "Achievement System"

**Acceptance Criteria:**

- ✓ Achievements unlock automatically
- ✓ Visual feedback on unlock
- ✓ Achievement page shows all badges

#### 7.2 Leaderboard

**Priority:** MEDIUM | **Effort:** Medium | **Dependencies:** Game Service

**Tasks:**

- [ ] Create `src/services/leaderboard/leaderboardService.ts`
  - `submitScore(gameSession)` - Add to leaderboard
  - `getLeaderboard(period)` - Get top scores
  - `getUserRank(userId)` - Find user's position
- [ ] Create `src/pages/Leaderboard/Leaderboard.tsx`
  - Table of top performers
  - Columns: Rank, Username, ROI, Profit, Trades
  - Filter: All-time, This Month, This Week
  - Highlight current user
- [ ] Implement local storage based ranking
- [ ] Write tests

**Reference:** See [REQUIREMENTS.md](docs/REQUIREMENTS.md) "Leaderboard"

**Acceptance Criteria:**

- ✓ Shows top 100 performers
- ✓ Ranking updates on game end
- ✓ Fair comparison (same start dates?)

#### 7.3 Educational Mode

**Priority:** LOW | **Effort:** Medium | **Dependencies:** None

**Tasks:**

- [ ] Create `src/components/educational/Tooltip/`
  - Contextual help tooltips
  - Can be toggled on/off
- [ ] Create `src/components/educational/TipPanel/`
  - Sidebar with trading tips
  - Context-aware suggestions
- [ ] Add tips throughout app:
  - "What is average holding price?"
  - "When to buy vs. sell"
  - "Understanding P/L"
  - "Risk management tips"
- [ ] Create glossary of terms
- [ ] Write tests

**Reference:** See [REQUIREMENTS.md](docs/REQUIREMENTS.md) "Educational Mode"

**Acceptance Criteria:**

- ✓ Tips helpful for beginners
- ✓ Can be disabled
- ✓ Not intrusive

---

### Phase 8: Polish & Testing (Week 6)

**Goal:** Bug fixes, testing, optimization

#### 8.1 Testing

**Priority:** HIGH | **Effort:** High | **Dependencies:** All features complete

**Tasks:**

- [ ] Write unit tests for all utilities
- [ ] Write unit tests for all services
- [ ] Write component tests for all components
- [ ] Write integration tests for key flows:
  - Create game → Buy shares → Sell shares → View profit
  - Time advancement → Price updates
  - Multiple game sessions
- [ ] Manual testing on different browsers
- [ ] Mobile responsive testing
- [ ] Accessibility testing (keyboard nav, screen readers)

**Acceptance Criteria:**

- ✓ >80% code coverage
- ✓ All critical paths tested
- ✓ No console errors

#### 8.2 Performance Optimization

**Priority:** MEDIUM | **Effort:** Medium | **Dependencies:** App complete

**Tasks:**

- [ ] Optimize chart rendering (downsample data if needed)
- [ ] Implement React.memo for expensive components
- [ ] Add useMemo/useCallback where appropriate
- [ ] Lazy load pages with React.lazy
- [ ] Optimize bundle size
- [ ] Add loading skeletons
- [ ] Test with large datasets (10+ years of data)

**Acceptance Criteria:**

- ✓ Page loads <2 seconds
- ✓ Smooth interactions (60fps)
- ✓ No janky scrolling

#### 8.3 Error Handling & Edge Cases

**Priority:** HIGH | **Effort:** Medium | **Dependencies:** None

**Tasks:**

- [ ] Handle all error scenarios:
  - Data file not found
  - localStorage quota exceeded
  - Invalid date selected
  - Network errors (if any)
  - Corrupted data recovery
- [ ] Add error boundaries in React
- [ ] Graceful degradation
- [ ] User-friendly error messages
- [ ] Add error logging (console)

**Acceptance Criteria:**

- ✓ App never crashes
- ✓ Clear error messages
- ✓ Recovery options available

#### 8.4 Accessibility

**Priority:** MEDIUM | **Effort:** Medium | **Dependencies:** None

**Tasks:**

- [ ] Keyboard navigation for all features
- [ ] ARIA labels on all interactive elements
- [ ] Focus management (modals, dialogs)
- [ ] Color contrast compliance (WCAG AA)
- [ ] Screen reader testing
- [ ] Tab order logical
- [ ] Skip navigation links

**Reference:** See [REQUIREMENTS.md](docs/REQUIREMENTS.md) "Accessibility"

**Acceptance Criteria:**

- ✓ WCAG 2.1 AA compliant
- ✓ Fully keyboard navigable
- ✓ Screen reader compatible

#### 8.5 Documentation & README Updates

**Priority:** MEDIUM | **Effort:** Low | **Dependencies:** None

**Tasks:**

- [ ] Update README.md with:
  - Screenshots
  - Feature list
  - Setup instructions
  - How to play
- [ ] Add code comments where needed
- [ ] Create CHANGELOG.md
- [ ] Update package.json metadata

**Acceptance Criteria:**

- ✓ README clear and helpful
- ✓ Easy for new developers to onboard

---

## 📦 Deliverables

### MVP (Minimum Viable Product)

**Target:** End of Week 4-5

**Includes:**

- ✓ Core trading functionality (buy/sell)
- ✓ Time control (date advancement)
- ✓ Portfolio tracking
- ✓ Price charts
- ✓ Multiple game sessions
- ✓ Transaction history
- ✓ Settings page
- ✓ Responsive UI

**Excludes:**

- Achievements
- Leaderboard
- Educational mode
- Advanced analytics

### Full Release

**Target:** End of Week 6

**Includes:**

- ✓ All MVP features
- ✓ Achievement system
- ✓ Leaderboard
- ✓ Educational mode
- ✓ Full test coverage
- ✓ Performance optimized
- ✓ Accessibility compliant

---

## 🧪 Testing Strategy

### Unit Tests

- All utility functions (calculations, formatting, validation)
- All service functions (pure logic)
- Complex business logic

### Component Tests

- All UI components render correctly
- User interactions work
- Props handled properly

### Integration Tests

- Full user flows (create game → trade → view results)
- Service layer integration
- localStorage persistence

### Manual Testing

- Cross-browser testing
- Responsive design on devices
- Accessibility with screen readers
- Performance with real data

---

## 🚧 Known Limitations & Future Enhancements

### Current Limitations

- **No Backend:** All data in localStorage (single device only)
- **No Authentication:** Simple username only
- **No Real-time Updates:** No multi-user sync
- **Historical Data Only:** Limited to available CSV/JSON data

### Future Enhancements (Post-MVP)

- **Backend API:** Multi-device sync, cloud storage
- **User Authentication:** Real accounts with passwords
- **News Events:** Show historical market news
- **Strategy Templates:** Pre-configured trading strategies
- **Advanced Analytics:** More detailed performance metrics
- **Social Features:** Share results, friend comparisons
- **Mobile App:** Native iOS/Android versions
- **Live Data:** Connect to real-time market APIs

---

## 📊 Progress Tracking

### Current Status

```
Phase 1: Foundation & Setup         [ COMPLETE    ] ✅
Phase 2: Core Business Logic        [ COMPLETE    ] ✅
Phase 3: UI Components - Common     [ COMPLETE    ] ✅
Phase 4: Feature Components         [ COMPLETE    ] ✅
Phase 5: Charts & Visualization     [ COMPLETE    ] ✅
Phase 6: Pages & Routing           [ COMPLETE    ] ✅
Phase 7: Advanced Features         [ IN PROGRESS ] 🔄
Phase 8: Polish & Testing          [ NOT STARTED ]
```

### Completed Items

**Phase 1 - Foundation & Setup:**

- ✅ Data files (sp500.csv, sp500.json)
- ✅ Type definitions (priceData.types.ts, index.ts)
- ✅ Constants (index.ts, storageKeys.ts)
- ✅ Price data service (priceDataService.ts)

**Phase 2 - Core Business Logic:**

- ✅ Calculation utilities (averagePrice.ts, portfolio.ts, profitLoss.ts, roi.ts)
- ✅ Formatting utilities (currency.ts, dates.ts, percentage.ts, shares.ts)
- ✅ Game service (gameService.ts)
- ✅ Data service (dataService.ts)

**Phase 3 - UI Components Common:**

- ✅ Button component (primary, secondary, danger, success, ghost variants)
- ✅ Card component (with header, footer, variants)
- ✅ Modal component (with portal, focus management, keyboard support)
- ✅ Input component (with label, error, helper text, icons)
- ✅ Loader component (spinner, dots, skeleton variants)
- ✅ Layout components (Header, Layout, Footer)
- ✅ Barrel exports (components/common/index.ts, components/layout/index.ts, components/index.ts)

**Phase 4 - Feature Components:**

- ✅ DateControl (DateControl.tsx + CSS)
- ✅ MarketContext (MarketContext.tsx + CSS)
- ✅ PortfolioDisplay (PortfolioDisplay.tsx + CSS)
- ✅ PriceChart (PriceChart.tsx + CSS)
- ✅ TradingPanel (TradingPanel.tsx + CSS)
- ✅ TransactionHistory (TransactionHistory.tsx + CSS)

**Phase 5 - Charts:**

- ✅ PriceChart component with visualization

**Phase 6 - Pages & Routing:**

- ✅ GamePage (GamePage.tsx + CSS)
- ✅ GamesPage (GamesPage.tsx + CSS)
- ✅ SettingsPage (SettingsPage.tsx + CSS)
- ✅ LeaderboardPage (LeaderboardPage.tsx + CSS) - placeholder with UI
- ✅ AchievementsPage (AchievementsPage.tsx + CSS) - placeholder with UI
- ✅ NotFoundPage (NotFoundPage.tsx + CSS) - 404 page
- ✅ Pages barrel export (pages/index.ts)
- ✅ Full routing in App.tsx

**Hooks:**

- ✅ usePriceData hook

### In Progress / Remaining

**Phase 7 - Advanced Features:**

- [ ] Achievement service (checkAchievements, unlockAchievement logic)
- [ ] Achievement notifications (toast on unlock)
- [ ] Leaderboard service (submitScore, getLeaderboard logic)
- [ ] Educational mode tooltips
- [ ] Integrate achievements into game flow

**Phase 8 - Polish & Testing:**

- [ ] Unit tests
- [ ] Integration tests
- [ ] Performance optimization
- [ ] Accessibility improvements
- [ ] Documentation updates

### Next Steps

1. **Immediate:** Begin Phase 7 - Implement Achievement system service logic
2. Add achievement tracking and unlock notifications
3. Implement Leaderboard service functionality
4. Add Educational mode tooltips
5. Begin Phase 8 - Testing and polish

---

## 🔗 Quick Links

- **Requirements:** [docs/REQUIREMENTS.md](docs/REQUIREMENTS.md)
- **Technical Spec:** [docs/TECHNICAL-SPECIFICATION.md](docs/TECHNICAL-SPECIFICATION.md)
- **UI/UX Spec:** [docs/UI-UX-SPECIFICATION.md](docs/UI-UX-SPECIFICATION.md)
- **Project Structure:** [docs/architecture/project-structure.md](docs/architecture/project-structure.md)
- **Contributing:** [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 💡 Development Tips

1. **Follow the Plan:** Complete phases in order for smooth integration
2. **Test Early:** Write tests alongside features, not after
3. **Use TypeScript:** Leverage types to catch errors early
4. **Refer to Docs:** All specifications are detailed in docs/
5. **Commit Often:** Small, focused commits with clear messages
6. **Code Review:** Review own code before moving to next feature
7. **Performance:** Profile before optimizing
8. **Accessibility:** Build it in from the start

---

## 🆘 Getting Help

If you need clarification on any requirement or specification:

1. Check the relevant documentation file
2. Review the original backup code for reference
3. Open an issue with specific questions
4. Refer to inline comments in backup code

---

**Ready to Build!** 🚀

Start with Phase 2.1 (Data Layer) and work through the phases systematically. Each phase builds on the previous, so completing them in order ensures smooth integration.

Good luck! 🎉
