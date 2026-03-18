import { useCallback, useEffect, useRef, useState } from 'react'
import HomePage from '../pages/HomePage'
import GamePage from '../pages/GamePage'
import AmmoGamePage from '../pages/AmmoGamePage'
import AmmoStatsGuidePage from '../pages/AmmoStatsGuidePage'
import WeaponFamilyGuidePage from '../pages/WeaponFamilyGuidePage'
import BeginnerProgressionGuidePage from '../pages/BeginnerProgressionGuidePage'
import DailyStrategyGuidePage from '../pages/DailyStrategyGuidePage'
import PatchImpactNotesPage from '../pages/PatchImpactNotesPage'
import FaqPage from '../pages/FaqPage'
import AmmoGlossaryPage from '../pages/AmmoGlossaryPage'
import WeaponStatsGlossaryPage from '../pages/WeaponStatsGlossaryPage'
import HowTarkleWorksPage from '../pages/HowTarkleWorksPage'
import DataTransparencyPage from '../pages/DataTransparencyPage'
import PrivacyPage from '../pages/PrivacyPage'
import TermsPage from '../pages/TermsPage'
import SiteBrand from './components/SiteBrand'
import LegalLinks from './components/LegalLinks'
import ConfirmLeaveModal from './components/ConfirmLeaveModal'

const GUIDE_TO_PATH = {
  'ammo-stats': '/guides/ammo-stats',
  'weapon-family': '/guides/weapon-family',
  'beginner-progression': '/guides/beginner-progression',
  'daily-strategy': '/guides/daily-strategy',
  'patch-impact': '/guides/patch-impact',
  faq: '/guides/faq',
  'ammo-glossary': '/reference/ammo-glossary',
  'weapon-stats-glossary': '/reference/weapon-stats-glossary',
  'how-tarkle-works': '/reference/how-tarkle-works',
  'data-transparency': '/reference/data-transparency',
}

const PATH_TO_GUIDE = Object.entries(GUIDE_TO_PATH).reduce((acc, [guideKey, path]) => {
  acc[path] = guideKey
  return acc
}, {})

function getRouteFromPath(pathname) {
  if (PATH_TO_GUIDE[pathname]) {
    return { view: 'content', selectedMode: null, guideKey: PATH_TO_GUIDE[pathname] }
  }

  if (pathname === '/privacy') {
    return { view: 'privacy', selectedMode: null, guideKey: null }
  }

  if (pathname === '/terms') {
    return { view: 'terms', selectedMode: null, guideKey: null }
  }

  if (pathname === '/weapon/daily') {
    return { view: 'game', selectedMode: 'daily', guideKey: null }
  }

  if (pathname === '/weapon/unlimited') {
    return { view: 'game', selectedMode: 'unlimited', guideKey: null }
  }

  if (pathname === '/ammo/daily') {
    return { view: 'game', selectedMode: 'ammo-daily', guideKey: null }
  }

  if (pathname === '/ammo/unlimited') {
    return { view: 'game', selectedMode: 'ammo-unlimited', guideKey: null }
  }

  return { view: 'home', selectedMode: null, guideKey: null }
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

  const { view, selectedMode, guideKey } = route

  return (
    <main className={`app-shell app-shell--${view}`}>
      <SiteBrand />

      {view === 'home' ? (
        <HomePage />
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

      {view === 'content' && guideKey === 'ammo-stats' ? (
        <AmmoStatsGuidePage onBackHome={handleBackHome} />
      ) : null}

      {view === 'content' && guideKey === 'weapon-family' ? (
        <WeaponFamilyGuidePage onBackHome={handleBackHome} />
      ) : null}

      {view === 'content' && guideKey === 'beginner-progression' ? (
        <BeginnerProgressionGuidePage onBackHome={handleBackHome} />
      ) : null}

      {view === 'content' && guideKey === 'daily-strategy' ? (
        <DailyStrategyGuidePage onBackHome={handleBackHome} />
      ) : null}

      {view === 'content' && guideKey === 'patch-impact' ? (
        <PatchImpactNotesPage onBackHome={handleBackHome} />
      ) : null}

      {view === 'content' && guideKey === 'faq' ? (
        <FaqPage onBackHome={handleBackHome} />
      ) : null}

      {view === 'content' && guideKey === 'ammo-glossary' ? (
        <AmmoGlossaryPage onBackHome={handleBackHome} />
      ) : null}

      {view === 'content' && guideKey === 'weapon-stats-glossary' ? (
        <WeaponStatsGlossaryPage onBackHome={handleBackHome} />
      ) : null}

      {view === 'content' && guideKey === 'how-tarkle-works' ? (
        <HowTarkleWorksPage onBackHome={handleBackHome} />
      ) : null}

      {view === 'content' && guideKey === 'data-transparency' ? (
        <DataTransparencyPage onBackHome={handleBackHome} />
      ) : null}

      <LegalLinks />

      <ConfirmLeaveModal
        isOpen={pendingNavigation !== null}
        onCancel={handleCancelLeave}
        onConfirm={handleConfirmLeave}
      />
    </main>
  )
}

export default AppShell
