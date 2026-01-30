# Documentation Index

**SP500 Fund Trading Simulator**  
**Version:** 1.1  
**Last Updated:** January 30, 2026

---

## 📚 Welcome to the Documentation

This is the central hub for all SP500 Fund Trading Simulator documentation. Use this index to navigate to the appropriate document for your needs.

---

## 📖 Documentation Structure

### 🎯 For Product Owners & Stakeholders

**[REQUIREMENTS.md](REQUIREMENTS.md)**  
_What the application does_

- Core features and functionality
- User stories and use cases
- Confirmed requirements and decisions
- Business rules
- Success criteria

**Start here if you want to:** Understand what the application should do, review feature requirements, or verify business logic.

---

### 🎨 For Designers & Frontend Developers

**[UI-UX-SPECIFICATION.md](UI-UX-SPECIFICATION.md)**  
_How the application looks and feels_

- Detailed UI layouts and mockups (ASCII wireframes)
- Component specifications
- User flows and interactions
- Visual design system (colors, typography, spacing)
- Responsive design guidelines
- Accessibility requirements

**Start here if you want to:** Design screens, understand user interactions, implement UI components, or ensure accessibility compliance.

---

### 💻 For Backend & Full-Stack Developers

**[TECHNICAL-SPECIFICATION.md](TECHNICAL-SPECIFICATION.md)**  
_How the application works_

- Data models and schemas
- Calculation formulas and algorithms
- Number formatting and precision requirements
- Data storage strategy (localStorage)
- API specifications (if applicable)
- Performance considerations
- Error handling patterns
- Testing requirements

**Start here if you want to:** Implement business logic, understand data structures, integrate with storage, or write tests.

---

### 📐 Project Architecture

**[architecture/](architecture/)**  
_High-level system design_ (Coming soon)

- System architecture overview
- Component hierarchy
- Data flow diagrams
- Technology stack decisions
- Folder structure
- Module organization

**Start here if you want to:** Understand the overall system design, set up the project, or make architectural decisions.

---

### 🧩 Component Documentation

**[components/](components/)**  
_Individual component specifications_ (Coming soon)

Detailed documentation for each React component:

- Props and interfaces
- State management
- Event handlers
- Usage examples
- Testing guidelines

---

### 🚀 Guides

**[guides/](guides/)**  
_How-to guides for common tasks_ (Coming soon)

- **installation.md**: How to set up the development environment
- **development.md**: Development workflow and best practices
- **deployment.md**: Building and deploying the application
- **contributing.md**: Guidelines for contributors
- **troubleshooting.md**: Common issues and solutions

---

### 📊 API Documentation

**[api/](api/)**  
_API and service documentation_ (Coming soon)

- Data service APIs
- Calculation utilities
- Chart integrations
- Storage service
- Type definitions

---

## 🗺️ Quick Navigation by Role

### I'm a Developer Starting Fresh

1. Read [REQUIREMENTS.md](REQUIREMENTS.md) to understand features
2. Review [architecture/project-structure.md](architecture/project-structure.md) (coming soon)
3. Check [guides/installation.md](guides/installation.md) (coming soon) for setup
4. Reference [TECHNICAL-SPECIFICATION.md](TECHNICAL-SPECIFICATION.md) while coding

### I'm Implementing a Feature

1. Find the feature in [REQUIREMENTS.md](REQUIREMENTS.md)
2. Check UI design in [UI-UX-SPECIFICATION.md](UI-UX-SPECIFICATION.md)
3. Review technical details in [TECHNICAL-SPECIFICATION.md](TECHNICAL-SPECIFICATION.md)
4. Consult component docs in [components/](components/) if available

### I'm Designing the UI

1. Read user requirements in [REQUIREMENTS.md](REQUIREMENTS.md)
2. Use [UI-UX-SPECIFICATION.md](UI-UX-SPECIFICATION.md) as your design guide
3. Follow the design system (colors, typography, spacing)
4. Ensure accessibility compliance

### I'm Testing

1. Review test scenarios in [TECHNICAL-SPECIFICATION.md](TECHNICAL-SPECIFICATION.md#testing-considerations)
2. Check edge cases and validation rules
3. Verify against success criteria in [REQUIREMENTS.md](REQUIREMENTS.md#success-criteria)

### I'm Reviewing Code

1. Verify implementation matches [REQUIREMENTS.md](REQUIREMENTS.md)
2. Check UI matches [UI-UX-SPECIFICATION.md](UI-UX-SPECIFICATION.md)
3. Validate calculations per [TECHNICAL-SPECIFICATION.md](TECHNICAL-SPECIFICATION.md#calculation-formulas)
4. Ensure code follows architectural patterns

---

## 📝 Document Status

| Document                   | Status      | Last Updated | Next Review  |
| -------------------------- | ----------- | ------------ | ------------ |
| REQUIREMENTS.md            | ✅ Complete | Jan 30, 2026 | Feb 15, 2026 |
| UI-UX-SPECIFICATION.md     | ✅ Complete | Jan 30, 2026 | Feb 15, 2026 |
| TECHNICAL-SPECIFICATION.md | ✅ Complete | Jan 30, 2026 | Feb 15, 2026 |
| architecture/\*            | 📋 Planned  | -            | -            |
| components/\*              | 📋 Planned  | -            | -            |
| guides/\*                  | 📋 Planned  | -            | -            |
| api/\*                     | 📋 Planned  | -            | -            |

**Legend:**

- ✅ Complete: Ready to use
- 🚧 In Progress: Being written
- 📋 Planned: Not started yet
- 🔄 Under Review: Being revised

---

## 🎯 Key Concepts & Terminology

### Game Simulation

The application simulates trading S&P 500 shares using historical data. Users can "fast-forward" through dates but cannot see future prices.

### Simulation Date

The "current date" within the game context, independent of real-world date. This is the date at which users make trading decisions.

### Fractional Shares

Users can buy/sell partial shares (e.g., 0.25 shares, 1.5 shares) with precision up to 4 decimal places (0.0001).

### Average Holding Price

The weighted average cost per share of all shares purchased. Updated with each buy transaction using: `(current value + new purchase) / total shares`.

### Realized Profit/Loss

Profit or loss from shares that have been sold. Calculated as: `(sell price - average holding price) × shares sold`.

### Unrealized Profit/Loss

Profit or loss from shares currently held but not yet sold. Calculated as: `(current price - average holding price) × shares held`.

### Zero State

UI shown when there's no data to display (e.g., no games created yet, no transactions).

---

## 🔗 Related Resources

### Project Files

- **Backup**: `../backup-2026-01-30/` - Original application backup
- **Data**: `../data/` - SP500 historical price data
- **Rebuild Note**: `../REBUILD-NOTE.md` - Why we're rebuilding

### External References

- React Documentation: https://react.dev
- TypeScript Handbook: https://www.typescriptlang.org/docs/
- Chart.js: https://www.chartjs.org/
- Accessibility Guidelines (WCAG): https://www.w3.org/WAI/WCAG21/quickref/

---

## 📞 Questions & Support

### Documentation Issues

If you find errors, inconsistencies, or missing information in the documentation:

1. Create an issue in the project repository
2. Tag with `documentation` label
3. Reference the specific document and section

### Feature Requests

If you'd like to propose new features:

1. Review [REQUIREMENTS.md](REQUIREMENTS.md) to ensure it's not already planned
2. Create a feature request issue
3. Include use case and user story

### Implementation Questions

For questions while implementing:

1. Check the relevant documentation first
2. Review related sections across all docs
3. Ask in development discussions

---

## 📅 Upcoming Documentation

### Next Priorities

1. **architecture/project-structure.md** - Folder and file organization
2. **architecture/tech-stack.md** - Technology choices and rationale
3. **guides/installation.md** - Setup instructions
4. **guides/development.md** - Development workflow

### Future Documentation

- Component library documentation
- API reference
- Testing guide
- Deployment guide
- Contributing guidelines

---

## 🔄 Version History

### Version 1.1 (Jan 30, 2026)

- ✅ Completed REQUIREMENTS.md with all decisions confirmed
- ✅ Created comprehensive UI-UX-SPECIFICATION.md
- ✅ Created detailed TECHNICAL-SPECIFICATION.md
- ✅ Added this README.md as documentation index

### Version 1.0 (Jan 30, 2026)

- 📋 Initial documentation structure created
- 📋 Requirements gathering phase

---

## 💡 Tips for Using This Documentation

1. **Start with the README** (this file) to orient yourself
2. **Follow cross-references** - documents link to each other for related information
3. **Check the date** - ensure you're reading the latest version
4. **Search across files** - use workspace search for specific terms
5. **Provide feedback** - documentation improves with your input

---

**Happy Building! 🚀**

For questions or clarifications, refer to the REBUILD-NOTE.md in the project root.
