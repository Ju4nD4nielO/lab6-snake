import PropTypes from 'prop-types';
import './Food.css';

/**
 * Food — renders the food item at a given grid position.
 *
 * Props:
 *   position: { x: number, y: number }  — grid coordinates
 *   cellSize: number                     — px size of each cell
 */
function Food({ position, cellSize }) {
  const style = {
    left: position.x * cellSize,
    top: position.y * cellSize,
    width: cellSize,
    height: cellSize,
  };

  return (
    <div className="food" style={style} aria-label="food">
      <div className="food__inner" />
      <div className="food__glow" />
    </div>
  );
}

Food.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  cellSize: PropTypes.number.isRequired,
};

export default Food;