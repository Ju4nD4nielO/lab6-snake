import { useEffect, useRef } from 'react';

/**
 * useGameLoop — runs a callback at a fixed interval (ms).
 * Clears and restarts whenever `interval` or `callback` changes.
 *
 * @param {function} callback - The tick function to run each interval
 * @param {number|null} interval - Milliseconds between ticks; null pauses the loop
 */
export function useGameLoop(callback, interval) {
  const savedCallback = useRef(callback);

  // Always keep the ref pointing to the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (interval === null) return;

    const id = setInterval(() => savedCallback.current(), interval);
    return () => clearInterval(id);
  }, [interval]);
}
