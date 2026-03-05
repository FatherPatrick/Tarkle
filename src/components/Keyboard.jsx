import { LETTER_STATE } from '../gameUtils';
import './Keyboard.css';

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
];

function Keyboard({ onKey, letterStates, disabled }) {
  return (
    <div className="keyboard" aria-label="On-screen keyboard">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard__row">
          {row.map((key) => {
            const state = letterStates[key] || LETTER_STATE.EMPTY;
            const isWide = key === 'ENTER' || key === '⌫';
            return (
              <button
                key={key}
                className={`keyboard__key keyboard__key--${state}${isWide ? ' keyboard__key--wide' : ''}`}
                onClick={() => !disabled && onKey(key)}
                aria-label={key === '⌫' ? 'Backspace' : key}
                disabled={disabled}
              >
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
