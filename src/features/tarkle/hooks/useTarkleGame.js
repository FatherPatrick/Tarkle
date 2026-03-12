import { useEffect, useMemo, useState } from 'react'
import {
  FALLBACK_WEAPON_BANK,
  getRandomSolution,
  MAX_ATTEMPTS,
} from '../constants/gameConfig'
import { fetchTarkovWeapons } from '../utils/fetchTarkovWeaponBank'
import { evaluateWeaponGuess } from '../utils/evaluateWeaponGuess'

const DAILY_ATTEMPT_KEY = 'tarkle-daily-attempt-date'
const DAILY_STATE_KEY = 'tarkle-daily-state'
const DAILY_STREAK_KEY = 'tarkle-daily-win-streak'

function getTodayKey() {
  return new Date().toISOString().slice(0, 10)
}

function getPreviousDayKey(dateKey) {
  const date = new Date(`${dateKey}T00:00:00Z`)
  date.setUTCDate(date.getUTCDate() - 1)
  return date.toISOString().slice(0, 10)
}

function hashSeed(input) {
  let hash = 0

  for (let index = 0; index < input.length; index += 1) {
    hash = (hash * 31 + input.charCodeAt(index)) >>> 0
  }

  return hash
}

function getDailySolution(bank, dateKey) {
  if (!bank.length) {
    return FALLBACK_WEAPON_BANK[0]
  }

  const dailyIndex = hashSeed(dateKey) % bank.length
  return bank[dailyIndex]
}

function getDirectionHint(guessValue, solutionValue) {
  if (guessValue === solutionValue) {
    return 'match'
  }

  return guessValue < solutionValue ? 'up' : 'down'
}

function readDailyState() {
  try {
    const rawState = localStorage.getItem(DAILY_STATE_KEY)
    return rawState ? JSON.parse(rawState) : null
  } catch {
    return null
  }
}

function writeDailyState(state) {
  localStorage.setItem(DAILY_STATE_KEY, JSON.stringify(state))
}

function readDailyStreak() {
  try {
    const rawStreak = localStorage.getItem(DAILY_STREAK_KEY)

    if (!rawStreak) {
      return {
        count: 0,
        lastWinDate: null,
      }
    }

    const parsed = JSON.parse(rawStreak)

    return {
      count: Number.isInteger(parsed?.count) ? parsed.count : 0,
      lastWinDate:
        typeof parsed?.lastWinDate === 'string' ? parsed.lastWinDate : null,
    }
  } catch {
    return {
      count: 0,
      lastWinDate: null,
    }
  }
}

function writeDailyStreak(streak) {
  localStorage.setItem(DAILY_STREAK_KEY, JSON.stringify(streak))
}

function calculateNextWinStreak(dateKey) {
  const currentStreak = readDailyStreak()

  if (currentStreak.lastWinDate === dateKey) {
    return currentStreak
  }

  if (currentStreak.lastWinDate === getPreviousDayKey(dateKey)) {
    return {
      count: currentStreak.count + 1,
      lastWinDate: dateKey,
    }
  }

  return {
    count: 1,
    lastWinDate: dateKey,
  }
}

function buildAttemptsFromIds(guessedWeaponIds, bank, solution) {
  return guessedWeaponIds
    .map((weaponId, index) => {
      const guessedWeapon = bank.find((weapon) => weapon.id === weaponId)

      if (!guessedWeapon) {
        return null
      }

      return {
        id: `${guessedWeapon.id}-${index}`,
        weapon: guessedWeapon,
        evaluation: evaluateWeaponGuess(guessedWeapon, solution),
        numericHints: {
          fireRate: getDirectionHint(guessedWeapon.fireRate, solution.fireRate),
        },
        isEmpty: false,
      }
    })
    .filter(Boolean)
}

function resolveDailySession(bank, dateKey) {
  const persisted = readDailyState()

  if (!persisted || persisted.date !== dateKey) {
    // Cleanup old/stale legacy lock flag for new day or first-time play.
    localStorage.removeItem(DAILY_ATTEMPT_KEY)

    return {
      solution: getDailySolution(bank, dateKey),
      attempts: [],
      status: 'playing',
      message: 'Tarkle Of The Day: one run only. Choose carefully.',
      lockSubmission: false,
    }
  }

  const guessedWeaponIds = Array.isArray(persisted.guessedWeaponIds)
    ? persisted.guessedWeaponIds
    : []

  const solutionFromState =
    bank.find((weapon) => weapon.id === persisted.solutionId) ||
    persisted.solution ||
    getDailySolution(bank, dateKey)

  const restoredAttempts = buildAttemptsFromIds(
    guessedWeaponIds,
    bank,
    solutionFromState,
  )

  if (persisted.status === 'won') {
    return {
      solution: solutionFromState,
      attempts: restoredAttempts,
      status: 'won',
      message: `Daily complete. You solved it: ${solutionFromState.name}.`,
      lockSubmission: true,
    }
  }

  if (persisted.status === 'lost') {
    return {
      solution: solutionFromState,
      attempts: restoredAttempts,
      status: 'lost',
      message: `Daily complete. The weapon was ${solutionFromState.name}.`,
      lockSubmission: true,
    }
  }

  return {
    solution: solutionFromState,
    attempts: restoredAttempts,
    status: 'playing',
    message: 'Daily in progress. Continue your run.',
    lockSubmission: false,
  }
}

export function useTarkleGame(mode = 'unlimited') {
  const isDailyMode = mode === 'daily'
  const [weaponBank, setWeaponBank] = useState(FALLBACK_WEAPON_BANK)
  const [solution, setSolution] = useState(() =>
    getRandomSolution(FALLBACK_WEAPON_BANK),
  )
  const [selectedWeaponId, setSelectedWeaponId] = useState('')
  const [attempts, setAttempts] = useState([])
  const [status, setStatus] = useState('playing')
  const [message, setMessage] = useState('Choose a weapon and submit your guess.')
  const [isLoadingWeapons, setIsLoadingWeapons] = useState(false)
  const [isDailyLocked, setIsDailyLocked] = useState(false)
  const [hotStreakDays, setHotStreakDays] = useState(0)

  const canSubmit =
    status === 'playing' &&
    !isDailyLocked &&
    Boolean(selectedWeaponId) &&
    attempts.length < MAX_ATTEMPTS

  useEffect(() => {
    let cancelled = false
    const todayKey = getTodayKey()

    if (isDailyMode) {
      setHotStreakDays(readDailyStreak().count)
      const dailySession = resolveDailySession(FALLBACK_WEAPON_BANK, todayKey)

      setSolution(dailySession.solution)
      setAttempts(dailySession.attempts)
      setStatus(dailySession.status)
      setMessage(dailySession.message)
      setIsDailyLocked(dailySession.lockSubmission)
    }

    setIsLoadingWeapons(true)

    async function loadWeaponBank() {
      try {
        const apiWeapons = await fetchTarkovWeapons()

        if (!cancelled && apiWeapons.length) {
          const sortedWeapons = [...apiWeapons].sort((a, b) =>
            a.name.localeCompare(b.name),
          )

          setWeaponBank(sortedWeapons)

          if (isDailyMode) {
            setHotStreakDays(readDailyStreak().count)
            const dailySession = resolveDailySession(sortedWeapons, todayKey)

            setSolution(dailySession.solution)
            setAttempts(dailySession.attempts)
            setStatus(dailySession.status)
            setMessage(dailySession.message)
            setIsDailyLocked(dailySession.lockSubmission)
          } else {
            setSolution(getRandomSolution(sortedWeapons))
            setAttempts([])
            setStatus('playing')
            setIsDailyLocked(false)
            setMessage('Tarkov weapons loaded. Make your first guess.')
          }
        }
      } catch {
        if (!cancelled) {
          if (!isDailyMode) {
            setMessage('Using fallback weapon data. API is unavailable right now.')
          }

          if (isDailyMode) {
            setHotStreakDays(readDailyStreak().count)
            const dailySession = resolveDailySession(FALLBACK_WEAPON_BANK, todayKey)

            setSolution(dailySession.solution)
            setAttempts(dailySession.attempts)
            setStatus(dailySession.status)
            setMessage(dailySession.message)
            setIsDailyLocked(dailySession.lockSubmission)
          }
        }
      } finally {
        if (!cancelled) {
          setIsLoadingWeapons(false)
        }
      }
    }

    loadWeaponBank()

    return () => {
      cancelled = true
    }
  }, [isDailyMode])

  const attemptsWithRemaining = useMemo(() => {
    const placeholders = Array.from({ length: MAX_ATTEMPTS - attempts.length }).map(
      (_, index) => ({
        id: `empty-${index}`,
        isEmpty: true,
      }),
    )

    return [...attempts, ...placeholders]
  }, [attempts])

  const submitGuess = () => {
    if (!canSubmit) {
      return
    }

    const guessedWeapon = weaponBank.find((weapon) => weapon.id === selectedWeaponId)

    if (!guessedWeapon) {
      setMessage('Choose a valid weapon from the list.')
      return
    }

    const evaluation = evaluateWeaponGuess(guessedWeapon, solution)
    const numericHints = {
      fireRate: getDirectionHint(guessedWeapon.fireRate, solution.fireRate),
    }

    const nextAttempts = [
      ...attempts,
      {
        id: `${guessedWeapon.id}-${attempts.length}`,
        weapon: guessedWeapon,
        evaluation,
        numericHints,
        isEmpty: false,
      },
    ]

    setAttempts(nextAttempts)
    setSelectedWeaponId('')

    const todayKey = getTodayKey()

    if (guessedWeapon.id === solution.id) {
      setStatus('won')
      setMessage(`Correct. It was ${solution.name}.`)

      if (isDailyMode) {
        const nextStreak = calculateNextWinStreak(todayKey)
        writeDailyStreak(nextStreak)
        setHotStreakDays(nextStreak.count)

        writeDailyState({
          date: todayKey,
          solutionId: solution.id,
          solution,
          guessedWeaponIds: nextAttempts.map((attempt) => attempt.weapon.id),
          status: 'won',
        })
        localStorage.setItem(DAILY_ATTEMPT_KEY, todayKey)
        setIsDailyLocked(true)
      }

      return
    }

    if (nextAttempts.length >= MAX_ATTEMPTS) {
      setStatus('lost')
      setMessage(`Out of guesses. The answer was ${solution.name}.`)

      if (isDailyMode) {
        writeDailyStreak({ count: 0, lastWinDate: null })
        setHotStreakDays(0)

        writeDailyState({
          date: todayKey,
          solutionId: solution.id,
          solution,
          guessedWeaponIds: nextAttempts.map((attempt) => attempt.weapon.id),
          status: 'lost',
        })
        localStorage.setItem(DAILY_ATTEMPT_KEY, todayKey)
        setIsDailyLocked(true)
      }

      return
    }

    if (isDailyMode) {
      writeDailyState({
        date: todayKey,
        solutionId: solution.id,
        solution,
        guessedWeaponIds: nextAttempts.map((attempt) => attempt.weapon.id),
        status: 'playing',
      })
      localStorage.setItem(DAILY_ATTEMPT_KEY, todayKey)
    }

    setMessage(`${MAX_ATTEMPTS - nextAttempts.length} guesses remaining.`)
  }

  const resetGame = () => {
    if (isDailyMode) {
      setMessage('Tarkle Of The Day allows one game per day. Try Unlimited for more.')
      return
    }

    setSolution(getRandomSolution(weaponBank))
    setAttempts([])
    setSelectedWeaponId('')
    setStatus('playing')
    setMessage('New weapon selected. Choose a weapon and submit your guess.')
  }

  return {
    attempts: attemptsWithRemaining,
    guessCount: attempts.length,
    guessesRemaining: MAX_ATTEMPTS - attempts.length,
    weaponBank,
    solution,
    selectedWeaponId,
    setSelectedWeaponId,
    submitGuess,
    canSubmit,
    status,
    message,
    isLoadingWeapons,
    resetGame,
    hotStreakDays,
  }
}
