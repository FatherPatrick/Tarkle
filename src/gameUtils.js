export const LETTER_STATE = {
  CORRECT: 'correct',   // right letter, right position (green)
  PRESENT: 'present',   // right letter, wrong position (yellow)
  ABSENT: 'absent',     // letter not in word (gray)
  EMPTY: 'empty',       // not yet guessed
  TBD: 'tbd',           // typed but not yet submitted
};

/**
 * Evaluates a guess against the target word and returns an array of letter states.
 * Handles duplicate letters correctly.
 */
export function evaluateGuess(guess, target) {
  const result = Array(5).fill(LETTER_STATE.ABSENT);
  const targetLetters = target.split('');
  const guessLetters = guess.split('');

  // First pass: mark correct letters
  guessLetters.forEach((letter, i) => {
    if (letter === targetLetters[i]) {
      result[i] = LETTER_STATE.CORRECT;
      targetLetters[i] = null; // consume the letter
    }
  });

  // Second pass: mark present letters
  guessLetters.forEach((letter, i) => {
    if (result[i] === LETTER_STATE.CORRECT) return;
    const targetIndex = targetLetters.indexOf(letter);
    if (targetIndex !== -1) {
      result[i] = LETTER_STATE.PRESENT;
      targetLetters[targetIndex] = null; // consume the letter
    }
  });

  return result;
}

/**
 * Returns the best known state for each letter across all evaluated guesses.
 */
export function getKeyboardStates(guesses, evaluations) {
  const states = {};
  const priority = {
    [LETTER_STATE.CORRECT]: 3,
    [LETTER_STATE.PRESENT]: 2,
    [LETTER_STATE.ABSENT]: 1,
    [LETTER_STATE.EMPTY]: 0,
  };

  guesses.forEach((guess, rowIndex) => {
    const evaluation = evaluations[rowIndex];
    if (!evaluation) return;
    guess.split('').forEach((letter, i) => {
      const newState = evaluation[i];
      const currentState = states[letter];
      if (!currentState || priority[newState] > priority[currentState]) {
        states[letter] = newState;
      }
    });
  });

  return states;
}

export function getRandomWord(words) {
  return words[Math.floor(Math.random() * words.length)];
}
