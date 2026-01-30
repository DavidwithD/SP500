# UI/UX Specification Document

**Version:** 1.0  
**Date:** January 30, 2026  
**Related:** REQUIREMENTS.md

---

## 📋 Overview

This document provides detailed UI/UX specifications for the SP500 Fund Trading Simulator, including layouts, interactions, visual design, and user flows.

---

## 🎨 Design Principles

1. **Clarity**: Financial information should be immediately understandable
2. **Confidence**: Users should feel confident before executing trades
3. **Context**: Always show where users are in time and portfolio state
4. **Consistency**: Maintain consistent patterns across the application
5. **Accessibility**: Usable by all users regardless of ability

---

## 📐 Layout Structure

### Main Application Layout

```
┌─────────────────────────────────────────────────────────┐
│  Header: Logo | Game Name | User Menu                   │
├─────────────────────────────────────────────────────────┤
│  Navigation: Dashboard | History | Games | Leaderboard  │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  [Main Content Area - Changes per view]                  │
│                                                           │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

### Dashboard Layout (Main Game View)

```
┌──────────────────────────────────────────────────────────────┐
│  Simulation Status Bar                                       │
│  📅 Thursday, March 15, 2018 | Q1 2018                      │
│  Days Played: 45 | 🌸 Spring                                │
├──────────────────────────────────────────────────────────────┤
│  Market Context Panel                                        │
│  📊 S&P 500: $2,752.01  (-1.2%) ↓                          │
│  52W Range: $2,405.70 - $2,872.87 | Trend: ⚠️ Bearish     │
├──────────────────────────────────────────────────────────────┤
│  Portfolio Summary (Top Section)                             │
│  ┌─────────────┬─────────────┬──────────────┬─────────────┐ │
│  │ Cash        │ Shares      │ Avg Price    │ Portfolio   │ │
│  │ $8,234.50   │ 3.5 shares  │ $500.43      │ $11,870.54  │ │
│  └─────────────┴─────────────┴──────────────┴─────────────┘ │
│  ┌──────────────────────────────────────────────────────────┐│
│  │ Unrealized P/L: +$1,636.04 (+15.98%) 📈                 ││
│  │ Realized P/L:   +$234.50 (+2.35%)                        ││
│  │ Total P/L:      +$1,870.54 (+18.71%) 🎉                 ││
│  └──────────────────────────────────────────────────────────┘│
├──────────────────────────────────────────────────────────────┤
│  Main Chart Area (60% width)   │  Trading Panel (40%)       │
│  ┌─────────────────────────────┐│  ┌──────────────────────┐ │
│  │                             ││  │ Quick Actions        │ │
│  │  [Price Chart]              ││  │ ┌──────┐  ┌────────┐ │ │
│  │   With avg holding line     ││  │ │ BUY  │  │ SELL   │ │ │
│  │                             ││  │ └──────┘  └────────┘ │ │
│  │                             ││  ├──────────────────────┤ │
│  │                             ││  │ Time Control         │ │
│  │                             ││  │ [+1D][+1W][+1M][+1Y] │ │
│  └─────────────────────────────┘│  │ [Custom: ___ days]   │ │
│                                  │  ├──────────────────────┤ │
│                                  │  │ Recent Transactions  │ │
│                                  │  │ [Last 5 trades...]   │ │
│                                  │  └──────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

---

## 🎯 Key UI Components

### 1. Simulation Status Bar

**Purpose**: Always visible, shows current game context

**Elements**:

- 📅 Current simulation date (e.g., "Thursday, March 15, 2018")
- Quarter/Season indicator
- Days played counter
- Progress bar (% through available data)

**Visual Style**:

- Prominent, fixed at top
- Background color distinguishes from market data
- Large, readable font for date

**Example**:

```
┌──────────────────────────────────────────────────────┐
│ 📅 Thursday, March 15, 2018 · Q1 2018 · 🌸 Spring   │
│ Days Played: 45 of 2,500 [■■■░░░░░░░] 1.8%         │
└──────────────────────────────────────────────────────┘
```

---

### 2. Market Context Panel

**Purpose**: Show current market conditions

**Elements**:

- Current S&P 500 price
- Daily change (% and $) with color coding (green up, red down)
- 52-week high/low
- Market trend indicator with emoji/icon

**Visual Style**:

- Large price display
- Color-coded changes: Green (positive), Red (negative)
- Subtle background color for trend

**Example**:

```
┌────────────────────────────────────────────────────────┐
│ 📊 S&P 500                                             │
│ $2,752.01  -$33.42 (-1.20%) ↓                        │
│ 52-Week Range: $2,405.70 ━━━━●━━ $2,872.87           │
│ Trend: ⚠️ Bearish  │  Volatility: Moderate           │
└────────────────────────────────────────────────────────┘
```

---

### 3. Portfolio Summary Card

**Purpose**: Show user's current holdings and performance

**Layout**:

- 4-column grid for main metrics
- Separate section for P/L breakdown
- Visual indicators for positive/negative

**Metrics Displayed**:

1. **Cash**: Available buying power
2. **Shares Held**: Current share count (fractional precision)
3. **Avg Holding Price**: Cost basis per share
4. **Portfolio Value**: Total value (cash + shares × current price)

**P/L Display**:

- **Unrealized P/L**: (Current price - Avg price) × Shares
- **Realized P/L**: From completed sell transactions
- **Total P/L**: Unrealized + Realized
- Show both $ amount and % for each

**Visual Indicators**:

- 📈 Green with up arrow for gains
- 📉 Red with down arrow for losses
- 🎉 Special celebration icon for major milestones

---

### 4. Trade Input Dialog

**Trigger**: Clicking "BUY" or "SELL" button

**Layout**:

```
┌─────────────────────────────────────────────┐
│  Buy Shares                            [X]  │
├─────────────────────────────────────────────┤
│  Current Price: $2,752.01                   │
│  Available Cash: $8,234.50                  │
│                                              │
│  ○ Enter number of shares                   │
│     [______] shares                          │
│                                              │
│  ○ Enter dollar amount to invest            │
│     $[______]                                │
│                                              │
│  Quick Actions:                              │
│  [25%] [50%] [75%] [100% / Buy Max]         │
│                                              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  PREVIEW                                     │
│  Shares to buy:        2.9916 shares         │
│  Cost per share:       $2,752.01             │
│  Total cost:           $8,234.50             │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  After Transaction:                          │
│  New cash balance:     $0.00                 │
│  New share count:      6.4916 shares         │
│  New avg holding:      $1,537.21             │
│  New portfolio value:  $17,862.79            │
│                                              │
│      [Cancel]           [Confirm Buy] →     │
└─────────────────────────────────────────────┘
```

**Key Features**:

- Real-time preview updates as user types
- Radio button or tab to switch between share count / dollar amount
- Quick action buttons auto-fill amounts
- Clear before/after comparison
- Disable confirm if insufficient funds

---

### 5. Time Control Panel

**Purpose**: Allow users to advance simulation date

**Layout**:

```
┌──────────────────────────────────┐
│  Fast Forward                    │
│  ┌────┬────┬────┬────┬────────┐  │
│  │+1D │+1W │+1M │+1Y │Custom▼│  │
│  └────┴────┴────┴────┴────────┘  │
│                                   │
│  Or jump to specific date:       │
│  [Date Picker: MM/DD/YYYY]       │
│                                   │
│  ⚠️ Cannot go past available data│
│     Max: Dec 31, 2025             │
└──────────────────────────────────┘
```

**Interactions**:

- Single click advances by preset amount
- Custom option opens number input
- Date picker only allows dates ≤ max available
- Show confirmation for large jumps (>1 month)

---

### 6. Transaction History View

**Layout**:

```
┌──────────────────────────────────────────────────────────────┐
│  Transaction History                    [Export CSV] [Filter]│
├──────────────────────────────────────────────────────────────┤
│  📊 Summary: 15 trades | 8 buys, 7 sells | Win rate: 64.3%  │
├──────────────────────────────────────────────────────────────┤
│  Date       │ Type │ Shares  │ Price    │ Total    │ P/L     │
│  ──────────────────────────────────────────────────────────  │
│  Mar 15,'18 │ BUY  │ +2.9916 │ $2,752.01│ $8,234.50│    -    │
│  Mar 10,'18 │ SELL │ -1.5000 │ $2,680.00│ $4,020.00│ +$120   │
│  Mar 05,'18 │ BUY  │ +3.5000 │ $2,600.00│ $9,100.00│    -    │
│  ...                                                          │
└──────────────────────────────────────────────────────────────┘
```

**Features**:

- Sortable columns
- Filter by type (buy/sell), date range, profitable/unprofitable
- Color coding: Green for sells with profit, red for losses
- Export to CSV functionality
- Pagination for long lists

---

### 7. Game Selector View

**Purpose**: Switch between multiple game sessions

**Layout**:

```
┌─────────────────────────────────────────────────────────┐
│  My Games                               [+ New Game]    │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────┐   │
│  │ 🎮 Spring 2018 Strategy            [ACTIVE]     │   │
│  │ Started: Jan 1, 2018 | Current: Mar 15, 2018    │   │
│  │ P/L: +$1,870.54 (+18.71%) 📈                    │   │
│  │ [Continue] [Pause] [End Game]                    │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │ 🎮 2020 Pandemic Trading            [PAUSED]    │   │
│  │ Started: Feb 1, 2020 | Current: Mar 20, 2020    │   │
│  │ P/L: -$2,450.00 (-24.50%) 📉                    │   │
│  │ [Resume] [Delete]                                │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  [View History] (5 completed games)                     │
└─────────────────────────────────────────────────────────┘
```

---

### 8. Zero State Designs

#### No Games Yet

```
┌────────────────────────────────────────┐
│                                         │
│         🎮                              │
│                                         │
│     Welcome to Fund Trading Simulator! │
│                                         │
│  You don't have any games yet.         │
│  Start your first trading journey!     │
│                                         │
│     [Create Your First Game] →         │
│                                         │
└────────────────────────────────────────┘
```

#### No Transactions Yet

```
┌────────────────────────────────────────┐
│  📊 Transaction History                │
│                                         │
│  You haven't made any trades yet.      │
│                                         │
│  💡 Tip: Start by buying some shares   │
│  when you think the price is good!     │
│                                         │
│     [Go to Trading View] →             │
└────────────────────────────────────────┘
```

---

## 🎨 Visual Design System

### Color Palette

**Primary Colors**:

- Primary Blue: #2563EB (actions, links)
- Success Green: #10B981 (positive P/L, up trends)
- Danger Red: #EF4444 (negative P/L, down trends)
- Warning Yellow: #F59E0B (alerts, important info)

**Neutral Colors**:

- Background: #FFFFFF (light mode) / #1F2937 (dark mode)
- Card Background: #F9FAFB / #111827
- Text Primary: #111827 / #F9FAFB
- Text Secondary: #6B7280 / #9CA3AF
- Border: #E5E7EB / #374151

**Semantic Colors**:

- Profit/Gain: Green (#10B981)
- Loss/Decline: Red (#EF4444)
- Neutral/Unchanged: Gray (#6B7280)
- Highlight: Blue (#2563EB)

### Typography

**Font Family**:

- Primary: "Inter", system-ui, sans-serif
- Monospace (numbers): "JetBrains Mono", monospace

**Font Sizes**:

- Heading 1: 2rem (32px) - Page titles
- Heading 2: 1.5rem (24px) - Section headers
- Heading 3: 1.25rem (20px) - Card titles
- Body: 1rem (16px) - Regular text
- Small: 0.875rem (14px) - Labels, captions
- Tiny: 0.75rem (12px) - Footnotes

**Number Formatting**:

- Prices: $X,XXX.XX (2 decimal places)
- Shares: X.XXXX (4 decimal places)
- Percentages: XX.XX% (2 decimal places)
- Large numbers: Use commas as thousands separator

### Spacing

- Base unit: 4px
- Common spacing: 8px, 16px, 24px, 32px, 48px
- Component padding: 16px standard, 24px for cards
- Section margins: 32px between major sections

### Icons

- Use consistent icon set (Heroicons, Lucide, or similar)
- Size: 20px standard, 24px for prominent actions
- Semantic icons:
  - 📈 Upward trend / profit
  - 📉 Downward trend / loss
  - 📊 Charts / statistics
  - 🎮 Games
  - ⚙️ Settings
  - 🏆 Achievements / leaderboard

---

## 📱 Responsive Design

### Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px
- Large Desktop: > 1440px

### Mobile Adaptations

**Dashboard**:

- Stack portfolio summary vertically
- Chart takes full width
- Trading panel moves below chart
- Time controls in collapsed accordion

**Trade Dialog**:

- Full-screen modal on mobile
- Larger touch targets (min 44px height)
- Simplified quick action buttons

**Navigation**:

- Hamburger menu for main nav
- Bottom tab bar for primary actions

---

## ♿ Accessibility Requirements

### Keyboard Navigation

- All interactive elements focusable via Tab key
- Modal dialogs trap focus
- Escape key closes dialogs
- Enter key confirms primary actions
- Arrow keys navigate lists

### Screen Readers

- All images have alt text
- Form inputs have associated labels
- ARIA labels for icon-only buttons
- ARIA live regions for dynamic updates (price changes, trade confirmations)
- Semantic HTML (nav, main, section, article)

### Visual Accessibility

- Minimum contrast ratio: 4.5:1 for text
- Color not the only indicator (use icons + color)
- Focus indicators clearly visible (2px outline)
- Text resizable up to 200% without breaking layout
- Support for prefers-reduced-motion

---

## 🔄 User Flows

### Flow 1: First-Time User Complete Journey

1. **Landing** → See zero state: "Create Your First Game"
2. **Click CTA** → New Game wizard opens
3. **Step 1**: Enter username (simple auth)
4. **Step 2**: Choose starting date (calendar picker with data range)
5. **Step 3**: Set initial capital (default $10,000, can adjust)
6. **Step 4**: Optional tutorial ("Show me around" vs "Skip")
7. **Complete** → Dashboard loads with welcome message
8. **Tutorial highlights** (if chosen):
   - Simulation date
   - Portfolio summary
   - How to buy/sell
   - Time controls
9. **First trade prompt**: "Ready to make your first trade?"
10. **Achievement unlocked**: "First Trade" badge after first transaction

### Flow 2: Executing a Trade

1. **Dashboard view** → User clicks "BUY" or "SELL"
2. **Trade dialog opens** → Shows current price, available cash/shares
3. **User inputs amount** → Via shares count or dollar amount
4. **Preview updates real-time** → Shows impact on portfolio
5. **User clicks quick action** → e.g., "50%" button
6. **Preview updates** → New calculations shown
7. **User clicks "Confirm"** → Loading state briefly
8. **Success notification** → "Successfully bought X shares"
9. **Dialog closes** → Dashboard updates with new balances
10. **Chart updates** → New transaction marker added
11. **Achievement check** → Award badge if milestone reached

### Flow 3: Advancing Time

1. **Dashboard view** → User clicks "+1 Week"
2. **Confirmation** (if needed) → "Fast forward 7 days?"
3. **Loading animation** → Brief spinner
4. **Dashboard updates** → New date, prices, P/L recalculated
5. **Notification** → "Jumped to March 22, 2018"
6. **Chart redraws** → Shows additional week of data

---

## 📊 Chart Specifications

### Price Chart (Main Chart)

**Type**: Line chart with area fill

**Features**:

- X-axis: Dates (from start to current simulation date)
- Y-axis: Price ($)
- Primary line: S&P 500 price (blue)
- Secondary line: User's average holding price (dashed orange)
- Transaction markers: Buy (green ▲), Sell (red ▼)
- Tooltip on hover: Date, price, change from previous day

**Interactions**:

- Hover: Show detailed tooltip
- Zoom: Mouse wheel or pinch gesture
- Pan: Click and drag
- Reset zoom: Double-click

**Responsive**:

- Mobile: Simplified, touch-optimized
- Tablet/Desktop: Full features

### Average Holding Price Chart

**Type**: Step line chart

**Purpose**: Shows how average cost basis changes with each purchase

**Features**:

- X-axis: Dates
- Y-axis: Average price ($)
- Steps: Each buy transaction creates new step
- Highlighted segments: Different colors for different buy batches
- Tooltip: Shows transaction details

---

## 🎉 Animations & Feedback

### Micro-interactions

- **Button hover**: Subtle lift effect (transform: translateY(-2px))
- **Button click**: Slight press effect
- **Trade success**: Confetti animation (for significant wins)
- **Achievement unlock**: Modal with badge animation
- **Portfolio update**: Number count-up animation
- **Chart update**: Smooth transition (400ms ease)

### Loading States

- **Data loading**: Skeleton screens
- **Trade executing**: Spinner with "Processing..." text
- **Time advancing**: Progress bar with date counter
- **Page transitions**: Fade in/out (200ms)

### Transitions

- Standard duration: 200ms
- Complex transitions: 400ms
- Use `ease-in-out` for most transitions
- Respect `prefers-reduced-motion` setting

---

## 📝 Form Validation & Error Handling

### Input Validation

**Buy Shares**:

- ✅ Share count > 0
- ✅ Total cost ≤ Available cash
- ❌ "Insufficient funds" error if over budget
- ❌ "Invalid amount" for negative/zero

**Sell Shares**:

- ✅ Share count > 0
- ✅ Share count ≤ Shares held
- ❌ "Cannot sell more than you own" error
- ❌ "Invalid amount" for negative/zero

### Error Message Patterns

**Inline errors**: Below input field, red text

```
Share count: [____]
❌ You can only sell up to 3.5 shares
```

**Toast notifications**: Top-right corner

```
┌─────────────────────────────┐
│ ❌ Trade Failed              │
│ Insufficient funds. You     │
│ need $500 more.             │
└─────────────────────────────┘
```

**Modal errors**: For critical errors

```
┌──────────────────────────────┐
│  ⚠️ Data Loading Error       │
│                               │
│  Failed to load price data.  │
│                               │
│  [Retry]  [Contact Support]  │
└──────────────────────────────┘
```

---

## 🎯 Call-to-Action (CTA) Guidelines

### Primary CTAs

- Color: Primary blue (#2563EB)
- Size: Large (min 48px height on mobile)
- Text: Action-oriented ("Buy Shares", "Confirm Trade")
- Location: Prominent, easy to find

### Secondary CTAs

- Style: Outline button or ghost button
- Less prominent than primary
- Examples: "Cancel", "View Details", "Learn More"

### Destructive CTAs

- Color: Red (#EF4444)
- Require confirmation
- Examples: "Delete Game", "Sell All", "End Game"

---

This UI/UX specification should be used alongside REQUIREMENTS.md and TECHNICAL-SPECIFICATION.md for complete implementation guidance.
