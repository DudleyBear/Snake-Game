let snake;
let food;
let gridSize = 20;
let gameSpeed = 10;
let score = 0;

function setup() {
  createCanvas(400, 400); // Create a 400x400 canvas
  frameRate(gameSpeed); // Set initial frame rate (game speed)
  snake = new Snake(); // Create a new snake
  food = createFood(); // Create the first food item
}

function draw() {
  background(51); // Clear the screen with a dark background

  if (snake.eat(food)) { // Check if the snake eats the food
    food = createFood(); // Create new food
    score++; // Increase score
    if (score % 5 == 0) { // Every 5 points, increase game speed
      gameSpeed += 2;
      frameRate(gameSpeed);
    }
  }

  snake.update(); // Update the snake's position
  snake.show(); // Draw the snake

  fill(255, 0, 100); // Set the fill color for the food
  rect(food.x, food.y, gridSize, gridSize); // Draw the food

  displayScore(); // Display the current score

  if (snake.isDead()) { // Check if the snake has collided with itself
    noLoop(); // Stop the game loop
    textSize(32);
    textAlign(CENTER, CENTER);
    fill(255);
    text("Game Over", width / 2, height / 2); // Display "Game Over"
  }
}
 if (snake.isDead()) { // Check if the snake has collided with itself
    noLoop(); // Stop the game loop
    textSize(32);
    textAlign(CENTER, CENTER);
    fill(255);
    text("Game Over", width / 2, height / 2); // Display "Game Over"
    textSize(16);
    text("Press Space to Restart", width / 2, height / 2 + 40); // Display restart instruction
  }
}
function keyPressed() {
  // Change snake direction based on arrow keys
  if (keyCode === UP_ARROW && snake.ySpeed === 0) {
    snake.setDirection(0, -1);
  } else if (keyCode === DOWN_ARROW && snake.ySpeed === 0) {
    snake.setDirection(0, 1);
  } else if (keyCode === LEFT_ARROW && snake.xSpeed === 0) {
    snake.setDirection(-1, 0);
  } else if (keyCode === RIGHT_ARROW && snake.xSpeed === 0) {
    snake.setDirection(1, 0);
  }
}

function createFood() {
  // Create food at a random position
  let cols = floor(width / gridSize);
  let rows = floor(height / gridSize);
  return createVector(floor(random(cols)) * gridSize, floor(random(rows)) * gridSize);
}

function displayScore() {
  // Display the current score
  textSize(18);
  fill(255);
  text("Score: " + score, 10, 20);
}

class Snake {
  constructor() {
    // Initialize the snake with one segment in the middle of the canvas
    this.body = [createVector(floor(width / 2 / gridSize) * gridSize, floor(height / 2 / gridSize) * gridSize)];
    this.xSpeed = 0;
    this.ySpeed = 0;
  }

  setDirection(x, y) {
    this.xSpeed = x;
    this.ySpeed = y;
  }

  update() {
    // Update the snake's position
    let head = this.body[this.body.length - 1].copy(); // Get the current head position
    head.x += this.xSpeed * gridSize;
    head.y += this.ySpeed * gridSize;
    this.body.shift(); // Remove the tail segment
    this.body.push(head); // Add the new head position

    // Wrap around the edges of the canvas
    if (head.x >= width) head.x = 0;
    if (head.x < 0) head.x = width - gridSize;
    if (head.y >= height) head.y = 0;
    if (head.y < 0) head.y = height - gridSize;
  }

  eat(pos) {
    // Check if the snake's head is at the same position as the food
    let head = this.body[this.body.length - 1];
    if (head.x === pos.x && head.y === pos.y) {
      this.body.push(head.copy()); // Grow the snake
      return true;
    }
    return false;
  }

  isDead() {
    // Check if the snake has collided with itself
    let head = this.body[this.body.length - 1];
    for (let i = 0; i < this.body.length - 1; i++) {
      if (head.x === this.body[i].x && head.y === this.body[i].y) {
        return true;
      }
    }
    return false;
  }

  show() {
    // Draw the snake
    fill(255);
    for (let part of this.body) {
      rect(part.x, part.y, gridSize, gridSize);
    }
  }
}
