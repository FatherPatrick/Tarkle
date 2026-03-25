import { lazy } from 'react'
import AmmoGamePage from '../pages/core/AmmoGamePage'
import GamePage from '../pages/core/GamePage'
import HomePage from '../pages/core/HomePage'

const AboutPage = lazy(() => import('../pages/core/AboutPage'))
const ContactPage = lazy(() => import('../pages/core/ContactPage'))
const AmmoStatsGuidePage = lazy(() => import('../pages/guides/AmmoStatsGuidePage'))
const BeginnerProgressionGuidePage = lazy(() => import('../pages/guides/BeginnerProgressionGuidePage'))
const DailyStrategyGuidePage = lazy(() => import('../pages/guides/DailyStrategyGuidePage'))
const FaqPage = lazy(() => import('../pages/guides/FaqPage'))
const PatchImpactNotesPage = lazy(() => import('../pages/guides/PatchImpactNotesPage'))
const WeaponFamilyGuidePage = lazy(() => import('../pages/guides/WeaponFamilyGuidePage'))
const EditorialPolicyPage = lazy(() => import('../pages/legal/EditorialPolicyPage'))
const PrivacyPage = lazy(() => import('../pages/legal/PrivacyPage'))
const TermsPage = lazy(() => import('../pages/legal/TermsPage'))
const AmmoGlossaryPage = lazy(() => import('../pages/reference/AmmoGlossaryPage'))
const DataTransparencyPage = lazy(() => import('../pages/reference/DataTransparencyPage'))
const HowTarkleWorksPage = lazy(() => import('../pages/reference/HowTarkleWorksPage'))
const StreetsBtrTrackerPage = lazy(() => import('../pages/reference/StreetsBtrTrackerPage'))
const WeaponStatsGlossaryPage = lazy(() => import('../pages/reference/WeaponStatsGlossaryPage'))
const WoodsBtrTrackerPage = lazy(() => import('../pages/reference/WoodsBtrTrackerPage'))

const SITE_ORIGIN = 'https://tarkovle.vercel.app'
const VALID_VIEWS = new Set(['home', 'game', 'static'])
const VALID_GAME_KINDS = new Set(['weapon', 'ammo'])
const prefetchedPaths = new Set()

const ROUTE_CONFIG = {
  '/': {
    view: 'home',
    component: HomePage,
    title: 'Tarkle - Tarkov Weapon and Ammo Guessing Game',
    description:
      'Play Tarkle daily and unlimited modes, then level up with guides, glossaries, and strategy references for Tarkov weapon and ammo knowledge.',
  },
  '/weapon/daily': {
    view: 'game',
    component: GamePage,
    selectedMode: 'daily',
    gameKind: 'weapon',
    title: 'Tarkle Daily Weapon Guess',
    description:
      'Play the daily Tarkle weapon challenge and identify the hidden weapon using stat-based feedback.',
  },
  '/weapon/unlimited': {
    view: 'game',
    component: GamePage,
    selectedMode: 'unlimited',
    gameKind: 'weapon',
    title: 'Tarkle Unlimited Weapon Guess',
    description:
      'Practice unlimited Tarkle weapon rounds and improve your stat-comparison guessing strategy.',
  },
  '/ammo/daily': {
    view: 'game',
    component: AmmoGamePage,
    selectedMode: 'ammo-daily',
    gameKind: 'ammo',
    title: 'Tarkle Daily Ammo Guess',
    description:
      'Play the daily Tarkle ammo challenge and find the hidden round by caliber and ballistic clues.',
  },
  '/ammo/unlimited': {
    view: 'game',
    component: AmmoGamePage,
    selectedMode: 'ammo-unlimited',
    gameKind: 'ammo',
    title: 'Tarkle Unlimited Ammo Guess',
    description:
      'Practice unlimited Tarkle ammo rounds and sharpen caliber, penetration, and damage pattern recognition.',
  },
  '/guides/ammo-stats': {
    view: 'static',
    component: AmmoStatsGuidePage,
    title: 'Ammo Stats Guide - Tarkle',
    description:
      'Learn ammo damage, penetration power, armor damage, fragmentation, and projectile behavior in plain language.',
  },
  '/guides/weapon-family': {
    view: 'static',
    component: WeaponFamilyGuidePage,
    title: 'Weapon Family Guide - Tarkle',
    description:
      'Understand AR, SMG, DMR, and shotgun roles to improve guess quality and loadout decisions.',
  },
  '/guides/beginner-progression': {
    view: 'static',
    component: BeginnerProgressionGuidePage,
    title: 'Beginner Progression Guide - Tarkle',
    description:
      'Build sustainable beginner habits for Tarkov-style ammo and weapon decision making.',
  },
  '/guides/daily-strategy': {
    view: 'static',
    component: DailyStrategyGuidePage,
    title: 'Daily Strategy Guide - Tarkle',
    description:
      'Use information-driven guess sequencing to improve daily streak consistency in Tarkle.',
  },
  '/guides/patch-impact': {
    view: 'static',
    component: PatchImpactNotesPage,
    title: 'Patch Impact Notes - Tarkle',
    description:
      'Learn how patches change weapon and ammo patterns and how to adapt your strategy quickly.',
  },
  '/guides/faq': {
    view: 'static',
    component: FaqPage,
    title: 'Tarkle FAQ',
    description:
      'Find answers to common Tarkle questions about modes, data, strategy, and site behavior.',
  },
  '/reference/ammo-glossary': {
    view: 'static',
    component: AmmoGlossaryPage,
    title: 'Ammo Glossary - Tarkle',
    description:
      'Plain-language definitions of core ammo terms used in Tarkle and Tarkov-style analysis.',
  },
  '/reference/weapon-stats-glossary': {
    view: 'static',
    component: WeaponStatsGlossaryPage,
    title: 'Weapon Stats Glossary - Tarkle',
    description:
      'Quick definitions for recoil, ergonomics, and key weapon stat concepts.',
  },
  '/reference/how-tarkle-works': {
    view: 'static',
    component: HowTarkleWorksPage,
    title: 'How Tarkle Works',
    description:
      'See Tarkle rules, scoring interpretation, and practical examples for weapon and ammo rounds.',
  },
  '/reference/streets-btr-tracker': {
    view: 'static',
    component: StreetsBtrTrackerPage,
    title: 'Streets of Tarkov BTR Tracker',
    description:
      'Track Streets of Tarkov BTR routes with a dedicated map surface for route overlays and tooltip annotations.',
  },
  '/reference/woods-btr-tracker': {
    view: 'static',
    component: WoodsBtrTrackerPage,
    title: 'Woods BTR Tracker',
    description:
      'Track Woods BTR routes with a dedicated map surface for route overlays and tooltip annotations.',
  },
  '/reference/data-transparency': {
    view: 'static',
    component: DataTransparencyPage,
    title: 'Data Source Transparency - Tarkle',
    description:
      'Understand where Tarkle data comes from, how it is normalized, and what limitations exist.',
  },
  '/about': {
    view: 'static',
    component: AboutPage,
    title: 'About Tarkle',
    description:
      'Read the Tarkle mission, maintenance approach, and long-term content direction.',
  },
  '/contact': {
    view: 'static',
    component: ContactPage,
    title: 'Contact Tarkle',
    description:
      'Report data issues, suggest improvements, and contact the Tarkle maintainer.',
  },
  '/editorial-policy': {
    view: 'static',
    component: EditorialPolicyPage,
    title: 'Editorial Policy - Tarkle',
    description:
      'Review Tarkle update standards, correction workflow, and editorial principles.',
  },
  '/privacy': {
    view: 'static',
    component: PrivacyPage,
    title: 'Privacy Policy - Tarkle',
    description:
      'Read how Tarkle handles browser storage, cookies, and ad-related data practices.',
  },
  '/terms': {
    view: 'static',
    component: TermsPage,
    title: 'Terms of Use - Tarkle',
    description:
      'Review Tarkle terms of use, limitations, and service expectations.',
  },
}

const PREFETCH_IMPORTERS = {
  '/about': () => import('../pages/core/AboutPage'),
  '/contact': () => import('../pages/core/ContactPage'),
  '/guides/ammo-stats': () => import('../pages/guides/AmmoStatsGuidePage'),
  '/guides/weapon-family': () => import('../pages/guides/WeaponFamilyGuidePage'),
  '/guides/beginner-progression': () => import('../pages/guides/BeginnerProgressionGuidePage'),
  '/guides/daily-strategy': () => import('../pages/guides/DailyStrategyGuidePage'),
  '/guides/patch-impact': () => import('../pages/guides/PatchImpactNotesPage'),
  '/guides/faq': () => import('../pages/guides/FaqPage'),
  '/reference/ammo-glossary': () => import('../pages/reference/AmmoGlossaryPage'),
  '/reference/weapon-stats-glossary': () => import('../pages/reference/WeaponStatsGlossaryPage'),
  '/reference/how-tarkle-works': () => import('../pages/reference/HowTarkleWorksPage'),
  '/reference/streets-btr-tracker': () => import('../pages/reference/StreetsBtrTrackerPage'),
  '/reference/woods-btr-tracker': () => import('../pages/reference/WoodsBtrTrackerPage'),
  '/reference/data-transparency': () => import('../pages/reference/DataTransparencyPage'),
  '/editorial-policy': () => import('../pages/legal/EditorialPolicyPage'),
  '/privacy': () => import('../pages/legal/PrivacyPage'),
  '/terms': () => import('../pages/legal/TermsPage'),
}

function assertRouteConfigShape(config) {
  const entries = Object.entries(config)

  for (const [path, route] of entries) {
    if (!path.startsWith('/')) {
      throw new Error(`Route path must start with '/': ${path}`)
    }

    if (!VALID_VIEWS.has(route.view)) {
      throw new Error(`Route '${path}' has invalid view '${route.view}'`)
    }

    if (typeof route.title !== 'string' || route.title.length === 0) {
      throw new Error(`Route '${path}' is missing a valid title`)
    }

    if (typeof route.description !== 'string' || route.description.length === 0) {
      throw new Error(`Route '${path}' is missing a valid description`)
    }

    if (!route.component) {
      throw new Error(`Route '${path}' is missing a component`)
    }

    if (route.view === 'game') {
      if (typeof route.selectedMode !== 'string' || route.selectedMode.length === 0) {
        throw new Error(`Game route '${path}' is missing selectedMode`)
      }

      if (!VALID_GAME_KINDS.has(route.gameKind)) {
        throw new Error(`Game route '${path}' has invalid gameKind '${route.gameKind}'`)
      }
    }
  }
}

assertRouteConfigShape(ROUTE_CONFIG)

function prefetchPath(path) {
  if (prefetchedPaths.has(path)) {
    return
  }

  const importer = PREFETCH_IMPORTERS[path]
  if (!importer) {
    return
  }

  prefetchedPaths.add(path)
  importer().catch(() => {
    prefetchedPaths.delete(path)
  })
}

function getLikelyNextPaths(pathname) {
  switch (pathname) {
    case '/':
      return [
        '/guides/ammo-stats',
        '/guides/weapon-family',
        '/reference/streets-btr-tracker',
        '/reference/woods-btr-tracker',
      ]
    case '/weapon/daily':
    case '/weapon/unlimited':
      return ['/guides/weapon-family', '/guides/daily-strategy', '/reference/weapon-stats-glossary']
    case '/ammo/daily':
    case '/ammo/unlimited':
      return ['/guides/ammo-stats', '/reference/ammo-glossary', '/guides/daily-strategy']
    case '/contact':
      return ['/privacy', '/terms', '/about']
    default:
      return ['/contact', '/about']
  }
}

export function getRouteFromPath(pathname) {
  return ROUTE_CONFIG[pathname] || ROUTE_CONFIG['/']
}

export function isGamePath(pathname) {
  return getRouteFromPath(pathname).view === 'game'
}

export function applyDocumentMeta(pathname) {
  const route = getRouteFromPath(pathname)
  document.title = route.title

  let descriptionTag = document.querySelector('meta[name="description"]')
  if (!descriptionTag) {
    descriptionTag = document.createElement('meta')
    descriptionTag.setAttribute('name', 'description')
    document.head.appendChild(descriptionTag)
  }

  descriptionTag.setAttribute('content', route.description)

  let canonicalTag = document.querySelector('link[rel="canonical"]')
  if (!canonicalTag) {
    canonicalTag = document.createElement('link')
    canonicalTag.setAttribute('rel', 'canonical')
    document.head.appendChild(canonicalTag)
  }

  canonicalTag.setAttribute('href', `${SITE_ORIGIN}${pathname}`)
}

export function prefetchLikelyNextRoutes(pathname) {
  const nextPaths = getLikelyNextPaths(pathname)
  nextPaths.forEach(prefetchPath)
}