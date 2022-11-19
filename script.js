const canvasElement = document.getElementById("drawing-board");
const canvas = canvasElement.getContext("2d");
const root = document.documentElement;
const pixelSize = 32;
const size = 12;
root.style.setProperty("--pixel-size", pixelSize + "px");
root.style.setProperty("--size", size);
const drawingContainer = document.getElementById("fakeCanvas");
for (let i = size ** 2; i > 0; i--) {
  drawingContainer.insertAdjacentHTML("beforeend", `<div></div>`);
}
canvasElement.width = size * pixelSize;
canvasElement.height = size * pixelSize;
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
  canvas.globalCompositeOperation = "destination-over";
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
canvasElement.addEventListener("mousedown", e => {
  const CoordinateX = Math.floor(e.layerX / pixelSize) * pixelSize;
  const CoordinateY = Math.floor(e.layerY / pixelSize) * pixelSize;
  canvas.fillStyle = color;
  canvas.fillRect(CoordinateX, CoordinateY, pixelSize, pixelSize);
});
// try to make it full width and height
// make arrows so u can move around the pixelart

// maybe be able to make width and height instead of scale
// make pixel size input and width * height input
window.addEventListener("mousemove", e => {
  cursor.style.left = `${e.pageX}px`;
  cursor.style.top = `${e.pageY}px`;
});
