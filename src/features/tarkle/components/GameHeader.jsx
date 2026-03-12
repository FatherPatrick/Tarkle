function GameHeader({
  status,
  message,
  onReset,
  onBackHome,
  showReset,
  title,
  subtitle,
}) {
  return (
    <header className="tarkle-header">
      <h1 className="tarkle-page-title">{title}</h1>
      {subtitle ? <p className="tarkle-subtitle">{subtitle}</p> : null}
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
