import { useEffect, useState } from 'react'

const SECONDS_PER_DAY = 24 * 60 * 60
const TARKOV_TIME_SCALE = 7
const HALF_DAY_SECONDS = 12 * 60 * 60
const TARKOV_TIME_OFFSET_SECONDS = 10800

function formatClock(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = Math.floor(totalSeconds % 60)

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function getTarkovTimes(nowMs = Date.now()) {
  const scaledSeconds = (nowMs / 1000) * TARKOV_TIME_SCALE + TARKOV_TIME_OFFSET_SECONDS
  const leftTimeSeconds = ((scaledSeconds % SECONDS_PER_DAY) + SECONDS_PER_DAY) % SECONDS_PER_DAY
  const rightTimeSeconds = (leftTimeSeconds + HALF_DAY_SECONDS) % SECONDS_PER_DAY

  return {
    left: formatClock(leftTimeSeconds),
    right: formatClock(rightTimeSeconds),
  }
}

const RECENT_UPDATES = [
  'Home page now includes project-context and update callouts.',
  'Left-side navigation layout improved discoverability across sections.',
  'BTR tracker pages were added and then upgraded with in-game time support.',
]

function AppRightRail() {
  const [times, setTimes] = useState(() => getTarkovTimes())

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setTimes(getTarkovTimes())
    }, 140)

    return () => {
      window.clearInterval(timerId)
    }
  }, [])

  return (
    <aside className="app-right-rail" aria-label="Sidebar project highlights">
      <section className="app-right-rail-card">
        <h2 className="app-right-rail-title">In game time</h2>
        <div className="app-right-time" aria-label="Current Tarkov in-game time">
          <p className="app-right-time-label">Current</p>
          <p className="app-right-time-value">{times.left}</p>
          <p className="app-right-time-subvalue">+12h: {times.right}</p>
        </div>
      </section>

      <section className="app-right-rail-card">
        <h2 className="app-right-rail-title">Project pulse</h2>
        <p className="app-right-rail-note">Actively updated in March 2026.</p>
        <ul className="app-right-rail-list">
          {RECENT_UPDATES.map((update) => (
            <li key={update}>{update}</li>
          ))}
        </ul>
      </section>

      <section className="app-right-rail-card">
        <h2 className="app-right-rail-title">Data source</h2>
        <p className="app-right-rail-note">Weapon and ammo values are sourced from:</p>
        <a
          className="app-right-rail-link app-right-rail-link--external"
          href="https://api.tarkov.dev/graphql"
          target="_blank"
          rel="noreferrer"
        >
          api.tarkov.dev/graphql
        </a>
      </section>
    </aside>
  )
}

export default AppRightRail
