import PropTypes from 'prop-types';
import './Score.css';

/**
 * Score — displays current score, best score, and level.
 *
 * Props:
 *   score:     number  — current score (food eaten)
 *   bestScore: number  — all-time best score this session
 *   level:     number  — current difficulty level (1-4)
 */
function Score({ score, bestScore, level }) {
  return (
    <div className="score-panel" role="status" aria-live="polite">
      <div className="score-panel__item">
        <span className="score-panel__label">SCORE</span>
        <span className="score-panel__value score-panel__value--current">{score}</span>
      </div>

      <div className="score-panel__item score-panel__item--level">
        <span className="score-panel__label">LEVEL</span>
        <div className="score-panel__pips">
          {[1, 2, 3, 4].map((l) => (
            <span
              key={l}
              className={`score-panel__pip ${l <= level ? 'score-panel__pip--active' : ''}`}
            />
          ))}
        </div>
      </div>

      <div className="score-panel__item">
        <span className="score-panel__label">BEST</span>
        <span className="score-panel__value score-panel__value--best">{bestScore}</span>
      </div>
    </div>
  );
}

Score.propTypes = {
  score:     PropTypes.number.isRequired,
  bestScore: PropTypes.number.isRequired,
  level:     PropTypes.number.isRequired,
};

export default Score;