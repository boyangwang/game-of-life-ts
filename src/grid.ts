export class Grid {
  grid: number[][];
  width: number;
  height: number;

  constructor(width: number, height: number) {
    const rowTemplate = [...new Array(width)].map(_ => 0);
    this.grid = [...new Array(height)].map(_ => rowTemplate.slice());
    this.width = width;
    this.height = height;
  }

  set(x: number, y: number, val: number) {
    this.grid[y][x] = val;
  }

  getByCoord({ x, y }: { x: number, y: number }): number {
    return this.grid[y][x];
  }

  get(x: number, y: number): number {
    return this.grid[y][x];
  }

  isLive(x: number, y: number) {
    return !!this.grid[y][x];
  }

  wrapCoord(x: number, y: number) {
    let wrappedX = x, wrappedY = y;
    if (x < 0) {
      wrappedX = this.width - 1 + x;
    }
    if (y < 0) {
      wrappedY = this.height - 1 + y;
    }
    if (x >= this.width) {
      wrappedX = x - this.width;
    }
    if (y >= this.height) {
      wrappedY = y - this.height;
    }
    return { x: wrappedX, y: wrappedY };
  };
}

export const renderCurrentGrid = (myGrid: Grid, canvas: CanvasRenderingContext2D): number => {
  let liveCount = 0;
  for (let y = 0; y < myGrid.height; y++) {
    for (let x = 0; x < myGrid.width; x++) {
      if (myGrid.isLive(x, y)) {
        liveCount++;
        canvas.fillRect(x, y, 1, 1);
      } else {
        canvas.clearRect(x, y, 1, 1);
      }
    }
  }
  return liveCount;
};

export const updateGrid = (myGrid: Grid): Grid => {
  const newGrid = new Grid(myGrid.width, myGrid.height);
  for (let y = 1; y < myGrid.height; y++) {
    for (let x = 1; x < myGrid.height; x++) {
      let totalCells = 0;
      totalCells += myGrid.getByCoord(myGrid.wrapCoord(x - 1, y - 1)); //top left
      totalCells += myGrid.getByCoord(myGrid.wrapCoord(x, y - 1)); //top center
      totalCells += myGrid.getByCoord(myGrid.wrapCoord(x + 1, y - 1)); //top right

      totalCells += myGrid.getByCoord(myGrid.wrapCoord(x - 1, y)); //middle left
      totalCells += myGrid.getByCoord(myGrid.wrapCoord(x + 1, y)); //middle right

      totalCells += myGrid.getByCoord(myGrid.wrapCoord(x - 1, y + 1)); //bottom left
      totalCells += myGrid.getByCoord(myGrid.wrapCoord(x, y + 1)); //bottom center
      totalCells += myGrid.getByCoord(myGrid.wrapCoord(x + 1, y + 1)); //bottom right

      //apply the rules to each cell
      switch (totalCells) {
        case 2:
          newGrid.set(x, y, myGrid.get(x, y));
          break;
        case 3:
          newGrid.set(x, y, 1); //live
          break;
        default:
          newGrid.set(x, y, 0); //dead
      }
    }
  }
  return newGrid;
};

export const initGrid = (myGrid: Grid) => {
  for (let y = 100; y < 200; y++) {
    for (let x = 400; x < 500; x++) {
      myGrid.set(x, y, 1);
    }
  }
};
