import PropTypes from 'prop-types';
import { OPPOSITE } from '../utils/gameUtils';
import './MobileControls.css';

const ARROWS = [
  { dir: 'UP',    label: '▲', row: 1, col: 2 },
  { dir: 'LEFT',  label: '◀', row: 2, col: 1 },
  { dir: 'DOWN',  label: '▼', row: 2, col: 2 },
  { dir: 'RIGHT', label: '▶', row: 2, col: 3 },
];

/**
 * MobileControls — D-pad for touch/mobile play.
 *
 * Props:
 *   currentDirection: string   — current snake direction
 *   onDirectionChange: function — called with new direction string
 *   active: boolean            — disable when game is not running
 */
function MobileControls({ currentDirection, onDirectionChange, active }) {
  const handlePress = (dir) => {
    if (!active) return;
    if (OPPOSITE[dir] === currentDirection) return;
    onDirectionChange(dir);
  };

  return (
    <div className="mobile-controls" aria-label="direction controls">
      {ARROWS.map(({ dir, label, row, col }) => (
        <button
          key={dir}
          className="mobile-controls__btn"
          style={{ gridRow: row, gridColumn: col }}
          onPointerDown={(e) => { e.preventDefault(); handlePress(dir); }}
          aria-label={`move ${dir.toLowerCase()}`}
          disabled={!active}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

MobileControls.propTypes = {
  currentDirection:  PropTypes.string.isRequired,
  onDirectionChange: PropTypes.func.isRequired,
  active:            PropTypes.bool.isRequired,
};

export default MobileControls;
