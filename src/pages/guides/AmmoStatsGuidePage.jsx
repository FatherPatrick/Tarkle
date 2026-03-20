function AmmoStatsGuidePage() {
  return (
    <section className="content-page">
      <h1>Ammo Stats Guide</h1>
      <p className="content-updated">Last updated: March 18, 2026</p>

      <p>
        Ammo quality decides fights in Escape from Tarkov more than weapon price. In Tarkle,
        ammo rounds are compared by recognizable ballistic properties so players can build
        stronger intuition about how rounds behave. This guide explains each core stat in plain
        language and gives practical ways to apply the numbers.
      </p>

      <h2>Damage</h2>
      <p>
        Damage is the raw health impact when a round connects. Higher damage generally shortens
        time to kill against unarmored targets, but high damage alone does not mean a round is
        best for every fight. In armor-heavy engagements, penetration and armor damage matter just
        as much as pure body damage.
      </p>
      <p>
        A good mental model is to separate flesh pressure from armor pressure. Damage drives flesh
        pressure. Penetration and armor damage drive armor pressure. Top-tier rounds usually have a
        better balance between the two, while budget rounds often lean heavily in one direction.
      </p>

      <h2>Penetration Power</h2>
      <p>
        Penetration power is the most important anti-armor stat. Higher penetration means better
        odds of punching through armor classes instead of being absorbed. When your penetration is
        too low for the opponent armor level, fights can feel inconsistent even if your weapon is
        strong.
      </p>
      <p>
        In Tarkle guesses, penetration can quickly narrow candidate rounds because caliber families
        tend to cluster into recognizable pen bands. If your guess is close in caliber but far in
        penetration, prioritize upgrades within that caliber that are designed for armor defeat.
      </p>

      <h2>Armor Damage</h2>
      <p>
        Armor damage measures how quickly a round degrades armor durability. Even if a round does
        not immediately penetrate, repeated hits can break durability and open later shots. Rounds
        with stronger armor damage often become more threatening as a fight extends.
      </p>
      <p>
        This is why low-penetration, high-armor-damage rounds can still create pressure in close
        range brawls. You may not win instantly, but you can accelerate armor decay and improve
        follow-up lethality for yourself or your squad.
      </p>

      <h2>Fragmentation Chance</h2>
      <p>
        Fragmentation chance represents the probability that a bullet creates additional damage
        effects on hit. It is not a guaranteed bonus, and practical value depends on penetration
        context. If a round struggles to penetrate target armor, high fragmentation is less
        dependable than reliable baseline penetration.
      </p>
      <p>
        Treat fragmentation as volatility. It raises upside in favorable conditions but should not
        replace core consistency stats in your decision making. For guess games, it is useful as a
        secondary tie-breaker after caliber and penetration.
      </p>

      <h2>Projectile Count</h2>
      <p>
        Projectile count is most visible in shells and multi-projectile loads. Instead of one
        projectile, each trigger pull can send several pellets. This changes engagement profile:
        close range can be brutal, but damage distribution and armor interaction can vary by spread
        and hit location.
      </p>
      <p>
        In Tarkle context, projectile count is a strong discriminator for shotgun-oriented rounds.
        If this value is far from your guess, pivot immediately to another branch of the ammo pool
        rather than making tiny incremental stat adjustments.
      </p>

      <h2>How To Read Stats Together</h2>
      <p>
        Single-stat thinking creates bad decisions. Instead, compare rounds with a two-axis method:
        anti-armor reliability and unarmored lethality. Penetration plus armor damage describe
        reliability against protection. Damage plus fragmentation describe lethality when hits land
        cleanly.
      </p>
      <p>
        A practical loadout strategy is to define intent before raid start. If your route expects
        early PvP around armored players, bias toward penetration. If your route focuses economy or
        low-geared encounters, high flesh damage can be cost efficient. Context beats universal tier
        lists.
      </p>

      <h2>Common Mistakes</h2>
      <ul>
        <li>Choosing rounds only by damage and ignoring penetration thresholds.</li>
        <li>Assuming expensive ammo always dominates every engagement distance.</li>
        <li>Ignoring availability and sustainability for repeated raids.</li>
        <li>Treating fragmentation as guaranteed value instead of probabilistic upside.</li>
      </ul>

      <h2>Tarkle Guessing Workflow For Ammo</h2>
      <ol>
        <li>Anchor on caliber first to reduce the search branch quickly.</li>
        <li>Use penetration gap to move toward armor-focused or flesh-focused options.</li>
        <li>Check armor damage to refine near matches.</li>
        <li>Use fragmentation and projectile count as final separators.</li>
      </ol>

      <p>
        The more often you apply this sequence, the more transferable your intuition becomes
        between the game and real raid preparation. The objective is not memorizing every round,
        but understanding why rounds occupy different tactical roles.
      </p>

      <a className="legal-back" href="/">
        Back Home
      </a>
    </section>
  )
}

export default AmmoStatsGuidePage
