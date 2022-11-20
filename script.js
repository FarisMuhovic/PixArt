const canvasElement = document.getElementById("drawing-board");
const canvas = canvasElement.getContext("2d");
const root = document.documentElement;
let pixelSize = 32;
let size = 16;
const drawingContainer = document.getElementById("fakeCanvas");
const pixelSizeInput = document.getElementById("pixelsize");
const gridSizeInput = document.getElementById("gridsize");
const widthText = document.getElementById("widthText");
const heightText = document.getElementById("heightText");
function changeCanvasSize(pixel = 16, gridSize = 8) {
  canvasElement.width = gridSize * pixel;
  canvasElement.height = gridSize * pixel;
  pixelSize = pixel;
  size = gridSize;
  pixelSizeInput.value = pixel;
  gridSizeInput.value = size;
  // canvas.restore();
}
changeCanvasSize(pixelSize, size);
const numbersCheckbox = document.getElementById("hide-numbers");
function fakeGrid(size) {
  drawingContainer.innerHTML = "";
  for (let i = 0; i < size ** 2; i++) {
    drawingContainer.insertAdjacentHTML("beforeend", `<div></div>`);
  }
  numbersCheckbox.addEventListener("click", () => {
    if (numbersCheckbox.checked == true) {
      drawingContainer.innerHTML = "";
      for (let i = 0; i < size ** 2; i++) {
        drawingContainer.insertAdjacentHTML("beforeend", `<div>${i}</div>`);
      }
    } else {
      drawingContainer.innerHTML = "";
      for (let i = 0; i < size ** 2; i++) {
        drawingContainer.insertAdjacentHTML("beforeend", `<div></div>`);
      }
    }
  });
  root.style.setProperty("--pixel-size", pixelSize + "px");
  root.style.setProperty("--size", size);
}
fakeGrid(size);
pixelSizeInput.addEventListener("change", () => {
  changeCanvasSize(pixelSizeInput.value, size);
  fakeGrid(size);
  // canvas.restore();
  widthText.innerHTML = `W: ${pixelSizeInput.value * size}px`;
  heightText.innerHTML = `H: ${pixelSizeInput.value * size}px`;
});
gridSizeInput.addEventListener("change", () => {
  changeCanvasSize(pixelSize, gridSizeInput.value);
  fakeGrid(size);
  widthText.innerHTML = `W: ${pixelSizeInput.value * size}px`;
  heightText.innerHTML = `H: ${pixelSizeInput.value * size}px`;
});
let color = "white";
const colors = document.querySelectorAll(".colors div");
colors.forEach(col => {
  col.addEventListener("click", e => {
    if (e.target.id == "white") {
      color = "white";
    } else if (e.target.id == "red") {
      color = "red";
    } else if (e.target.id == "orange") {
      color = "orange";
    } else if (e.target.id == "yellow") {
      color = "yellow";
    } else if (e.target.id == "green") {
      color = "green";
    } else if (e.target.id == "blue") {
      color = "blue";
    } else if (e.target.id == "purple") {
      color = "purple";
    } else if (e.target.id == "black") {
      color = "black";
    }
    root.style.setProperty("--selected-color", color);
  });
});
const cursor = document.getElementById("cursor");
const colorInput = document.getElementById("color-input");
colorInput.addEventListener("change", () => {
  color = colorInput.value;
  root.style.setProperty("--selected-color", color);
});
const eraser = document.getElementById("eraser");
eraser.addEventListener("click", () => {
  cursor.innerHTML = `<i class="fa-solid fa-eraser cursori"></i>`;
  canvas.globalCompositeOperation = "destination-out";
});
const drawingPen = document.getElementById("marker");
drawingPen.addEventListener("click", () => {
  cursor.innerHTML = `<i class="fa-solid fa-highlighter cursori"></i>`;
  canvas.globalCompositeOperation = "source-over";
});
let scaleValue = 1;
const zoomIn = document.getElementById("zoomin");
zoomIn.addEventListener("click", () => {
  scaleValue += 0.1;
  if (scaleValue > 2.8) {
    scaleValue = 2.8;
  }
  root.style.setProperty("--canvas-scale", scaleValue);
});
const zoomOut = document.getElementById("zoomout");
zoomOut.addEventListener("click", () => {
  scaleValue -= 0.1;
  if (scaleValue < 0.6) {
    scaleValue = 0.6;
  }
  root.style.setProperty("--canvas-scale", scaleValue);
});
canvasElement.addEventListener("mousedown", function mousedowndraw(e) {
  const CoordinateX = Math.floor(e.layerX / pixelSize) * pixelSize;
  const CoordinateY = Math.floor(e.layerY / pixelSize) * pixelSize;
  canvas.fillStyle = color;
  canvas.fillRect(CoordinateX, CoordinateY, pixelSize, pixelSize);
  canvasElement.addEventListener("mousemove", function mousemoveDraw(e) {
    if (e.buttons == 1) {
      const CoordinateX = Math.floor(e.layerX / pixelSize) * pixelSize;
      const CoordinateY = Math.floor(e.layerY / pixelSize) * pixelSize;
      canvas.fillStyle = color;
      canvas.fillRect(CoordinateX, CoordinateY, pixelSize, pixelSize);
    } else {
      e.preventDefault();
    }
  });
});
window.addEventListener("mousemove", e => {
  cursor.style.left = `${e.pageX}px`;
  cursor.style.top = `${e.pageY}px`;
});
// finish import export feature.
const exportButton = document.getElementById("export");
exportButton.addEventListener("click", () => {
  let url = canvasElement.toDataURL();
  const fullQuality = canvasElement.toDataURL("image/png", 1.0);
  console.log(fullQuality);
  window.open(fullQuality);
});
