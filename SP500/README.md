# SP500 Fund Trading Simulator 🎮📈

A web-based educational game that simulates S&P 500 fund trading using historical price data. Practice trading strategies, learn market dynamics, and compete on the leaderboard—all without risking real money.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-19.2-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

- **📊 Historical Trading Simulation**: Trade S&P 500 shares using real historical data
- **⏱️ Time Control**: Fast-forward through dates (day, week, month, year)
- **💰 Portfolio Management**: Track cash, shares, and profit/loss in real-time
- **📈 Interactive Charts**: Visualize price history and your average holding price
- **🎯 Multiple Game Sessions**: Create and manage multiple trading scenarios
- **🏆 Achievements & Leaderboard**: Earn badges and compete with others
- **🎓 Educational Mode**: Learn trading concepts with contextual tips
- **♿ Accessible**: WCAG 2.1 AA compliant, keyboard navigation support

---

## 🚀 Quick Start

### Prerequisites

- **Node.js**: v18.0 or higher
- **npm**: v9.0 or higher
- **Modern Browser**: Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/SP500.git
cd SP500

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

For detailed setup instructions, see **[Installation Guide](docs/guides/installation.md)**.

---

## 📚 Documentation

### For Everyone

- **[User Guide](docs/REQUIREMENTS.md)** - Features and how to use the app

### For Designers

- **[UI/UX Specification](docs/UI-UX-SPECIFICATION.md)** - Visual design, layouts, interactions

### For Developers

- **[Documentation Index](docs/README.md)** - Complete documentation hub
- **[Installation Guide](docs/guides/installation.md)** - Setup and configuration
- **[Development Guide](docs/guides/development.md)** - Workflow and best practices
- **[Technical Specification](docs/TECHNICAL-SPECIFICATION.md)** - Data models, calculations, APIs
- **[Project Structure](docs/architecture/project-structure.md)** - Folder organization
- **[Contributing Guide](CONTRIBUTING.md)** - How to contribute

---

## 🎯 Project Status

**Current Phase**: 🚧 Active Development (Rebuild from Scratch)

This is a complete rebuild of the SP500 trading simulator with improved architecture and comprehensive documentation. The original application is backed up in `backup-2026-01-30/`.

### Completed

- ✅ Requirements gathering and documentation
- ✅ UI/UX design specification
- ✅ Technical specification and data models
- ✅ Project structure and architecture planning

### In Progress

- 🔄 Core component implementation
- 🔄 Data service layer
- 🔄 State management setup

### Planned

- 📋 Chart integration
- 📋 Authentication system
- 📋 Achievement system
- 📋 Leaderboard functionality
- 📋 Unit and integration tests

See **[REBUILD-NOTE.md](REBUILD-NOTE.md)** for details.

---

## 🛠️ Tech Stack

### Core

- **[React 19](https://react.dev)** - UI framework
- **[TypeScript 5.9](https://www.typescriptlang.org/)** - Type safety
- **[Vite 7](https://vite.dev)** - Build tool and dev server

### Charts & Data

- **Chart.js / Recharts** - Data visualization
- **date-fns** - Date manipulation
- **Papa Parse** - CSV processing

### Storage & State

- **localStorage** - Data persistence
- **Context API / Zustand** - State management

### Development

- **ESLint** - Code linting
- **Vitest** - Unit testing (planned)
- **Playwright** - E2E testing (planned)

---

## 📂 Project Structure

```
SP500/
├── docs/                    # Comprehensive documentation
│   ├── README.md           # Documentation index
│   ├── REQUIREMENTS.md     # Feature requirements
│   ├── TECHNICAL-SPECIFICATION.md
│   ├── UI-UX-SPECIFICATION.md
│   ├── architecture/       # System architecture docs
│   ├── components/         # Component documentation
│   ├── guides/            # How-to guides
│   └── api/               # API reference
├── src/
│   ├── components/        # React components
│   ├── services/          # Business logic & APIs
│   ├── hooks/            # Custom React hooks
│   ├── types/            # TypeScript definitions
│   ├── utils/            # Utility functions
│   ├── constants/        # App constants
│   └── styles/           # Global styles
├── data/                  # Historical price data
│   ├── sp500.csv
│   └── sp500.json
├── public/               # Static assets
└── backup-2026-01-30/   # Original application backup
```

See **[Project Structure](docs/architecture/project-structure.md)** for detailed organization.

---

## 🎮 How It Works

1. **Create a Game**: Choose a starting date from historical data and set initial capital (default: $10,000)
2. **View Market Data**: See current S&P 500 price at your simulation date
3. **Make Trades**: Buy or sell shares with real-time portfolio updates
4. **Fast Forward**: Advance simulation time to see how your holdings perform
5. **Track Performance**: Monitor realized/unrealized profit/loss and compete on the leaderboard
6. **Earn Achievements**: Unlock badges for milestones and trading success

> **Note**: This is a simulation for educational purposes. Past performance does not guarantee future results.

---

## 🤝 Contributing

We welcome contributions! Please read our **[Contributing Guide](CONTRIBUTING.md)** before submitting PRs.

### Quick Contribution Steps

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following our code style
4. Write/update tests
5. Commit with clear messages (`git commit -m 'Add amazing feature'`)
6. Push to your branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Historical S&P 500 data from [Yahoo Finance](https://finance.yahoo.com/)
- Built with [React](https://react.dev), [TypeScript](https://www.typescriptlang.org/), and [Vite](https://vite.dev)
- Icons from [Heroicons](https://heroicons.com/)

---

## 📞 Support & Contact

- **Documentation**: Start with [docs/README.md](docs/README.md)
- **Issues**: [GitHub Issues](https://github.com/yourusername/SP500/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/SP500/discussions)

---

## 🗺️ Roadmap

### Version 1.0 (MVP)

- [x] Core trading functionality
- [x] Portfolio tracking
- [x] Historical price charts
- [ ] User authentication
- [ ] Basic achievements

### Version 1.1

- [ ] Advanced charts (candlestick, volume)
- [ ] Strategy templates
- [ ] Export/import game data
- [ ] Mobile app (React Native)

### Version 2.0

- [ ] Real-time market data (for recent dates)
- [ ] Social features (share trades)
- [ ] AI trading advisor
- [ ] Custom market scenarios

---

**Happy Trading! 📈🎉**

For questions or feedback, please open an issue or start a discussion
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
globalIgnores(['dist']),
{
files: ['**/*.{ts,tsx}'],
extends: [
// Other configs...
// Enable lint rules for React
reactX.configs['recommended-typescript'],
// Enable lint rules for React DOM
reactDom.configs.recommended,
],
languageOptions: {
parserOptions: {
project: ['./tsconfig.node.json', './tsconfig.app.json'],
tsconfigRootDir: import.meta.dirname,
},
// other options...
},
},
])

```

```
