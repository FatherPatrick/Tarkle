function PatchImpactNotesPage() {
  return (
    <section className="content-page">
      <h1>Patch Impact Notes</h1>
      <p className="content-updated">Last updated: March 18, 2026</p>

      <p>
        Game data changes over time. Even small stat updates can shift which weapons and rounds feel
        reliable in practice. This page explains how to read patch effects through a decision lens so
        you can adapt quickly in raids and in Tarkle guessing modes.
      </p>

      <h2>Why Small Number Changes Matter</h2>
      <p>
        Players often ignore minor adjustments, but thresholds create nonlinear outcomes. A modest
        penetration change can push a round across an armor interaction boundary. A recoil tweak can
        alter control confidence enough to change engagement choices.
      </p>
      <p>
        Patch interpretation should focus on threshold crossings, not absolute size. Ask whether the
        update changes category behavior, not just whether the number moved.
      </p>

      <h2>Patch Reading Framework</h2>
      <ol>
        <li>Identify changed items and affected stat categories.</li>
        <li>Classify each change as survivability, lethality, handling, or economy impact.</li>
        <li>Estimate whether the change alters common encounter outcomes.</li>
        <li>Test in a controlled loadout set before broad adoption.</li>
      </ol>

      <p>
        This process prevents overreaction. Not every patch note deserves immediate loadout overhaul,
        but some updates should trigger fast adaptation.
      </p>

      <h2>Ammo Patch Signals</h2>
      <p>
        Ammo updates are usually the highest leverage because they directly affect damage delivery.
        Prioritize penetration and armor-damage changes first. Then review damage and fragmentation
        as secondary modifiers to role identity.
      </p>
      <p>
        If a round gains penetration but loses some flesh damage, its role may shift toward armored
        target reliability. If the opposite happens, it may become a better economy option for
        lower-protection fights.
      </p>

      <h2>Weapon Patch Signals</h2>
      <p>
        Weapon updates often change consistency more than theoretical maximum output. Recoil behavior,
        ergonomics, and handling animations can make a familiar platform either smoother or more
        demanding. Evaluate practical shot quality over isolated range stats.
      </p>
      <p>
        Attachment interactions also matter. A small base-stat change can amplify through your build
        path and alter what combinations are worth their cost.
      </p>

      <h2>How Patches Affect Tarkle</h2>
      <p>
        Tarkle uses data-driven comparisons, so patch shifts can alter the shape of likely guesses.
        Old memorized anchors may become less reliable after data updates. The best response is to
        refresh your midline probes and update branch assumptions.
      </p>
      <p>
        When unlimited mode suddenly feels harder after an update, that usually indicates your mental
        map is stale. A short recalibration session with the new data restores performance quickly.
      </p>

      <h2>Update Checklist After Every Patch</h2>
      <ul>
        <li>Review changed ammo entries and flag role shifts.</li>
        <li>Review changed weapon entries and flag handling shifts.</li>
        <li>Run 5 to 10 unlimited games to rebuild intuition.</li>
        <li>Adjust one or two default loadouts based on evidence.</li>
        <li>Document what changed in simple notes for next session.</li>
      </ul>

      <h2>Avoid These Patch Traps</h2>
      <ul>
        <li>Copying hot takes before testing your own routes and pace.</li>
        <li>Assuming one buff makes an item universally best.</li>
        <li>Ignoring economy and availability after role changes.</li>
        <li>Changing every variable at once, making results impossible to interpret.</li>
      </ul>

      <p>
        Strong adaptation is a discipline. Read changes, predict impact, test intentionally, and keep
        what works. Patch cycles reward players who can update systems faster than habits.
      </p>

      <a className="legal-back" href="/">
        Back Home
      </a>
    </section>
  )
}

export default PatchImpactNotesPage
