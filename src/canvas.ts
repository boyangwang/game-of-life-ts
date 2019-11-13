export const canvasElement: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("game-of-life-canvas");
export const canvas: CanvasRenderingContext2D = canvasElement.getContext('2d');

export const setFillStyle = (canvas: CanvasRenderingContext2D, fillStyle: string = '#000000') => {
  canvas.fillStyle = fillStyle;
}

export const mutateFillStyle = (canvas: CanvasRenderingContext2D) => {
  const oldFillStyle = canvas.fillStyle;
  if (typeof oldFillStyle !== "string") {
    return;
  }
  const chosenColor = Math.floor(Math.random() * 3);
  const chosenColorOrigVal: string = oldFillStyle.substr(1).substr(chosenColor * 2, 2);
  let chosenColorNewValNumber: number = parseInt(chosenColorOrigVal, 16) + 128 * (Math.random() - 0.5);
  chosenColorNewValNumber = Math.floor(Math.max(Math.min(chosenColorNewValNumber, 255), 0));
  console.info('New color idx, new color val', chosenColor, chosenColorOrigVal, chosenColorNewValNumber);
  let newFillStyle = oldFillStyle.substr(1).split('');
  newFillStyle.splice(chosenColor * 2, 2, chosenColorNewValNumber.toString(16));
  canvas.fillStyle = '#' + newFillStyle.join('');
  console.info('New fillStyle', canvas.fillStyle);
}
