import { useEffect, useState } from 'react'
import AdSlot from '../features/ads/AdSlot'
import ConfirmLeaveModal from '../app/components/ConfirmLeaveModal'
import GameHeader from '../features/tarkle/components/GameHeader'
import GameResultModal from '../features/tarkle/components/GameResultModal'
import WeaponGuessBoard from '../features/tarkle/components/WeaponGuessBoard'
import WeaponSearchSelect from '../features/tarkle/components/WeaponSearchSelect'
import { useTarkleGame } from '../features/tarkle/hooks/useTarkleGame'
import '../features/tarkle/Tarkle.css'

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
  const isResultModalOpen = (status === 'won' || status === 'lost') && !isResultDismissed
  const shouldConfirmLeave = status === 'playing' && guessesRemaining <= 5

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
      <AdSlot label="Advertisement" minHeight={120} slot="1000000002" />

      <GameHeader
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

      <WeaponGuessBoard attempts={attempts} />

      <AdSlot label="Advertisement" minHeight={120} slot="1000000003" />

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
