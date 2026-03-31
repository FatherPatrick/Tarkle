import { useEffect, useMemo, useState } from 'react'
import ConfirmLeaveModal from '../../app/components/ConfirmLeaveModal'
import GameHeader from '../../features/tarkle/components/GameHeader'
import GameResultModal from '../../features/tarkle/components/GameResultModal'
import WeaponGuessBoard from '../../features/tarkle/components/WeaponGuessBoard'
import WeaponSearchSelect from '../../features/tarkle/components/WeaponSearchSelect'
import { useTarkleGame } from '../../features/tarkle/hooks/useTarkleGame'
import '../../features/tarkle/Tarkle.css'

const WEAPON_EZ_MODE_STORAGE_KEY = 'tarkle-weapon-ez-mode'
const WEAPON_NUMERIC_COLUMNS = ['fireRate']

function hasSharedFireMode(candidateFireModes, guessedFireModes) {
  const guessedSet = new Set(guessedFireModes)
  return candidateFireModes.some((fireMode) => guessedSet.has(fireMode))
}

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

function isCandidateWeaponPossible(candidateWeapon, attempt) {
  if (attempt.evaluation.name === 'correct') {
    return candidateWeapon.id === attempt.weapon.id
  }

  if (
    attempt.evaluation.weaponClass === 'correct' &&
    candidateWeapon.weaponClass !== attempt.weapon.weaponClass
  ) {
    return false
  }

  if (attempt.evaluation.caliber === 'correct' && candidateWeapon.caliber !== attempt.weapon.caliber) {
    return false
  }

  if (attempt.evaluation.fireModes === 'correct') {
    const candidateModes = [...candidateWeapon.fireModes].sort().join('|')
    const guessedModes = [...attempt.weapon.fireModes].sort().join('|')

    if (candidateModes !== guessedModes) {
      return false
    }
  }

  if (
    attempt.evaluation.fireModes === 'close' &&
    !hasSharedFireMode(candidateWeapon.fireModes, attempt.weapon.fireModes)
  ) {
    return false
  }

  if (
    attempt.evaluation.fireModes === 'wrong' &&
    hasSharedFireMode(candidateWeapon.fireModes, attempt.weapon.fireModes)
  ) {
    return false
  }

  return WEAPON_NUMERIC_COLUMNS.every((columnKey) => {
    const guessValue = attempt.weapon[columnKey]
    const candidateValue = candidateWeapon[columnKey]
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

function GamePage({
  mode,
  onBackHome,
  onHasProgressChange,
  onPlayWeaponUnlimited,
}) {
  const {
    attempts,
    guessCount,
    guessesRemaining,
    weaponBank,
    selectedWeaponId,
    setSelectedWeaponId,
    submitGuess,
    canSubmit,
    status,
    message,
    resetGame,
    solution,
    hotStreakDays,
  } = useTarkleGame(mode)

  const isDailyMode = mode === 'daily'
  const modeTitle = isDailyMode ? 'Tarkle Daily' : 'Tarkle Unlimited'
  const [isResultDismissed, setIsResultDismissed] = useState(false)
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false)
  const [isEzModeEnabled, setIsEzModeEnabled] = useState(() => {
    try {
      return localStorage.getItem(WEAPON_EZ_MODE_STORAGE_KEY) === 'true'
    } catch {
      return false
    }
  })
  const isResultModalOpen = (status === 'won' || status === 'lost') && !isResultDismissed
  const shouldConfirmLeave = status === 'playing' && guessesRemaining <= 5
  const weaponImageEntries = useMemo(
    () =>
      weaponBank
        .filter((weapon) => Boolean(weapon.imageUrl))
        .sort((left, right) => (left.shortName || left.name).localeCompare(right.shortName || right.name)),
    [weaponBank],
  )
  const submittedAttempts = useMemo(
    () => attempts.filter((attempt) => !attempt.isEmpty),
    [attempts],
  )
  const possibleWeaponIds = useMemo(() => {
    const possibleIds = weaponBank
      .filter((candidateWeapon) =>
        submittedAttempts.every((attempt) => isCandidateWeaponPossible(candidateWeapon, attempt)),
      )
      .map((weapon) => weapon.id)

    return new Set(possibleIds)
  }, [weaponBank, submittedAttempts])
  const orderedWeaponImageEntries = useMemo(() => {
    if (submittedAttempts.length === 0) {
      return weaponImageEntries
    }

    return [...weaponImageEntries].sort((left, right) => {
      const leftIsPossible = possibleWeaponIds.has(left.id)
      const rightIsPossible = possibleWeaponIds.has(right.id)

      if (leftIsPossible !== rightIsPossible) {
        return leftIsPossible ? -1 : 1
      }

      return (left.shortName || left.name).localeCompare(right.shortName || right.name)
    })
  }, [weaponImageEntries, possibleWeaponIds, submittedAttempts])

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
      localStorage.setItem(WEAPON_EZ_MODE_STORAGE_KEY, String(isEzModeEnabled))
    } catch {
      // Ignore storage failures and keep the toggle session-local.
    }
  }, [isEzModeEnabled])

  const handlePlayAgain = () => {
    if (isDailyMode) {
      onPlayWeaponUnlimited()
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
          <label className="tarkle-toggle" htmlFor="weapon-ez-mode-toggle">
            <input
              checked={isEzModeEnabled}
              className="tarkle-toggle-input"
              id="weapon-ez-mode-toggle"
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
        subtitle="Guess the Tarkov weapon by stat similarity"
      />

      <div className="weapon-controls">
        <label className="weapon-select-label" htmlFor="weapon-search-input">
          Guess a weapon
        </label>
        <WeaponSearchSelect
          disabled={status !== 'playing'}
          inputId="weapon-search-input"
          onSelectWeapon={setSelectedWeaponId}
          selectedWeaponId={selectedWeaponId}
          showImages={isEzModeEnabled}
          weapons={weaponBank}
        />
        <button
          className="weapon-submit"
          disabled={!canSubmit}
          onClick={submitGuess}
          type="button"
        >
          Submit Guess
        </button>
      </div>

      {isEzModeEnabled ? (
        <section className="tarkle-clue" aria-label="Target weapon image">
          <p className="tarkle-clue-label">Target weapon</p>
          <img alt="Mystery weapon" className="tarkle-clue-image" src={solution?.imageUrl} />
        </section>
      ) : null}

      <WeaponGuessBoard attempts={attempts} showImages={isEzModeEnabled} />

      {isEzModeEnabled && weaponImageEntries.length > 0 ? (
        <section className="ammo-image-reference" aria-label="All weapon images">
          <h2 className="ammo-image-reference-title">Weapon Image Reference</h2>
          <div className="ammo-image-grid" role="list">
            {orderedWeaponImageEntries.map((weapon) => {
              const isEliminated =
                submittedAttempts.length > 0 && !possibleWeaponIds.has(weapon.id)

              return (
                <div
                  key={weapon.id}
                  aria-label={`${weapon.shortName || weapon.name}${isEliminated ? ' (eliminated)' : ''}`}
                  className={`ammo-image-tile${
                    isEliminated ? ' ammo-image-tile--eliminated' : ''
                  }`}
                  data-name={weapon.shortName || weapon.name}
                  role="listitem"
                  tabIndex={0}
                >
                  <img alt="" className="ammo-image-tile-thumb" src={weapon.imageUrl} />
                </div>
              )
            })}
          </div>
        </section>
      ) : null}

      <section className="game-learn-links" aria-label="Related guides">
        <h2>Improve Weapon Guess Accuracy</h2>
        <p>
          Learn weapon roles and faster daily deduction with these supporting references.
        </p>
        <div className="game-learn-links-grid">
          <a href="/guides/weapon-family">Weapon Family Guide</a>
          <a href="/guides/daily-strategy">Daily Strategy Guide</a>
          <a href="/reference/weapon-stats-glossary">Weapon Stats Glossary</a>
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
        answerLabel="Correct weapon"
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

export default GamePage
