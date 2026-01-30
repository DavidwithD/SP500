# Development Guide

**Last Updated**: January 30, 2026

This guide covers the development workflow, coding standards, best practices, and daily development tasks for the SP500 Fund Trading Simulator.

---

## 🚀 Getting Started

### Prerequisites

Before you start developing, ensure you've completed:

1. ✅ [Installation Guide](installation.md) - Environment setup
2. ✅ [Project Structure](../architecture/project-structure.md) - Understand code organization
3. ✅ [Technical Specification](../TECHNICAL-SPECIFICATION.md) - Review implementation details

### First Day Checklist

- [ ] Clone repository and install dependencies
- [ ] Start dev server and verify app runs
- [ ] Read Requirements and Technical Specs
- [ ] Set up VS Code with recommended extensions
- [ ] Run linter and ensure no errors
- [ ] Create a test branch and make a small change
- [ ] Open a PR to familiarize yourself with the process

---

## 💻 Daily Workflow

### 1. Start Your Development Session

```bash
# Pull latest changes
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/your-feature-name

# Start dev server
npm run dev
```

### 2. Make Changes

- Write code following our conventions
- Test in browser frequently
- Run linter periodically: `npm run lint`
- Check TypeScript errors: `npm run type-check`

### 3. Before Committing

```bash
# Run linter and fix auto-fixable issues
npm run lint:fix

# Type check
npm run type-check

# Run tests (when implemented)
npm test

# Stage and commit
git add .
git commit -m "feat: add feature description"
```

### 4. Push and Create PR

```bash
# Push to your branch
git push origin feature/your-feature-name

# Open PR on GitHub
# - Provide clear description
# - Link related issues
# - Request review
```

---

## 📝 Coding Standards

### TypeScript Guidelines

#### 1. Use Strict Type Checking

```typescript
// ✅ Good - Explicit types
function calculateProfit(
  shares: number,
  avgPrice: number,
  currentPrice: number,
): number {
  return shares * (currentPrice - avgPrice);
}

// ❌ Bad - No types (implicit any)
function calculateProfit(shares, avgPrice, currentPrice) {
  return shares * (currentPrice - avgPrice);
}
```

#### 2. Define Interfaces for Props

```typescript
// ✅ Good - Clear interface
export interface TradeDialogProps {
  currentPrice: number;
  availableCash: number;
  onConfirm: (shares: number) => void;
  onCancel: () => void;
}

export function TradeDialog({
  currentPrice,
  availableCash,
  onConfirm,
  onCancel,
}: TradeDialogProps) {
  // Implementation
}
```

#### 3. Use Enums or Union Types

```typescript
// ✅ Good - Type-safe status
export type GameStatus = "active" | "paused" | "ended";

// Or use enum
export enum TransactionType {
  Buy = "buy",
  Sell = "sell",
}

// ❌ Bad - String without types
const status = "active"; // Could be typo'd as 'activ'
```

#### 4. Avoid `any` - Use `unknown` or Generics

```typescript
// ✅ Good - Type-safe
function parseJSON<T>(json: string): T | null {
  try {
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}

// ❌ Bad - Loses type safety
function parseJSON(json: string): any {
  return JSON.parse(json);
}
```

---

### React Best Practices

#### 1. Functional Components with Hooks

```typescript
// ✅ Good - Modern functional component
export function PortfolioSummary() {
  const { cash, shares } = usePortfolio();
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      {/* JSX */}
    </div>
  );
}

// ❌ Bad - Class component (avoid unless necessary)
class PortfolioSummary extends React.Component {
  // ...
}
```

#### 2. Extract Custom Hooks

```typescript
// ✅ Good - Reusable logic in custom hook
function usePortfolio() {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);

  useEffect(() => {
    // Load portfolio
  }, []);

  return { portfolio, updatePortfolio };
}

// Use in components
function Dashboard() {
  const { portfolio } = usePortfolio();
  // ...
}
```

#### 3. Memoize Expensive Calculations

```typescript
// ✅ Good - Memoize expensive calculations
function PortfolioValue({ shares, prices }: Props) {
  const totalValue = useMemo(() => {
    return calculateComplexValue(shares, prices);
  }, [shares, prices]);

  return <div>{totalValue}</div>;
}
```

#### 4. Use React.memo for Pure Components

```typescript
// ✅ Good - Prevent unnecessary re-renders
export const PriceDisplay = React.memo(({ price }: { price: number }) => {
  return <div>${price.toFixed(2)}</div>;
});
```

#### 5. Proper Event Handlers

```typescript
// ✅ Good - Typed event handlers
function TradeForm() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle submit
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Handle change
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

---

### Code Organization

#### 1. Component Structure

```typescript
// Imports
import React, { useState, useEffect } from 'react';
import { Button } from '@components/common/Button';
import { gameService } from '@services/game/gameService';
import styles from './MyComponent.module.css';
import type { MyComponentProps } from './MyComponent.types';

// Types (if not in separate file)
interface MyComponentProps {
  // ...
}

// Constants (component-specific)
const DEFAULT_VALUE = 10;

// Helper functions (if small and component-specific)
function helperFunction() {
  // ...
}

// Main component
export function MyComponent({ prop1, prop2 }: MyComponentProps) {
  // State
  const [state, setState] = useState<StateType>(initialValue);

  // Hooks
  useEffect(() => {
    // Side effects
  }, [dependencies]);

  // Event handlers
  const handleClick = () => {
    // Handle click
  };

  // Render helpers (if complex)
  const renderSection = () => {
    return <div>...</div>;
  };

  // Main return
  return (
    <div className={styles.container}>
      {/* JSX */}
    </div>
  );
}
```

#### 2. Service Structure

```typescript
// gameService.ts

// Imports
import { storageService } from "@services/storage/storageService";
import type { GameSession } from "@types/game.types";

// Types (service-specific)
interface CreateGameParams {
  // ...
}

// Private helper functions (not exported)
function validateGameData(data: unknown): boolean {
  // Validation logic
}

// Public API (exported functions)
export const gameService = {
  async createGame(params: CreateGameParams): Promise<GameSession> {
    // Implementation
  },

  async getGame(gameId: string): Promise<GameSession | null> {
    // Implementation
  },

  // More methods...
};
```

---

### Naming Conventions

| Type             | Convention       | Example                             |
| ---------------- | ---------------- | ----------------------------------- |
| Components       | PascalCase       | `TradeDialog`, `PriceChart`         |
| Functions        | camelCase        | `calculateProfit`, `formatCurrency` |
| Variables        | camelCase        | `currentPrice`, `isLoading`         |
| Constants        | UPPER_SNAKE_CASE | `DEFAULT_CAPITAL`, `MAX_SHARES`     |
| Types/Interfaces | PascalCase       | `GameSession`, `TransactionType`    |
| Enums            | PascalCase       | `GameStatus`, `AchievementCategory` |
| CSS Classes      | camelCase        | `.primaryButton`, `.cardHeader`     |
| Files            | Match export     | `GameService.tsx`, `gameService.ts` |

#### Boolean Variables

```typescript
// ✅ Good - Clear boolean names
const isLoading = true;
const hasError = false;
const canTrade = true;
const shouldShowModal = false;

// ❌ Bad - Unclear
const loading = true; // Could be a string or number
const error = false; // Not obviously a boolean
```

---

## 🧪 Testing

### Unit Testing (Coming Soon)

```typescript
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Test Coverage Goals

- **Components**: 80%+ coverage
- **Services**: 90%+ coverage
- **Utilities**: 95%+ coverage
- **Critical paths**: 100% coverage (buy/sell, calculations)

---

## 🎨 Styling Guidelines

### CSS Modules

```css
/* Button.module.css */

/* Use clear class names */
.button {
  padding: 12px 24px;
  border-radius: 8px;
}

/* Use modifiers for variants */
.button--primary {
  background-color: var(--color-primary);
}

.button--secondary {
  background-color: var(--color-secondary);
}

/* Use BEM-like naming for sub-elements */
.button__icon {
  margin-right: 8px;
}
```

```typescript
// Button.tsx
import styles from './Button.module.css';

export function Button({ variant = 'primary', icon, children }) {
  return (
    <button className={`${styles.button} ${styles[`button--${variant}`]}`}>
      {icon && <span className={styles.button__icon}>{icon}</span>}
      {children}
    </button>
  );
}
```

### Design Tokens (CSS Variables)

```css
/* index.css - Global variables */
:root {
  /* Colors */
  --color-primary: #2563eb;
  --color-success: #10b981;
  --color-danger: #ef4444;
  --color-warning: #f59e0b;

  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;

  /* Typography */
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.25rem;
  --font-size-xl: 1.5rem;

  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
}
```

---

## 🔍 Debugging Tips

### Browser DevTools

1. **React DevTools**: Install extension to inspect component tree
2. **Console Logs**: Use for development, remove before committing
3. **Breakpoints**: Set in Sources tab to pause execution
4. **Network Tab**: Monitor API calls and data fetching

### Debugging Patterns

```typescript
// ✅ Good - Conditional logging
const DEBUG = import.meta.env.DEV;

function debugLog(message: string, data?: unknown) {
  if (DEBUG) {
    console.log(`[DEBUG] ${message}`, data);
  }
}

debugLog("Portfolio loaded", portfolio);
```

### Common Issues

| Issue                        | Cause                           | Solution                           |
| ---------------------------- | ------------------------------- | ---------------------------------- |
| Component not re-rendering   | Missing dependency in useEffect | Add to dependency array            |
| Stale state in event handler | Closure over old state          | Use functional setState            |
| Infinite re-render           | State update in render          | Move to useEffect or event handler |
| Type error                   | Wrong type annotation           | Check type definitions             |

---

## 📊 Performance Best Practices

### 1. Lazy Load Routes

```typescript
// ✅ Good - Lazy load heavy pages
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('@pages/Dashboard'));
const Leaderboard = lazy(() => import('@pages/Leaderboard'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Suspense>
  );
}
```

### 2. Optimize Heavy Computations

```typescript
// ✅ Good - Memoize and debounce
const debouncedSearch = useMemo(() => debounce(searchFunction, 300), []);
```

### 3. Virtualize Long Lists

```typescript
// For transaction history with 1000+ items
import { FixedSizeList } from 'react-window';

function TransactionList({ transactions }) {
  return (
    <FixedSizeList
      height={600}
      itemCount={transactions.length}
      itemSize={50}
    >
      {({ index, style }) => (
        <div style={style}>{transactions[index]}</div>
      )}
    </FixedSizeList>
  );
}
```

---

## 🔒 Security Guidelines

### Input Sanitization

```typescript
// ✅ Good - Validate and sanitize
function createGame(gameName: string) {
  // Validate
  if (!gameName || gameName.length > 100) {
    throw new Error("Invalid game name");
  }

  // Sanitize
  const sanitized = gameName.trim().replace(/[<>]/g, "");

  // Use sanitized value
  gameService.create({ name: sanitized });
}
```

### localStorage Security

```typescript
// ✅ Good - Don't store sensitive data
// Never store passwords, tokens, or PII in localStorage

// ✅ Good - Validate data from storage
function loadGame(gameId: string): GameSession | null {
  const data = localStorage.getItem(`game_${gameId}`);
  if (!data) return null;

  try {
    const parsed = JSON.parse(data);
    // Validate structure
    if (!isValidGameSession(parsed)) {
      throw new Error("Invalid game data");
    }
    return parsed;
  } catch {
    return null;
  }
}
```

---

## 🚀 Build & Deployment

### Production Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Bundle Size Optimization

```bash
# Analyze bundle (add to package.json)
npm run build -- --mode analyze
```

**Target metrics:**

- Initial load: <500KB gzipped
- Largest chunk: <200KB gzipped
- Time to interactive: <3s

---

## 📋 Code Review Checklist

### Before Submitting PR

- [ ] Code follows style guide
- [ ] All TypeScript errors resolved
- [ ] Linter passes (`npm run lint`)
- [ ] Tests pass (when implemented)
- [ ] No console.log statements left
- [ ] Comments explain "why", not "what"
- [ ] Component is documented if reusable
- [ ] No hardcoded values (use constants)
- [ ] Accessibility checked (keyboard nav, ARIA)
- [ ] Responsive on mobile/tablet/desktop

### Reviewing PRs

- [ ] Changes match requirements
- [ ] Code is understandable
- [ ] Types are correct
- [ ] Error handling is appropriate
- [ ] Performance considerations addressed
- [ ] Security implications reviewed
- [ ] UI matches design spec
- [ ] Tests cover new functionality

---

## 🛠️ Useful Commands

| Command                  | Description                       |
| ------------------------ | --------------------------------- |
| `npm run dev`            | Start dev server                  |
| `npm run build`          | Build for production              |
| `npm run preview`        | Preview production build          |
| `npm run lint`           | Run ESLint                        |
| `npm run lint:fix`       | Fix auto-fixable lint issues      |
| `npm run type-check`     | Check TypeScript without emitting |
| `npm test`               | Run tests (coming soon)           |
| `npm test -- --watch`    | Run tests in watch mode           |
| `npm test -- --coverage` | Generate coverage report          |

---

## 📚 Learning Resources

### Internal Documentation

- [Requirements](../REQUIREMENTS.md)
- [Technical Specification](../TECHNICAL-SPECIFICATION.md)
- [UI/UX Specification](../UI-UX-SPECIFICATION.md)
- [Project Structure](../architecture/project-structure.md)

### External Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vite.dev/guide/)
- [Testing Library](https://testing-library.com/)

---

## 💡 Tips for Success

1. **Read docs first** - Save time by understanding requirements
2. **Start small** - Break features into tiny, testable pieces
3. **Test frequently** - Check browser after every change
4. **Ask questions** - Better to ask than guess wrong
5. **Review your own code** - Before requesting review
6. **Keep PRs small** - Easier to review, faster to merge
7. **Write tests** - Prevent regressions, document behavior
8. **Document complex logic** - Future you will thank you

---

## 🆘 Getting Help

- **Documentation issues**: Check [docs/README.md](../README.md)
- **Technical questions**: Open a GitHub Discussion
- **Bugs**: Create an issue with reproduction steps
- **General questions**: Ask in team chat

---

**Happy coding! 🚀**

Next: [Testing Guide](testing.md) (coming soon)
