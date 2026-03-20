function AmmoGlossaryPage() {
  return (
    <section className="content-page">
      <h1>Ammo Glossary</h1>
      <p className="content-updated">Last updated: March 18, 2026</p>

      <p>
        This glossary explains common ammo terms in plain language. Use it as a quick reference while
        playing Tarkle or planning raid loadouts.
      </p>

      <h2>Armor Damage</h2>
      <p>
        A measure of how strongly a round reduces armor durability. Higher armor damage can make
        follow-up shots more effective by weakening protection over time.
      </p>

      <h2>Caliber</h2>
      <p>
        The ammunition size and family category a weapon can use. Caliber is one of the fastest ways
        to narrow options in ammo guess mode.
      </p>

      <h2>Damage</h2>
      <p>
        The direct health impact when a projectile lands. High damage is strongest against unarmored
        targets but does not guarantee armor performance.
      </p>

      <h2>Fragmentation Chance</h2>
      <p>
        The probability of additional damage behavior after a hit. Useful as a bonus factor, but less
        reliable than penetration and baseline damage for consistency.
      </p>

      <h2>Penetration Power</h2>
      <p>
        A key anti-armor stat representing how likely a round is to pass through armor effectively.
        Higher penetration generally improves consistency versus protected targets.
      </p>

      <h2>Projectile Count</h2>
      <p>
        How many projectiles are released per shot. Commonly used for shells with multiple pellets and
        important for distinguishing close-range spread behavior.
      </p>

      <h2>Role Identity</h2>
      <p>
        A practical label for what an ammo type does best, such as armor-focused pressure or
        flesh-focused lethality. Role identity helps avoid one-stat decision mistakes.
      </p>

      <h2>Threshold</h2>
      <p>
        A practical breakpoint where a small stat change can produce a much bigger outcome difference,
        such as improved performance against specific armor levels.
      </p>

      <h2>Volatility</h2>
      <p>
        How variable a round feels from fight to fight. High volatility options may have strong upside
        but less predictable outcomes than stable, high-consistency rounds.
      </p>

      <h2>Working Set</h2>
      <p>
        Your small group of trusted ammo options for regular play. Keeping a working set helps maintain
        economy and decision speed while you improve.
      </p>

      <a className="legal-back" href="/">
        Back Home
      </a>
    </section>
  )
}

export default AmmoGlossaryPage
