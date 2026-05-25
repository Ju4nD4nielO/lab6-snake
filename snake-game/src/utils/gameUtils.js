// Game constants
export const BOARD_SIZE = 20; // 20x20 grid
export const CELL_SIZE = 28; // px per cell

export const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

export const OPPOSITE = {
  UP: 'DOWN',
  DOWN: 'UP',
  LEFT: 'RIGHT',
  RIGHT: 'LEFT',
};

export const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
];

export const INITIAL_DIRECTION = 'RIGHT';

export const SPEEDS = {
  1: 180,
  2: 130,
  3: 90,
  4: 60,
};

export const LEVEL_THRESHOLDS = {
  1: 0,
  2: 5,
  3: 12,
  4: 22,
};

/**
 * Generate a random food position that doesn't overlap with the snake
 */
export function generateFood(snake) {
  let pos;
  do {
    pos = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    };
  } while (snake.some((seg) => seg.x === pos.x && seg.y === pos.y));
  return pos;
}

/**
 * Compute the next head position given direction
 */
export function nextHead(head, dir) {
  const d = DIRECTIONS[dir];
  return { x: head.x + d.x, y: head.y + d.y };
}

/**
 * Check if position is out of bounds
 */
export function isOutOfBounds(pos) {
  return pos.x < 0 || pos.x >= BOARD_SIZE || pos.y < 0 || pos.y >= BOARD_SIZE;
}

/**
 * Check if position collides with any snake segment
 */
export function collidesWithSnake(pos, snake) {
  return snake.some((seg) => seg.x === pos.x && seg.y === pos.y);
}

/**
 * Get level from score
 */
export function getLevel(score) {
  let level = 1;
  for (const [lvl, threshold] of Object.entries(LEVEL_THRESHOLDS)) {
    if (score >= threshold) level = Number(lvl);
  }
  return level;
}

/**
 * Get speed (ms interval) from level
 */
export function getSpeed(level) {
  return SPEEDS[level] ?? SPEEDS[1];
}