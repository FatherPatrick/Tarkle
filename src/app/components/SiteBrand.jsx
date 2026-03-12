function SiteBrand({ onGoHome }) {
  return (
    <button className="site-brand" onClick={onGoHome} type="button" aria-label="Go to home page">
      Tarkle
    </button>
  )
}

export default SiteBrand
