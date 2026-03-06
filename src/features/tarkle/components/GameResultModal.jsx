function GameResultModal({
  isOpen,
  status,
  solutionName,
  onHome,
  onPlayAgain,
  onDismiss,
  answerLabel = 'Correct answer',
  primaryActionLabel = 'Play Again',
  followUpMessage = '',
  winSummary = '',
}) {
  if (!isOpen) {
    return null
  }

  const didWin = status === 'won'
  const title = didWin ? 'You got it!' : 'Round over'
  const sparkleIndexes = [0, 1, 2, 3, 4, 5, 6]

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onDismiss?.()
    }
  }

  return (
    <div className="result-modal-backdrop" onClick={handleBackdropClick} role="presentation">
      <div aria-modal="true" className="result-modal" role="dialog">
        {didWin ? (
          <div aria-hidden="true" className="result-modal-sparkles">
            {sparkleIndexes.map((index) => (
              <span className={`result-sparkle result-sparkle--${index + 1}`} key={`sparkle-${index}`}>
                *
              </span>
            ))}
          </div>
        ) : null}
        <h2 className="result-modal-title">{title}</h2>
        <p className="result-modal-text">
          {answerLabel}: {solutionName}
        </p>
        {didWin && winSummary ? <p className="result-modal-text">{winSummary}</p> : null}
        {followUpMessage ? <p className="result-modal-note">{followUpMessage}</p> : null}
        <div className="result-modal-actions">
          <button className="result-modal-button" onClick={onHome} type="button">
            Home
          </button>
          <button className="result-modal-button result-modal-button--primary" onClick={onPlayAgain} type="button">
            {primaryActionLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export default GameResultModal