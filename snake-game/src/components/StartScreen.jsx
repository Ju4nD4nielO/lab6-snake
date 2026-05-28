import PropTypes from 'prop-types';
import './StartScreen.css';

/**
 * StartScreen — shown on the initial screen and after game over.
 *
 * Props:
 *   isGameOver:  boolean  — true if showing "game over" state
 *   score:       number   — final score (only relevant on game over)
 *   bestScore:   number   — all-time best score
 *   onStart:     function — called when the player clicks Start / Play Again
 */
function StartScreen({ isGameOver, score, bestScore, onStart }) {
  return (
    <div className="start-screen">
      <div className="start-screen__content">
        {isGameOver ? (
          <>
            <h2 className="start-screen__title start-screen__title--over">GAME OVER</h2>
            <div className="start-screen__scores">
              <div className="start-screen__score-row">
                <span className="start-screen__score-label">Score</span>
                <span className="start-screen__score-val">{score}</span>
              </div>
              {score >= bestScore && score > 0 && (
                <div className="start-screen__new-best">🏆 New best!</div>
              )}
              <div className="start-screen__score-row">
                <span className="start-screen__score-label">Best</span>
                <span className="start-screen__score-val start-screen__score-val--best">
                  {bestScore}
                </span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="start-screen__logo">🐍</div>
            <h1 className="start-screen__title">SNAKE</h1>
            <p className="start-screen__subtitle">Classic arcade — reinvented</p>
          </>
        )}

        <button className="start-screen__btn" onClick={onStart}>
          {isGameOver ? 'Play Again' : 'Start Game'}
        </button>

        <div className="start-screen__controls">
          <span>Arrow keys or WASD to move</span>
        </div>

        <div className="start-screen__levels">
          <span>Speed increases at 5 · 12 · 22 points</span>
        </div>
      </div>
    </div>
  );
}

StartScreen.propTypes = {
  isGameOver: PropTypes.bool.isRequired,
  score:      PropTypes.number.isRequired,
  bestScore:  PropTypes.number.isRequired,
  onStart:    PropTypes.func.isRequired,
};

export default StartScreen;
