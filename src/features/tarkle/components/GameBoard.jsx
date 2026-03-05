import GameTile from './GameTile'

function GameBoard({ rows }) {
  return (
    <div className="tarkle-board" aria-label="Tarkle game board">
      {rows.map((row, rowIndex) => (
        <div className="tarkle-row" key={`row-${rowIndex}`}>
          {row.letters.map((letter, letterIndex) => (
            <GameTile
              key={`tile-${rowIndex}-${letterIndex}`}
              letter={letter}
              state={row.states[letterIndex]}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default GameBoard
