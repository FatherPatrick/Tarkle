import { LETTER_STATE } from '../gameUtils';
import Tile from './Tile';
import './Board.css';

const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

function Board({ guesses, currentGuess, evaluations, currentRow, shakeRow }) {
  const rows = Array(MAX_GUESSES).fill(null);

  return (
    <div className="board" aria-label="Game board">
      {rows.map((_, rowIndex) => {
        const isCurrentRow = rowIndex === currentRow;
        const isSubmittedRow = rowIndex < currentRow;
        const evaluation = evaluations[rowIndex];
        const shouldShake = shakeRow === rowIndex;

        let letters;
        if (isCurrentRow) {
          letters = currentGuess.padEnd(WORD_LENGTH, ' ').split('');
        } else if (isSubmittedRow) {
          letters = guesses[rowIndex].split('');
        } else {
          letters = Array(WORD_LENGTH).fill(' ');
        }

        return (
          <div
            key={rowIndex}
            className={`board__row${shouldShake ? ' board__row--shake' : ''}`}
            aria-label={`Row ${rowIndex + 1}`}
          >
            {letters.map((letter, colIndex) => {
              let state = LETTER_STATE.EMPTY;
              if (isCurrentRow && letter.trim()) {
                state = LETTER_STATE.TBD;
              } else if (isSubmittedRow && evaluation) {
                state = evaluation[colIndex];
              }

              return (
                <Tile
                  key={colIndex}
                  letter={letter.trim()}
                  state={state}
                  position={colIndex}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Board;
