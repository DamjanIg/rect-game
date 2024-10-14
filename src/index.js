const canvas = document.querySelector(".canvas");
const context = canvas.getContext("2d");

// default settings of app
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const numberOfRows = 3;
const numberOfDevidedRect = 6;
const distanceOfTheEdge = 10;
const rectWidth = 180;
const rectHeight = 80;
const speed = 100;

// cords and index for small rect
let storeDirectionX = [];
let storeDirectionY = [];
let indexForSmallRect = [];

// width and heigh for small rect
let width;
let height;

// help variables and data
let flag = true;
let randomColorNumber = [];
let startArr = [true, true, true];
let intervalArr = [];

// Inital data
const rectangles = [
  {
    x: "",
    yStart: 0,
    yEnd: canvasHeight / numberOfRows,
    width: rectWidth,
    height: rectHeight,
    color: "red",
  },
  {
    x: "",
    yStart: canvasHeight / numberOfRows,
    yEnd: 2 * (canvasHeight / numberOfRows),
    width: rectWidth,
    height: rectHeight,
    color: "blue",
  },
  {
    x: "",
    yStart: 2 * (canvasHeight / numberOfRows),
    yEnd: canvasHeight,
    width: rectWidth,
    height: rectHeight,
    color: "green",
  },
];
const colors = ["red", "yellow", "blue", "purple", "orange", "green"];

// Function for random cord
function cord(min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
}

// Function for random color
function getRandomColor() {
  while (colors.length > randomColorNumber.length) {
    let index = Math.floor(Math.random() * numberOfDevidedRect);
    let colorFlag = true;

    if (randomColorNumber.length !== 0) {
      randomColorNumber.forEach((a) => {
        if (a === index) {
          colorFlag = false;
        }
      });
    }

    if (colorFlag === true) {
      randomColorNumber.push(index);
    }
  }
}

// Function for draw all rects
function drawRect(x, y, width, height, color) {
  context.beginPath();
  context.rect(x, y, width, height);
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
}

// Function for drawin main rects
function mainRect(newX, newY) {
  for (let i = 0; i < rectangles.length; i++) {
    width = rectangles[i].width / 6;
    height = rectangles[i].height;

    let x;
    let y;

    if (flag) {
      x = rectangles[i].x = cord(
        distanceOfTheEdge,
        canvasWidth - rectangles[i].width - distanceOfTheEdge
      );

      y = rectangles[i].y = cord(
        rectangles[i].yStart + distanceOfTheEdge,
        rectangles[i].yEnd - rectangles[i].height - distanceOfTheEdge
      );
    } else {
      x = newX;
      y = newY;
    }

    drawRect(
      x,
      y,
      rectangles[i].width,
      rectangles[i].height,
      rectangles[i].color
    );

    // choseDirection(x, y, i);
    storeDirectionX.push(x);
    storeDirectionY.push(y);
    indexForSmallRect.push(i);

    // Generate Random Color

    if (flag) {
      randomColorNumber = [];
      getRandomColor();
    }

    // Draw small rect insides of each main rect
    drawSmallRect(i, x, y, width, height, randomColorNumber);
  }

  flag = false;
}

// Function for drawing small rects
// i = index of main rect
// x = start cord of each main rect
// y = start cord of each main rect
function drawSmallRect(i, x, y, width, height) {
  // Looop for drawing each small rect
  for (let j = 0; j < numberOfDevidedRect; j++) {
    if (j === 0) {
      drawRect(x, y, width, height, colors[randomColorNumber[j]]);
    }

    if (j === 1) {
      drawRect(
        x + rectangles[i].width / 6,
        y,
        width,
        height,
        colors[randomColorNumber[j]]
      );
    }

    if (j === 2) {
      drawRect(
        x + (rectangles[i].width / 6) * 2,
        y,
        width,
        height,
        colors[randomColorNumber[j]]
      );
    }

    if (j === 3) {
      drawRect(
        x + (rectangles[i].width / 6) * 3,
        y,
        width,
        height,
        colors[randomColorNumber[j]]
      );
    }

    if (j === 4) {
      drawRect(
        x + (rectangles[i].width / 6) * 4,
        y,
        width,
        height,
        colors[randomColorNumber[j]]
      );
    }

    if (j === 5) {
      drawRect(
        x + (rectangles[i].width / 6) * 5,
        y,
        width,
        height,
        colors[randomColorNumber[j]]
      );
    }
  }
}

// function for chosing direction of rect
function choseDirection(mouseX, mouseY) {
  // loop for creating and deleting new rects base on direction
  for (let i = 0; i < rectangles.length; i++) {
    // random number for chosing direction (x: +,-),
    // this give us numbers between 1 and 4, for better chance to get different choice
    const numberOfDirection = Math.floor(Math.random() * 4) + 1;

    // This is the main condition do declare area of rect
    // If is true, moving will stop
    if (
      mouseX < storeDirectionX[i] + rectWidth &&
      mouseX > storeDirectionX[i] &&
      mouseY < storeDirectionY[i] + rectHeight &&
      mouseY > storeDirectionY[i]
    ) {
      clearInterval(intervalArr[i]);
      startArr[i] = false;
    } else {
      if (startArr[i] === true) {
        intervalArr[i] = setInterval(() => {
          context.clearRect(
            storeDirectionX[i],
            storeDirectionY[i],
            rectWidth,
            rectHeight
          );
          if (numberOfDirection <= 2) {
            storeDirectionX[i]++;
            mainRect(storeDirectionX[i], storeDirectionY[i]);
          } else {
            storeDirectionX[i]--;
            mainRect(storeDirectionX[i], storeDirectionY[i]);
          }
        }, speed);
        startArr[i] = false;
      }
    }
  }
}

// Lines for deviding canvas to three parts
function devideCanvas() {
  context.beginPath();
  context.moveTo(0, 166.7);
  context.lineTo(500, 166.7);
  context.lineWidth = 1;
  context.stroke();

  context.beginPath();
  context.moveTo(0, 333.4);
  context.lineTo(500, 333.4);
  context.lineWidth = 1;
  context.stroke();
}

// event
canvas.addEventListener("click", (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  choseDirection(mouseX, mouseY);
});

// Main function
function play() {
  mainRect();
  devideCanvas();
}

window.addEventListener("load", play);
