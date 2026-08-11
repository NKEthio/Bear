import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const CLASSIFIER_QUESTIONS = [
  { sentence: "Clouds bring rain.", answer: "Statement" },
  { sentence: "What is your name?", answer: "Interrogative" },
  { sentence: "Lend me your pen, please.", answer: "Imperative" },
  { sentence: "What a beautiful surprise!", answer: "Exclamatory" },
  { sentence: "I have not seen her for a long time.", answer: "Statement" },
  { sentence: "Is she a pretty girl?", answer: "Interrogative" },
  { sentence: "Get ready to dance.", answer: "Imperative" },
  { sentence: "Terrible!", answer: "Exclamatory" },
  { sentence: "The sun rises in the east.", answer: "Statement" },
  { sentence: "Can you help me carry this?", answer: "Interrogative" },
  { sentence: "Please close the door quietly.", answer: "Imperative" },
  { sentence: "How wonderful this garden is!", answer: "Exclamatory" }
];

const OPTIONS = ["Statement", "Interrogative", "Imperative", "Exclamatory"];

const speakText = (text) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }
};

export default function SentenceClassifier({ onScoreUpdate }) {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    // Shuffle question list on load
    const shuffled = [...CLASSIFIER_QUESTIONS].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
    setCurrentIndex(0);
  }, []);

  const currentQuestion = shuffledQuestions[currentIndex];

  const handleAnswerSelect = (option) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
    setIsAnswered(true);

    if (option === currentQuestion.answer) {
      setFeedback("🎉 Excellent job! That is correct!");
      onScoreUpdate(10);
      speakText(currentQuestion.sentence);
    } else {
      setFeedback(`❌ Not quite! The correct answer is: ${currentQuestion.answer}`);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setFeedback("");
    setCurrentIndex((prev) => (prev + 1) % shuffledQuestions.length);
  };

  const handleSpeak = () => {
    if (currentQuestion) {
      speakText(currentQuestion.sentence);
    }
  };

  if (!currentQuestion) {
    return <div className="loading-container">Loading classifier...</div>;
  }

  return (
    <div className="sentence-subgame classifier-game">
      <div className="subgame-header">
        <h3>🔍 Sentence Classifier</h3>
        <p className="subgame-instruction">Read the sentence and choose its correct sentence type.</p>
      </div>

      <div className="sentence-card">
        <motion.p
          className="display-sentence"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          key={currentQuestion.sentence}
        >
          &ldquo;{currentQuestion.sentence}&rdquo;
        </motion.p>
        <button className="speak-sentence-btn" onClick={handleSpeak}>
          🔊 Read Sentence
        </button>
      </div>

      <div className="options-grid">
        {OPTIONS.map((option) => {
          let btnClass = "option-btn";
          if (isAnswered) {
            if (option === currentQuestion.answer) {
              btnClass += " correct";
            } else if (option === selectedAnswer) {
              btnClass += " incorrect";
            } else {
              btnClass += " disabled";
            }
          }

          return (
            <motion.button
              key={option}
              whileHover={!isAnswered ? { scale: 1.03 } : {}}
              whileTap={!isAnswered ? { scale: 0.97 } : {}}
              className={btnClass}
              onClick={() => handleAnswerSelect(option)}
              disabled={isAnswered}
            >
              {option}
            </motion.button>
          );
        })}
      </div>

      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`feedback-msg ${selectedAnswer === currentQuestion.answer ? 'success' : 'error'}`}
        >
          {feedback}
        </motion.div>
      )}

      {isAnswered && (
        <div className="game-controls">
          <button className="control-btn next-btn" onClick={handleNext}>
            Next Question 🚀
          </button>
        </div>
      )}
    </div>
  );
}

SentenceClassifier.propTypes = {
  onScoreUpdate: PropTypes.func.isRequired,
};
