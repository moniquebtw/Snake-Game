const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const score = document.querySelector('.score-value');
const finalScore = document.querySelector('.final-score > span');

const bgImage = new Image();
bgImage.src = './assets/img-canvas/graminha.png';
let bgReady = false;
bgImage.onload = () => { bgReady = true; };

const drawBackground = () => {
    if (bgReady) context.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
};

const size = 30;
const foodSize = 30;
const spacing = 2;

const snake = [{ x: 270, y: 240 }];

let directionSnake;
const moveSnake = () => {
    if (!directionSnake || !isGameRunning) return;

    const head = snake[snake.length - 1];
    let newHead;

    if (directionSnake === 'right') newHead = { x: head.x + size, y: head.y };
    if (directionSnake === 'left') newHead = { x: head.x - size, y: head.y };
    if (directionSnake === 'down') newHead = { x: head.x, y: head.y + size };
    if (directionSnake === 'up') newHead = { x: head.x, y: head.y - size };

    snake.push(newHead);
    snake.shift();
    canChangeDirection = true;
};


document.addEventListener("keydown", ({ key }) => {
    if (!canChangeDirection || !isGameRunning) return;

    if (key === 'ArrowRight' && directionSnake !== 'left') {
        directionSnake = 'right';
        canChangeDirection = false;
    }
    if (key === 'ArrowLeft' && directionSnake !== 'right') {
        directionSnake = 'left';
        canChangeDirection = false;
    }
    if (key === 'ArrowDown' && directionSnake !== 'up') {
        directionSnake = 'down';
        canChangeDirection = false;
    }
    if (key === 'ArrowUp' && directionSnake !== 'down') {
        directionSnake = 'up';
        canChangeDirection = false;
    }
});
