import { useState } from 'react'

const NAV_SECTIONS = [
  {
    label: 'Play',
    items: [
      { href: '/', label: 'Home' },
      { href: '/weapon/daily', label: 'Weapon Daily' },
      { href: '/weapon/unlimited', label: 'Weapon Unlimited' },
      { href: '/ammo/daily', label: 'Ammo Daily' },
      { href: '/ammo/unlimited', label: 'Ammo Unlimited' },
    ],
  },
  {
    label: 'Trackers',
    items: [
      { href: '/reference/streets-btr-tracker', label: 'Streets BTR' },
      { href: '/reference/woods-btr-tracker', label: 'Woods BTR' },
    ],
  },
  {
    label: 'Guides',
    items: [
      { href: '/guides/ammo-stats', label: 'Ammo Stats' },
      { href: '/guides/weapon-family', label: 'Weapon Families' },
      { href: '/guides/beginner-progression', label: 'Beginner Progression' },
      { href: '/guides/daily-strategy', label: 'Daily Strategy' },
      { href: '/guides/patch-impact', label: 'Patch Impact' },
      { href: '/guides/faq', label: 'FAQ' },
    ],
  },
  {
    label: 'Reference',
    items: [
      { href: '/reference/how-tarkle-works', label: 'How Tarkle Works' },
      { href: '/reference/ammo-glossary', label: 'Ammo Glossary' },
      { href: '/reference/weapon-stats-glossary', label: 'Weapon Stats' },
      { href: '/reference/data-transparency', label: 'Data Transparency' },
    ],
  },
]

function AppNav({ currentPath, onNavigate }) {
  const [openSections, setOpenSections] = useState(() =>
    Object.fromEntries(NAV_SECTIONS.map((section) => [section.label, true]))
  )

  const handleLinkClick = (event, href) => {
    event.preventDefault()
    onNavigate(href)
  }

  const handleToggleSection = (label) => {
    setOpenSections((prev) => ({
      ...prev,
      [label]: !prev[label],
    }))
  }

  return (
    <nav className="site-nav" aria-label="Primary navigation">
      {NAV_SECTIONS.map((section) => (
        <section className="site-nav-section" key={section.label}>
          <button
            type="button"
            className="site-nav-section-toggle"
            aria-expanded={openSections[section.label]}
            aria-controls={`site-nav-section-${section.label}`}
            onClick={() => handleToggleSection(section.label)}
          >
            <span className="site-nav-label">{section.label}</span>
            <span
              className={`site-nav-section-caret${openSections[section.label] ? ' site-nav-section-caret--open' : ''}`}
              aria-hidden="true"
            />
          </button>
          {openSections[section.label] ? (
            <div className="site-nav-list" id={`site-nav-section-${section.label}`}>
              {section.items.map((item) => {
                const isActive = currentPath === item.href

                return (
                  <a
                    key={item.href}
                    className={`site-nav-link${isActive ? ' site-nav-link--active' : ''}`}
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={(event) => handleLinkClick(event, item.href)}
                  >
                    {item.label}
                  </a>
                )
              })}
            </div>
          ) : null}
        </section>
      ))}
    </nav>
  )
}

export default AppNav