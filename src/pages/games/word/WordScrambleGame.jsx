import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { auth, db } from '../../../firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import './WordScrambleGame.css';

const categories = {
  animals: ['Cat', 'Dog', 'Cow', 'Hen', 'Pig', 'Ant', 'Goat'],
  food: ['Bread', 'Pizza', 'Cheese'],
  colors: ['Red', 'Blue', 'Green', 'Yellow'],
  shapes: ['Star', 'Circle', 'Square'],
  home: ['Bed', 'Cup', 'Pot', 'Box'],
};

export default function WordScrambleGame() {
  const [currentWord, setCurrentWord] = useState('');
  const [scrambledWord, setScrambledWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [streak, setStreak] = useState(0);
  const [hint, setHint] = useState('');
  const [currentCategory, setCurrentCategory] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const scrambleWord = (word) => {
    const letters = word.toUpperCase().split('');
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    // Make sure the scrambled word is different from the original
    if (letters.join('') === word.toUpperCase()) {
      return scrambleWord(word);
    }
    return letters.join('');
  };

  const getNewWord = useCallback(() => {
    const categoryKeys = Object.keys(categories);
    const randomCategoryKey = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
    const randomCategory = categories[randomCategoryKey];
    const randomWord = randomCategory[Math.floor(Math.random() * randomCategory.length)];
    
    setCurrentWord(randomWord.toUpperCase());
    setScrambledWord(scrambleWord(randomWord));
    setCurrentCategory(randomCategoryKey);
    setUserInput('');
    setFeedback('');
    setHint('');
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

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setStreak(0);
    getNewWord();
  };

  const checkAnswer = () => {
    if (userInput.toUpperCase() === currentWord) {
      const points = 10 + streak * 2;
      setScore(score + points);
      setStreak(streak + 1);
      setFeedback(`🎉 Awesome! +${points} points!`);
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        getNewWord();
      }, 2000);
    } else {
      setStreak(0);
      setFeedback('🤔 Try again! You can do it!');
    }
  };

  const getHint = () => {
    if (hint.length < currentWord.length) {
      const newHint = currentWord.substring(0, hint.length + 1);
      setHint(newHint);
      if (score > 0) {
        setScore(score - 2);
      }
    }
  };

  const speakWord = () => {
    const speech = new SpeechSynthesisUtterance(currentWord);
    speech.lang = 'en-US';
    speech.rate = 0.7;
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="word-scramble-container">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      
      <motion.h1 
        className="game-title"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        🔤 Word Scramble 🔤
      </motion.h1>

      {!gameStarted ? (
        <motion.div 
          className="start-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="game-instructions">
            <h2>🎮 How to Play</h2>
            <p>Unscramble the letters to find the hidden word!</p>
            <ul>
              <li>🌟 Each correct answer = 10+ points</li>
              <li>🔥 Build your streak for bonus points!</li>
              <li>💡 Use hints if you need help (costs 2 points)</li>
            </ul>
          </div>
          <motion.button 
            className="start-btn"
            onClick={startGame}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Game! 🚀
          </motion.button>
        </motion.div>
      ) : (
        <motion.div 
          className="game-area"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="score-board">
            <div className="score-item">
              <span className="score-label">Score</span>
              <span className="score-value">{score}</span>
            </div>
            <div className="score-item streak">
              <span className="score-label">Streak</span>
              <span className="score-value">🔥 {streak}</span>
            </div>
          </div>

          <div className="category-badge">
            Category: {currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)}
          </div>

          <motion.div 
            className="scrambled-word"
            key={scrambledWord}
            initial={{ rotateY: 180, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {scrambledWord.split('').map((letter, index) => (
              <motion.span 
                key={index}
                className="letter-tile"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>

          {hint && (
            <motion.div 
              className="hint-display"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Hint: {hint}{'_'.repeat(currentWord.length - hint.length)}
            </motion.div>
          )}

          <input
            type="text"
            className="word-input"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value.replace(/[^a-zA-Z]/g, ''))}
            onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
            placeholder="Type your answer..."
            maxLength={currentWord.length}
          />

          <div className="action-buttons">
            <motion.button 
              className="action-btn check-btn"
              onClick={checkAnswer}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ✓ Check
            </motion.button>
            <motion.button 
              className="action-btn hint-btn"
              onClick={getHint}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={hint.length >= currentWord.length}
            >
              💡 Hint
            </motion.button>
            <motion.button 
              className="action-btn speak-btn"
              onClick={speakWord}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🔊 Hear Word
            </motion.button>
            <motion.button 
              className="action-btn skip-btn"
              onClick={getNewWord}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ⏭ Skip
            </motion.button>
          </div>

          <AnimatePresence>
            {feedback && (
              <motion.div 
                className={`feedback ${feedback.includes('Awesome') ? 'success' : 'try-again'}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
              >
                {feedback}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
