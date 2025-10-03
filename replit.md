# Game of Life TypeScript

## Overview
Interactive Conway's Game of Life implementation in TypeScript that runs in the browser using HTML5 Canvas. Features full user controls for creating custom patterns, playing/pausing the simulation, stepping through iterations, adjusting speed, and restarting.

## Project Architecture
- **Frontend**: TypeScript with Webpack 5 dev server
- **Build System**: Webpack 5 with TypeScript transpilation
- **Port**: 5000 (configured for Replit environment)

## Features
- **Interactive Canvas**: Click and drag to draw custom cell patterns
- **Play/Pause Control**: Start and stop the simulation
- **Step Mode**: Advance one iteration at a time
- **Speed Control**: Adjust animation speed from 50ms to 2000ms
- **Restart**: Return to your custom initial pattern
- **Live Dashboard**: Shows iteration count, live cells, speed, and state

## Recent Changes (October 3, 2025)
- **Enhanced with interactive controls** (latest):
  - Added Play/Pause button with state indicator
  - Implemented Step button for single-iteration advancement
  - Added Restart button that preserves custom patterns
  - Created speed slider (50-2000ms range)
  - Implemented click-to-draw pattern editing on canvas
  - Application starts paused for pattern customization
  - Enhanced dashboard with speed and state display
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
1. Application starts in paused mode with a default rectangular pattern
2. Users can click/drag on the canvas to create custom cell patterns
3. Click "Play" to start the simulation (saves pattern as initial state)
4. Conway's Game of Life rules apply each iteration:
   - Cell with 2 neighbors: stays in current state
   - Cell with 3 neighbors: becomes/stays alive
   - Otherwise: dies/stays dead
5. Canvas visualization updates with color mutations over time
6. "Step" button advances one iteration while paused
7. "Restart" button returns to the saved initial pattern
8. Speed slider controls animation delay (50ms-2000ms)

## Development
- Run: `npm run dev` (starts dev server on port 5000)
- Build: `npm run build` (compiles to dist/)
