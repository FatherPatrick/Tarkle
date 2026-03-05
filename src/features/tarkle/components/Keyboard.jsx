import { KEYBOARD_ROWS } from '../constants/gameConfig'

function displayKeyLabel(key) {
  if (key === 'BACKSPACE') {
    return '⌫'
  }

  return key
}

function mapInputKey(key) {
  if (key === 'BACKSPACE') {
    return 'Backspace'
  }

  if (key === 'ENTER') {
    return 'Enter'
  }

  return key
}

function Keyboard({ onKeyPress, letterStates }) {
  return (
    <div className="tarkle-keyboard" aria-label="On screen keyboard">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div className="tarkle-keyboard-row" key={`keyboard-row-${rowIndex}`}>
          {row.map((key) => {
            const letterState = letterStates[key]

            return (
              <button
                className={`tarkle-key tarkle-key--${letterState ?? 'default'}`}
                key={key}
                onClick={() => onKeyPress(mapInputKey(key))}
                type="button"
              >
                {displayKeyLabel(key)}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default Keyboard
