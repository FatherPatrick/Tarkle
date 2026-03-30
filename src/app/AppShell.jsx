import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import {
  applyDocumentMeta,
  getRouteFromPath,
  isGamePath,
  prefetchLikelyNextRoutes,
} from './routeConfig'
import AppNav from './components/AppNav'
import AppRightRail from './components/AppRightRail'
import SiteBrand from './components/SiteBrand'
import LegalLinks from './components/LegalLinks'
import ConfirmLeaveModal from './components/ConfirmLeaveModal'

function AppShell() {
  const [route, setRoute] = useState(() => getRouteFromPath(window.location.pathname))
  const [hasGameProgress, setHasGameProgress] = useState(false)
  const [pendingNavigation, setPendingNavigation] = useState(null)
  const [isNavOpen, setIsNavOpen] = useState(true)
  const hasGameProgressRef = useRef(false)

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

  useEffect(() => {
    applyDocumentMeta(window.location.pathname)
    prefetchLikelyNextRoutes(window.location.pathname)
  }, [route])

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

  const handleToggleNav = () => {
    setIsNavOpen((prev) => !prev)
  }

  const { view, component: RouteComponent, selectedMode, gameKind } = route
  const currentPath = window.location.pathname
  const isBtrTrackerPath =
    currentPath === '/reference/streets-btr-tracker' ||
    currentPath === '/reference/woods-btr-tracker'

  return (
    <main className={`app-shell app-shell--${view}`}>
      <SiteBrand onNavigate={requestNavigate} />
      <button
        type="button"
        className={`site-nav-toggle${isBtrTrackerPath ? ' site-nav-toggle--btr' : ''}`}
        aria-expanded={isNavOpen}
        aria-controls="site-nav-drawer"
        onClick={handleToggleNav}
        aria-label={isNavOpen ? 'Hide navigation menu' : 'Show navigation menu'}
      >
        <span className="visually-hidden">{isNavOpen ? 'Hide Menu' : 'Show Menu'}</span>
        <span className="site-nav-toggle-lines" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      <div className="app-shell-layout">
        <aside
          id="site-nav-drawer"
          className={`app-shell-sidebar${isNavOpen ? ' app-shell-sidebar--open' : ''}${isBtrTrackerPath ? ' app-shell-sidebar--btr' : ''}`}
        >
          <AppNav currentPath={currentPath} onNavigate={requestNavigate} />
        </aside>

        {!isBtrTrackerPath ? (
          <aside id="site-right-drawer" className="app-shell-rightbar app-shell-rightbar--open">
            <AppRightRail />
          </aside>
        ) : null}

        <div className="app-shell-content">
          <Suspense fallback={<section className="app-route-loading">Loading page...</section>}>
            {view === 'game' && RouteComponent ? (
              <RouteComponent
                mode={selectedMode}
                onBackHome={handleBackHome}
                onHasProgressChange={handleHasProgressChange}
                {...(gameKind === 'ammo'
                  ? { onPlayAmmoUnlimited: () => requestNavigate('/ammo/unlimited') }
                  : { onPlayWeaponUnlimited: () => requestNavigate('/weapon/unlimited') })}
              />
            ) : null}

            {view !== 'game' && RouteComponent ? <RouteComponent /> : null}
          </Suspense>
        </div>
      </div>

      <LegalLinks onNavigate={requestNavigate} variant="floating" />

      <ConfirmLeaveModal
        isOpen={pendingNavigation !== null}
        onCancel={handleCancelLeave}
        onConfirm={handleConfirmLeave}
      />
    </main>
  )
}

export default AppShell
