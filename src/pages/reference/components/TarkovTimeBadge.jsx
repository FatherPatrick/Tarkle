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

function TarkovTimeBadge() {
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
    <section className="tarkov-time-badge" aria-label="Current Tarkov in-game time">
      <p className="tarkov-time-label">In-Game Time</p>
      <p className="tarkov-time-value">{times.left}</p>
      <p className="tarkov-time-subvalue">+12h: {times.right}</p>
    </section>
  )
}

export default TarkovTimeBadge
