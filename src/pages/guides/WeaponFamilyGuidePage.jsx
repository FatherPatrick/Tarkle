function WeaponFamilyGuidePage() {
  return (
    <section className="content-page">
      <h1>Weapon Family Guide</h1>
      <p className="content-updated">Last updated: March 18, 2026</p>

      <p>
        Weapon families define handling identity before attachments even enter the conversation.
        Tarkle weapon rounds compare patterns across core weapon traits, so recognizing family
        behavior can dramatically improve your guess quality and your raid loadout choices.
      </p>

      <h2>Assault Rifles</h2>
      <p>
        Assault rifles are versatile generalists. They balance recoil, effective range, and ammo
        economy better than most classes. Their biggest advantage is adaptability across map types,
        but that flexibility can hide weak specialization if your build is unfocused.
      </p>
      <p>
        In guessing games, assault rifle profiles often cluster around middle-to-high ergonomics
        with manageable recoil growth across upgrades. If your early guess sits near balanced
        values, consider AR lines before jumping to extremes like marksman or shotgun categories.
      </p>

      <h2>Submachine Guns</h2>
      <p>
        SMGs emphasize controllable close-range output, high fire rate, and aggressive movement.
        They can feel excellent in CQB but depend heavily on ammo quality and engagement distance.
        Against armor at mid-range, low-penetration choices can underperform.
      </p>
      <p>
        Treat SMGs as pace weapons: they reward initiative, angle pressure, and close spacing. In
        Tarkle-style identification, high handling plus closer-range orientation is often a useful
        branch when your guess misses on range or recoil profile.
      </p>

      <h2>Designated Marksman Rifles</h2>
      <p>
        DMRs are precision pressure tools designed for controlled, high-value shots. They usually
        trade sustained spray comfort for stronger mid-to-long-range impact. Good positioning and
        pacing matter more than raw click speed.
      </p>
      <p>
        If your results indicate stronger ranged profile and heavier shot value, DMR families are a
        strong hypothesis. Their stat shapes tend to diverge from pure AR flexibility and from
        bolt-action extremes.
      </p>

      <h2>Shotguns</h2>
      <p>
        Shotguns have the largest identity swing based on shell type. Buckshot creates multi-hit
        close pressure, while slugs can support focused single-projectile roles. Distance control
        and target armor context determine whether they feel dominant or inconsistent.
      </p>
      <p>
        In weapon-family reasoning, shotgun branches become likely when effective profile appears
        short-range and the associated ammo data indicates multi-projectile behavior or shell-driven
        variability.
      </p>

      <h2>How Families Influence Build Decisions</h2>
      <p>
        Family choice should start from route and objective. Tight interior routes reward handling
        speed and quick target transitions. Open maps and long sight lines reward recoil discipline,
        velocity confidence, and precision optics compatibility.
      </p>
      <p>
        Build choices are not independent from ammo decisions. Expensive weapon platforms can still
        fail with weak ammo, while modest platforms can outperform expectations with reliable rounds.
        Treat weapon family and ammo plan as one system.
      </p>

      <h2>Common Decision Framework</h2>
      <ol>
        <li>Pick engagement range first, then select the family that naturally fits it.</li>
        <li>Confirm ammo availability for the full session, not just one raid.</li>
        <li>Set recoil and ergonomics goals based on your map pace.</li>
        <li>Only then optimize attachments and quality-of-life choices.</li>
      </ol>

      <h2>Tarkle Guessing Tips By Family</h2>
      <ul>
        <li>If stats look balanced and versatile, test AR candidates before niche classes.</li>
        <li>If close-range handling dominates, evaluate SMG or shotgun branches quickly.</li>
        <li>If profile hints precision pressure, pivot toward DMR candidates.</li>
        <li>Use ammo clues to validate family assumptions before locking guesses.</li>
      </ul>

      <p>
        Mastering family identity helps in both directions: better puzzle performance and cleaner,
        more intentional raid planning. The goal is to stop selecting weapons by habit and start
        selecting by context.
      </p>

      <a className="legal-back" href="/">
        Back Home
      </a>
    </section>
  )
}

export default WeaponFamilyGuidePage
