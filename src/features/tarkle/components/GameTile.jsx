function GameTile({ letter, state }) {
  return <div className={`tarkle-tile tarkle-tile--${state}`}>{letter}</div>
}

export default GameTile
