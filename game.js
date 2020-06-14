import {
  update as updateSnake,
  draw as drawSnake,
  SNAKE_SPEED,
  getSnakeHead,
  snakeIntersection,
  score,
} from "./snake.js";
import { update as updateFood, draw as drawFood } from "./food.js";
import { outsideGrid } from "./grid.js";
import { gameTheme, gameOverSound } from "./sound.js";
import { restart } from "./input.js";

let lastRenderTime = 0;
let gameOver = false;
let soundPlayed = false;
const gameBoard = document.getElementById("game-board");
const scoreText = document.getElementById("score-display");
const headingText = document.getElementById("heading-text");

const main = (currentTime) => {
  gameTheme.play();
  if (gameOver) {
    if (!soundPlayed) gameOverSoundPlay();
    headingText.innerHTML = "Game Over. Press Enter to Play Again.";
    if (restart) {
      window.location = "/";
    }
  }

  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  lastRenderTime = currentTime;

  if (!gameOver) {
    update();
    draw();
  }
};

window.requestAnimationFrame(main);

const update = () => {
  updateSnake();
  updateFood();
  updateDisplayScore();
  checkDeath();
};

const draw = () => {
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
};

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}

function updateDisplayScore() {
  scoreText.innerHTML = "Score: " + String(score);
}

function gameOverSoundPlay() {
  gameOverSound.play();
  soundPlayed = true;
}
