const ball = document.getElementById('ball');
const container = document.getElementById('container');

const ballRadius = 20; // Adjust the radius as needed

let isDragging = false;
let throwStartX, throwStartY;
let dx = 0; // horizontal speed
let dy = 0; // vertical speed
const gravity = 0.2;
const bounceFactor = -0.7;
const dragFactor = 0.05;
const minTimeBetweenMoves = 10;

container.addEventListener('mousedown', onMouseDown);
container.addEventListener('mousemove', onMouseMove);
document.addEventListener('mouseup', onMouseUp);

function onMouseDown(event) {
    event.preventDefault();

    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Check if mouse is inside the hitbox around the ball
    const ballRect = ball.getBoundingClientRect();
    const ballCenterX = ballRect.left + ballRect.width / 2;
    const ballCenterY = ballRect.top + ballRect.height / 2;
    const distance = Math.sqrt((mouseX - ballCenterX) ** 2 + (mouseY - ballCenterY) ** 2);

    if (distance <= ballRadius) {
        isDragging = true;
        throwStartX = mouseX;
        throwStartY = mouseY;

        dx = 0;
        dy = 0;
    }
}

function onMouseMove(event) {
    if (isDragging) {
        const newX = event.clientX - throwStartX;
        const newY = event.clientY - throwStartY;

        dx = newX * dragFactor;
        dy = newY * dragFactor;
    }
}

function onMouseUp() {
    isDragging = false;
}

function animate() {
    requestAnimationFrame(animate);

    if (!isDragging) {
        dy += gravity;

        let newX = ball.offsetLeft + dx;
        let newY = ball.offsetTop + dy;

        if (newX <= 0 || newX >= container.offsetWidth - ball.offsetWidth) {
            dx *= bounceFactor;
        }
        if (newY <= 0 || newY >= container.offsetHeight - ball.offsetHeight) {
            dy *= bounceFactor;
        }

        newX = Math.max(newX, 0);
        newX = Math.min(newX, container.offsetWidth - ball.offsetWidth);
        newY = Math.max(newY, 0);
        newY = Math.min(newY, container.offsetHeight - ball.offsetHeight);

        ball.style.left = newX + 'px';
        ball.style.top = newY + 'px';
    }
}

animate();