import { useCallback, useEffect, useRef, useState } from 'react'
import HomePage from '../pages/HomePage'
import GamePage from '../pages/GamePage'
import AmmoGamePage from '../pages/AmmoGamePage'
import PrivacyPage from '../pages/PrivacyPage'
import TermsPage from '../pages/TermsPage'
import SiteBrand from './components/SiteBrand'
import LegalLinks from './components/LegalLinks'
import ConfirmLeaveModal from './components/ConfirmLeaveModal'

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
  const [hasGameProgress, setHasGameProgress] = useState(false)
  const [pendingNavigation, setPendingNavigation] = useState(null)
  const hasGameProgressRef = useRef(false)

  const isGamePath = (path) => path.startsWith('/weapon/') || path.startsWith('/ammo/')

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

  const requestNavigate = (nextPath, options = {}) => {
    const currentPath = window.location.pathname
    const isLeavingActiveGame =
      hasGameProgressRef.current &&
      isGamePath(currentPath) &&
      !isGamePath(nextPath) &&
      currentPath !== nextPath

    if (isLeavingActiveGame) {
      setPendingNavigation({ nextPath, options })
      return
    }

    navigateTo(nextPath, options)
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

  useEffect(() => {
    hasGameProgressRef.current = hasGameProgress
  }, [hasGameProgress])

  useEffect(() => {
    if (route.view !== 'game' && hasGameProgress) {
      setHasGameProgress(false)
    }
  }, [route.view, hasGameProgress])

  const handleHasProgressChange = useCallback((nextHasProgress) => {
    hasGameProgressRef.current = nextHasProgress
    setHasGameProgress(nextHasProgress)
  }, [])

  const handleSelectMode = (mode) => {
    const targetPath = MODE_TO_PATH[mode] || '/'
    requestNavigate(targetPath)
  }

  const handleBackHome = () => {
    requestNavigate('/')
  }

  const handleConfirmLeave = () => {
    if (!pendingNavigation) {
      return
    }

    const { nextPath, options } = pendingNavigation
    setPendingNavigation(null)
    setHasGameProgress(false)
    navigateTo(nextPath, options)
  }

  const handleCancelLeave = () => {
    setPendingNavigation(null)
  }

  const { view, selectedMode } = route

  return (
    <main className={`app-shell app-shell--${view}`}>
      <SiteBrand onGoHome={handleBackHome} />

      {view === 'home' ? (
        <HomePage onSelectMode={handleSelectMode} />
      ) : null}

      {view === 'game' && selectedMode && !selectedMode.startsWith('ammo') ? (
        <GamePage
          mode={selectedMode}
          onBackHome={handleBackHome}
          onHasProgressChange={handleHasProgressChange}
          onPlayWeaponUnlimited={() => requestNavigate('/weapon/unlimited')}
        />
      ) : null}

      {view === 'game' && selectedMode?.startsWith('ammo') ? (
        <AmmoGamePage
          mode={selectedMode}
          onBackHome={handleBackHome}
          onHasProgressChange={handleHasProgressChange}
          onPlayAmmoUnlimited={() => requestNavigate('/ammo/unlimited')}
        />
      ) : null}

      {view === 'privacy' ? <PrivacyPage onBackHome={handleBackHome} /> : null}
      {view === 'terms' ? <TermsPage onBackHome={handleBackHome} /> : null}

      <LegalLinks
        onOpenPrivacy={() => requestNavigate('/privacy')}
        onOpenTerms={() => requestNavigate('/terms')}
      />

      <ConfirmLeaveModal
        isOpen={pendingNavigation !== null}
        onCancel={handleCancelLeave}
        onConfirm={handleConfirmLeave}
      />
    </main>
  )
}

export default AppShell
