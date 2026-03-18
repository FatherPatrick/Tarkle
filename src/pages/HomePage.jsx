import AdSlot from '../features/ads/AdSlot'

function HomePage() {
  return (
    <section className="home-landing">
      <p className="home-subtitle">Choose your mode and guess the Tarkov weapon or ammo.</p>

      <AdSlot label="Sponsored" minHeight={130} slot="1000000001" />

      <div className="home-mode-grid">
        <article className="home-mode-card">
          <h2>Tarkle Of The Day</h2>
          <p>One fixed daily weapon. You get one game run per day.</p>
          <a className="home-mode-button" href="/weapon/daily">
            Play Daily
          </a>
        </article>

        <article className="home-mode-card">
          <h2>Unlimited</h2>
          <p>Unlimited fresh games with a new random weapon each round.</p>
          <a className="home-mode-button" href="/weapon/unlimited">
            Play Unlimited
          </a>
        </article>

        <article className="home-mode-card">
          <h2>Ammo Of The Day</h2>
          <p>One fixed daily ammo round. One run per day.</p>
          <a className="home-mode-button" href="/ammo/daily">
            Play Ammo Daily
          </a>
        </article>

        <article className="home-mode-card">
          <h2>Ammo Unlimited</h2>
          <p>See a mystery round image and guess ammo with unlimited rounds.</p>
          <a className="home-mode-button" href="/ammo/unlimited">
            Play Ammo Unlimited
          </a>
        </article>
      </div>

      <section className="content-hub" aria-label="Guides and articles">
        <h2>Guides and Articles</h2>
        <p className="content-hub-subtitle">
          Learn ammo logic, weapon families, daily strategy, and patch impact notes.
        </p>

        <div className="content-hub-grid">
          <article className="content-hub-card">
            <h3>Ammo Stats Guide</h3>
            <p>Understand penetration, damage, armor pressure, and fragmentation tradeoffs.</p>
            <a className="content-hub-link" href="/guides/ammo-stats">
              Read Guide
            </a>
          </article>

          <article className="content-hub-card">
            <h3>Weapon Family Guide</h3>
            <p>Compare AR, SMG, DMR, and shotgun roles by engagement and handling style.</p>
            <a className="content-hub-link" href="/guides/weapon-family">
              Read Guide
            </a>
          </article>

          <article className="content-hub-card">
            <h3>Beginner Progression Guide</h3>
            <p>Build sustainable loadout habits and improve decision quality step by step.</p>
            <a className="content-hub-link" href="/guides/beginner-progression">
              Read Guide
            </a>
          </article>

          <article className="content-hub-card">
            <h3>Daily Strategy Guide</h3>
            <p>Use information-driven guess sequencing to improve daily streak consistency.</p>
            <a className="content-hub-link" href="/guides/daily-strategy">
              Read Guide
            </a>
          </article>

          <article className="content-hub-card">
            <h3>Patch Impact Notes</h3>
            <p>Learn how to interpret stat changes and adapt loadouts after data updates.</p>
            <a className="content-hub-link" href="/guides/patch-impact">
              Read Notes
            </a>
          </article>

          <article className="content-hub-card">
            <h3>Tarkle FAQ</h3>
            <p>Quick answers about data sources, modes, strategy, and site behavior.</p>
            <a className="content-hub-link" href="/guides/faq">
              Open FAQ
            </a>
          </article>

          <article className="content-hub-card">
            <h3>Ammo Glossary</h3>
            <p>Plain-language definitions for core ammo terms and practical examples.</p>
            <a className="content-hub-link" href="/reference/ammo-glossary">
              Open Glossary
            </a>
          </article>

          <article className="content-hub-card">
            <h3>Weapon Stats Glossary</h3>
            <p>Quick definitions for recoil, ergonomics, and stat relationships.</p>
            <a className="content-hub-link" href="/reference/weapon-stats-glossary">
              Open Glossary
            </a>
          </article>

          <article className="content-hub-card">
            <h3>How Tarkle Works</h3>
            <p>Rules, scoring interpretation, and examples for weapon and ammo rounds.</p>
            <a className="content-hub-link" href="/reference/how-tarkle-works">
              Read Reference
            </a>
          </article>

          <article className="content-hub-card">
            <h3>Data Source Transparency</h3>
            <p>How data is sourced, normalized, and updated for gameplay consistency.</p>
            <a className="content-hub-link" href="/reference/data-transparency">
              Read Reference
            </a>
          </article>

        </div>
      </section>

    </section>
  )
}

export default HomePage
