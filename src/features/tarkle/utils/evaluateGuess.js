export function evaluateGuess(guess, solution) {
  const result = Array.from({ length: guess.length }, () => 'absent')
  const solutionLetters = solution.split('')

  for (let index = 0; index < guess.length; index += 1) {
    if (guess[index] === solutionLetters[index]) {
      result[index] = 'correct'
      solutionLetters[index] = null
    }
  }

  for (let index = 0; index < guess.length; index += 1) {
    if (result[index] !== 'absent') {
      continue
    }

    const matchIndex = solutionLetters.indexOf(guess[index])
    if (matchIndex > -1) {
      result[index] = 'present'
      solutionLetters[matchIndex] = null
    }
  }

  return result
}
