import { useState, useEffect, useCallback } from 'react';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import Toast from './components/Toast';
import { WORDS, VALID_GUESSES } from './wordList';
import { evaluateGuess, getKeyboardStates, getRandomWord, LETTER_STATE } from './gameUtils';
import './App.css';

const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

const ALL_VALID_WORDS = new Set([...WORDS, ...VALID_GUESSES].map((w) => w.toUpperCase()));

const WIN_MESSAGES = [
  'Brilliant!',
  'Magnificent!',
  'Impressive!',
  'Splendid!',
  'Great!',
  'Phew!',
];

function App() {
  const [targetWord, setTargetWord] = useState(() => getRandomWord(WORDS));
  const [guesses, setGuesses] = useState(Array(MAX_GUESSES).fill(''));
  const [currentGuess, setCurrentGuess] = useState('');
  const [currentRow, setCurrentRow] = useState(0);
  const [evaluations, setEvaluations] = useState(Array(MAX_GUESSES).fill(null));
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing' | 'won' | 'lost'
  const [toastMessage, setToastMessage] = useState('');
  const [shakeRow, setShakeRow] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
  };

  const handleKey = useCallback(
    (key) => {
      if (gameStatus !== 'playing') return;

      if (key === '⌫' || key === 'BACKSPACE') {
        setCurrentGuess((prev) => prev.slice(0, -1));
        return;
      }

      if (key === 'ENTER') {
        if (currentGuess.length < WORD_LENGTH) {
          showToast('Not enough letters');
          setShakeRow(currentRow);
          setTimeout(() => setShakeRow(null), 600);
          return;
        }

        const upperGuess = currentGuess.toUpperCase();
        if (!ALL_VALID_WORDS.has(upperGuess)) {
          showToast('Not in word list');
          setShakeRow(currentRow);
          setTimeout(() => setShakeRow(null), 600);
          return;
        }

        const evaluation = evaluateGuess(upperGuess, targetWord);
        const newGuesses = [...guesses];
        newGuesses[currentRow] = upperGuess;
        const newEvaluations = [...evaluations];
        newEvaluations[currentRow] = evaluation;

        setGuesses(newGuesses);
        setEvaluations(newEvaluations);

        if (evaluation.every((s) => s === LETTER_STATE.CORRECT)) {
          setGameStatus('won');
          setTimeout(() => showToast(WIN_MESSAGES[currentRow] || 'Genius!'), 1800);
        } else if (currentRow + 1 >= MAX_GUESSES) {
          setGameStatus('lost');
          setTimeout(() => showToast(targetWord), 1800);
        }

        setCurrentRow((prev) => prev + 1);
        setCurrentGuess('');
        return;
      }

      if (/^[A-Za-z]$/.test(key) && currentGuess.length < WORD_LENGTH) {
        setCurrentGuess((prev) => prev + key.toUpperCase());
      }
    },
    [gameStatus, currentGuess, currentRow, guesses, evaluations, targetWord]
  );

  // Physical keyboard support
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      handleKey(e.key.toUpperCase());
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleKey]);

  const handleNewGame = () => {
    setTargetWord(getRandomWord(WORDS));
    setGuesses(Array(MAX_GUESSES).fill(''));
    setCurrentGuess('');
    setCurrentRow(0);
    setEvaluations(Array(MAX_GUESSES).fill(null));
    setGameStatus('playing');
    setToastMessage('');
    setShakeRow(null);
  };

  const keyboardStates = getKeyboardStates(guesses, evaluations);

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">TARKLE</h1>
        <p className="app__subtitle">Tarkov Wordle</p>
      </header>

      <Toast message={toastMessage} onDismiss={() => setToastMessage('')} />

      <main className="app__main">
        <Board
          guesses={guesses}
          currentGuess={currentGuess}
          evaluations={evaluations}
          currentRow={currentRow}
          shakeRow={shakeRow}
        />
      </main>

      <footer className="app__footer">
        <Keyboard
          onKey={handleKey}
          letterStates={keyboardStates}
          disabled={gameStatus !== 'playing'}
        />

        {gameStatus !== 'playing' && (
          <button className="app__new-game-btn" onClick={handleNewGame}>
            New Game
          </button>
        )}
      </footer>
    </div>
  );
}

export default App;
