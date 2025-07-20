const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = 400;
canvas.height = 600;

// Game variables
let bird = {
    x: 50,
    y: canvas.height / 2,
    width: 40,
    height: 30,
    gravity: 0.5,
    velocity: 0,
    jump: -10
};

let pipes = [];
let score = 0;
let gameOver = false;

// Event listeners
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !gameOver) {
        bird.velocity = bird.jump;
    }
});

// Game loop
function gameLoop() {
    if (gameOver) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw bird
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

    // Update bird position
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    // Check for collisions
    if (bird.y + bird.height > canvas.height || bird.y < 0) {
        gameOver = true;
    }

    // Generate pipes
    if (frames % 100 === 0) {
        pipes.push({
            x: canvas.width,
            height: Math.random() * (canvas.height - 200) + 50,
            width: 50,
            passed: false
        });
    }

    // Draw and update pipes
    ctx.fillStyle = '#228B22';
    pipes.forEach((pipe, index) => {
        ctx.fillRect(pipe.x, 0, pipe.width, pipe.height);
        ctx.fillRect(pipe.x, pipe.height + 150, pipe.width, canvas.height - pipe.height - 150);

        pipe.x -= 2;

        // Check for collisions with pipes
        if (
            bird.x + bird.width > pipe.x &&
            bird.x < pipe.x + pipe.width &&
            (bird.y < pipe.height || bird.y + bird.height > pipe.height + 150)
        ) {
            gameOver = true;
        }

        // Remove pipes that are off-screen
        if (pipe.x + pipe.width < 0) {
            pipes.splice(index, 1);
        }
    });

    // Draw score
    ctx.fillStyle = '#000';
    ctx.font = '24px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);

    requestAnimationFrame(gameLoop);
}

// Start the game
let frames = 0;
gameLoop();