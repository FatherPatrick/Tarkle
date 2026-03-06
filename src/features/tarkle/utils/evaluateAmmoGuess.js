import { AMMO_CLOSE_RANGE } from '../constants/ammoConfig'

function evaluateText(guessValue, solutionValue) {
  return guessValue === solutionValue ? 'correct' : 'wrong'
}

function evaluateNumeric(guessValue, solutionValue, closeRange) {
  if (guessValue === solutionValue) {
    return 'correct'
  }

  const distance = Math.abs(guessValue - solutionValue)
  return distance <= closeRange ? 'close' : 'wrong'
}

export function evaluateAmmoGuess(guess, solution) {
  return {
    name: guess.id === solution.id ? 'correct' : 'wrong',
    caliber: evaluateText(guess.caliber, solution.caliber),
    damage: evaluateNumeric(guess.damage, solution.damage, AMMO_CLOSE_RANGE.damage),
    penetrationPower: evaluateNumeric(
      guess.penetrationPower,
      solution.penetrationPower,
      AMMO_CLOSE_RANGE.penetrationPower,
    ),
    armorDamage: evaluateNumeric(
      guess.armorDamage,
      solution.armorDamage,
      AMMO_CLOSE_RANGE.armorDamage,
    ),
    fragmentationChance: evaluateNumeric(
      guess.fragmentationChance,
      solution.fragmentationChance,
      AMMO_CLOSE_RANGE.fragmentationChance,
    ),
    projectileCount: evaluateText(guess.projectileCount, solution.projectileCount),
  }
}
