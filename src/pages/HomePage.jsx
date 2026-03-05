function HomePage({ onSelectMode }) {
  return (
    <section className="home-landing">
      <h1 className="home-title">Tarkle</h1>
      <p className="home-subtitle">Choose your mode and guess the Tarkov weapon.</p>

      <div className="home-mode-grid">
        <article className="home-mode-card">
          <h2>Tarkle Of The Day</h2>
          <p>One fixed daily weapon. You get one game run per day.</p>
          <button
            className="home-mode-button"
            onClick={() => onSelectMode('daily')}
            type="button"
          >
            Play Daily
          </button>
        </article>

        <article className="home-mode-card">
          <h2>Unlimited</h2>
          <p>Unlimited fresh games with a new random weapon each round.</p>
          <button
            className="home-mode-button"
            onClick={() => onSelectMode('unlimited')}
            type="button"
          >
            Play Unlimited
          </button>
        </article>
      </div>
    </section>
  )
}

export default HomePage
