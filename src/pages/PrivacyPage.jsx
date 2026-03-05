function PrivacyPage({ onBackHome }) {
  return (
    <section className="legal-page">
      <h1>Privacy Policy</h1>
      <p>
        Tarkle may use cookies and similar technologies to store game progress,
        remember mode selection, and support advertising.
      </p>
      <p>
        If ads are enabled, third-party ad providers may process device and
        browsing data to serve and measure ads. Refer to your selected ad
        provider policies for details.
      </p>
      <p>
        We store gameplay state in your browser local storage to support daily
        progress persistence and improved user experience.
      </p>
      <button className="legal-back" onClick={onBackHome} type="button">
        Back Home
      </button>
    </section>
  )
}

export default PrivacyPage
