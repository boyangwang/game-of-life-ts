# Game of Life TypeScript

## Overview
Conway's Game of Life implementation in TypeScript that runs in the browser using HTML5 Canvas. The simulation starts with a rectangular block of live cells and evolves according to the classic Game of Life rules.

## Project Architecture
- **Frontend**: TypeScript with Webpack 5 dev server
- **Build System**: Webpack 5 with TypeScript transpilation
- **Port**: 5000 (configured for Replit environment)

## Recent Changes (October 3, 2025)
- Imported from GitHub repository
- Upgraded dependencies from Webpack 4 to Webpack 5 for Node.js 20 compatibility
- Updated webpack.config.js for Replit environment:
  - Changed port from 9000 to 5000
  - Set host to 0.0.0.0
  - Configured allowedHosts: 'all' for proxy support
  - Added Cache-Control headers for proper browser refresh
- Updated all dependencies to modern versions:
  - webpack: 4.41.2 → 5.97.1
  - webpack-dev-server: 3.9.0 → 5.2.0
  - typescript: 3.7.2 → 5.7.2
  - ts-loader: 6.2.1 → 9.5.1
  - html-webpack-plugin: 3.2.0 → 5.6.0

## File Structure
- `src/index.ts` - Main entry point, game loop
- `src/grid.ts` - Grid class and Game of Life logic
- `src/canvas.ts` - Canvas rendering utilities
- `src/dashboard.ts` - Dashboard display element
- `src/index.ejs` - HTML template
- `webpack.config.js` - Build configuration
- `tsconfig.json` - TypeScript configuration

## How It Works
1. Initializes a 600x600 grid with a rectangular block of live cells
2. Applies Conway's Game of Life rules each iteration:
   - Cell with 2 neighbors: stays in current state
   - Cell with 3 neighbors: becomes/stays alive
   - Otherwise: dies/stays dead
3. Updates the canvas visualization with color mutations
4. Displays iteration count and live cell count

## Development
- Run: `npm run dev` (starts dev server on port 5000)
- Build: `npm run build` (compiles to dist/)
