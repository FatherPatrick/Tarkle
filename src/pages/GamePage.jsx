import AdSlot from '../features/ads/AdSlot'
import GameHeader from '../features/tarkle/components/GameHeader'
import WeaponGuessBoard from '../features/tarkle/components/WeaponGuessBoard'
import WeaponSearchSelect from '../features/tarkle/components/WeaponSearchSelect'
import { useTarkleGame } from '../features/tarkle/hooks/useTarkleGame'
import '../features/tarkle/Tarkle.css'

function GamePage({ mode, onBackHome, onOpenPrivacy, onOpenTerms }) {
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
  } = useTarkleGame(mode)

  const isDailyMode = mode === 'daily'

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
    </section>
  )
}

export default GamePage
