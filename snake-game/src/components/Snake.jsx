import PropTypes from 'prop-types';
import './Snake.css';

/**
 * Compute a CSS class hint for each segment based on its position in the body.
 */
function getSegmentType(index, total) {
  if (index === 0) return 'head';
  if (index === total - 1) return 'tail';
  return 'body';
}

/**
 * Derive the rotation angle for a segment based on neighbour positions.
 * Used to visually orient head and tail.
 */
function getRotation(prev, next) {
  if (!prev && !next) return 0;
  const ref = next ?? prev;
  const dx = ref.x - (prev ?? next).x;
  const dy = ref.y - (prev ?? next).y;
  if (dx > 0) return 0;     // right
  if (dx < 0) return 180;   // left
  if (dy > 0) return 90;    // down
  if (dy < 0) return 270;   // up
  return 0;
}

/**
 * Snake — renders all segments of the snake on the board.
 *
 * Props:
 *   segments: Array<{ x: number, y: number }>  — ordered head → tail
 *   cellSize: number                            — px size of each cell
 */
function Snake({ segments, cellSize }) {
  return (
    <>
      {segments.map((seg, index) => {
        const type = getSegmentType(index, segments.length);
        const prev = segments[index - 1] ?? null;
        const next = segments[index + 1] ?? null;

        const style = {
          left: seg.x * cellSize,
          top: seg.y * cellSize,
          width: cellSize,
          height: cellSize,
          '--rotation': `${getRotation(prev, next)}deg`,
        };

        return (
          <div
            key={`${seg.x}-${seg.y}-${index}`}
            className={`snake-segment snake-segment--${type}`}
            style={style}
            aria-hidden="true"
          >
            {type === 'head' && (
              <>
                <div className="snake-eye snake-eye--left" />
                <div className="snake-eye snake-eye--right" />
              </>
            )}
          </div>
        );
      })}
    </>
  );
}

Snake.propTypes = {
  segments: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    })
  ).isRequired,
  cellSize: PropTypes.number.isRequired,
};

export default Snake;