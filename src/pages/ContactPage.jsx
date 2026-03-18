function ContactPage() {
  return (
    <section className="content-page">
      <h1>Contact</h1>
      <p className="content-updated">Last updated: March 18, 2026</p>

      <p>
        Feedback is welcome for gameplay clarity, data issues, and content improvements. If you spot an
        incorrect stat interpretation, a broken flow, or a page that needs better explanation, please
        share it.
      </p>

      <h2>Best Reasons To Reach Out</h2>
      <ul>
        <li>Possible data mismatch between source and displayed values.</li>
        <li>Guide section that is unclear or outdated after a patch.</li>
        <li>Accessibility issues affecting readability or navigation.</li>
        <li>Suggestions for new reference topics and FAQ additions.</li>
      </ul>

      <h2>Contact Channel</h2>
      <p>
        Email: patrickpark208@gmail.com
      </p>
      <p>
        If this address changes, this page will be updated first.
      </p>

      <h2>What To Include In A Report</h2>
      <ol>
        <li>The page URL where the issue appears.</li>
        <li>A short description of expected vs actual behavior.</li>
        <li>Screenshots or copied text when relevant.</li>
        <li>Timestamp and region if the issue might be data freshness related.</li>
      </ol>

      <h2>Response Expectations</h2>
      <p>
        Not all reports can receive immediate responses, but high-impact issues (incorrect data mapping,
        broken page access, or misleading guide content) are prioritized for review.
      </p>

      <h2>Community Input Policy</h2>
      <p>
        Suggestions are reviewed for clarity, reproducibility, and player usefulness. The project aims
        to incorporate feedback that measurably improves educational value and usability.
      </p>

      <a className="legal-back" href="/">
        Back Home
      </a>
    </section>
  )
}

export default ContactPage
