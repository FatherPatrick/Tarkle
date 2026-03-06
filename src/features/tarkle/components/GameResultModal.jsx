function GameResultModal({
  isOpen,
  status,
  solutionName,
  onHome,
  onPlayAgain,
  answerLabel = 'Correct answer',
}) {
  if (!isOpen) {
    return null
  }

  const didWin = status === 'won'
  const title = didWin ? 'You got it!' : 'Round over'
  const sparkleIndexes = [0, 1, 2, 3, 4, 5, 6]

  return (
    <div className="result-modal-backdrop" role="presentation">
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
        <div className="result-modal-actions">
          <button className="result-modal-button" onClick={onHome} type="button">
            Home
          </button>
          <button className="result-modal-button result-modal-button--primary" onClick={onPlayAgain} type="button">
            Play Again
          </button>
        </div>
      </div>
    </div>
  )
}

export default GameResultModal