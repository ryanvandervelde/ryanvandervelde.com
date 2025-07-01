const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let shipX = canvas.width / 2;
let shipY = canvas.height - 30;
const shipWidth = 50;
const shipHeight = 20;
const shipSpeed = 7;

const invaderRows = 5;
const invaderColumns = 8;
const invaderWidth = 40;
const invaderHeight = 20;
const invaderPadding = 10;
let invaders = [];

for (let r = 0; r < invaderRows; r++) {
    invaders[r] = [];
    for (let c = 0; c < invaderColumns; c++) {
        invaders[r][c] = { x: 0, y: 0, status: 1 };
    }
}

let rightPressed = false;
let leftPressed = false;

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
    }
}

function drawShip() {
    ctx.fillStyle = 'white';
    ctx.fillRect(shipX, shipY, shipWidth, shipHeight);
}

function drawInvaders() {
    for (let r = 0; r < invaderRows; r++) {
        for (let c = 0; c < invaderColumns; c++) {
            if (invaders[r][c].status === 1) {
                const invaderX = c * (invaderWidth + invaderPadding) + 30;
                const invaderY = r * (invaderHeight + invaderPadding) + 30;
                invaders[r][c].x = invaderX;
                invaders[r][c].y = invaderY;
                ctx.fillStyle = 'red';
                ctx.fillRect(invaderX, invaderY, invaderWidth, invaderHeight);
            }
        }
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawShip();
    drawInvaders();

    if (rightPressed && shipX < canvas.width - shipWidth) {
        shipX += shipSpeed;
    } else if (leftPressed && shipX > 0) {
        shipX -= shipSpeed;
    }

    requestAnimationFrame(update);
}

update();
