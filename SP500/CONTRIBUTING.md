# Contributing to SP500 Fund Trading Simulator

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

---

## 🤝 Code of Conduct

### Our Standards

- **Be respectful**: Treat everyone with respect and consideration
- **Be collaborative**: Work together towards shared goals
- **Be inclusive**: Welcome contributors of all backgrounds and skill levels
- **Be constructive**: Provide helpful feedback and suggestions
- **Be patient**: Remember everyone was a beginner once

### Unacceptable Behavior

- Harassment, discrimination, or personal attacks
- Trolling, insulting, or derogatory comments
- Publishing others' private information
- Any conduct that could be considered inappropriate in a professional setting

---

## 🚀 Getting Started

### 1. Fork the Repository

Click the "Fork" button at the top right of the repository page.

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/SP500.git
cd SP500
```

### 3. Set Up Development Environment

Follow the [Installation Guide](docs/guides/installation.md):

```bash
npm install
npm run dev
```

### 4. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

---

## 🛠️ How to Contribute

### Areas Where You Can Help

- 🐛 **Bug Fixes**: Fix reported issues
- ✨ **New Features**: Implement planned features
- 📝 **Documentation**: Improve or add documentation
- 🎨 **UI/UX**: Enhance user interface and experience
- 🧪 **Testing**: Write unit and integration tests
- ♿ **Accessibility**: Improve accessibility compliance
- 🚀 **Performance**: Optimize code and bundle size
- 🌐 **Internationalization**: Add language support

### First-Time Contributors

Look for issues labeled:

- `good first issue` - Simple tasks for newcomers
- `help wanted` - Issues we need help with
- `documentation` - Documentation improvements

---

## 💻 Development Workflow

### 1. Pick an Issue

- Browse [open issues](https://github.com/yourusername/SP500/issues)
- Comment to claim an issue before starting work
- Ask questions if requirements are unclear

### 2. Branch Naming

Use descriptive branch names:

```
feature/add-leaderboard
fix/portfolio-calculation-bug
docs/update-installation-guide
refactor/game-service
test/add-trading-tests
```

**Pattern**: `type/short-description`

**Types**:

- `feature/` - New feature
- `fix/` - Bug fix
- `docs/` - Documentation
- `refactor/` - Code refactoring
- `test/` - Adding tests
- `chore/` - Maintenance tasks
- `style/` - Formatting, styling

### 3. Make Changes

- Follow our [Development Guide](docs/guides/development.md)
- Write clean, readable code
- Add comments for complex logic
- Update documentation if needed

### 4. Test Your Changes

```bash
# Run linter
npm run lint

# Type check
npm run type-check

# Run tests (when implemented)
npm test

# Test in browser
npm run dev
```

### 5. Commit Changes

Follow our [commit guidelines](#commit-guidelines):

```bash
git add .
git commit -m "feat: add leaderboard component"
```

### 6. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

---

## 📏 Coding Standards

### TypeScript

- ✅ Use explicit types (avoid `any`)
- ✅ Define interfaces for props and function parameters
- ✅ Use enums or union types for constants
- ✅ Enable strict mode in tsconfig.json

### React

- ✅ Use functional components with hooks
- ✅ Extract custom hooks for reusable logic
- ✅ Memoize expensive calculations with `useMemo`
- ✅ Use `React.memo` for pure components
- ✅ Keep components small and focused

### File Organization

- ✅ One component per file
- ✅ Colocate tests, styles, and types with components
- ✅ Use barrel exports (`index.ts`) for clean imports
- ✅ Follow the [project structure](docs/architecture/project-structure.md)

### Naming Conventions

| Type       | Convention       | Example           |
| ---------- | ---------------- | ----------------- |
| Components | PascalCase       | `TradeDialog`     |
| Functions  | camelCase        | `calculateProfit` |
| Variables  | camelCase        | `currentPrice`    |
| Constants  | UPPER_SNAKE_CASE | `DEFAULT_CAPITAL` |
| Types      | PascalCase       | `GameSession`     |
| Files      | Match export     | `TradeDialog.tsx` |

### Code Style

- **Indentation**: 2 spaces
- **Quotes**: Single quotes for strings
- **Semicolons**: Yes (enforced by ESLint)
- **Max line length**: 100 characters
- **Trailing commas**: Yes (multiline)

**Example:**

```typescript
export interface TradeDialogProps {
  currentPrice: number;
  availableCash: number;
  onConfirm: (shares: number) => void;
}

export function TradeDialog({
  currentPrice,
  availableCash,
  onConfirm,
}: TradeDialogProps) {
  const [shares, setShares] = useState<number>(0);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onConfirm(shares);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* JSX */}
    </form>
  );
}
```

---

## 📝 Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) for clear commit history.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring (no feature change)
- `test`: Adding or updating tests
- `chore`: Maintenance tasks (dependencies, config)
- `perf`: Performance improvements

### Examples

```bash
# Feature
feat(trading): add buy/sell confirmation dialog

# Bug fix
fix(portfolio): correct profit calculation for fractional shares

# Documentation
docs(readme): update installation instructions

# Refactor
refactor(game-service): extract calculation logic to separate module

# Multiple files
feat(leaderboard): add ranking and sorting functionality

Implements:
- Ranking by ROI percentage
- Sorting by multiple metrics
- Filtering by time period

Closes #123
```

### Rules

- ✅ Use present tense: "add feature" not "added feature"
- ✅ Use imperative mood: "fix bug" not "fixes bug"
- ✅ Capitalize first letter of subject
- ✅ No period at end of subject
- ✅ Keep subject under 50 characters
- ✅ Separate subject from body with blank line
- ✅ Wrap body at 72 characters
- ✅ Reference issues in footer: `Closes #123`

---

## 🔄 Pull Request Process

### Before Submitting

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated (if applicable)
- [ ] Tests pass (when implemented)
- [ ] No TypeScript errors
- [ ] Linter passes
- [ ] Tested in browser

### PR Template

When creating a PR, include:

**Title**: Same format as commit messages

```
feat(leaderboard): add ranking system
```

**Description**:

```markdown
## Description

Brief explanation of what this PR does.

## Changes

- Added leaderboard component
- Implemented ranking algorithm
- Added sorting and filtering

## Related Issues

Closes #123

## Screenshots (if UI changes)

[Include screenshots or GIFs]

## Testing

- [ ] Tested on Chrome
- [ ] Tested on Firefox
- [ ] Tested on mobile
- [ ] Added unit tests
- [ ] Manual testing completed

## Checklist

- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] Tests pass
- [ ] No console errors
```

### Review Process

1. **Automated Checks**: CI/CD pipeline runs (linting, type checking, tests)
2. **Code Review**: Maintainer reviews code
3. **Feedback**: Address requested changes
4. **Approval**: Once approved, PR will be merged
5. **Cleanup**: Delete branch after merge

### Merge Strategy

- Small PRs: Squash and merge
- Large PRs: Create merge commit
- Documentation: Squash and merge

---

## 🐛 Reporting Bugs

### Before Reporting

1. **Search existing issues**: Check if already reported
2. **Verify it's a bug**: Ensure it's not expected behavior
3. **Check documentation**: Make sure you're using it correctly
4. **Try latest version**: Bug might be already fixed

### Bug Report Template

```markdown
## Bug Description

Clear description of the bug.

## Steps to Reproduce

1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior

What should happen.

## Actual Behavior

What actually happens.

## Screenshots

If applicable.

## Environment

- OS: [e.g., Windows 11]
- Browser: [e.g., Chrome 120]
- Node Version: [e.g., 20.10.0]
- App Version: [e.g., 1.0.0]

## Additional Context

Any other relevant information.
```

---

## 💡 Suggesting Features

### Feature Request Template

```markdown
## Feature Description

Clear description of the proposed feature.

## Use Case

Why is this feature needed? What problem does it solve?

## Proposed Solution

How should this feature work?

## Alternatives Considered

What other solutions did you consider?

## Additional Context

Mockups, examples, or references.
```

### Feature Discussion

- Features will be discussed before implementation
- May require design document for complex features
- Priority and timeline will be decided by maintainers

---

## 📚 Documentation

### When to Update Documentation

- Adding new features
- Changing existing behavior
- Fixing bugs that affect usage
- Improving setup process

### Documentation Standards

- Clear and concise language
- Code examples where helpful
- Screenshots for UI features
- Links to related documentation
- Keep docs in sync with code

---

## ✅ Pull Request Checklist

Before submitting, ensure:

### Code Quality

- [ ] Follows TypeScript best practices
- [ ] No TypeScript errors
- [ ] ESLint passes (`npm run lint`)
- [ ] Code is properly formatted
- [ ] No unused imports or variables
- [ ] No console.log statements

### Testing

- [ ] Changes tested in browser
- [ ] No errors in browser console
- [ ] Tested on different screen sizes
- [ ] Unit tests added/updated (when applicable)
- [ ] Tests pass locally

### Documentation

- [ ] Code is self-documenting or commented
- [ ] README updated (if needed)
- [ ] API documentation updated (if needed)
- [ ] Component documentation added (if new component)

### Accessibility

- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] ARIA labels added where needed
- [ ] Color contrast is sufficient

### Performance

- [ ] No unnecessary re-renders
- [ ] Large lists are virtualized
- [ ] Images are optimized
- [ ] Bundle size impact considered

---

## 🏆 Recognition

Contributors will be:

- Listed in AUTHORS file
- Mentioned in release notes
- Credited in documentation

Thank you for contributing! 🎉

---

## 📞 Questions?

- **General questions**: [GitHub Discussions](https://github.com/yourusername/SP500/discussions)
- **Bug reports**: [GitHub Issues](https://github.com/yourusername/SP500/issues)
- **Security issues**: Email security@example.com (private)

---

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Happy Contributing! 🚀**
