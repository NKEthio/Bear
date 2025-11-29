import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { auth, db } from '../../../firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import './SpellingBeeGame.css';

const wordsByLevel = {
  easy: ['Cat', 'Dog', 'Bed', 'Cup', 'Red', 'Sun', 'Hat', 'Pot', 'Box', 'Pen'],
  medium: ['Goat', 'Blue', 'Star', 'Ball', 'Lamp', 'Fork', 'Belt', 'Duck', 'Frog', 'Kite'],
  hard: ['Bread', 'Green', 'Circle', 'Chair', 'Clock', 'Square', 'Dress', 'Tiger', 'Mouse', 'Pizza'],
};

export default function SpellingBeeGame() {
  const [currentWord, setCurrentWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState('easy');
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [wordsCompleted, setWordsCompleted] = useState(0);
  const [lives, setLives] = useState(3);
  const [showHint, setShowHint] = useState(false);
  const [user, setUser] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const saveScore = useCallback(async () => {
    if (!user) return;
    try {
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      const currentScore = userDoc.exists() ? userDoc.data().score || 0 : 0;
      await updateDoc(userRef, {
        score: currentScore + score,
        lastUpdated: new Date().toISOString(),
      });
    } catch (err) {
      console.error('Error saving score:', err);
    }
  }, [user, score]);

  useEffect(() => {
    return () => {
      saveScore();
    };
  }, [saveScore]);

  const speakWord = useCallback((word) => {
    const speech = new SpeechSynthesisUtterance(word);
    speech.lang = 'en-US';
    speech.rate = 0.6;
    window.speechSynthesis.speak(speech);
  }, []);

  const getNewWord = useCallback(() => {
    const words = wordsByLevel[level];
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(randomWord.toUpperCase());
    setUserInput('');
    setFeedback('');
    setShowHint(false);
    setTimeout(() => speakWord(randomWord), 500);
  }, [level, speakWord]);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setWordsCompleted(0);
    setLives(3);
    setIsGameOver(false);
    getNewWord();
  };

  const checkSpelling = () => {
    if (userInput.toUpperCase() === currentWord) {
      const points = level === 'easy' ? 10 : level === 'medium' ? 15 : 25;
      setScore(score + points);
      setWordsCompleted(wordsCompleted + 1);
      setFeedback(`🎉 Perfect Spelling! +${points} points!`);
      setFeedbackType('success');
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        getNewWord();
      }, 2000);
    } else {
      setLives(lives - 1);
      if (lives <= 1) {
        setFeedback(`Game Over! The word was: ${currentWord}`);
        setFeedbackType('gameover');
        setIsGameOver(true);
      } else {
        setFeedback(`Oops! Try again! 💪 Lives left: ${lives - 1}`);
        setFeedbackType('error');
      }
    }
  };

  const handleKeyPress = (letter) => {
    setUserInput(userInput + letter);
  };

  const handleBackspace = () => {
    setUserInput(userInput.slice(0, -1));
  };

  const handleClear = () => {
    setUserInput('');
  };

  return (
    <div className="spelling-bee-container">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}

      <motion.h1
        className="spelling-title"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        🐝 Spelling Bee 🐝
      </motion.h1>

      {!gameStarted ? (
        <motion.div
          className="spelling-start-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="spelling-instructions">
            <h2>🎧 How to Play</h2>
            <p>Listen to the word and spell it correctly!</p>
            <ul>
              <li>🔊 Click the speaker to hear the word</li>
              <li>⌨️ Use the keyboard to type letters</li>
              <li>❤️ You have 3 lives - be careful!</li>
            </ul>
          </div>
          <div className="level-selection">
            <h3>Choose Your Level</h3>
            <div className="level-options">
              <motion.button
                className={`level-btn ${level === 'easy' ? 'selected' : ''}`}
                onClick={() => setLevel('easy')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🟢 Easy
              </motion.button>
              <motion.button
                className={`level-btn ${level === 'medium' ? 'selected' : ''}`}
                onClick={() => setLevel('medium')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🟡 Medium
              </motion.button>
              <motion.button
                className={`level-btn ${level === 'hard' ? 'selected' : ''}`}
                onClick={() => setLevel('hard')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🔴 Hard
              </motion.button>
            </div>
          </div>
          <motion.button
            className="spelling-start-btn"
            onClick={startGame}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Spelling! 🚀
          </motion.button>
        </motion.div>
      ) : (
        <div className="spelling-game-area">
          <div className="spelling-stats">
            <div className="stat-item">
              <span className="stat-label">Score</span>
              <span className="stat-value">{score}</span>
            </div>
            <div className="stat-item lives">
              <span className="stat-label">Lives</span>
              <span className="stat-value">{'❤️'.repeat(lives)}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Words</span>
              <span className="stat-value">{wordsCompleted}</span>
            </div>
          </div>

          <div className="word-area">
            <motion.button
              className="speak-word-btn"
              onClick={() => speakWord(currentWord)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              🔊 Listen to Word
            </motion.button>

            <motion.button
              className="hint-btn"
              onClick={() => setShowHint(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={showHint}
            >
              💡 Show Hint
            </motion.button>

            {showHint && (
              <motion.div
                className="hint-display"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Hint: {currentWord.length} letters, starts with &quot;{currentWord[0]}&quot;
              </motion.div>
            )}
          </div>

          <div className="spelling-input-area">
            <div className="letter-display">
              {currentWord.split('').map((_, index) => (
                <motion.span
                  key={index}
                  className={`letter-box ${userInput[index] ? 'filled' : ''}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {userInput[index] || '_'}
                </motion.span>
              ))}
            </div>

            <div className="virtual-keyboard">
              {['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'].map((row, rowIndex) => (
                <div key={rowIndex} className="keyboard-row">
                  {row.split('').map((letter) => (
                    <motion.button
                      key={letter}
                      className="key-btn"
                      onClick={() => handleKeyPress(letter)}
                      whileHover={{ scale: 1.1, backgroundColor: '#ffd700' }}
                      whileTap={{ scale: 0.9 }}
                      disabled={isGameOver}
                    >
                      {letter}
                    </motion.button>
                  ))}
                </div>
              ))}
              <div className="keyboard-row special-keys">
                <motion.button
                  className="key-btn delete-btn"
                  onClick={handleBackspace}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={isGameOver}
                >
                  ⌫
                </motion.button>
                <motion.button
                  className="key-btn clear-btn"
                  onClick={handleClear}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={isGameOver}
                >
                  Clear
                </motion.button>
                <motion.button
                  className="key-btn check-btn"
                  onClick={checkSpelling}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={isGameOver || userInput.length !== currentWord.length}
                >
                  ✓ Check
                </motion.button>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {feedback && (
              <motion.div
                className={`spelling-feedback ${feedbackType}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
              >
                {feedback}
              </motion.div>
            )}
          </AnimatePresence>

          {isGameOver && (
            <motion.button
              className="play-again-btn"
              onClick={startGame}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Play Again 🎮
            </motion.button>
          )}
        </div>
      )}
    </div>
  );
}
