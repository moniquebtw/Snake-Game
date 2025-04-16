const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const score = document.querySelector('.score-value');
const finalScore = document.querySelector('.final-score > span');
const menu = document.querySelector('.menu-screen');
const button = document.querySelector('.btn-play');
const buttonStart = document.querySelector('#start');
const start = document.querySelector('.start-game');

const bgImage = new Image();
bgImage.src = './assets/img-canvas/graminha.png';
let bgReady = false;
bgImage.onload = () => { bgReady = true; };

const drawBackground = () => {
    if (bgReady) context.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
};

let isGameRunning = false;
let canChangeDirection = true;


const loadImage = (src) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = () => reject(`Erro ao carregar: ${src}`);
    });
};

const loadAllImages = async () => {
    try {
        const loaded = await Promise.all(foodImages.map(loadImage));
        foodImageObjects.push(...loaded);
        foodReady = true;
        } catch (e) {
        console.error(e);
        if (foodImageObjects.length > 0) {
            foodReady = true;
            startGame();
        }
    }
};

const size = 30;
const foodSize = 30;
const spacing = 2;

const snake = [{ x: 270, y: 240 }];

const scoreResult = () => {
    score.innerText = parseInt(score.innerText) + 1;
};

const randomNumber = (min, max) =>
    Math.round(Math.random() * (max - min) + min);

const randomPosition = () => {
    const number = randomNumber(0, canvas.width - size);
    return Math.round(number / 30) * 30;
};


const foodImages = [
    './assets/img-canvas/morango.png',
    './assets/img-canvas/macas.png',
    './assets/img-canvas/cereja.png',
    './assets/img-canvas/cogumelo.png'
];
const foodImageObjects = [];
let foodReady = false;


const food = {
    x: randomPosition(),
    y: randomPosition(),
    image: null
};

const drawFood = () => {
    if (foodReady && food.image) {
        context.drawImage(food.image, food.x, food.y, foodSize, foodSize);
    }
};

const snakePosition = () => {
    snake.forEach((pos, i) => {
        context.fillStyle = i === snake.length - 1 ? '#ffb8b8' : '#98FF98';
        context.fillRect(
            pos.x + spacing / 2,
            pos.y + spacing / 2,
            size - spacing,
            size - spacing
        );
    });
};


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

const eatVerify = () => {
    const head = snake[snake.length - 1];
    if (head.x === food.x && head.y === food.y) {
        scoreResult();
        eatSound.play();
        snake.push({ ...head });

        let x = randomPosition();
        let y = randomPosition();
        while (snake.some(pos => pos.x === x && pos.y === y)) {
            x = randomPosition();
            y = randomPosition();
        }

        food.x = x;
        food.y = y;
        food.image = foodImageObjects[Math.floor(Math.random() * foodImageObjects.length)];
    }
};

const collisionVerify = () => {
    const head = snake[snake.length - 1];
    const limit = canvas.width - size;
    const neck = snake.length - 2;

    const wallCollision = head.x < 0 || head.x > limit || head.y < 0 || head.y > limit;
    const selfCollision = snake.some((pos, i) => i < neck && pos.x === head.x && pos.y === head.y);

    if (wallCollision || selfCollision) {
        gameOver();
        document.querySelector('.btn-play').focus()

    }
    
};

const gameOver = () => {
    directionSnake = undefined;
    isGameRunning = false;
    menu.style.display = 'flex';
    canvas.style.filter = 'blur(2px)';
    finalScore.innerText = score.innerText;
};

const startGame = () => {
    food.image = foodImageObjects[Math.floor(Math.random() * foodImageObjects.length)];
    isGameRunning = true;
    lastTime = 0;
    requestAnimationFrame(gameLoop);
};


let lastTime = 0;
const interval = 150;

const gameLoop = (time = 0) => {
    const delta = time - lastTime;
    if (delta > interval) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawBackground();
        drawFood();
        moveSnake();
        snakePosition();
        eatVerify();
        collisionVerify();
        lastTime = time;
    }

    if (isGameRunning) requestAnimationFrame(gameLoop);
};

const resetGame = () => {
    score.innerText = '00';
    snake.length = 1;
    snake[0] = { x: 270, y: 240 };
    directionSnake = undefined;
    canChangeDirection = true;
    food.x = randomPosition();
    food.y = randomPosition();
    food.image = foodImageObjects[Math.floor(Math.random() * foodImageObjects.length)];
};

button.addEventListener('click', () => {
    menu.style.display = 'none';
    canvas.style.filter = 'none';
    startSound.play();
    resetGame();
    isGameRunning = true;
    requestAnimationFrame(gameLoop);
});

buttonStart.addEventListener('click', () => {
    startSound.play();
    start.style.display = 'none';
    resetGame();
    startGame();
});



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
