function FaqPage() {
  return (
    <section className="content-page">
      <h1>Tarkle FAQ</h1>
      <p className="content-updated">Last updated: March 18, 2026</p>

      <p>
        This FAQ covers common gameplay, data, and strategy questions for Tarkle. Answers are kept
        practical so new and returning players can quickly understand how to improve and how the
        site works.
      </p>

      <h2>1) What is Tarkle?</h2>
      <p>
        Tarkle is a stat-comparison guessing game inspired by Tarkov items. You submit weapon or
        ammo guesses and use feedback to move closer to the hidden answer.
      </p>

      <h2>2) What is the difference between Daily and Unlimited?</h2>
      <p>
        Daily mode gives one fixed challenge per day for each game type. Unlimited mode gives fresh
        random rounds continuously so you can practice without waiting.
      </p>

      <h2>3) Why do my guesses sometimes feel close but still wrong?</h2>
      <p>
        Similar items can share partial stat patterns but differ in one decisive category such as
        penetration or projectile behavior. Focus on the largest mismatch rather than averaging all
        stats equally.
      </p>

      <h2>4) Is this an official Escape from Tarkov product?</h2>
      <p>
        No. Tarkle is a fan-made educational and entertainment project. It is not affiliated with or
        endorsed by Battlestate Games.
      </p>

      <h2>5) Where does the game data come from?</h2>
      <p>
        The project uses publicly available Tarkov data from API sources and normalizes values for
        gameplay comparison. Data may change when source data updates.
      </p>

      <h2>6) Why did an answer change compared to last week?</h2>
      <p>
        Patch and data updates can alter available items or values. When underlying data changes,
        guess patterns may shift and previous anchors may no longer be accurate.
      </p>

      <h2>7) How should beginners approach ammo guessing?</h2>
      <p>
        Start by locking caliber, then compare penetration, then refine with armor damage and
        fragmentation. This sequence reduces search space quickly and avoids random guessing.
      </p>

      <h2>8) How should beginners approach weapon guessing?</h2>
      <p>
        Begin with a balanced, representative weapon as your probe. Use feedback to decide whether
        to pivot to close-range families, long-range precision families, or stay in balanced lines.
      </p>

      <h2>9) Does Tarkle store my progress?</h2>
      <p>
        Local gameplay state can be stored in your browser so daily progress and run state are not
        lost when you refresh. This behavior is explained in the privacy information.
      </p>

      <h2>10) Are display ads currently enabled?</h2>
      <p>
        No. Display ads are currently disabled while the site content and disclosure pages are being
        improved. If ads are reintroduced later, the Privacy Policy will describe the provider,
        cookie usage, and relevant user choices.
      </p>

      <h2>11) How can I improve daily streak consistency?</h2>
      <p>
        Use a fixed process: one strong opening probe, one evidence-based hypothesis per guess, and
        deliberate pivots when multiple top-level clues disagree.
      </p>

      <h2>12) Can I suggest corrections or improvements?</h2>
      <p>
        Yes. Feedback on content clarity, data issues, and guide quality is valuable for improving
        the site over time.
      </p>

      <a className="legal-back" href="/">
        Back Home
      </a>
    </section>
  )
}

export default FaqPage
