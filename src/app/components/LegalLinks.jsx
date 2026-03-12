function LegalLinks({ onOpenPrivacy, onOpenTerms }) {
  return (
    <footer className="site-footer-links" aria-label="Legal links">
      <button onClick={onOpenPrivacy} type="button">
        Privacy
      </button>
      <button onClick={onOpenTerms} type="button">
        Terms
      </button>
    </footer>
  )
}

export default LegalLinks
