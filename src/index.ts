import { canvas, mutateFillStyle } from './canvas';
import { dashboard } from './dashboard';
import { Grid, initGrid, renderCurrentGrid, updateGrid } from './grid';

// init grid
let myGrid = new Grid(600, 600);
initGrid(myGrid);
// init iteration, liveCount
let iteration = 0;
let liveCount = renderCurrentGrid(myGrid, canvas);
dashboard.textContent = `Iteration ${iteration} LiveCount ${liveCount}`;

const tick = () => {
  myGrid = updateGrid(myGrid);
  liveCount = renderCurrentGrid(myGrid, canvas);
  mutateFillStyle(canvas);
  iteration++;
  dashboard.textContent = `Iteration ${iteration} LiveCount ${liveCount}`;
  setTimeout(() => {
    requestAnimationFrame(tick);
  }, 200);
};

tick();
