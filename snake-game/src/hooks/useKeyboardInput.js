import { useEffect, useCallback } from 'react';
import { OPPOSITE } from '../utils/gameUtils';

const KEY_MAP = {
  ArrowUp: 'UP',
  ArrowDown: 'DOWN',
  ArrowLeft: 'LEFT',
  ArrowRight: 'RIGHT',
  w: 'UP',
  s: 'DOWN',
  a: 'LEFT',
  d: 'RIGHT',
  W: 'UP',
  S: 'DOWN',
  A: 'LEFT',
  D: 'RIGHT',
};

/**
 * useKeyboardInput — listens to keyboard events and calls onDirectionChange
 * when a valid, non-opposite direction key is pressed.
 *
 * @param {string} currentDirection - The snake's current direction
 * @param {function} onDirectionChange - Callback to update direction
 * @param {boolean} active - Whether the hook is active (game running)
 */
export function useKeyboardInput(currentDirection, onDirectionChange, active) {
  const handleKeyDown = useCallback(
    (e) => {
      if (!active) return;

      const newDir = KEY_MAP[e.key];
      if (!newDir) return;

      // Prevent scrolling the page with arrow keys
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }

      // Don't allow reversing direction (can't go directly opposite)
      if (OPPOSITE[newDir] === currentDirection) return;

      onDirectionChange(newDir);
    },
    [currentDirection, onDirectionChange, active]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}