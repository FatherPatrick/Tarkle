import { useState } from 'react'
import HomePage from '../pages/HomePage'
import GamePage from '../pages/GamePage'
import PrivacyPage from '../pages/PrivacyPage'
import TermsPage from '../pages/TermsPage'

function AppShell() {
  const [view, setView] = useState('home')
  const [selectedMode, setSelectedMode] = useState(null)

  const handleSelectMode = (mode) => {
    setSelectedMode(mode)
    setView('game')
  }

  const handleBackHome = () => {
    setView('home')
    setSelectedMode(null)
  }

  return (
    <main className="app-shell">
      {view === 'home' ? (
        <HomePage
          onOpenPrivacy={() => setView('privacy')}
          onOpenTerms={() => setView('terms')}
          onSelectMode={handleSelectMode}
        />
      ) : null}

      {view === 'game' && selectedMode ? (
        <GamePage
          mode={selectedMode}
          onBackHome={handleBackHome}
          onOpenPrivacy={() => setView('privacy')}
          onOpenTerms={() => setView('terms')}
        />
      ) : null}

      {view === 'privacy' ? <PrivacyPage onBackHome={handleBackHome} /> : null}
      {view === 'terms' ? <TermsPage onBackHome={handleBackHome} /> : null}
    </main>
  )
}

export default AppShell
