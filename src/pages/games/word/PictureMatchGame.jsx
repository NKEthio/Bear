import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { auth, db } from '../../../firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import './PictureMatchGame.css';

const allItems = {
  animals: ['Cat', 'Dog', 'Cow', 'Hen', 'Pig', 'Goat'],
  food: ['Bread', 'Pizza', 'Cheese', 'Butter'],
  colors: ['Red', 'Blue', 'Green', 'Yellow'],
  shapes: ['Star', 'Circle', 'Square', 'Triangle'],
};

export default function PictureMatchGame() {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');
  const [user, setUser] = useState(null);
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const generateCards = useCallback((level) => {
    const pairsCount = level === 'easy' ? 4 : level === 'medium' ? 6 : 8;
    const allCategoryKeys = Object.keys(allItems);
    const selectedItems = [];

    while (selectedItems.length < pairsCount) {
      const randomCategoryKey = allCategoryKeys[Math.floor(Math.random() * allCategoryKeys.length)];
      const randomCategory = allItems[randomCategoryKey];
      const randomItem = randomCategory[Math.floor(Math.random() * randomCategory.length)];
      
      const itemWithCategory = { name: randomItem, category: randomCategoryKey };
      if (!selectedItems.some(item => item.name === randomItem && item.category === randomCategoryKey)) {
        selectedItems.push(itemWithCategory);
      }
    }

    const pairs = [];
    selectedItems.forEach((item, index) => {
      pairs.push({
        id: `${item.name}-${index}-image`,
        type: 'image',
        value: item.name,
        category: item.category,
        matchId: `${item.name}-${index}`,
      });
      pairs.push({
        id: `${item.name}-${index}-word`,
        type: 'word',
        value: item.name,
        category: item.category,
        matchId: `${item.name}-${index}`,
      });
    });

    return pairs.sort(() => Math.random() - 0.5);
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

  const startGame = (level) => {
    setDifficulty(level);
    setCards(generateCards(level));
    setSelectedCards([]);
    setMatchedPairs([]);
    setScore(0);
    setMoves(0);
    setGameStarted(true);
    setGameComplete(false);
  };

  useEffect(() => {
    if (selectedCards.length === 2) {
      setMoves(moves + 1);
      const [first, second] = selectedCards;
      
      if (first.matchId === second.matchId && first.type !== second.type) {
        // Match found!
        const points = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 15 : 20;
        setScore(score + points);
        setMatchedPairs(prev => [...prev, first.matchId]);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 1500);
        
        // Speak the word
        const speech = new SpeechSynthesisUtterance(first.value);
        speech.lang = 'en-US';
        speech.rate = 0.8;
        window.speechSynthesis.speak(speech);
      }
      
      setTimeout(() => setSelectedCards([]), 1000);
    }
  }, [selectedCards, score, moves, difficulty]);

  useEffect(() => {
    if (gameStarted && matchedPairs.length > 0 && matchedPairs.length === cards.length / 2) {
      setGameComplete(true);
      setShowConfetti(true);
    }
  }, [matchedPairs, cards, gameStarted]);

  const handleCardClick = (card) => {
    if (
      selectedCards.length < 2 &&
      !matchedPairs.includes(card.matchId) &&
      !selectedCards.some(c => c.id === card.id)
    ) {
      setSelectedCards([...selectedCards, card]);
    }
  };

  const isFlipped = (card) => {
    return selectedCards.some(c => c.id === card.id) || matchedPairs.includes(card.matchId);
  };

  return (
    <div className="picture-match-container">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}

      <motion.h1
        className="match-game-title"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        🖼️ Picture Match 🔤
      </motion.h1>

      {!gameStarted ? (
        <motion.div
          className="match-start-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="match-instructions">
            <h2>🎮 How to Play</h2>
            <p>Match pictures with their words!</p>
            <ul>
              <li>🃏 Flip two cards at a time</li>
              <li>🎯 Match a picture with its word</li>
              <li>⭐ Get bonus points for fewer moves!</li>
            </ul>
          </div>
          <div className="difficulty-buttons">
            <motion.button
              className="difficulty-btn easy"
              onClick={() => startGame('easy')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              🟢 Easy (4 pairs)
            </motion.button>
            <motion.button
              className="difficulty-btn medium"
              onClick={() => startGame('medium')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              🟡 Medium (6 pairs)
            </motion.button>
            <motion.button
              className="difficulty-btn hard"
              onClick={() => startGame('hard')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              🔴 Hard (8 pairs)
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <div className="match-game-area">
          <div className="match-score-board">
            <div className="match-score-item">
              <span className="match-score-label">Score</span>
              <span className="match-score-value">{score}</span>
            </div>
            <div className="match-score-item">
              <span className="match-score-label">Moves</span>
              <span className="match-score-value">{moves}</span>
            </div>
            <div className="match-score-item">
              <span className="match-score-label">Pairs Left</span>
              <span className="match-score-value">{cards.length / 2 - matchedPairs.length}</span>
            </div>
          </div>

          <div className={`match-grid ${difficulty}`}>
            {cards.map((card) => (
              <motion.div
                key={card.id}
                className={`match-card ${isFlipped(card) ? 'flipped' : ''} ${matchedPairs.includes(card.matchId) ? 'matched' : ''}`}
                onClick={() => handleCardClick(card)}
                whileHover={{ scale: isFlipped(card) ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="match-card-inner">
                  <div className="match-card-front">
                    <span className="card-question">?</span>
                  </div>
                  <div className="match-card-back">
                    {card.type === 'image' ? (
                      <img
                        src={`/wordImages/${card.category}/${card.value}.JPG`}
                        alt={card.value}
                        className="card-image"
                      />
                    ) : (
                      <span className="card-word">{card.value}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            className="match-restart-btn"
            onClick={() => startGame(difficulty)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🔄 Restart
          </motion.button>

          <AnimatePresence>
            {gameComplete && (
              <motion.div
                className="match-complete-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="match-complete-modal"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <h2>🎉 Amazing! 🎉</h2>
                  <p>You matched all the pairs!</p>
                  <div className="final-stats">
                    <p>Score: {score} points</p>
                    <p>Moves: {moves}</p>
                  </div>
                  <div className="complete-buttons">
                    <motion.button
                      className="play-again-btn"
                      onClick={() => startGame(difficulty)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Play Again 🎮
                    </motion.button>
                    <motion.button
                      className="change-difficulty-btn"
                      onClick={() => setGameStarted(false)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Change Difficulty 🎯
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
