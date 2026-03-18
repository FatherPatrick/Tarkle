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
import AboutPage from '../pages/AboutPage'
import ContactPage from '../pages/ContactPage'
import EditorialPolicyPage from '../pages/EditorialPolicyPage'
import PrivacyPage from '../pages/PrivacyPage'
import TermsPage from '../pages/TermsPage'
import SiteBrand from './components/SiteBrand'
import LegalLinks from './components/LegalLinks'
import ConfirmLeaveModal from './components/ConfirmLeaveModal'

const PATH_TO_META = {
  '/': {
    title: 'Tarkle - Tarkov Weapon and Ammo Guessing Game',
    description:
      'Play Tarkle daily and unlimited modes, then level up with guides, glossaries, and strategy references for Tarkov weapon and ammo knowledge.',
  },
  '/weapon/daily': {
    title: 'Tarkle Daily Weapon Guess',
    description:
      'Play the daily Tarkle weapon challenge and identify the hidden weapon using stat-based feedback.',
  },
  '/weapon/unlimited': {
    title: 'Tarkle Unlimited Weapon Guess',
    description:
      'Practice unlimited Tarkle weapon rounds and improve your stat-comparison guessing strategy.',
  },
  '/ammo/daily': {
    title: 'Tarkle Daily Ammo Guess',
    description:
      'Play the daily Tarkle ammo challenge and find the hidden round by caliber and ballistic clues.',
  },
  '/ammo/unlimited': {
    title: 'Tarkle Unlimited Ammo Guess',
    description:
      'Practice unlimited Tarkle ammo rounds and sharpen caliber, penetration, and damage pattern recognition.',
  },
  '/guides/ammo-stats': {
    title: 'Ammo Stats Guide - Tarkle',
    description:
      'Learn ammo damage, penetration power, armor damage, fragmentation, and projectile behavior in plain language.',
  },
  '/guides/weapon-family': {
    title: 'Weapon Family Guide - Tarkle',
    description:
      'Understand AR, SMG, DMR, and shotgun roles to improve guess quality and loadout decisions.',
  },
  '/guides/beginner-progression': {
    title: 'Beginner Progression Guide - Tarkle',
    description:
      'Build sustainable beginner habits for Tarkov-style ammo and weapon decision making.',
  },
  '/guides/daily-strategy': {
    title: 'Daily Strategy Guide - Tarkle',
    description:
      'Use information-driven guess sequencing to improve daily streak consistency in Tarkle.',
  },
  '/guides/patch-impact': {
    title: 'Patch Impact Notes - Tarkle',
    description:
      'Learn how patches change weapon and ammo patterns and how to adapt your strategy quickly.',
  },
  '/guides/faq': {
    title: 'Tarkle FAQ',
    description:
      'Find answers to common Tarkle questions about modes, data, strategy, and site behavior.',
  },
  '/reference/ammo-glossary': {
    title: 'Ammo Glossary - Tarkle',
    description:
      'Plain-language definitions of core ammo terms used in Tarkle and Tarkov-style analysis.',
  },
  '/reference/weapon-stats-glossary': {
    title: 'Weapon Stats Glossary - Tarkle',
    description:
      'Quick definitions for recoil, ergonomics, and key weapon stat concepts.',
  },
  '/reference/how-tarkle-works': {
    title: 'How Tarkle Works',
    description:
      'See Tarkle rules, scoring interpretation, and practical examples for weapon and ammo rounds.',
  },
  '/reference/data-transparency': {
    title: 'Data Source Transparency - Tarkle',
    description:
      'Understand where Tarkle data comes from, how it is normalized, and what limitations exist.',
  },
  '/about': {
    title: 'About Tarkle',
    description:
      'Read the Tarkle mission, maintenance approach, and long-term content direction.',
  },
  '/contact': {
    title: 'Contact Tarkle',
    description:
      'Report data issues, suggest improvements, and contact the Tarkle maintainer.',
  },
  '/editorial-policy': {
    title: 'Editorial Policy - Tarkle',
    description:
      'Review Tarkle update standards, correction workflow, and editorial principles.',
  },
  '/privacy': {
    title: 'Privacy Policy - Tarkle',
    description:
      'Read how Tarkle handles browser storage, cookies, and ad-related data practices.',
  },
  '/terms': {
    title: 'Terms of Use - Tarkle',
    description:
      'Review Tarkle terms of use, limitations, and service expectations.',
  },
}

const SITE_ORIGIN = 'https://tarkovle.vercel.app'

function applyDocumentMeta(pathname) {
  const fallback = PATH_TO_META['/']
  const meta = PATH_TO_META[pathname] || fallback
  document.title = meta.title

  let descriptionTag = document.querySelector('meta[name="description"]')
  if (!descriptionTag) {
    descriptionTag = document.createElement('meta')
    descriptionTag.setAttribute('name', 'description')
    document.head.appendChild(descriptionTag)
  }

  descriptionTag.setAttribute('content', meta.description)

  let canonicalTag = document.querySelector('link[rel="canonical"]')
  if (!canonicalTag) {
    canonicalTag = document.createElement('link')
    canonicalTag.setAttribute('rel', 'canonical')
    document.head.appendChild(canonicalTag)
  }

  canonicalTag.setAttribute('href', `${SITE_ORIGIN}${pathname}`)
}

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
  about: '/about',
  contact: '/contact',
  'editorial-policy': '/editorial-policy',
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

  useEffect(() => {
    applyDocumentMeta(window.location.pathname)
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

      {view === 'privacy' ? <PrivacyPage /> : null}
      {view === 'terms' ? <TermsPage /> : null}

      {view === 'content' && guideKey === 'ammo-stats' ? (
        <AmmoStatsGuidePage />
      ) : null}

      {view === 'content' && guideKey === 'weapon-family' ? (
        <WeaponFamilyGuidePage />
      ) : null}

      {view === 'content' && guideKey === 'beginner-progression' ? (
        <BeginnerProgressionGuidePage />
      ) : null}

      {view === 'content' && guideKey === 'daily-strategy' ? (
        <DailyStrategyGuidePage />
      ) : null}

      {view === 'content' && guideKey === 'patch-impact' ? (
        <PatchImpactNotesPage />
      ) : null}

      {view === 'content' && guideKey === 'faq' ? (
        <FaqPage />
      ) : null}

      {view === 'content' && guideKey === 'ammo-glossary' ? (
        <AmmoGlossaryPage />
      ) : null}

      {view === 'content' && guideKey === 'weapon-stats-glossary' ? (
        <WeaponStatsGlossaryPage />
      ) : null}

      {view === 'content' && guideKey === 'how-tarkle-works' ? (
        <HowTarkleWorksPage />
      ) : null}

      {view === 'content' && guideKey === 'data-transparency' ? (
        <DataTransparencyPage />
      ) : null}

      {view === 'content' && guideKey === 'about' ? (
        <AboutPage />
      ) : null}

      {view === 'content' && guideKey === 'contact' ? (
        <ContactPage />
      ) : null}

      {view === 'content' && guideKey === 'editorial-policy' ? (
        <EditorialPolicyPage />
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
