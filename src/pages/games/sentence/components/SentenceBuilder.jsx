import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

const BUILDER_DATA = [
  { words: ["The", "dog", "barks", "at", "the", "cat."], original: "The dog barks at the cat." },
  { words: ["She", "is", "singing", "a", "nice", "song."], original: "She is singing a nice song." },
  { words: ["The", "boy", "holds", "a", "blue", "ball."], original: "The boy holds a blue ball." },
  { words: ["We", "eat", "pizza", "for", "dinner."], original: "We eat pizza for dinner." },
  { words: ["Alice", "danced", "very", "well", "today."], original: "Alice danced very well today." },
  { words: ["My", "friend", "likes", "to", "play", "toys."], original: "My friend likes to play toys." },
  { words: ["The", "sun", "shines", "bright", "in", "the", "sky."], original: "The sun shines bright in the sky." },
  { words: ["They", "are", "reading", "a", "story", "book."], original: "They are reading a story book." }
];

const speakSentence = (text) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }
};

export default function SentenceBuilder({ onScoreUpdate }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledWords, setShuffledWords] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const currentItem = BUILDER_DATA[currentIndex];

  const initRound = useCallback((index) => {
    const item = BUILDER_DATA[index];
    const wordsWithId = item.words.map((word, i) => ({ id: `${word}-${i}`, text: word }));

    // Shuffle words until they are different from original sequence
    let scrambled = [...wordsWithId];
    let attempts = 0;
    while (attempts < 10) {
      scrambled.sort(() => Math.random() - 0.5);
      const scrambledText = scrambled.map(w => w.text).join(" ");
      if (scrambledText !== item.original) {
        break;
      }
      attempts++;
    }

    setShuffledWords(scrambled);
    setSelectedWords([]);
    setFeedback("");
    setIsCorrect(false);
  }, []);

  useEffect(() => {
    initRound(currentIndex);
  }, [currentIndex, initRound]);

  const handleWordSelect = (wordObj) => {
    if (isCorrect) return;
    setSelectedWords((prev) => [...prev, wordObj]);
    setShuffledWords((prev) => prev.filter((w) => w.id !== wordObj.id));
  };

  const handleWordDeselect = (wordObj) => {
    if (isCorrect) return;
    setShuffledWords((prev) => [...prev, wordObj]);
    setSelectedWords((prev) => prev.filter((w) => w.id !== wordObj.id));
  };

  const handleCheck = () => {
    const constructed = selectedWords.map(w => w.text).join(" ");
    if (constructed === currentItem.original) {
      setIsCorrect(true);
      setFeedback("🎉 Bravo! Correct Sentence!");
      onScoreUpdate(10);
      speakSentence(currentItem.original);
    } else {
      setFeedback("❌ Not quite right. Try arranging the words again!");
    }
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % BUILDER_DATA.length;
    setCurrentIndex(nextIndex);
  };

  const handleReset = () => {
    initRound(currentIndex);
  };

  const handleSpeak = () => {
    speakSentence(currentItem.original);
  };

  return (
    <div className="sentence-subgame builder-game">
      <div className="subgame-header">
        <h3>✏️ Sentence Builder</h3>
        <p className="subgame-instruction">Tap the words in the correct order to form a proper sentence.</p>
      </div>

      <div className="sentence-display-area">
        <div className="sentence-zone">
          <AnimatePresence>
            {selectedWords.length === 0 && (
              <span className="placeholder-text">Click the words below to build your sentence...</span>
            )}
            {selectedWords.map((wordObj) => (
              <motion.button
                key={wordObj.id}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                whileHover={{ scale: 1.05 }}
                className="word-bubble selected"
                onClick={() => handleWordDeselect(wordObj)}
              >
                {wordObj.text}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="choices-area">
        <div className="words-pool">
          <AnimatePresence>
            {shuffledWords.map((wordObj) => (
              <motion.button
                key={wordObj.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="word-bubble choice"
                onClick={() => handleWordSelect(wordObj)}
              >
                {wordObj.text}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`feedback-msg ${isCorrect ? 'success' : 'error'}`}
        >
          {feedback}
        </motion.div>
      )}

      <div className="game-controls">
        <button
          className="control-btn speak-btn"
          onClick={handleSpeak}
          title="Listen to sentence"
        >
          🔊 Listen
        </button>
        <button
          className="control-btn reset-btn"
          onClick={handleReset}
          disabled={selectedWords.length === 0 && shuffledWords.length === currentItem.words.length}
        >
          🔄 Reset
        </button>
        {!isCorrect ? (
          <button
            className="control-btn check-btn"
            onClick={handleCheck}
            disabled={shuffledWords.length > 0}
          >
            Check Sentence
          </button>
        ) : (
          <button className="control-btn next-btn" onClick={handleNext}>
            Next Question 🚀
          </button>
        )}
      </div>
    </div>
  );
}

SentenceBuilder.propTypes = {
  onScoreUpdate: PropTypes.func.isRequired,
};
