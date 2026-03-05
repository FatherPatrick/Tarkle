function GameHeader({ status, message, onReset, onBackHome, showReset }) {
  return (
    <header className="tarkle-header">
      <h1 className="tarkle-title">Tarkle</h1>
      <p className="tarkle-subtitle">Guess the Tarkov weapon by stat similarity</p>
      <p className={`tarkle-status tarkle-status--${status}`}>{message}</p>
      <div className="tarkle-header-actions">
        <button className="tarkle-reset" type="button" onClick={onBackHome}>
          Back Home
        </button>
        {showReset ? (
          <button className="tarkle-reset" type="button" onClick={onReset}>
            New Game
          </button>
        ) : null}
      </div>
    </header>
  )
}

export default GameHeader
