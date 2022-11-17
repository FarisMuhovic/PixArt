const canvasElement = document.getElementById("drawing-board");
const canvas = canvasElement.getContext("2d");
const pixelSize = 16;
const size = 15;
const drawingContainer = document.getElementById("fakeCanvas");
for (let i = size ** 2; i > 0; i--) {
  drawingContainer.insertAdjacentHTML("beforeend", `<div></div>`);
}
canvasElement.width = size * pixelSize;
canvasElement.height = size * pixelSize;

canvasElement.addEventListener("mousedown", e => {
  const CoordinateX = Math.floor(e.layerX / pixelSize) * pixelSize;
  const CoordinateY = Math.floor(e.layerY / pixelSize) * pixelSize;
  // canvas.fillStyle = SELECTED COLOR!
  canvas.fillRect(CoordinateX, CoordinateY, pixelSize, pixelSize);
});
// try to make it full width and height
