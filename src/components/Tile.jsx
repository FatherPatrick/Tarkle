import { LETTER_STATE } from '../gameUtils';
import './Tile.css';

function Tile({ letter, state, position, animate }) {
  return (
    <div
      className={`tile tile--${state}${animate ? ' tile--pop' : ''}`}
      data-state={state}
      style={
        state !== LETTER_STATE.EMPTY && state !== LETTER_STATE.TBD
          ? { animationDelay: `${position * 300}ms` }
          : {}
      }
    >
      {letter}
    </div>
  );
}

export default Tile;
