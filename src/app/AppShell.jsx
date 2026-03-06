import { useEffect, useState } from 'react'
import HomePage from '../pages/HomePage'
import GamePage from '../pages/GamePage'
import AmmoGamePage from '../pages/AmmoGamePage'
import PrivacyPage from '../pages/PrivacyPage'
import TermsPage from '../pages/TermsPage'

const MODE_TO_PATH = {
  daily: '/weapon/daily',
  unlimited: '/weapon/unlimited',
  'ammo-daily': '/ammo/daily',
  'ammo-unlimited': '/ammo/unlimited',
}

function getRouteFromPath(pathname) {
  if (pathname === '/privacy') {
    return { view: 'privacy', selectedMode: null }
  }

  if (pathname === '/terms') {
    return { view: 'terms', selectedMode: null }
  }

  if (pathname === '/weapon/daily') {
    return { view: 'game', selectedMode: 'daily' }
  }

  if (pathname === '/weapon/unlimited') {
    return { view: 'game', selectedMode: 'unlimited' }
  }

  if (pathname === '/ammo/daily') {
    return { view: 'game', selectedMode: 'ammo-daily' }
  }

  if (pathname === '/ammo/unlimited') {
    return { view: 'game', selectedMode: 'ammo-unlimited' }
  }

  return { view: 'home', selectedMode: null }
}

function AppShell() {
  const [route, setRoute] = useState(() => getRouteFromPath(window.location.pathname))

  const navigateTo = (nextPath, options = {}) => {
    const shouldReplace = options.replace === true

    if (window.location.pathname !== nextPath) {
      if (shouldReplace) {
        window.history.replaceState({}, '', nextPath)
      } else {
        window.history.pushState({}, '', nextPath)
      }
    }

    setRoute(getRouteFromPath(nextPath))
  }

  useEffect(() => {
    function handlePopState() {
      setRoute(getRouteFromPath(window.location.pathname))
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  const handleSelectMode = (mode) => {
    const targetPath = MODE_TO_PATH[mode] || '/'
    navigateTo(targetPath)
  }

  const handleBackHome = () => {
    navigateTo('/')
  }

  const { view, selectedMode } = route

  return (
    <main className="app-shell">
      {view === 'home' ? (
        <HomePage
          onOpenPrivacy={() => navigateTo('/privacy')}
          onOpenTerms={() => navigateTo('/terms')}
          onSelectMode={handleSelectMode}
        />
      ) : null}

      {view === 'game' && selectedMode && !selectedMode.startsWith('ammo') ? (
        <GamePage
          mode={selectedMode}
          onBackHome={handleBackHome}
          onPlayWeaponUnlimited={() => navigateTo('/weapon/unlimited')}
          onOpenPrivacy={() => navigateTo('/privacy')}
          onOpenTerms={() => navigateTo('/terms')}
        />
      ) : null}

      {view === 'game' && selectedMode?.startsWith('ammo') ? (
        <AmmoGamePage
          mode={selectedMode}
          onBackHome={handleBackHome}
          onPlayAmmoUnlimited={() => navigateTo('/ammo/unlimited')}
          onOpenPrivacy={() => navigateTo('/privacy')}
          onOpenTerms={() => navigateTo('/terms')}
        />
      ) : null}

      {view === 'privacy' ? <PrivacyPage onBackHome={handleBackHome} /> : null}
      {view === 'terms' ? <TermsPage onBackHome={handleBackHome} /> : null}
    </main>
  )
}

export default AppShell
