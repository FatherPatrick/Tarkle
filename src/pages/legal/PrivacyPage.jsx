function PrivacyPage() {
  return (
    <section className="legal-page">
      <h1>Privacy Policy</h1>
      <p className="content-updated">Last updated: March 29, 2026</p>
      <p>
        This page explains how Tarkle handles information when you use the website. Tarkle is designed
        as a lightweight game and reference site, and we aim to keep data handling limited to what is
        necessary for gameplay continuity, feedback handling, service reliability, and clear user
        disclosures.
      </p>

      <h2>Data We May Process</h2>
      <p>
        Tarkle may process basic technical information automatically, such as browser type, device
        characteristics, approximate location signals, and page interaction events. This information is
        typically used for security, performance monitoring, and understanding which pages are most
        useful.
      </p>

      <h2>Local Storage and Game Progress</h2>
      <p>
        We store gameplay state in your browser local storage to preserve daily progress and improve
        user experience between visits. Local storage data remains on your device unless you clear it
        through browser settings.
      </p>

      <h2>Cookies and Similar Technologies</h2>
      <p>
        Tarkle may use browser storage, cookies, or similar technologies for core site behavior,
        abuse prevention, and measurement. Some features may stop working as expected if you block
        storage or cookies at the browser level. Cookie behavior can also vary based on browser
        settings and region-specific consent requirements.
      </p>

      <h2>Current Advertising Status</h2>
      <p>
        Tarkle does not currently serve Google AdSense or other third-party display ads on site pages.
        If that changes, this policy will be updated before or when those placements are enabled.
      </p>

      <h2>If Google AdSense Is Enabled Later</h2>
      <p>
        If Google AdSense is enabled in the future, Google and its partners may use cookies, web
        beacons, IP address data, and similar identifiers to serve, measure, and in some regions
        personalize ads. That can include information about browser activity on this site and on other
        sites.
      </p>
      <p>
        Google explains these practices at https://policies.google.com/technologies/partner-sites.
        When ads are active, users can also review Google ad settings and local browser controls to
        manage personalization and cookie behavior.
      </p>
      <p>
        Tarkle does not control every downstream data practice of third-party advertising providers.
        Any third-party provider used later would process data under its own terms and privacy policy.
      </p>

      <h2>Analytics and Diagnostics</h2>
      <p>
        Site analytics, server logs, and operational diagnostics may be used to understand traffic
        patterns, page performance, form abuse, and feature usage. These signals help prioritize
        content updates and detect reliability or usability issues.
      </p>

      <h2>Children's Privacy</h2>
      <p>
        Tarkle is not intentionally directed at children under the age required by applicable law for
        independent consent. If you believe personal data from a child was provided improperly, contact
        us and we will review the request.
      </p>

      <h2>Data Retention</h2>
      <p>
        Retention periods depend on data type and purpose. Local storage persists until removed by the
        user. Contact submissions, service-level logs, and analytics data are retained only as long as
        needed for operational, security, moderation, or quality-improvement purposes.
      </p>

      <h2>Your Choices</h2>
      <ul>
        <li>Clear browser local storage to reset saved gameplay state.</li>
        <li>Use browser settings to block or limit cookies.</li>
        <li>Use provider opt-out settings where available if third-party ads are enabled later.</li>
        <li>Contact us for privacy-related questions or correction requests.</li>
      </ul>

      <h2>Contact</h2>
      <p>
        Privacy questions, correction requests, or disclosure questions can be sent to the contact
        address listed on the Contact page.
      </p>

      <h2>Policy Changes</h2>
      <p>
        This policy may be updated as features, providers, or legal requirements evolve. The latest
        revision date is shown at the top of this page.
      </p>
      <a className="legal-back" href="/">
        Back Home
      </a>
    </section>
  )
}

export default PrivacyPage
