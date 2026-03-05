import GameHeader from '../features/tarkle/components/GameHeader'
import WeaponGuessBoard from '../features/tarkle/components/WeaponGuessBoard'
import WeaponSearchSelect from '../features/tarkle/components/WeaponSearchSelect'
import { useTarkleGame } from '../features/tarkle/hooks/useTarkleGame'
import '../features/tarkle/Tarkle.css'

function GamePage({ mode, onBackHome }) {
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
    </section>
  )
}

export default GamePage
