function EditorialPolicyPage() {
  return (
    <section className="content-page">
      <h1>Editorial Policy</h1>
      <p className="content-updated">Last updated: March 18, 2026</p>

      <p>
        This policy describes how Tarkle content is created, reviewed, and corrected. The objective is
        to keep gameplay and reference pages accurate, practical, and clearly sourced.
      </p>

      <h2>Editorial Principles</h2>
      <ul>
        <li>Accuracy first: statements should reflect current known data behavior.</li>
        <li>Clarity over jargon: guidance should be understandable for new players.</li>
        <li>Usefulness over volume: pages should include actionable context, not filler.</li>
        <li>Transparency: meaningful assumptions and limits should be documented.</li>
      </ul>

      <h2>Content Creation Workflow</h2>
      <ol>
        <li>Draft based on current game logic and known source fields.</li>
        <li>Check wording for clear definitions and practical examples.</li>
        <li>Verify references to current page behavior and route accessibility.</li>
        <li>Publish with a visible last-updated date.</li>
      </ol>

      <h2>Update Standards</h2>
      <p>
        Pages are revised when patch-level changes affect interpretation, when source fields change, or
        when user feedback identifies unclear or incorrect sections. High-impact pages are prioritized
        first.
      </p>

      <h2>Correction Workflow</h2>
      <ol>
        <li>Receive issue report or identify inconsistency internally.</li>
        <li>Reproduce and verify against source data and current app behavior.</li>
        <li>Patch content and related references.</li>
        <li>Update the last-updated date on modified pages.</li>
      </ol>

      <h2>Advertising and Content Separation</h2>
      <p>
        Ads support operations, but editorial content is written independently. Guides and references
        are not generated to favor ad placement and should remain useful with or without ads.
      </p>

      <h2>Quality Scope</h2>
      <p>
        Tarkle aims to be dependable, but no independent data-driven site can guarantee perfect
        completeness at all times. Content should be treated as best-effort guidance and updated as the
        ecosystem evolves.
      </p>

      <a className="legal-back" href="/">
        Back Home
      </a>
    </section>
  )
}

export default EditorialPolicyPage
