import { useEffect, useState } from 'react'
import AdSlot from '../features/ads/AdSlot'
import ConfirmLeaveModal from '../app/components/ConfirmLeaveModal'
import AmmoGuessBoard from '../features/tarkle/components/AmmoGuessBoard'
import AmmoSearchSelect from '../features/tarkle/components/AmmoSearchSelect'
import GameHeader from '../features/tarkle/components/GameHeader'
import GameResultModal from '../features/tarkle/components/GameResultModal'
import { useAmmoGame } from '../features/tarkle/hooks/useAmmoGame'
import '../features/tarkle/Tarkle.css'

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
  const shouldConfirmLeave = status === 'playing' && guessesRemaining <= 5

  const isResultModalOpen = (status === 'won' || status === 'lost') && !isResultDismissed

  useEffect(() => {
    onHasProgressChange(shouldConfirmLeave)
  }, [onHasProgressChange, shouldConfirmLeave])

  useEffect(() => {
    return () => {
      onHasProgressChange(false)
    }
  }, [onHasProgressChange])

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
      <AdSlot label="Advertisement" minHeight={120} slot="1000000002" />

      <GameHeader
        message={message}
        onBackHome={onBackHome}
        onReset={handleRequestReset}
        showReset={!isDailyMode}
        status={status}
        title={modeTitle}
        subtitle="Guess the Tarkov ammo by caliber and ballistic stats"
      />

      <section className="ammo-clue" aria-label="Target ammo image">
        <p className="ammo-clue-label">Target round</p>
        <img alt="Mystery ammo round" className="ammo-clue-image" src={solution?.imageUrl} />
      </section>

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

      <AmmoGuessBoard attempts={attempts} />

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
