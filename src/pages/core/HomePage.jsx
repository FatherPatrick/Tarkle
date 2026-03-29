function HomePage() {
  return (
    <section className="home-landing">
      <p className="home-subtitle">Choose your mode and guess the Tarkov weapon or ammo.</p>

      <section className="home-info-block" aria-label="What is Tarkle">
        <h2>What Is Tarkle?</h2>
        <p>
          Tarkle is a stat-comparison guessing game inspired by Tarkov item data. You can play weapon
          or ammo rounds in daily and unlimited modes, then sharpen your decision making with built-in
          guides and glossaries.
        </p>
        <p>
          The goal is to turn raw stats into practical intuition. Instead of memorizing isolated
          numbers, each guess helps you learn patterns you can reuse in future rounds.
        </p>
        <a className="content-hub-link" href="/reference/how-tarkle-works">
          How Tarkle Works
        </a>
      </section>

      <section className="content-hub" aria-label="Guessing games">
        <h2>Guessing Games</h2>
        <p className="content-hub-subtitle">
          Pick a mode and sharpen your Tarkov stat intuition in daily or unlimited rounds.
        </p>

        <div className="content-hub-grid">
          <article className="content-hub-card">
            <h3>Tarkle Of The Day</h3>
            <p>One fixed daily weapon. You get one game run per day.</p>
            <a className="content-hub-link" href="/weapon/daily">
              Play Daily
            </a>
          </article>

          <article className="content-hub-card">
            <h3>Unlimited</h3>
            <p>Unlimited fresh games with a new random weapon each round.</p>
            <a className="content-hub-link" href="/weapon/unlimited">
              Play Unlimited
            </a>
          </article>

          <article className="content-hub-card">
            <h3>Ammo Of The Day</h3>
            <p>One fixed daily ammo round. One run per day.</p>
            <a className="content-hub-link" href="/ammo/daily">
              Play Ammo Daily
            </a>
          </article>

          <article className="content-hub-card">
            <h3>Ammo Unlimited</h3>
            <p>See a mystery round image and guess ammo with unlimited rounds.</p>
            <a className="content-hub-link" href="/ammo/unlimited">
              Play Ammo Unlimited
            </a>
          </article>
        </div>
        <div className="home-guessing-details">
          <section className="home-info-block" aria-label="How to play">
            <h2>How To Play</h2>
            <ol>
              <li>Pick a mode: weapon daily, weapon unlimited, ammo daily, or ammo unlimited.</li>
              <li>Submit your first guess as an information probe, not a random guess.</li>
              <li>Use mismatch feedback to narrow your next candidate quickly.</li>
              <li>Prioritize fixing the largest mismatch category each attempt.</li>
              <li>Use unlimited mode to practice and then apply the process in daily mode.</li>
            </ol>
          </section>

          <section className="home-info-block" aria-label="Scoring example">
            <h2>Scoring Example</h2>
            <p>
              Example ammo round with three filled guesses. Green means correct, amber means close,
              and red means wrong.
            </p>

            <div className="home-scoring-example" role="img" aria-label="Example filled ammo guesses with feedback colors">
              <div className="home-scoring-row home-scoring-row--head">
                <span>Guess</span>
                <span>Caliber</span>
                <span>Damage</span>
                <span>Pen</span>
              </div>

              <div className="home-scoring-row">
                <span className="home-score-cell home-score-cell--name">PP gs</span>
                <span className="home-score-cell home-score-cell--correct">9x19</span>
                <span className="home-score-cell home-score-cell--wrong">58</span>
                <span className="home-score-cell home-score-cell--wrong">20</span>
              </div>

              <div className="home-scoring-row">
                <span className="home-score-cell home-score-cell--name">PBP gzh</span>
                <span className="home-score-cell home-score-cell--correct">9x19</span>
                <span className="home-score-cell home-score-cell--close">52</span>
                <span className="home-score-cell home-score-cell--close">39</span>
              </div>

              <div className="home-scoring-row">
                <span className="home-score-cell home-score-cell--name">AP 6.3</span>
                <span className="home-score-cell home-score-cell--correct">9x19</span>
                <span className="home-score-cell home-score-cell--correct">52</span>
                <span className="home-score-cell home-score-cell--correct">30</span>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section className="content-hub" aria-label="BTR routes">
        <h2>BTR Routes</h2>
        <p className="content-hub-subtitle">
          Learn map-by-map BTR movement patterns to predict timing, lane pressure, and safer rotations.
        </p>

        <div className="content-hub-grid">
          <article className="content-hub-card btr-route-card">
            <h3>Streets of Tarkov</h3>
            <p>Open the live Streets tracker to review route stops, timing landmarks, and safer rotation reads.</p>
            <a className="content-hub-link" href="/reference/streets-btr-tracker">
              Open Tracker
            </a>
          </article>

          <article className="content-hub-card btr-route-card">
            <h3>Woods</h3>
            <p>Open the live Woods tracker to follow route stops, transit pressure, and map-side travel patterns.</p>
            <a className="content-hub-link" href="/reference/woods-btr-tracker">
              Open Tracker
            </a>
          </article>
        </div>
      </section>

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
            <h3>Data Source Transparency</h3>
            <p>How data is sourced, normalized, and updated for gameplay consistency.</p>
            <a className="content-hub-link" href="/reference/data-transparency">
              Read Reference
            </a>
          </article>

        </div>
      </section>

      <section className="home-info-block" aria-label="Recent updates">
        <h2>Recent Updates</h2>
        <p className="home-update-rhythm">
          Update cadence: weekly content and quality updates, with major gameplay/data updates as needed.
        </p>
        <ul>
          <li>2026-03-29: Removed active ad placements while improving privacy and disclosure language.</li>
          <li>2026-03-29: Updated the BTR tracker hub copy now that both map trackers are live.</li>
          <li>2026-03-18: Expanded Privacy and Terms with detailed policy language and data-handling notes.</li>
          <li>2026-03-18: Added scoring example board and expanded homepage learning sections.</li>
          <li>2026-03-18: Added trust pages and moved trust/legal navigation into shared footer links.</li>
          <li>2026-03-18: Added route-level metadata, canonical tags, sitemap, and robots support.</li>
        </ul>
      </section>

    </section>
  )
}

export default HomePage
