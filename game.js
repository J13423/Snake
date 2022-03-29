let dead = false;
const snakeSpeed = 8;
const gridSize = 21; 
let lastRenderTime = 0;
let newSegment = 0
const snakeBody = [
    { x: 10, y: 11},
    { x: 10, y: 12},
    { x: 10, y: 13}
    
    
];
const gameBoard = document.getElementById('gameBoard')
function main(currentTime) {
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    window.requestAnimationFrame(main);
    if (secondsSinceLastRender < 1 / snakeSpeed) return;
    lastRenderTime = currentTime;

    update();
    print();
}
window.requestAnimationFrame(main);

function update() {
    if(dead == true) {
        alert('ded')
        return

        
        
    }
    updateSnake();
    updateFood();
    checkForDeath();
}

function print() {
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function updateSnake() {
    addSegment();

    const inputDirection = getInputDirection();
    for (let i = snakeBody.length -2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] }
    }

    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;


}

function drawSnake(gameBoard) {
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add('snake')
        gameBoard.appendChild(snakeElement)
    })
}

function expandSnake(amount) {
    newSegment += amount;
}

function onTopSnake(position, {ignoreHead = false} = {}) {
    return snakeBody.some((segment, index) => {
      if (ignoreHead && index === 0) return false
      return equalPosition(segment, position)
    })
  }
  

 

function intersection() {
    return onTopSnake(snakeBody[0], { ignoreHead: true })
}

function equalPosition(pos1, pos2) {
    return (
        pos1.x === pos2.x && pos1.y === pos2.y
    )
}

function addSegment() {
    for (let i = 0; i < newSegment; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1]})
    }
    newSegment = 0;
}

//control

let inputDirection = {x: 0, y: 0}
let lastInputDirection = {x: 0, y: 0}
function getInputDirection() {
    lastInputDirection = inputDirection;
    return inputDirection;
}

window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowLeft':
            if (lastInputDirection.x !== 0) break;
            inputDirection = {x: -1, y: 0};
            break;
        case 'ArrowRight':
            if (lastInputDirection.x !== 0) break;
            inputDirection = {x: 1, y: 0};
            break;
        case 'ArrowUp':
            if (lastInputDirection.y !== 0) break;
            inputDirection = {x: 0, y: -1};
            break;
        case 'ArrowDown':
            if (lastInputDirection.y !== 0) break;
            inputDirection = {x: 0, y: 1};
            break;
    }
})

//food

const expansionRate = 1
let food = randomGridPosition();

function updateFood() {
    if (onTopSnake(food)) {
        expandSnake(expansionRate);
        food = randomGridPosition();
        expansionRate = Math.round(expansionRate + 0.1);
        snakeSpeed = Math.round(snakeSpeed + 0.1);
    }
}

function drawFood(gameBoard) {
        const foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        gameBoard.appendChild(foodElement);
    }

function getRandomFoodPosition() {
    let newFoodPosition
    while(newFoodPosition == null || onTopSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition;
    }
    return newFoodPosition;
}

function randomGridPosition() {
    return{
        x: Math.floor(Math.random() * gridSize) + 1,
        y: Math.floor(Math.random() * gridSize) + 1
    }
}

function checkForDeath() {
    dead = outSideGrid(getSnakeHead)
}

function outSideGrid(position) {
    return(
        position.x < 1 || position.x > gridSize ||
        position.y < 1 || position.y > gridSize 
    )
}

function getSnakeHead() {
    return snakeBody[0]
}

function onTopSnake(position, {ignoreHead = false} = {}) {
    return snakeBody.some((segment, index) => {
      if (ignoreHead && index === 0) return false
      return equalPosition(segment, position)
    })
  }