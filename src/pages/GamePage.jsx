import { useState } from 'react'
import AdSlot from '../features/ads/AdSlot'
import GameHeader from '../features/tarkle/components/GameHeader'
import GameResultModal from '../features/tarkle/components/GameResultModal'
import WeaponGuessBoard from '../features/tarkle/components/WeaponGuessBoard'
import WeaponSearchSelect from '../features/tarkle/components/WeaponSearchSelect'
import { useTarkleGame } from '../features/tarkle/hooks/useTarkleGame'
import '../features/tarkle/Tarkle.css'

function GamePage({
  mode,
  onBackHome,
  onOpenPrivacy,
  onOpenTerms,
  onPlayWeaponUnlimited,
}) {
  const {
    attempts,
    weaponBank,
    selectedWeaponId,
    setSelectedWeaponId,
    submitGuess,
    canSubmit,
    status,
    message,
    resetGame,
    solution,
  } = useTarkleGame(mode)

  const isDailyMode = mode === 'daily'
  const [isResultDismissed, setIsResultDismissed] = useState(false)
  const isResultModalOpen = (status === 'won' || status === 'lost') && !isResultDismissed
  const guessCount = attempts.filter((attempt) => !attempt.isEmpty).length

  const handlePlayAgain = () => {
    if (isDailyMode) {
      onPlayWeaponUnlimited()
      return
    }

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
        onReset={resetGame}
        showReset={!isDailyMode}
        status={status}
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

      <footer className="site-footer-links">
        <button onClick={onOpenPrivacy} type="button">
          Privacy
        </button>
        <button onClick={onOpenTerms} type="button">
          Terms
        </button>
      </footer>

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
        followUpMessage={
          isDailyMode ? 'Come back tomorrow to play Daily again.' : ''
        }
      />
    </section>
  )
}

export default GamePage
