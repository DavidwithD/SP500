# Installation Guide

**Last Updated**: January 30, 2026

This guide will walk you through setting up the SP500 Fund Trading Simulator development environment.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

| Software | Minimum Version | Recommended | Check Command    |
| -------- | --------------- | ----------- | ---------------- |
| Node.js  | 18.0.0          | 20.x LTS    | `node --version` |
| npm      | 9.0.0           | 10.x        | `npm --version`  |
| Git      | 2.30.0          | Latest      | `git --version`  |

### Operating System Support

- ✅ Windows 10/11
- ✅ macOS 12.0+
- ✅ Linux (Ubuntu 20.04+, Debian, Fedora)

### Browser Requirements

For development and testing:

- Chrome 90+ (recommended for DevTools)
- Firefox 88+
- Safari 14+
- Edge 90+

---

## 🚀 Installation Steps

### 1. Clone the Repository

```bash
# Using HTTPS
git clone https://github.com/yourusername/SP500.git
cd SP500

# OR using SSH
git clone git@github.com:yourusername/SP500.git
cd SP500
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required dependencies listed in `package.json`, including:

- React 19.2
- TypeScript 5.9
- Vite 7
- ESLint and other dev tools

**Expected output:**

```
added XXX packages in YYs
```

### 3. Set Up Data Files

The historical S&P 500 price data is located in the `data/` folder:

```bash
# Verify data files exist
ls data/
# Should show: sp500.csv, sp500.json, readCsv.js, etc.
```

**Data Files:**

- `sp500.csv` - Raw historical price data
- `sp500.json` - Parsed JSON format (used by app)

If data files are missing, copy them from the backup:

```bash
# Windows PowerShell
Copy-Item -Path "backup-2026-01-30\data\*" -Destination "data\" -Recurse

# macOS/Linux
cp -r backup-2026-01-30/data/* data/
```

### 4. Configure Environment (Optional)

Create a `.env` file in the root directory for any environment-specific settings:

```bash
# .env
VITE_APP_NAME="SP500 Trading Simulator"
VITE_API_URL="http://localhost:5173"
VITE_ENABLE_DEBUG=true
```

> **Note**: `.env` files are ignored by git. Never commit sensitive data.

### 5. Start Development Server

```bash
npm run dev
```

**Expected output:**

```
  VITE v7.2.4  ready in 324 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

Open your browser and navigate to `http://localhost:5173`. You should see the app running!

---

## ✅ Verify Installation

### Quick Health Check

Run these commands to verify everything is working:

```bash
# 1. Check Node.js version
node --version
# Expected: v18.0.0 or higher

# 2. Check npm version
npm --version
# Expected: v9.0.0 or higher

# 3. Check TypeScript compilation
npm run build
# Should complete without errors

# 4. Run linter
npm run lint
# Should show no critical errors
```

### Test the Application

1. **Open the app**: Navigate to `http://localhost:5173`
2. **Check console**: Open browser DevTools (F12), no critical errors
3. **Create a game**: Click "Create New Game" button
4. **Load data**: Verify price chart loads with historical data

---

## 🛠️ Troubleshooting

### Common Issues

#### Issue: Port 5173 already in use

**Error:**

```
Port 5173 is in use, trying another one...
```

**Solution:**
Either stop the process using port 5173, or specify a different port:

```bash
npm run dev -- --port 3000
```

---

#### Issue: Module not found errors

**Error:**

```
Cannot find module 'react' or its corresponding type declarations
```

**Solution:**
Delete `node_modules` and reinstall:

```bash
# Windows PowerShell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install

# macOS/Linux
rm -rf node_modules package-lock.json
npm install
```

---

#### Issue: TypeScript errors

**Error:**

```
Type 'X' is not assignable to type 'Y'
```

**Solution:**
Ensure TypeScript is properly configured:

```bash
# Check tsconfig.json exists
ls tsconfig*.json

# Rebuild TypeScript
npx tsc --noEmit
```

---

#### Issue: Data files not loading

**Error in browser console:**

```
Failed to fetch data/sp500.json: 404 Not Found
```

**Solution:**

1. Verify `data/sp500.json` exists in the project root
2. Check file permissions
3. Restart the dev server

```bash
# Stop server (Ctrl+C), then restart
npm run dev
```

---

#### Issue: ESLint errors on startup

**Error:**

```
ESLint couldn't find the config "X" to extend from
```

**Solution:**
Reinstall ESLint dependencies:

```bash
npm install --save-dev eslint @eslint/js eslint-plugin-react-hooks
```

---

## 🔧 Advanced Setup

### Using Yarn instead of npm

```bash
# Install Yarn globally
npm install -g yarn

# Install dependencies
yarn install

# Start dev server
yarn dev
```

### Using pnpm

```bash
# Install pnpm globally
npm install -g pnpm

# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

### VS Code Setup (Recommended)

Install these extensions for the best development experience:

1. **ESLint** (`dbaeumer.vscode-eslint`)
2. **Prettier** (`esbenp.prettier-vscode`)
3. **TypeScript Error Translator** (`mattpocock.ts-error-translator`)
4. **ES7+ React/Redux/React-Native snippets** (`dsznajder.es7-react-js-snippets`)

**VS Code Settings** (`.vscode/settings.json`):

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

### Git Hooks (Optional)

Set up pre-commit hooks to ensure code quality:

```bash
# Install Husky
npm install --save-dev husky
npx husky init

# Add pre-commit hook
echo "npm run lint" > .husky/pre-commit
```

---

## 📦 Available Scripts

| Command              | Description                                   |
| -------------------- | --------------------------------------------- |
| `npm run dev`        | Start development server with hot reload      |
| `npm run build`      | Build for production (outputs to `dist/`)     |
| `npm run preview`    | Preview production build locally              |
| `npm run lint`       | Run ESLint to check code quality              |
| `npm run lint:fix`   | Auto-fix ESLint issues                        |
| `npm test`           | Run unit tests (coming soon)                  |
| `npm run type-check` | Check TypeScript types without emitting files |

---

## 🔐 Security Considerations

### Before You Start:

1. **Never commit `.env` files** - Already in `.gitignore`
2. **Keep dependencies updated** - Run `npm audit` regularly
3. **Review localStorage usage** - Clear sensitive data appropriately
4. **Sanitize user inputs** - Especially for game names and custom values

---

## 📊 System Resources

### Recommended Specs for Development:

- **RAM**: 8GB minimum (16GB recommended)
- **Disk Space**: 1GB for project + dependencies
- **CPU**: Multi-core recommended for fast builds

### Build Performance:

- **Cold start**: ~2-5 seconds
- **Hot reload**: <200ms
- **Production build**: ~10-15 seconds
- **Bundle size**: Target <500KB gzipped

---

## 🌐 Network Configuration

### Behind a Proxy?

Configure npm to use your proxy:

```bash
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080
```

### Firewall Issues?

Ensure these ports are open:

- **5173** (Vite dev server)
- **443** (npm registry via HTTPS)

---

## ✅ Next Steps

After successful installation:

1. 📖 Read the **[Development Guide](development.md)** to understand the workflow
2. 🏗️ Review **[Project Structure](../architecture/project-structure.md)** to navigate the codebase
3. 🎨 Check **[UI/UX Specification](../UI-UX-SPECIFICATION.md)** for design guidelines
4. 💻 Start implementing features following **[Technical Specification](../TECHNICAL-SPECIFICATION.md)**

---

## 💡 Tips for Success

- **Use TypeScript strict mode** - Catch errors early
- **Run linter frequently** - `npm run lint` before commits
- **Check browser console** - Monitor for runtime errors
- **Read documentation first** - Save time by understanding the architecture
- **Ask for help** - Open an issue if you're stuck

---

## 🆘 Still Having Issues?

If you're still experiencing problems:

1. **Check existing issues**: [GitHub Issues](https://github.com/yourusername/SP500/issues)
2. **Search documentation**: Use the docs search feature
3. **Ask the community**: [GitHub Discussions](https://github.com/yourusername/SP500/discussions)
4. **Create a new issue**: Include OS, Node version, and error logs

---

**Installation complete! Ready to start developing? 🚀**

Next: [Development Guide](development.md)
