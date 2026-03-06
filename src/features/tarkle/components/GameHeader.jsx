function GameHeader({
  status,
  message,
  onReset,
  onBackHome,
  showReset,
  subtitle = 'Guess the Tarkov weapon by stat similarity',
}) {
  return (
    <header className="tarkle-header">
      <h1 className="tarkle-title">
        <button className="tarkle-title-button" onClick={onBackHome} type="button">
          Tarkle
        </button>
      </h1>
      <p className="tarkle-subtitle">{subtitle}</p>
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
