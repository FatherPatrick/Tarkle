const LINKS = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/editorial-policy', label: 'Editorial Policy' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
]

function LegalLinks({ onNavigate, variant = 'floating' }) {
  const handleClick = (event, href) => {
    if (!onNavigate) {
      return
    }

    event.preventDefault()
    onNavigate(href)
  }

  return (
    <footer className={`site-footer-links site-footer-links--${variant}`} aria-label="Site policy and trust links">
      <div className="site-footer-links-row">
        {LINKS.slice(0, 3).map((link) => (
          <a key={link.href} href={link.href} onClick={(event) => handleClick(event, link.href)}>
            {link.label}
          </a>
        ))}
      </div>
      <div className="site-footer-links-row">
        {LINKS.slice(3).map((link) => (
          <a key={link.href} href={link.href} onClick={(event) => handleClick(event, link.href)}>
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  )
}

export default LegalLinks
