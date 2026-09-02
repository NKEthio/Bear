import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const SUB_PRED_QUESTIONS = [
  {
    sentence: "Alice danced very well.",
    target: "Subject",
    options: ["Alice", "danced very well."],
    answer: "Alice"
  },
  {
    sentence: "Alice danced very well.",
    target: "Predicate",
    options: ["Alice", "danced very well."],
    answer: "danced very well."
  },
  {
    sentence: "Boys from the next block broke the street lamp.",
    target: "Subject",
    options: ["Boys from the next block", "broke the street lamp."],
    answer: "Boys from the next block"
  },
  {
    sentence: "Boys from the next block broke the street lamp.",
    target: "Predicate",
    options: ["Boys from the next block", "broke the street lamp."],
    answer: "broke the street lamp."
  },
  {
    sentence: "Mary is singing a song.",
    target: "Subject",
    options: ["Mary", "is singing a song."],
    answer: "Mary"
  },
  {
    sentence: "Mary is singing a song.",
    target: "Predicate",
    options: ["Mary", "is singing a song."],
    answer: "is singing a song."
  },
  {
    sentence: "John eats a banana.",
    target: "Subject",
    options: ["John", "eats a banana."],
    answer: "John"
  },
  {
    sentence: "John eats a banana.",
    target: "Predicate",
    options: ["John", "eats a banana."],
    answer: "eats a banana."
  },
  {
    sentence: "The hungry dog barked loudly.",
    target: "Subject",
    options: ["The hungry dog", "barked loudly."],
    answer: "The hungry dog"
  },
  {
    sentence: "The hungry dog barked loudly.",
    target: "Predicate",
    options: ["The hungry dog", "barked loudly."],
    answer: "barked loudly."
  }
];

const speakText = (text) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }
};

export default function SubjectPredicate({ onScoreUpdate }) {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    const shuffled = [...SUB_PRED_QUESTIONS].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
    setCurrentIndex(0);
  }, []);

  const currentQuestion = shuffledQuestions[currentIndex];

  const handleAnswerSelect = (option) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
    setIsAnswered(true);

    if (option === currentQuestion.answer) {
      setFeedback(`🎉 Awesome! "${option}" is indeed the correct ${currentQuestion.target}!`);
      onScoreUpdate(10);
      speakText(currentQuestion.sentence);
    } else {
      setFeedback(`❌ Incorrect. The correct ${currentQuestion.target} is: "${currentQuestion.answer}"`);
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
    return <div className="loading-container">Loading subject/predicate game...</div>;
  }

  return (
    <div className="sentence-subgame subject-predicate-game">
      <div className="subgame-header">
        <h3>🎯 Subject &amp; Predicate</h3>
        <p className="subgame-instruction">Identify whether the subject or the predicate of the sentence is highlighted.</p>
      </div>

      <div className="question-target-prompt">
        Identify the <strong className="target-highlight">{currentQuestion.target}</strong> in:
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

      <div className="sub-pred-choices">
        {currentQuestion.options.map((option) => {
          let btnClass = "sub-pred-btn";
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
              whileHover={!isAnswered ? { scale: 1.02 } : {}}
              whileTap={!isAnswered ? { scale: 0.98 } : {}}
              className={btnClass}
              onClick={() => handleAnswerSelect(option)}
              disabled={isAnswered}
            >
              <div className="option-label">
                {option === currentQuestion.answer && isAnswered ? "Correct ✅" : option === selectedAnswer ? "Incorrect ❌" : "Option"}
              </div>
              <div className="option-text">{option}</div>
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

SubjectPredicate.propTypes = {
  onScoreUpdate: PropTypes.func.isRequired,
};
