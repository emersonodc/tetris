// Tetromino shapes and colors
export const TETROMINOES = {
  I: { shape: [[1,1,1,1]], color: '#00f0f0' },
  O: { shape: [[1,1],[1,1]], color: '#f0f000' },
  T: { shape: [[0,1,0],[1,1,1]], color: '#a000f0' },
  S: { shape: [[0,1,1],[1,1,0]], color: '#00f000' },
  Z: { shape: [[1,1,0],[0,1,1]], color: '#f00000' },
  J: { shape: [[1,0,0],[1,1,1]], color: '#0000f0' },
  L: { shape: [[0,0,1],[1,1,1]], color: '#f0a000' },
};

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

export const BASE_DROP_INTERVAL_MS = 800;
export const SPEED_INCREASE_PER_LEVEL = 0.05;
export const MAX_SPEED_MULTIPLIER = 2;

export const LINES_PER_LEVEL = 10;

export const POINTS = {
  1: 100,
  2: 300,
  3: 500,
  4: 800,
};

export function createEmptyBoard() {
  return Array.from({ length: BOARD_HEIGHT }, () =>
    Array(BOARD_WIDTH).fill(null)
  );
}

export function getRandomPiece() {
  const keys = Object.keys(TETROMINOES);
  const key = keys[Math.floor(Math.random() * keys.length)];
  return {
    type: key,
    shape: TETROMINOES[key].shape,
    color: TETROMINOES[key].color,
    x: Math.floor((BOARD_WIDTH - TETROMINOES[key].shape[0].length) / 2),
    y: 0,
  };
}

export function rotate(shape) {
  const rows = shape.length;
  const cols = shape[0].length;
  const rotated = Array.from({ length: cols }, () => Array(rows).fill(0));
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      rotated[c][rows - 1 - r] = shape[r][c];
    }
  }
  return rotated;
}

export function isValidPosition(board, shape, x, y) {
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (shape[r][c]) {
        const newX = x + c;
        const newY = y + r;
        if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) return false;
        if (newY >= 0 && board[newY][newX]) return false;
      }
    }
  }
  return true;
}

export function placePiece(board, piece) {
  const newBoard = board.map(row => [...row]);
  for (let r = 0; r < piece.shape.length; r++) {
    for (let c = 0; c < piece.shape[r].length; c++) {
      if (piece.shape[r][c]) {
        const y = piece.y + r;
        const x = piece.x + c;
        if (y >= 0 && y < BOARD_HEIGHT && x >= 0 && x < BOARD_WIDTH) {
          newBoard[y][x] = piece.color;
        }
      }
    }
  }
  return newBoard;
}

export function clearLines(board) {
  let linesCleared = 0;
  const newBoard = board.filter(row => {
    const full = row.every(cell => cell !== null);
    if (full) linesCleared++;
    return !full;
  });
  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array(BOARD_WIDTH).fill(null));
  }
  return { board: newBoard, linesCleared };
}

export function getGhostPosition(board, piece) {
  let ghostY = piece.y;
  while (isValidPosition(board, piece.shape, piece.x, ghostY + 1)) {
    ghostY++;
  }
  return ghostY;
}

export function getSpeed(level) {
  const speedMultiplier = Math.min(
    1 + (level * SPEED_INCREASE_PER_LEVEL),
    MAX_SPEED_MULTIPLIER
  );

  return Math.round(BASE_DROP_INTERVAL_MS / speedMultiplier);
}
