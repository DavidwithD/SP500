# Project Structure

**Last Updated**: January 30, 2026

This document describes the folder organization, file naming conventions, and where to place new code in the SP500 Fund Trading Simulator.

---

## 📂 Directory Overview

```
SP500/
├── .vscode/                 # VS Code workspace settings
├── backup-2026-01-30/      # Original app backup (reference only)
├── data/                    # Historical price data
│   ├── sp500.csv           # Raw CSV data
│   ├── sp500.json          # Parsed JSON data
│   ├── readCsv.js          # Data processing script
│   └── readCsv.ts          # TypeScript version
├── docs/                    # Documentation (you are here!)
│   ├── README.md           # Documentation index
│   ├── REQUIREMENTS.md     # Feature requirements
│   ├── TECHNICAL-SPECIFICATION.md
│   ├── UI-UX-SPECIFICATION.md
│   ├── api/                # API reference docs
│   ├── architecture/       # Architecture docs
│   ├── components/         # Component docs
│   └── guides/             # How-to guides
├── public/                  # Static assets (copied as-is)
│   ├── favicon.ico
│   └── robots.txt
├── src/                     # Source code (main app)
│   ├── assets/             # Images, fonts, media
│   ├── components/         # React components
│   │   ├── common/         # Shared/reusable components
│   │   ├── dashboard/      # Dashboard-specific components
│   │   ├── game/           # Game session components
│   │   ├── charts/         # Chart components
│   │   └── layout/         # Layout components
│   ├── constants/          # App constants and enums
│   ├── contexts/           # React Context providers
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Top-level page components
│   ├── services/           # Business logic & API services
│   ├── styles/             # Global styles and themes
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Root component
│   ├── App.css             # Root component styles
│   ├── main.tsx            # Entry point
│   ├── index.css           # Global styles
│   └── vite-env.d.ts       # Vite type definitions
├── .eslintrc.json          # ESLint configuration
├── .gitignore              # Git ignore rules
├── index.html              # HTML entry point
├── package.json            # Dependencies and scripts
├── README.md               # Project overview
├── REBUILD-NOTE.md         # Rebuild context
├── tsconfig.json           # TypeScript base config
├── tsconfig.app.json       # App TypeScript config
├── tsconfig.node.json      # Node TypeScript config
└── vite.config.ts          # Vite configuration
```

---

## 🗂️ Source Code Organization (`src/`)

### Components (`src/components/`)

Organized by feature/domain for scalability:

```
components/
├── common/                  # Shared, reusable components
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── Button.module.css
│   ├── Modal/
│   ├── Input/
│   ├── Card/
│   └── Loader/
├── dashboard/               # Dashboard-specific
│   ├── PortfolioSummary/
│   ├── MarketContext/
│   └── SimulationStatus/
├── game/                    # Game session management
│   ├── GameSelector/
│   ├── GameHistory/
│   └── NewGameWizard/
├── charts/                  # All chart components
│   ├── PriceChart/
│   ├── AverageHoldingChart/
│   └── PerformanceChart/
├── trading/                 # Trading functionality
│   ├── TradeDialog/
│   ├── TradePreview/
│   ├── TransactionHistory/
│   └── TimeControl/
└── layout/                  # Layout components
    ├── Header/
    ├── Navigation/
    ├── Sidebar/
    └── Footer/
```

**Component File Structure:**
```
ComponentName/
├── ComponentName.tsx        # Main component
├── ComponentName.test.tsx   # Unit tests
├── ComponentName.module.css # Scoped styles (CSS Modules)
├── ComponentName.types.ts   # TypeScript interfaces (if complex)
└── index.ts                 # Re-export (barrel file)
```

---

### Services (`src/services/`)

Business logic and data access layer:

```
services/
├── auth/
│   ├── authService.ts       # User authentication
│   └── authService.test.ts
├── game/
│   ├── gameService.ts       # Game session CRUD
│   ├── gameCalculations.ts  # Profit/loss calculations
│   └── gameService.test.ts
├── storage/
│   ├── storageService.ts    # localStorage wrapper
│   └── storageKeys.ts       # Storage key constants
├── data/
│   ├── priceDataService.ts  # Load & query price data
│   └── dataCache.ts         # Caching layer
├── trading/
│   ├── tradingService.ts    # Buy/sell logic
│   ├── transactionService.ts # Transaction history
│   └── validation.ts        # Trade validation
└── achievements/
    ├── achievementService.ts # Achievement tracking
    └── achievementDefinitions.ts # Achievement configs
```

---

### Types (`src/types/`)

Centralized TypeScript definitions:

```
types/
├── index.ts                 # Re-export all types
├── game.types.ts            # GameSession, GameStatus
├── transaction.types.ts     # Transaction, TransactionType
├── user.types.ts            # UserProfile, UserSettings
├── priceData.types.ts       # PriceData, DateRange
├── achievement.types.ts     # Achievement, AchievementCategory
└── api.types.ts             # API request/response types
```

**Example** (`game.types.ts`):
```typescript
export interface GameSession {
  gameId: string;
  userId: string;
  gameName: string;
  status: GameStatus;
  startDate: Date;
  currentDate: Date;
  // ... more fields
}

export type GameStatus = 'active' | 'paused' | 'ended';
```

---

### Hooks (`src/hooks/`)

Custom React hooks for reusable logic:

```
hooks/
├── useGame.ts               # Current game state
├── useTransactions.ts       # Transaction history
├── usePriceData.ts          # Price data queries
├── usePortfolio.ts          # Portfolio calculations
├── useLocalStorage.ts       # localStorage wrapper
├── useTimeControl.ts        # Date advancement
└── useAchievements.ts       # Achievement tracking
```

**Naming Convention**: Always prefix with `use` (React convention)

---

### Utils (`src/utils/`)

Pure utility functions (no React dependencies):

```
utils/
├── calculations/
│   ├── averagePrice.ts      # Average holding price calc
│   ├── profitLoss.ts        # P/L calculations
│   └── roi.ts               # ROI calculations
├── formatting/
│   ├── currency.ts          # Format currency ($X,XXX.XX)
│   ├── percentage.ts        # Format percentages (XX.XX%)
│   ├── shares.ts            # Format share counts (X.XXXX)
│   └── dates.ts             # Date formatting utilities
├── validation/
│   ├── tradeValidation.ts   # Buy/sell validation rules
│   ├── dateValidation.ts    # Date range validation
│   └── inputValidation.ts   # General input validation
└── helpers/
    ├── localStorage.ts      # localStorage helpers
    ├── errors.ts            # Error handling utilities
    └── constants.ts         # Shared constants
```

---

### Constants (`src/constants/`)

Application-wide constants:

```
constants/
├── index.ts                 # Re-export all constants
├── defaults.ts              # Default values
│   └── DEFAULT_INITIAL_CAPITAL = 10000
├── routes.ts                # Route paths
├── storageKeys.ts           # localStorage keys
├── colors.ts                # Theme colors
├── messages.ts              # User-facing messages
└── config.ts                # App configuration
```

---

### Contexts (`src/contexts/`)

React Context providers for global state:

```
contexts/
├── AuthContext.tsx          # User authentication state
├── GameContext.tsx          # Current game state
├── ThemeContext.tsx         # Theme (light/dark mode)
└── SettingsContext.tsx      # User settings
```

---

### Pages (`src/pages/`)

Top-level route components:

```
pages/
├── Dashboard/
│   └── Dashboard.tsx        # Main game/trading view
├── GameHistory/
│   └── GameHistory.tsx      # Past games
├── Leaderboard/
│   └── Leaderboard.tsx      # Global leaderboard
├── Settings/
│   └── Settings.tsx         # User settings
├── Achievements/
│   └── Achievements.tsx     # Achievement showcase
└── NotFound/
    └── NotFound.tsx         # 404 page
```

---

## 📝 File Naming Conventions

### General Rules

- **React Components**: PascalCase (e.g., `GameSelector.tsx`)
- **Utilities/Services**: camelCase (e.g., `gameService.ts`)
- **Types/Interfaces**: PascalCase in `.types.ts` files (e.g., `GameSession`)
- **Test Files**: `*.test.tsx` or `*.test.ts`
- **Style Files**: `*.module.css` for CSS Modules, `*.css` for global

### Component Naming

```typescript
// ✅ Good
Button.tsx
TradeDialog.tsx
PortfolioSummary.tsx

// ❌ Bad
button.tsx           // Not PascalCase
trade-dialog.tsx     // Use camelCase for folders, PascalCase for files
portfolio_summary.tsx // Use PascalCase, not snake_case
```

### Service/Utility Naming

```typescript
// ✅ Good
gameService.ts
calculateROI.ts
formatCurrency.ts

// ❌ Bad
GameService.ts       // Should be camelCase
calculate-roi.ts     // Use camelCase
format_currency.ts   // Use camelCase
```

---

## 🆕 Adding New Code

### Where to Put New Features

| Feature Type | Location | Example |
|-------------|----------|---------|
| New React Component | `src/components/{domain}/` | `src/components/trading/OrderBook/` |
| Business Logic | `src/services/` | `src/services/trading/orderService.ts` |
| Utility Function | `src/utils/` | `src/utils/calculations/sharpeRatio.ts` |
| Custom Hook | `src/hooks/` | `src/hooks/useOrderBook.ts` |
| Type Definition | `src/types/` | `src/types/order.types.ts` |
| New Page | `src/pages/` | `src/pages/Analytics/` |
| Constant | `src/constants/` | `src/constants/orderTypes.ts` |
| Global State | `src/contexts/` | `src/contexts/OrderContext.tsx` |

### Step-by-Step: Adding a New Component

1. **Create folder** in appropriate domain:
   ```bash
   mkdir src/components/trading/OrderBook
   ```

2. **Create files**:
   ```
   OrderBook/
   ├── OrderBook.tsx
   ├── OrderBook.test.tsx
   ├── OrderBook.module.css
   └── index.ts
   ```

3. **Implement component** (`OrderBook.tsx`):
   ```typescript
   import styles from './OrderBook.module.css';
   
   export interface OrderBookProps {
     // ... props
   }
   
   export function OrderBook({ ...props }: OrderBookProps) {
     // ... implementation
   }
   ```

4. **Create barrel export** (`index.ts`):
   ```typescript
   export { OrderBook } from './OrderBook';
   export type { OrderBookProps } from './OrderBook';
   ```

5. **Write tests** (`OrderBook.test.tsx`):
   ```typescript
   import { render, screen } from '@testing-library/react';
   import { OrderBook } from './OrderBook';
   
   describe('OrderBook', () => {
     it('renders without crashing', () => {
       render(<OrderBook />);
       // ... assertions
     });
   });
   ```

6. **Import and use**:
   ```typescript
   import { OrderBook } from '@/components/trading/OrderBook';
   ```

---

## 🎯 Import Path Aliases

Configure TypeScript path aliases for cleaner imports:

**`tsconfig.json`:**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@services/*": ["src/services/*"],
      "@hooks/*": ["src/hooks/*"],
      "@utils/*": ["src/utils/*"],
      "@types/*": ["src/types/*"],
      "@constants/*": ["src/constants/*"]
    }
  }
}
```

**Usage:**
```typescript
// ✅ Good (with aliases)
import { GameService } from '@services/game/gameService';
import { Button } from '@components/common/Button';
import { formatCurrency } from '@utils/formatting/currency';

// ❌ Avoid (relative paths)
import { GameService } from '../../../services/game/gameService';
```

---

## 📦 Module Boundaries

### Component Dependencies

- **Common components** → Can be imported anywhere
- **Feature components** → Should only import from common or same feature
- **Pages** → Can import from any component/service

```typescript
// ✅ Good
// In src/components/trading/TradeDialog.tsx
import { Button } from '@components/common/Button';
import { tradingService } from '@services/trading/tradingService';

// ❌ Bad
// In src/components/common/Button.tsx
import { TradeDialog } from '@components/trading/TradeDialog'; // Common should not depend on features
```

### Service Dependencies

- **Services** → Can call other services but avoid circular dependencies
- **Services** → Should NOT import React or components

```typescript
// ✅ Good
// In gameService.ts
import { storageService } from '@services/storage/storageService';

// ❌ Bad
// In gameService.ts
import { GameSelector } from '@components/game/GameSelector'; // Service should not import components
```

---

## 🧪 Testing Structure

Tests live next to the code they test:

```
src/
├── components/
│   └── Button/
│       ├── Button.tsx
│       └── Button.test.tsx       # Component test
├── services/
│   └── gameService.ts
│   └── gameService.test.ts       # Service test
└── utils/
    └── calculations.ts
    └── calculations.test.ts      # Utility test
```

---

## 🎨 Styling Approach

### CSS Modules (Recommended)

```typescript
// Button.tsx
import styles from './Button.module.css';

export function Button() {
  return <button className={styles.primary}>Click me</button>;
}
```

```css
/* Button.module.css */
.primary {
  background-color: #2563EB;
  color: white;
}
```

### Global Styles

Use `src/index.css` for global styles:
- CSS resets
- Typography defaults
- Theme variables
- Utility classes

---

## 📊 Data Files (`data/`)

Historical price data files:

- **`sp500.csv`**: Raw data source (CSV format)
- **`sp500.json`**: Processed data (JSON format) - **Used by app**
- **`readCsv.js`**: Node script to convert CSV → JSON
- **`readCsv.ts`**: TypeScript version

**Note**: These files are part of the repository. Do not modify unless updating historical data.

---

## 🔍 Quick Reference

### Where do I put...?

| What | Where | Why |
|------|-------|-----|
| A reusable button | `src/components/common/Button/` | Shared across app |
| Trading logic | `src/services/trading/` | Business logic layer |
| Calculate profit | `src/utils/calculations/` | Pure function |
| Game state hook | `src/hooks/useGame.ts` | React state logic |
| Transaction type | `src/types/transaction.types.ts` | Type definition |
| Default capital | `src/constants/defaults.ts` | App constant |
| Price chart | `src/components/charts/PriceChart/` | Chart component |
| Dashboard page | `src/pages/Dashboard/` | Top-level route |
| Format currency | `src/utils/formatting/currency.ts` | Formatting utility |

---

## 🚀 Best Practices

1. **Colocate related code**: Keep tests, styles, and types near components
2. **Use barrel exports**: Create `index.ts` in folders to simplify imports
3. **Avoid deep nesting**: Max 3 levels deep in components
4. **Keep files focused**: Single responsibility per file
5. **Name files clearly**: File name should match export name
6. **Document complex logic**: Add JSDoc comments for utilities
7. **Separate concerns**: UI in components, logic in services

---

## 📚 Related Documentation

- [Development Guide](../guides/development.md) - Workflow and practices
- [Technical Specification](../TECHNICAL-SPECIFICATION.md) - Implementation details
- [Contributing Guide](../../CONTRIBUTING.md) - Contribution guidelines

---

**Questions?** Open an issue or check the [Documentation Index](../README.md).
