import { useEffect, useMemo, useState } from 'react'
import {
  FALLBACK_AMMO_BANK,
  getRandomAmmoSolution,
  MAX_AMMO_ATTEMPTS,
} from '../constants/ammoConfig'
import { evaluateAmmoGuess } from '../utils/evaluateAmmoGuess'
import { fetchTarkovAmmoBank } from '../utils/fetchTarkovAmmoBank'

const DAILY_AMMO_ATTEMPT_KEY = 'tarkle-ammo-daily-attempt-date'
const DAILY_AMMO_STATE_KEY = 'tarkle-ammo-daily-state'

function getTodayKey() {
  return new Date().toISOString().slice(0, 10)
}

function hashSeed(input) {
  let hash = 0

  for (let index = 0; index < input.length; index += 1) {
    hash = (hash * 31 + input.charCodeAt(index)) >>> 0
  }

  return hash
}

function getDailyAmmoSolution(bank, dateKey) {
  if (!bank.length) {
    return FALLBACK_AMMO_BANK[0]
  }

  const dailyIndex = hashSeed(dateKey) % bank.length
  return bank[dailyIndex]
}

function readDailyAmmoState() {
  try {
    const rawState = localStorage.getItem(DAILY_AMMO_STATE_KEY)
    return rawState ? JSON.parse(rawState) : null
  } catch {
    return null
  }
}

function writeDailyAmmoState(state) {
  localStorage.setItem(DAILY_AMMO_STATE_KEY, JSON.stringify(state))
}

function buildAmmoAttemptsFromIds(guessedAmmoIds, bank, solution) {
  return guessedAmmoIds
    .map((ammoId, index) => {
      const guessedAmmo = bank.find((ammo) => ammo.id === ammoId)

      if (!guessedAmmo) {
        return null
      }

      return {
        id: `${guessedAmmo.id}-${index}`,
        ammo: guessedAmmo,
        evaluation: evaluateAmmoGuess(guessedAmmo, solution),
        numericHints: {
          damage: getDirectionHint(guessedAmmo.damage, solution.damage),
          penetrationPower: getDirectionHint(
            guessedAmmo.penetrationPower,
            solution.penetrationPower,
          ),
          armorDamage: getDirectionHint(guessedAmmo.armorDamage, solution.armorDamage),
          fragmentationChance: getDirectionHint(
            guessedAmmo.fragmentationChance,
            solution.fragmentationChance,
          ),
        },
        isEmpty: false,
      }
    })
    .filter(Boolean)
}

function resolveDailyAmmoSession(bank, dateKey) {
  const persisted = readDailyAmmoState()

  if (!persisted || persisted.date !== dateKey) {
    localStorage.removeItem(DAILY_AMMO_ATTEMPT_KEY)

    return {
      solution: getDailyAmmoSolution(bank, dateKey),
      attempts: [],
      status: 'playing',
      message: 'Ammo Of The Day: one run only. Choose carefully.',
      lockSubmission: false,
    }
  }

  const guessedAmmoIds = Array.isArray(persisted.guessedAmmoIds)
    ? persisted.guessedAmmoIds
    : []

  const solutionFromState =
    bank.find((ammo) => ammo.id === persisted.solutionId) ||
    persisted.solution ||
    getDailyAmmoSolution(bank, dateKey)

  const restoredAttempts = buildAmmoAttemptsFromIds(
    guessedAmmoIds,
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
      message: `Daily complete. The ammo was ${solutionFromState.name}.`,
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

function getDirectionHint(guessValue, solutionValue) {
  if (guessValue === solutionValue) {
    return 'match'
  }

  return guessValue < solutionValue ? 'up' : 'down'
}

export function useAmmoGame(mode = 'ammo-unlimited') {
  const isDailyMode = mode === 'ammo-daily'
  const [ammoBank, setAmmoBank] = useState(FALLBACK_AMMO_BANK)
  const [solution, setSolution] = useState(() => getRandomAmmoSolution(FALLBACK_AMMO_BANK))
  const [selectedAmmoId, setSelectedAmmoId] = useState('')
  const [attempts, setAttempts] = useState([])
  const [status, setStatus] = useState('playing')
  const [message, setMessage] = useState('Guess the ammo by its stats.')
  const [isLoadingAmmo, setIsLoadingAmmo] = useState(false)
  const [isDailyLocked, setIsDailyLocked] = useState(false)

  const canSubmit =
    status === 'playing' &&
    !isDailyLocked &&
    Boolean(selectedAmmoId) &&
    attempts.length < MAX_AMMO_ATTEMPTS

  useEffect(() => {
    let cancelled = false
    const todayKey = getTodayKey()

    if (isDailyMode) {
      const dailySession = resolveDailyAmmoSession(FALLBACK_AMMO_BANK, todayKey)

      setSolution(dailySession.solution)
      setAttempts(dailySession.attempts)
      setStatus(dailySession.status)
      setMessage(dailySession.message)
      setIsDailyLocked(dailySession.lockSubmission)
    }

    setIsLoadingAmmo(true)

    async function loadAmmoBank() {
      try {
        const apiAmmo = await fetchTarkovAmmoBank()

        if (!cancelled && apiAmmo.length) {
          const sortedAmmo = [...apiAmmo].sort((a, b) => a.name.localeCompare(b.name))

          setAmmoBank(sortedAmmo)

          if (isDailyMode) {
            const dailySession = resolveDailyAmmoSession(sortedAmmo, todayKey)

            setSolution(dailySession.solution)
            setAttempts(dailySession.attempts)
            setStatus(dailySession.status)
            setMessage(dailySession.message)
            setIsDailyLocked(dailySession.lockSubmission)
          } else {
            setSolution(getRandomAmmoSolution(sortedAmmo))
            setAttempts([])
            setStatus('playing')
            setIsDailyLocked(false)
            setMessage('Ammo data loaded. Identify the round from the image.')
          }
        }
      } catch {
        if (!cancelled) {
          if (!isDailyMode) {
            setMessage('Using fallback ammo data. API is unavailable right now.')
          }

          if (isDailyMode) {
            const dailySession = resolveDailyAmmoSession(FALLBACK_AMMO_BANK, todayKey)

            setSolution(dailySession.solution)
            setAttempts(dailySession.attempts)
            setStatus(dailySession.status)
            setMessage(dailySession.message)
            setIsDailyLocked(dailySession.lockSubmission)
          }
        }
      } finally {
        if (!cancelled) {
          setIsLoadingAmmo(false)
        }
      }
    }

    loadAmmoBank()

    return () => {
      cancelled = true
    }
  }, [isDailyMode])

  const attemptsWithRemaining = useMemo(() => {
    const placeholders = Array.from({ length: MAX_AMMO_ATTEMPTS - attempts.length }).map(
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

    const guessedAmmo = ammoBank.find((ammo) => ammo.id === selectedAmmoId)

    if (!guessedAmmo) {
      setMessage('Choose a valid ammo round from the list.')
      return
    }

    const evaluation = evaluateAmmoGuess(guessedAmmo, solution)
    const numericHints = {
      damage: getDirectionHint(guessedAmmo.damage, solution.damage),
      penetrationPower: getDirectionHint(
        guessedAmmo.penetrationPower,
        solution.penetrationPower,
      ),
      armorDamage: getDirectionHint(guessedAmmo.armorDamage, solution.armorDamage),
      fragmentationChance: getDirectionHint(
        guessedAmmo.fragmentationChance,
        solution.fragmentationChance,
      ),
    }

    const nextAttempts = [
      ...attempts,
      {
        id: `${guessedAmmo.id}-${attempts.length}`,
        ammo: guessedAmmo,
        evaluation,
        numericHints,
        isEmpty: false,
      },
    ]

    setAttempts(nextAttempts)
    setSelectedAmmoId('')

    const todayKey = getTodayKey()

    if (guessedAmmo.id === solution.id) {
      setStatus('won')
      setMessage(`Correct. It was ${solution.name}.`)

      if (isDailyMode) {
        writeDailyAmmoState({
          date: todayKey,
          solutionId: solution.id,
          solution,
          guessedAmmoIds: nextAttempts.map((attempt) => attempt.ammo.id),
          status: 'won',
        })
        localStorage.setItem(DAILY_AMMO_ATTEMPT_KEY, todayKey)
        setIsDailyLocked(true)
      }

      return
    }

    if (nextAttempts.length >= MAX_AMMO_ATTEMPTS) {
      setStatus('lost')
      setMessage(`Out of guesses. The answer was ${solution.name}.`)

      if (isDailyMode) {
        writeDailyAmmoState({
          date: todayKey,
          solutionId: solution.id,
          solution,
          guessedAmmoIds: nextAttempts.map((attempt) => attempt.ammo.id),
          status: 'lost',
        })
        localStorage.setItem(DAILY_AMMO_ATTEMPT_KEY, todayKey)
        setIsDailyLocked(true)
      }

      return
    }

    if (isDailyMode) {
      writeDailyAmmoState({
        date: todayKey,
        solutionId: solution.id,
        solution,
        guessedAmmoIds: nextAttempts.map((attempt) => attempt.ammo.id),
        status: 'playing',
      })
      localStorage.setItem(DAILY_AMMO_ATTEMPT_KEY, todayKey)
    }

    setMessage(`${MAX_AMMO_ATTEMPTS - nextAttempts.length} guesses remaining.`)
  }

  const resetGame = () => {
    if (isDailyMode) {
      setMessage('Ammo Of The Day allows one game per day. Try Ammo Unlimited for more.')
      return
    }

    setSolution(getRandomAmmoSolution(ammoBank))
    setAttempts([])
    setSelectedAmmoId('')
    setStatus('playing')
    setIsDailyLocked(false)
    setMessage('New ammo selected. Guess the round from the image.')
  }

  return {
    attempts: attemptsWithRemaining,
    ammoBank,
    solution,
    selectedAmmoId,
    setSelectedAmmoId,
    submitGuess,
    canSubmit,
    status,
    message,
    isLoadingAmmo,
    resetGame,
  }
}
