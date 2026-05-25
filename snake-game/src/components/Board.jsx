import PropTypes from 'prop-types';
import Snake from './Snake';
import Food from './Food';
import { BOARD_SIZE } from '../utils/gameUtils';
import './Board.css';

/**
 * Board — the game's visual grid.
 * Renders the background grid, Snake segments, and Food.
 *
 * Props:
 *   snake:    Array<{x,y}>   — snake segments (head first)
 *   food:     {x, y}         — current food position
 *   cellSize: number         — px per cell
 *   gameOver: boolean        — whether the game has ended
 */
function Board({ snake, food, cellSize, gameOver }) {
  const boardPx = BOARD_SIZE * cellSize;

  return (
    <div
      className={`board ${gameOver ? 'board--game-over' : ''}`}
      style={{ width: boardPx, height: boardPx }}
      role="img"
      aria-label="Snake game board"
    >
      {/* Grid lines overlay */}
      <div
        className="board__grid"
        style={{
          backgroundSize: `${cellSize}px ${cellSize}px`,
        }}
      />

      {/* Game entities */}
      <Snake segments={snake} cellSize={cellSize} />
      <Food  position={food}  cellSize={cellSize} />

      {/* Game-over flash overlay */}
      {gameOver && <div className="board__overlay" aria-hidden="true" />}
    </div>
  );
}

Board.propTypes = {
  snake: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    })
  ).isRequired,
  food: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  cellSize: PropTypes.number.isRequired,
  gameOver: PropTypes.bool.isRequired,
};

export default Board;