const canvasElement = document.getElementById("drawing-board");
const canvas = canvasElement.getContext("2d");

const pixelSize = 32;
const size = 15;

canvasElement.width = size * pixelSize;
canvasElement.height = size * pixelSize;

canvasElement.addEventListener("mousedown", e => {
  const CoordinateX = Math.floor(e.layerX / pixelSize) * pixelSize;
  const CoordinateY = Math.floor(e.layerY / pixelSize) * pixelSize;
  // canvas.fillStyle = SELECTED COLOR!
  canvas.fillRect(CoordinateX, CoordinateY, pixelSize, pixelSize);
});
