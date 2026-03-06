import { useState } from 'react'
import AdSlot from '../features/ads/AdSlot'
import AmmoGuessBoard from '../features/tarkle/components/AmmoGuessBoard'
import AmmoSearchSelect from '../features/tarkle/components/AmmoSearchSelect'
import GameHeader from '../features/tarkle/components/GameHeader'
import GameResultModal from '../features/tarkle/components/GameResultModal'
import { useAmmoGame } from '../features/tarkle/hooks/useAmmoGame'
import '../features/tarkle/Tarkle.css'

function AmmoGamePage({
  mode,
  onBackHome,
  onOpenPrivacy,
  onOpenTerms,
  onPlayAmmoUnlimited,
}) {
  const {
    attempts,
    ammoBank,
    selectedAmmoId,
    setSelectedAmmoId,
    submitGuess,
    canSubmit,
    status,
    message,
    resetGame,
    solution,
  } = useAmmoGame(mode)

  const isDailyMode = mode === 'ammo-daily'
  const [isResultDismissed, setIsResultDismissed] = useState(false)
  const guessCount = attempts.filter((attempt) => !attempt.isEmpty).length

  const isResultModalOpen = (status === 'won' || status === 'lost') && !isResultDismissed

  const handlePlayAgain = () => {
    if (isDailyMode) {
      onPlayAmmoUnlimited()
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
        answerLabel="Correct ammo"
        primaryActionLabel={isDailyMode ? 'Play Unlimited' : 'Play Again'}
        winSummary={`You correctly guessed it in ${guessCount} attempts!`}
        followUpMessage={
          isDailyMode ? 'Come back tomorrow to play Daily again.' : ''
        }
      />
    </section>
  )
}

export default AmmoGamePage
