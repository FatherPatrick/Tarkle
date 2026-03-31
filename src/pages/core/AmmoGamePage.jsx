import { useEffect, useMemo, useState } from 'react'
import ConfirmLeaveModal from '../../app/components/ConfirmLeaveModal'
import AmmoGuessBoard from '../../features/tarkle/components/AmmoGuessBoard'
import AmmoSearchSelect from '../../features/tarkle/components/AmmoSearchSelect'
import GameHeader from '../../features/tarkle/components/GameHeader'
import GameResultModal from '../../features/tarkle/components/GameResultModal'
import { useAmmoGame } from '../../features/tarkle/hooks/useAmmoGame'
import '../../features/tarkle/Tarkle.css'

const AMMO_EZ_MODE_STORAGE_KEY = 'tarkle-ammo-ez-mode'
const AMMO_NUMERIC_COLUMNS = [
  'damage',
  'penetrationPower',
  'armorDamage',
  'fragmentationChance',
]

function isDirectionalHintMatch(candidateValue, guessValue, directionHint) {
  if (directionHint === 'up') {
    return candidateValue > guessValue
  }

  if (directionHint === 'down') {
    return candidateValue < guessValue
  }

  if (directionHint === 'match') {
    return candidateValue === guessValue
  }

  return true
}

function isCandidatePossible(candidateAmmo, attempt) {
  if (attempt.evaluation.name === 'correct') {
    return candidateAmmo.id === attempt.ammo.id
  }

  if (attempt.evaluation.caliber === 'correct' && candidateAmmo.caliber !== attempt.ammo.caliber) {
    return false
  }

  return AMMO_NUMERIC_COLUMNS.every((columnKey) => {
    const guessValue = attempt.ammo[columnKey]
    const candidateValue = candidateAmmo[columnKey]
    const evaluationState = attempt.evaluation[columnKey]
    const directionHint = attempt.numericHints?.[columnKey]

    if (evaluationState === 'correct' || directionHint === 'match') {
      return candidateValue === guessValue
    }

    if (directionHint === 'up' || directionHint === 'down') {
      return isDirectionalHintMatch(candidateValue, guessValue, directionHint)
    }

    return true
  })
}

function AmmoGamePage({
  mode,
  onBackHome,
  onHasProgressChange,
  onPlayAmmoUnlimited,
}) {
  const {
    attempts,
    guessCount,
    guessesRemaining,
    ammoBank,
    selectedAmmoId,
    setSelectedAmmoId,
    submitGuess,
    canSubmit,
    status,
    message,
    resetGame,
    solution,
    hotStreakDays,
  } = useAmmoGame(mode)

  const isDailyMode = mode === 'ammo-daily'
  const modeTitle = isDailyMode ? 'Ammo Guess Daily' : 'Ammo Guess Unlimited'
  const [isResultDismissed, setIsResultDismissed] = useState(false)
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false)
  const [isEzModeEnabled, setIsEzModeEnabled] = useState(() => {
    try {
      return localStorage.getItem(AMMO_EZ_MODE_STORAGE_KEY) === 'true'
    } catch {
      return false
    }
  })
  const shouldConfirmLeave = status === 'playing' && guessesRemaining <= 5
  const ammoImageEntries = ammoBank
    .filter((ammo) => Boolean(ammo.imageUrl))
    .sort((left, right) => left.shortName.localeCompare(right.shortName))
  const submittedAttempts = useMemo(
    () => attempts.filter((attempt) => !attempt.isEmpty),
    [attempts],
  )
  const possibleAmmoIds = useMemo(() => {
    const possibleIds = ammoBank
      .filter((candidateAmmo) =>
        submittedAttempts.every((attempt) => isCandidatePossible(candidateAmmo, attempt)),
      )
      .map((ammo) => ammo.id)

    return new Set(possibleIds)
  }, [ammoBank, submittedAttempts])
  const orderedAmmoImageEntries = useMemo(() => {
    if (submittedAttempts.length === 0) {
      return ammoImageEntries
    }

    return [...ammoImageEntries].sort((left, right) => {
      const leftIsPossible = possibleAmmoIds.has(left.id)
      const rightIsPossible = possibleAmmoIds.has(right.id)

      if (leftIsPossible !== rightIsPossible) {
        return leftIsPossible ? -1 : 1
      }

      return left.shortName.localeCompare(right.shortName)
    })
  }, [ammoImageEntries, possibleAmmoIds, submittedAttempts])

  const isResultModalOpen = (status === 'won' || status === 'lost') && !isResultDismissed

  useEffect(() => {
    onHasProgressChange(shouldConfirmLeave)
  }, [onHasProgressChange, shouldConfirmLeave])

  useEffect(() => {
    return () => {
      onHasProgressChange(false)
    }
  }, [onHasProgressChange])

  useEffect(() => {
    try {
      localStorage.setItem(AMMO_EZ_MODE_STORAGE_KEY, String(isEzModeEnabled))
    } catch {
      // Ignore storage failures and keep the toggle session-local.
    }
  }, [isEzModeEnabled])

  const handlePlayAgain = () => {
    if (isDailyMode) {
      onPlayAmmoUnlimited()
      return
    }

    setIsResultDismissed(false)
    resetGame()
  }

  const handleRequestReset = () => {
    if (shouldConfirmLeave) {
      setIsResetConfirmOpen(true)
      return
    }

    resetGame()
  }

  const handleConfirmReset = () => {
    setIsResetConfirmOpen(false)
    setIsResultDismissed(false)
    resetGame()
  }

  const handleHome = () => onBackHome()

  return (
    <section className="tarkle">
      <GameHeader
        actionsSlot={
          <label className="tarkle-toggle" htmlFor="ammo-ez-mode-toggle">
            <input
              checked={isEzModeEnabled}
              className="tarkle-toggle-input"
              id="ammo-ez-mode-toggle"
              onChange={(event) => setIsEzModeEnabled(event.target.checked)}
              type="checkbox"
            />
            <span aria-hidden="true" className="tarkle-toggle-track">
              <span className="tarkle-toggle-thumb" />
            </span>
            <span className="tarkle-toggle-label">EZ Mode</span>
          </label>
        }
        message={message}
        onBackHome={onBackHome}
        onReset={handleRequestReset}
        showReset={!isDailyMode}
        status={status}
        title={modeTitle}
        subtitle="Guess the Tarkov ammo by caliber and ballistic stats"
      />

      <div className="weapon-controls">
        <label className="weapon-select-label" htmlFor="ammo-search-input">
          Guess the ammo
        </label>
        <AmmoSearchSelect
          ammoBank={ammoBank}
          disabled={status !== 'playing'}
          inputId="ammo-search-input"
          onSelectAmmo={setSelectedAmmoId}
          selectedAmmoId={selectedAmmoId}
        />
        <button className="weapon-submit" disabled={!canSubmit} onClick={submitGuess} type="button">
          Submit Guess
        </button>
      </div>

      {isEzModeEnabled ? (
        <section className="tarkle-clue" aria-label="Target ammo image">
          <p className="tarkle-clue-label">Target round</p>
          <img alt="Mystery ammo round" className="tarkle-clue-image" src={solution?.imageUrl} />
        </section>
      ) : null}

      <AmmoGuessBoard attempts={attempts} showImages={isEzModeEnabled} />

      {isEzModeEnabled && ammoImageEntries.length > 0 ? (
        <section className="ammo-image-reference" aria-label="All ammo images">
          <h2 className="ammo-image-reference-title">Ammo Image Reference</h2>
          <div className="ammo-image-grid" role="list">
            {orderedAmmoImageEntries.map((ammo) => {
              const isEliminated =
                submittedAttempts.length > 0 && !possibleAmmoIds.has(ammo.id)

              return (
                <div
                  key={ammo.id}
                  aria-label={`${ammo.shortName}${isEliminated ? ' (eliminated)' : ''}`}
                  className={`ammo-image-tile${
                    isEliminated ? ' ammo-image-tile--eliminated' : ''
                  }`}
                  data-name={ammo.shortName}
                  role="listitem"
                  tabIndex={0}
                >
                  <img alt="" className="ammo-image-tile-thumb" src={ammo.imageUrl} />
                </div>
              )
            })}
          </div>
        </section>
      ) : null}

      <section className="game-learn-links" aria-label="Related guides">
        <h2>Improve Ammo Guess Accuracy</h2>
        <p>
          Use these references to speed up caliber deduction and ballistic decision making.
        </p>
        <div className="game-learn-links-grid">
          <a href="/guides/ammo-stats">Ammo Stats Guide</a>
          <a href="/guides/daily-strategy">Daily Strategy Guide</a>
          <a href="/reference/ammo-glossary">Ammo Glossary</a>
          <a href="/reference/how-tarkle-works">How Tarkle Works</a>
        </div>
      </section>

      <GameResultModal
        isOpen={isResultModalOpen}
        onHome={handleHome}
        onPlayAgain={handlePlayAgain}
        onDismiss={() => setIsResultDismissed(true)}
        solutionName={solution?.name || 'Unknown'}
        status={status}
        answerLabel="Correct ammo"
        primaryActionLabel={isDailyMode ? 'Play Unlimited' : 'Play Again'}
        winSummary={`You correctly guessed it in ${guessCount} attempts!`}
        streakSummary={
          isDailyMode && hotStreakDays > 0
            ? `Hot streak: ${hotStreakDays} day${hotStreakDays === 1 ? '' : 's'}`
            : ''
        }
        followUpMessage={
          isDailyMode ? 'Come back tomorrow to play Daily again.' : ''
        }
      />

      <ConfirmLeaveModal
        isOpen={isResetConfirmOpen}
        title="Start A New Game?"
        confirmLabel="Start New Game"
        onCancel={() => setIsResetConfirmOpen(false)}
        onConfirm={handleConfirmReset}
      />
    </section>
  )
}

export default AmmoGamePage
