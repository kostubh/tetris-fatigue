// Tetris with Speed Brake - Game Logic
// Canvas setup
const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d');
const ROWS = 20;
const COLS = 12;
const BLOCK_SIZE = 20;

// Scale canvas
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

// Colors for each piece
const COLORS = [
    null,
    '#FF0D72', // I
    '#0DC2FF', // J
    '#0DFF72', // L
    '#F538FF', // O
    '#FF8E0D', // S
    '#FFE138', // T
    '#3877FF', // Z
];

// Tetromino shapes
const SHAPES = [
    null,
    [[1, 1, 1, 1]], // I
    [[2, 0, 0], [2, 2, 2]], // J
    [[0, 0, 3], [3, 3, 3]], // L
    [[4, 4], [4, 4]], // O
    [[0, 5, 5], [5, 5, 0]], // S
    [[0, 6, 0], [6, 6, 6]], // T
    [[7, 7, 0], [0, 7, 7]], // Z
];

// Game state
let board = createBoard(ROWS, COLS);
let currentPiece = null;
let gameRunning = false;
let score = 0;
let linesCleared = 0;
let level = 1;
let dropCounter = 0;
let lastTime = 0;

// Speed control
let baseDropInterval = 1000; // 1 second base speed
let dropInterval = baseDropInterval;
let speedMultiplier = 1.0;
let brakeActive = false;
let brakePower = 0; // 0-100
let brakeStartTime = 0;
const MAX_BRAKE_DURATION = 3000; // 3 seconds max brake hold
const BRAKE_COOLDOWN = 2000; // 2 seconds cooldown
let brakeCooldownEnd = 0;

// Create empty board
function createBoard(rows, cols) {
    return Array.from({ length: rows }, () => Array(cols).fill(0));
}

// Create a new piece
function createPiece(type) {
    return {
        shape: SHAPES[type],
        type: type,
        pos: { x: Math.floor(COLS / 2) - 1, y: 0 }
    };
}

// Generate random piece
function randomPiece() {
    return createPiece(Math.floor(Math.random() * 6) + 1);
}

// Draw a single block
function drawBlock(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 0.05;
    ctx.strokeRect(x, y, 1, 1);
}

// Draw the board
function drawBoard() {
    board.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                drawBlock(x, y, COLORS[value]);
            }
        });
    });
}

// Draw current piece
function drawPiece(piece) {
    piece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                drawBlock(piece.pos.x + x, piece.pos.y + y, COLORS[value]);
            }
        });
    });
}

// Clear canvas
function clearCanvas() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, COLS, ROWS);
}

// Draw everything
function draw() {
    clearCanvas();
    drawBoard();
    if (currentPiece) {
        drawPiece(currentPiece);
    }
}

// Collision detection
function collide(board, piece) {
    for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
            if (piece.shape[y][x] !== 0) {
                const newX = piece.pos.x + x;
                const newY = piece.pos.y + y;

                if (newX < 0 || newX >= COLS || newY >= ROWS) {
                    return true;
                }
                if (newY >= 0 && board[newY][newX] !== 0) {
                    return true;
                }
            }
        }
    }
    return false;
}

// Merge piece into board
function merge(board, piece) {
    piece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                board[piece.pos.y + y][piece.pos.x + x] = value;
            }
        });
    });
}

// Rotate piece
function rotate(piece) {
    const newShape = piece.shape[0].map((_, i) =>
        piece.shape.map(row => row[i]).reverse()
    );

    const oldShape = piece.shape;
    piece.shape = newShape;

    if (collide(board, piece)) {
        piece.shape = oldShape;
    }
}

// Move piece
function move(dir) {
    if (!currentPiece || !gameRunning) return;

    currentPiece.pos.x += dir;
    if (collide(board, currentPiece)) {
        currentPiece.pos.x -= dir;
    }
}

// Drop piece
function drop() {
    if (!currentPiece || !gameRunning) return;

    currentPiece.pos.y++;
    if (collide(board, currentPiece)) {
        currentPiece.pos.y--;
        merge(board, currentPiece);
        clearLines();
        currentPiece = randomPiece();

        if (collide(board, currentPiece)) {
            gameOver();
        }
    }
    dropCounter = 0;
}

// Hard drop
function hardDrop() {
    if (!currentPiece || !gameRunning) return;

    while (!collide(board, currentPiece)) {
        currentPiece.pos.y++;
        score += 2;
    }
    currentPiece.pos.y--;
    merge(board, currentPiece);
    clearLines();
    currentPiece = randomPiece();

    if (collide(board, currentPiece)) {
        gameOver();
    }
    dropCounter = 0;
    updateScore();
}

// Clear completed lines
function clearLines() {
    let linesCount = 0;

    outer: for (let y = ROWS - 1; y >= 0; y--) {
        for (let x = 0; x < COLS; x++) {
            if (board[y][x] === 0) {
                continue outer;
            }
        }

        // Remove completed line
        const row = board.splice(y, 1)[0].fill(0);
        board.unshift(row);
        y++;
        linesCount++;
    }

    if (linesCount > 0) {
        linesCleared += linesCount;
        score += linesCount * 100 * level;

        // Increase level every 10 lines
        level = Math.floor(linesCleared / 10) + 1;

        // Increase speed with level
        baseDropInterval = 1000 - (level - 1) * 50;
        if (baseDropInterval < 100) baseDropInterval = 100;

        updateScore();
    }
}

// Update score display
function updateScore() {
    document.getElementById('score').textContent = score;
    document.getElementById('level').textContent = level;
    updateSpeedDisplay();
}

// Update speed display
function updateSpeedDisplay() {
    const effectiveMultiplier = brakeActive ? speedMultiplier * (1 - brakePower / 200) : speedMultiplier;
    document.getElementById('speed').textContent = effectiveMultiplier.toFixed(1) + 'x';
}

// Game loop
function update(time = 0) {
    if (!gameRunning) return;

    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;

    // Calculate effective drop interval with brake
    let effectiveDropInterval = dropInterval;
    if (brakeActive && brakePower > 0) {
        // Brake reduces speed by up to 50%
        const brakeReduction = brakePower / 200; // 0 to 0.5
        effectiveDropInterval = dropInterval * (1 + brakeReduction);
    }

    if (dropCounter > effectiveDropInterval) {
        drop();
    }

    draw();
    updateSpeedDisplay();

    requestAnimationFrame(update);
}

// Start game
function startGame() {
    board = createBoard(ROWS, COLS);
    currentPiece = randomPiece();
    score = 0;
    linesCleared = 0;
    level = 1;
    dropCounter = 0;
    baseDropInterval = 1000;
    dropInterval = baseDropInterval;
    speedMultiplier = 1.0;
    brakeActive = false;
    brakePower = 0;
    brakeCooldownEnd = 0;
    gameRunning = true;

    document.getElementById('gameOver').classList.add('hidden');
    updateScore();
    updateBrakeMeter();
    lastTime = performance.now();
    requestAnimationFrame(update);

    // Start automatic speed increase
    startSpeedIncrease();
}

// Auto speed increase (every 5 seconds, increase by 5%)
function startSpeedIncrease() {
    if (!gameRunning) return;

    setTimeout(() => {
        if (gameRunning) {
            speedMultiplier += 0.05;
            dropInterval = baseDropInterval / speedMultiplier;
            startSpeedIncrease();
        }
    }, 5000);
}

// Game over
function gameOver() {
    gameRunning = false;
    document.getElementById('gameOver').classList.remove('hidden');
    document.getElementById('finalScore').textContent = score;
}

// Keyboard controls
document.addEventListener('keydown', (e) => {
    if (!gameRunning) return;

    switch (e.key) {
        case 'ArrowLeft':
            move(-1);
            break;
        case 'ArrowRight':
            move(1);
            break;
        case 'ArrowDown':
            drop();
            break;
        case 'ArrowUp':
            rotate(currentPiece);
            break;
        case ' ':
            e.preventDefault();
            hardDrop();
            break;
    }
    draw();
});

// Brake button functionality
const brakeBtn = document.getElementById('brakeBtn');
const brakeMeter = document.getElementById('brakeMeter');
const brakeStatus = document.getElementById('brakeStatus');

function updateBrakeMeter() {
    brakeMeter.style.width = brakePower + '%';
}

function checkBrakeCooldown() {
    if (Date.now() < brakeCooldownEnd) {
        const remaining = Math.ceil((brakeCooldownEnd - Date.now()) / 1000);
        brakeStatus.textContent = `Cooldown: ${remaining}s`;
        brakeStatus.parentElement.classList.add('cooling');
        return false;
    } else {
        brakeStatus.textContent = 'Ready';
        brakeStatus.parentElement.classList.remove('cooling');
        return true;
    }
}

function startBrake() {
    if (!gameRunning || !checkBrakeCooldown()) return;

    brakeActive = true;
    brakeStartTime = Date.now();
    brakeBtn.classList.add('active');

    const brakeInterval = setInterval(() => {
        if (!brakeActive) {
            clearInterval(brakeInterval);
            return;
        }

        const elapsed = Date.now() - brakeStartTime;
        brakePower = Math.min((elapsed / MAX_BRAKE_DURATION) * 100, 100);
        updateBrakeMeter();

        if (elapsed >= MAX_BRAKE_DURATION) {
            stopBrake();
            clearInterval(brakeInterval);
        }
    }, 50);
}

function stopBrake() {
    if (!brakeActive) return;

    brakeActive = false;
    const brakeDuration = Date.now() - brakeStartTime;

    // Apply brake effect (slow down for the duration held)
    // The effect already applied during hold

    // Set cooldown
    brakeCooldownEnd = Date.now() + BRAKE_COOLDOWN;
    brakeBtn.classList.remove('active');

    // Reset brake power
    setTimeout(() => {
        brakePower = 0;
        updateBrakeMeter();
    }, 200);

    // Update status
    const cooldownInterval = setInterval(() => {
        if (checkBrakeCooldown()) {
            clearInterval(cooldownInterval);
        }
    }, 100);
}

// Mouse/Touch events for brake button
brakeBtn.addEventListener('mousedown', startBrake);
brakeBtn.addEventListener('mouseup', stopBrake);
brakeBtn.addEventListener('mouseleave', () => {
    if (brakeActive) stopBrake();
});

brakeBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    startBrake();
});

brakeBtn.addEventListener('touchend', (e) => {
    e.preventDefault();
    stopBrake();
});

// Restart button
document.getElementById('restartBtn').addEventListener('click', startGame);

// Mobile touch controls for game canvas
// Uses continuous tracking during touchmove for responsive left/right movement
let touchStartX = 0;
let touchStartY = 0;
let touchStartTime = 0;
let touchLastX = 0;
let touchMoveAccum = 0; // accumulated horizontal pixels since last move
let touchHasMoved = false; // track if finger moved enough to count as gesture
const MOVE_PIXEL_THRESHOLD = 25; // pixels of horizontal drag per one cell move
const TAP_THRESHOLD = 200; // max duration for tap (ms)
const SWIPE_DOWN_THRESHOLD = 30; // vertical pixels for drop gesture

canvas.addEventListener('touchstart', (e) => {
    if (!gameRunning) return;
    e.preventDefault();

    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    touchLastX = touch.clientX;
    touchStartTime = Date.now();
    touchMoveAccum = 0;
    touchHasMoved = false;
}, { passive: false });

canvas.addEventListener('touchmove', (e) => {
    if (!gameRunning) return;
    e.preventDefault();

    const touch = e.touches[0];
    const deltaX = touch.clientX - touchLastX;
    touchMoveAccum += deltaX;
    touchLastX = touch.clientX;

    // Move piece for every MOVE_PIXEL_THRESHOLD pixels of horizontal drag
    while (touchMoveAccum >= MOVE_PIXEL_THRESHOLD) {
        move(1);
        touchMoveAccum -= MOVE_PIXEL_THRESHOLD;
        touchHasMoved = true;
        draw();
    }
    while (touchMoveAccum <= -MOVE_PIXEL_THRESHOLD) {
        move(-1);
        touchMoveAccum += MOVE_PIXEL_THRESHOLD;
        touchHasMoved = true;
        draw();
    }
}, { passive: false });

canvas.addEventListener('touchend', (e) => {
    if (!gameRunning) return;
    e.preventDefault();

    const touch = e.changedTouches[0];
    const touchDuration = Date.now() - touchStartTime;
    const totalDeltaX = Math.abs(touch.clientX - touchStartX);
    const totalDeltaY = touch.clientY - touchStartY;

    // Tap to rotate (quick touch with minimal movement)
    if (touchDuration < TAP_THRESHOLD && totalDeltaX < 10 && Math.abs(totalDeltaY) < 10) {
        rotate(currentPiece);
        draw();
        return;
    }

    // Vertical gestures on release (only if no significant horizontal movement)
    if (!touchHasMoved || totalDeltaX < 15) {
        if (totalDeltaY > SWIPE_DOWN_THRESHOLD) {
            hardDrop();
            draw();
        }
    }
}, { passive: false });

// Add visual feedback for mobile users
if ('ontouchstart' in window) {
    // Add a mobile controls hint
    const hint = document.createElement('div');
    hint.style.cssText = `
        position: fixed;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 10px 20px;
        border-radius: 8px;
        font-size: 12px;
        z-index: 1000;
        text-align: center;
        max-width: 90%;
    `;
    hint.innerHTML = '📱 Drag ←→ to move • Tap to rotate • Swipe ↓ to drop';
    document.body.appendChild(hint);

    // Hide hint after 5 seconds
    setTimeout(() => {
        hint.style.transition = 'opacity 1s';
        hint.style.opacity = '0';
        setTimeout(() => hint.remove(), 1000);
    }, 5000);
}

// Start the game on load
startGame();
