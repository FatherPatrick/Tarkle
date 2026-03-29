function SiteBrand({ onNavigate }) {
  const handleClick = (event) => {
    if (!onNavigate) {
      return
    }

    event.preventDefault()
    onNavigate('/')
  }

  return (
    <a className="site-brand" href="/" aria-label="Go to home page" onClick={handleClick}>
      Tarkle
    </a>
  )
}

export default SiteBrand
