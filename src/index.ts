import { canvas, canvasElement, mutateFillStyle } from './canvas';
import { dashboard } from './dashboard';
import { Grid, initGrid, renderCurrentGrid, updateGrid } from './grid';

let myGrid = new Grid(600, 600);
initGrid(myGrid);

let initialGrid = new Grid(600, 600);
for (let y = 0; y < myGrid.height; y++) {
  for (let x = 0; x < myGrid.width; x++) {
    initialGrid.set(x, y, myGrid.get(x, y));
  }
}

let iteration = 0;
let liveCount = renderCurrentGrid(myGrid, canvas);
let isPaused = true;
let isRunning = false;
let speed = 200;
let animationFrameId: number | null = null;
let timeoutId: number | null = null;

const updateDashboard = () => {
  dashboard.textContent = `Iteration ${iteration} | Live Count ${liveCount} | Speed ${speed}ms | ${isPaused ? 'PAUSED' : 'RUNNING'}`;
};

updateDashboard();

const tick = () => {
  if (!isPaused && isRunning) {
    myGrid = updateGrid(myGrid);
    liveCount = renderCurrentGrid(myGrid, canvas);
    mutateFillStyle(canvas);
    iteration++;
    updateDashboard();
    
    timeoutId = window.setTimeout(() => {
      animationFrameId = requestAnimationFrame(tick);
    }, speed);
  }
};

const step = () => {
  myGrid = updateGrid(myGrid);
  liveCount = renderCurrentGrid(myGrid, canvas);
  mutateFillStyle(canvas);
  iteration++;
  updateDashboard();
};

const play = () => {
  if (!isPaused) return;
  
  // Save current grid as initial state when transitioning from paused to running
  for (let y = 0; y < myGrid.height; y++) {
    for (let x = 0; x < myGrid.width; x++) {
      initialGrid.set(x, y, myGrid.get(x, y));
    }
  }
  
  isPaused = false;
  isRunning = true;
  playPauseBtn.textContent = 'Pause';
  playPauseBtn.style.backgroundColor = '#ff9800';
  updateDashboard();
  tick();
};

const pause = () => {
  if (isPaused) return;
  isPaused = true;
  isRunning = false;
  playPauseBtn.textContent = 'Play';
  playPauseBtn.style.backgroundColor = '#4CAF50';
  updateDashboard();
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
  if (timeoutId !== null) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }
};

const restart = () => {
  pause();
  myGrid = new Grid(600, 600);
  for (let y = 0; y < initialGrid.height; y++) {
    for (let x = 0; x < initialGrid.width; x++) {
      myGrid.set(x, y, initialGrid.get(x, y));
    }
  }
  iteration = 0;
  liveCount = renderCurrentGrid(myGrid, canvas);
  updateDashboard();
};

const playPauseBtn = document.getElementById('play-pause-btn') as HTMLButtonElement;
const stepBtn = document.getElementById('step-btn') as HTMLButtonElement;
const restartBtn = document.getElementById('restart-btn') as HTMLButtonElement;
const speedSlider = document.getElementById('speed-slider') as HTMLInputElement;
const speedValue = document.getElementById('speed-value') as HTMLSpanElement;

playPauseBtn.addEventListener('click', () => {
  if (isPaused) {
    play();
  } else {
    pause();
  }
});

stepBtn.addEventListener('click', () => {
  if (isPaused) {
    step();
  }
});

restartBtn.addEventListener('click', () => {
  restart();
});

speedSlider.addEventListener('input', (e) => {
  const target = e.target as HTMLInputElement;
  speed = parseInt(target.value);
  speedValue.textContent = `${speed}ms`;
  updateDashboard();
});

canvasElement.addEventListener('mousedown', (e) => {
  if (!isPaused) return;
  
  const rect = canvasElement.getBoundingClientRect();
  const x = Math.floor(e.clientX - rect.left);
  const y = Math.floor(e.clientY - rect.top);
  
  const currentValue = myGrid.get(x, y);
  myGrid.set(x, y, currentValue ? 0 : 1);
  liveCount = renderCurrentGrid(myGrid, canvas);
  updateDashboard();
});

canvasElement.addEventListener('mousemove', (e) => {
  if (!isPaused || !(e.buttons & 1)) return;
  
  const rect = canvasElement.getBoundingClientRect();
  const x = Math.floor(e.clientX - rect.left);
  const y = Math.floor(e.clientY - rect.top);
  
  if (x >= 0 && x < myGrid.width && y >= 0 && y < myGrid.height) {
    myGrid.set(x, y, 1);
    liveCount = renderCurrentGrid(myGrid, canvas);
    updateDashboard();
  }
});
