import { useState, useCallback, useRef } from 'react';
import Board from './Board';
import Score from './Score';
import StartScreen from './StartScreen';
import MobileControls from './MobileControls';
import { useKeyboardInput } from '../hooks/useKeyboardInput';
import { useGameLoop } from '../hooks/useGameLoop';
import {
  BOARD_SIZE,
  CELL_SIZE,
  INITIAL_SNAKE,
  INITIAL_DIRECTION,
  generateFood,
  nextHead,
  isOutOfBounds,
  collidesWithSnake,
  getLevel,
  getSpeed,
} from '../utils/gameUtils';
import './Game.css';

// Game phases
const PHASE = {
  IDLE:     'idle',      // before first game
  PLAYING:  'playing',   // game in progress
  OVER:     'over',      // game just ended
};

/**
 * Game — top-level container.
 * Owns all game state; passes data down to children via props.
 */
function Game() {
  // ── State ────────────────────────────────────────────────────────────────
  const [phase,     setPhase]     = useState(PHASE.IDLE);
  const [snake,     setSnake]     = useState(INITIAL_SNAKE);
  const [food,      setFood]      = useState(() => generateFood(INITIAL_SNAKE));
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [score,     setScore]     = useState(0);
  const [bestScore, setBestScore] = useState(0);

  // Use a ref for direction inside the game loop to avoid stale closures
  const directionRef = useRef(INITIAL_DIRECTION);

  const isPlaying = phase === PHASE.PLAYING;
  const level     = getLevel(score);
  const speed     = isPlaying ? getSpeed(level) : null;

  // ── Direction change ─────────────────────────────────────────────────────
  const handleDirectionChange = useCallback((newDir) => {
    setDirection(newDir);
    directionRef.current = newDir;
  }, []);

  // ── Keyboard input ───────────────────────────────────────────────────────
  useKeyboardInput(direction, handleDirectionChange, isPlaying);

  // ── Game tick (core loop) ────────────────────────────────────────────────
  const tick = useCallback(() => {
    setSnake((prev) => {
      const head     = prev[0];
      const newHead  = nextHead(head, directionRef.current);

      // Collision: wall
      if (isOutOfBounds(newHead)) {
        endGame(prev);
        return prev;
      }

      // Collision: self (ignore tail — it will have moved away)
      if (collidesWithSnake(newHead, prev.slice(0, -1))) {
        endGame(prev);
        return prev;
      }

      // Check food collision
      setFood((currentFood) => {
        const ateFood = newHead.x === currentFood.x && newHead.y === currentFood.y;

        setScore((s) => {
          const newScore = ateFood ? s + 1 : s;
          if (ateFood) setBestScore((b) => Math.max(b, newScore));
          return newScore;
        });

        setSnake(() => {
          const newSnake = [newHead, ...prev];
          if (!ateFood) newSnake.pop();          // don't grow unless ate
          return newSnake;
        });

        return ateFood
          ? generateFood([newHead, ...prev])     // new food position
          : currentFood;
      });

      return prev; // setSnake called inside setFood callback
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useGameLoop(tick, speed);

  // ── Helpers ──────────────────────────────────────────────────────────────
  function endGame(finalSnake) {
    setPhase(PHASE.OVER);
    setScore((s) => {
      setBestScore((b) => Math.max(b, s));
      return s;
    });
    // Visual: leave the snake in place, overlay appears
    void finalSnake; // silence unused-var lint
  }

  function startGame() {
    const initSnake = INITIAL_SNAKE;
    setSnake(initSnake);
    setFood(generateFood(initSnake));
    setDirection(INITIAL_DIRECTION);
    directionRef.current = INITIAL_DIRECTION;
    setScore(0);
    setPhase(PHASE.PLAYING);
  }

  // ── Render ───────────────────────────────────────────────────────────────
  const boardPx = BOARD_SIZE * CELL_SIZE;

  return (
    <div className="game">
      <header className="game__header">
        <Score score={score} bestScore={bestScore} level={level} />
      </header>

      <main className="game__main">
        <div className="game__board-wrapper" style={{ width: boardPx }}>
          <Board
            snake={snake}
            food={food}
            cellSize={CELL_SIZE}
            gameOver={phase === PHASE.OVER}
          />

          {/* Overlay screens */}
          {phase !== PHASE.PLAYING && (
            <StartScreen
              isGameOver={phase === PHASE.OVER}
              score={score}
              bestScore={bestScore}
              onStart={startGame}
            />
          )}
        </div>
      </main>

      <footer className="game__footer">
        <MobileControls
          currentDirection={direction}
          onDirectionChange={handleDirectionChange}
          active={isPlaying}
        />
      </footer>
    </div>
  );
}

export default Game;