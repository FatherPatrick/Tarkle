function DataTransparencyPage() {
  return (
    <section className="content-page">
      <h1>Data Source Transparency</h1>
      <p className="content-updated">Last updated: March 18, 2026</p>

      <p>
        Tarkle uses external game data and then normalizes selected fields for consistent comparison.
        This page explains what is sourced, what is transformed, and what limitations to expect.
      </p>

      <h2>Primary Data Source</h2>
      <p>
        The project currently queries a public GraphQL endpoint at https://api.tarkov.dev/graphql.
        Item fields are pulled for weapons and ammunition, then mapped to game-specific comparison
        structures used by the puzzle logic.
      </p>

      <h2>Why Normalization Is Needed</h2>
      <p>
        Source data is rich but not always shaped for puzzle presentation. Normalization creates stable
        formats for display and comparison while keeping the underlying meaning of each property.
      </p>

      <h2>Current Ammo Properties Used</h2>
      <ul>
        <li>caliber</li>
        <li>damage</li>
        <li>penetrationPower</li>
        <li>armorDamage</li>
        <li>fragmentationChance</li>
        <li>projectileCount</li>
      </ul>

      <h2>Current Weapon Handling Notes</h2>
      <p>
        Weapon comparisons rely on the subset of stable fields available in the existing game logic.
        As source coverage evolves, additional fields may be introduced if they improve clarity rather
        than adding noise.
      </p>

      <h2>Data Freshness and Change Risk</h2>
      <p>
        External APIs can change over time. Values, naming, and availability may shift after patches or
        backend updates. When upstream changes happen, puzzle behavior may also change.
      </p>

      <h2>Quality Guardrails</h2>
      <ul>
        <li>Prefer stable, widely available fields for core comparison logic.</li>
        <li>Filter or sanitize values that break consistent gameplay interpretation.</li>
        <li>Update mappings when upstream schemas evolve.</li>
        <li>Document meaningful data assumptions in repository notes.</li>
      </ul>

      <h2>Known Limitations</h2>
      <ul>
        <li>Data completeness depends on third-party provider accuracy and uptime.</li>
        <li>Some edge-case fields may not be represented in current game views.</li>
        <li>Behavior can shift after upstream balancing changes.</li>
      </ul>

      <h2>Correction and Update Process</h2>
      <p>
        If an inconsistency is identified, the expected process is: reproduce the issue, verify source
        values, adjust mapping or filtering logic, and then update reference content where needed.
      </p>

      <a className="legal-back" href="/">
        Back Home
      </a>
    </section>
  )
}

export default DataTransparencyPage
