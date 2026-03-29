import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const README_URL = 'https://raw.githubusercontent.com/FatherPatrick/Tarkle/main/README.md'
const REPO_URL = 'https://github.com/FatherPatrick/Tarkle'

function resolveReadmeLink(href = '') {
  if (!href) {
    return REPO_URL
  }

  if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:')) {
    return href
  }

  if (href.startsWith('#')) {
    return `${REPO_URL}#readme`
  }

  if (href.startsWith('/')) {
    return `${REPO_URL}/blob/main${href}`
  }

  return `${REPO_URL}/blob/main/${href}`
}

function HomePage() {
  const [readmeText, setReadmeText] = useState('')
  const [readmeStatus, setReadmeStatus] = useState('loading')

  useEffect(() => {
    let isActive = true

    async function loadReadme() {
      try {
        const response = await fetch(README_URL, { cache: 'no-store' })

        if (!response.ok) {
          throw new Error('readme-fetch-failed')
        }

        const text = await response.text()
        if (!isActive) {
          return
        }

        setReadmeText(text.trim())
        setReadmeStatus('ready')
      } catch {
        if (!isActive) {
          return
        }

        setReadmeStatus('error')
      }
    }

    loadReadme()

    return () => {
      isActive = false
    }
  }, [])

  return (
    <section className="home-landing">
      <p className="home-subtitle">Choose your mode and guess the Tarkov weapon or ammo.</p>

      <section className="home-info-block" aria-label="What is Tarkle">
        <h2>What Is Tarkle?</h2>
        <p>
          Tarkle is a stat-comparison guessing game inspired by Tarkov item data. You can play weapon
          or ammo rounds in daily and unlimited modes, then sharpen your decision making with built-in
          guides and glossaries.
        </p>
        <p>
          The goal is to turn raw stats into practical intuition. Instead of memorizing isolated
          numbers, each guess helps you learn patterns you can reuse in future rounds.
        </p>
        <a className="content-hub-link" href="/reference/how-tarkle-works">
          How Tarkle Works
        </a>
      </section>

      <section className="content-hub" aria-label="Guessing games">
        <h2>Guessing Games</h2>
        <p className="content-hub-subtitle">
          Pick a mode and sharpen your Tarkov stat intuition in daily or unlimited rounds.
        </p>

        <div className="content-hub-grid">
          <article className="content-hub-card">
            <h3>Tarkle Of The Day</h3>
            <p>One fixed daily weapon. You get one game run per day.</p>
            <a className="content-hub-link" href="/weapon/daily">
              Play Daily
            </a>
          </article>

          <article className="content-hub-card">
            <h3>Unlimited</h3>
            <p>Unlimited fresh games with a new random weapon each round.</p>
            <a className="content-hub-link" href="/weapon/unlimited">
              Play Unlimited
            </a>
          </article>

          <article className="content-hub-card">
            <h3>Ammo Of The Day</h3>
            <p>One fixed daily ammo round. One run per day.</p>
            <a className="content-hub-link" href="/ammo/daily">
              Play Ammo Daily
            </a>
          </article>

          <article className="content-hub-card">
            <h3>Ammo Unlimited</h3>
            <p>See a mystery round image and guess ammo with unlimited rounds.</p>
            <a className="content-hub-link" href="/ammo/unlimited">
              Play Ammo Unlimited
            </a>
          </article>
        </div>
        <div className="home-guessing-details">
          <section className="home-info-block" aria-label="How to play">
            <h2>How To Play</h2>
            <ol>
              <li>Pick a mode: weapon daily, weapon unlimited, ammo daily, or ammo unlimited.</li>
              <li>Submit your first guess as an information probe, not a random guess.</li>
              <li>Use mismatch feedback to narrow your next candidate quickly.</li>
              <li>Prioritize fixing the largest mismatch category each attempt.</li>
              <li>Use unlimited mode to practice and then apply the process in daily mode.</li>
            </ol>
          </section>

          <section className="home-info-block" aria-label="Scoring example">
            <h2>Scoring Example</h2>
            <p>
              Example ammo round with three filled guesses. Green means correct, amber means close,
              and red means wrong.
            </p>

            <div className="home-scoring-example" role="img" aria-label="Example filled ammo guesses with feedback colors">
              <div className="home-scoring-row home-scoring-row--head">
                <span>Guess</span>
                <span>Caliber</span>
                <span>Damage</span>
                <span>Pen</span>
              </div>

              <div className="home-scoring-row">
                <span className="home-score-cell home-score-cell--name">PP gs</span>
                <span className="home-score-cell home-score-cell--correct">9x19</span>
                <span className="home-score-cell home-score-cell--wrong">58</span>
                <span className="home-score-cell home-score-cell--wrong">20</span>
              </div>

              <div className="home-scoring-row">
                <span className="home-score-cell home-score-cell--name">PBP gzh</span>
                <span className="home-score-cell home-score-cell--correct">9x19</span>
                <span className="home-score-cell home-score-cell--close">52</span>
                <span className="home-score-cell home-score-cell--close">39</span>
              </div>

              <div className="home-scoring-row">
                <span className="home-score-cell home-score-cell--name">AP 6.3</span>
                <span className="home-score-cell home-score-cell--correct">9x19</span>
                <span className="home-score-cell home-score-cell--correct">52</span>
                <span className="home-score-cell home-score-cell--correct">30</span>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section className="content-hub" aria-label="BTR routes">
        <h2>BTR Routes</h2>
        <p className="content-hub-subtitle">
          Learn map-by-map BTR movement patterns to predict timing, lane pressure, and safer rotations.
        </p>

        <div className="content-hub-grid">
          <article className="content-hub-card btr-route-card">
            <h3>Streets of Tarkov</h3>
            <p>Open the live Streets tracker to review route stops, timing landmarks, and safer rotation reads.</p>
            <a className="content-hub-link" href="/reference/streets-btr-tracker">
              Open Tracker
            </a>
          </article>

          <article className="content-hub-card btr-route-card">
            <h3>Woods</h3>
            <p>Open the live Woods tracker to follow route stops, transit pressure, and map-side travel patterns.</p>
            <a className="content-hub-link" href="/reference/woods-btr-tracker">
              Open Tracker
            </a>
          </article>
        </div>
      </section>

      <section className="home-info-block" aria-label="Repository README">
        <h2>Project README</h2>
        <p className="home-update-rhythm">
          Live source: GitHub repository documentation.
        </p>

        {readmeStatus === 'loading' ? (
          <p className="home-readme-status">Loading README from GitHub...</p>
        ) : null}

        {readmeStatus === 'error' ? (
          <p className="home-readme-status home-readme-status--error">
            Could not load the README right now. Use the button below to open it on GitHub.
          </p>
        ) : null}

        {readmeStatus === 'ready' ? (
          <div className="home-readme-block home-readme-markdown" aria-label="Repository README content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ href, children, ...props }) => (
                  <a href={resolveReadmeLink(href)} target="_blank" rel="noreferrer" {...props}>
                    {children}
                  </a>
                ),
              }}
            >
              {readmeText}
            </ReactMarkdown>
          </div>
        ) : null}

        <a className="content-hub-link" href={REPO_URL} target="_blank" rel="noreferrer">
          Open On GitHub
        </a>
      </section>

    </section>
  )
}

export default HomePage
