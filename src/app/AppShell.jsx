import { useState } from 'react'
import HomePage from '../pages/HomePage'
import GamePage from '../pages/GamePage'

function AppShell() {
  const [selectedMode, setSelectedMode] = useState(null)

  return (
    <main className="app-shell">
      {selectedMode ? (
        <GamePage mode={selectedMode} onBackHome={() => setSelectedMode(null)} />
      ) : (
        <HomePage onSelectMode={setSelectedMode} />
      )}
    </main>
  )
}

export default AppShell
