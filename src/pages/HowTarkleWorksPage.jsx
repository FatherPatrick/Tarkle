function HowTarkleWorksPage() {
  return (
    <section className="content-page">
      <h1>How Tarkle Works</h1>
      <p className="content-updated">Last updated: March 18, 2026</p>

      <p>
        Tarkle is a comparison puzzle built around Tarkov-inspired weapon and ammo data. You submit a
        guess and receive structured feedback that helps you narrow the answer in subsequent attempts.
      </p>

      <h2>Core Loop</h2>
      <ol>
        <li>Choose a game mode: weapon or ammo, daily or unlimited.</li>
        <li>Submit a candidate item from the searchable list.</li>
        <li>Review feedback for stat similarity and mismatches.</li>
        <li>Adjust your next guess using the strongest mismatch clues.</li>
      </ol>

      <h2>Daily vs Unlimited</h2>
      <p>
        Daily modes provide one fixed challenge per day. Unlimited modes generate fresh rounds so you
        can practice pattern recognition and strategy without time constraints.
      </p>

      <h2>Weapon Guessing Interpretation</h2>
      <p>
        Weapon rounds reward family-level reasoning. Start with a balanced probe candidate, then decide
        whether feedback suggests close-range specialization, long-range precision, or incremental
        refinement within the same branch.
      </p>

      <h2>Ammo Guessing Interpretation</h2>
      <p>
        Ammo rounds are easiest when interpreted in sequence: caliber first, then penetration and armor
        pressure, then secondary indicators such as fragmentation and projectile behavior.
      </p>

      <h2>Scoring Example: Ammo Mode</h2>
      <p>
        Suppose your first guess matches caliber but has much lower penetration than the target signal.
        Your second guess should stay in that caliber but move to a stronger anti-armor option. If the
        next response improves penetration alignment but still misses on projectile count, you can pivot
        toward an item with similar armor profile and matching projectile behavior.
      </p>

      <h2>Scoring Example: Weapon Mode</h2>
      <p>
        If your initial guess appears too close-range and high-rate compared with feedback, the next
        best step is a family pivot toward a more stable, longer-range profile instead of small tuning.
        This approach captures more information per attempt.
      </p>

      <h2>Winning Strategy Basics</h2>
      <ul>
        <li>Use your first guess as an information probe, not a lucky shot.</li>
        <li>Correct your largest mismatch first on every follow-up.</li>
        <li>Avoid tiny changes when multiple top-level clues disagree.</li>
        <li>Treat each round as a learning cycle, especially in unlimited mode.</li>
      </ul>

      <p>
        The objective is not memorizing every value. The objective is learning repeatable reasoning so
        each guess has a clear purpose and stronger expected information gain.
      </p>

      <a className="legal-back" href="/">
        Back Home
      </a>
    </section>
  )
}

export default HowTarkleWorksPage
