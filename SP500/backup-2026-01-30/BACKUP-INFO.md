# Backup Information

**Created:** January 30, 2026  
**Reason:** Application rebuild from scratch

## Contents

This backup contains the original SP500 application before the rebuild:

- **src/** - All React components and TypeScript source files
- **data/** - CSV data files and data processing scripts
- **public/** - Public assets
- **Configuration files:**
  - package.json
  - tsconfig.json
  - tsconfig.node.json
  - vite.config.ts
  - index.html
  - README.md

## Notes

- `node_modules/` was not backed up (can be restored with `npm install`)
- `dist/` build folder was not backed up (can be rebuilt)
- All source code and data files are preserved

## Restoration

To restore this backup:

1. Copy contents back to parent directory
2. Run `npm install` to restore dependencies
3. Run `npm run dev` to start development server
