import { FIRE_RATE_CLOSE_RANGE } from '../constants/gameConfig'

function evaluateText(guessValue, solutionValue) {
  return guessValue === solutionValue ? 'correct' : 'wrong'
}

function evaluateFireModes(guessModes, solutionModes) {
  const guessSet = new Set(guessModes)
  const solutionSet = new Set(solutionModes)

  if (guessSet.size === solutionSet.size) {
    const exact = [...guessSet].every((mode) => solutionSet.has(mode))
    if (exact) {
      return 'correct'
    }
  }

  const hasOverlap = [...guessSet].some((mode) => solutionSet.has(mode))
  return hasOverlap ? 'close' : 'wrong'
}

function evaluateFireRate(guessRate, solutionRate) {
  if (guessRate === solutionRate) {
    return 'correct'
  }

  const distance = Math.abs(guessRate - solutionRate)
  return distance <= FIRE_RATE_CLOSE_RANGE ? 'close' : 'wrong'
}

export function evaluateWeaponGuess(guess, solution) {
  return {
    name: guess.id === solution.id ? 'correct' : 'wrong',
    weaponClass: evaluateText(guess.weaponClass, solution.weaponClass),
    caliber: evaluateText(guess.caliber, solution.caliber),
    fireModes: evaluateFireModes(guess.fireModes, solution.fireModes),
    fireRate: evaluateFireRate(guess.fireRate, solution.fireRate),
  }
}
