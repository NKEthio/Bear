import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './GrammarGame.css';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'Select the NOUN in this sentence:',
    sentence: 'The happy dog ran fast.',
    options: ['happy', 'dog', 'ran', 'fast'],
    answer: 'dog',
    explanation: 'A Noun is a person, place, or thing (dog).'
  },
  {
    id: 2,
    question: 'Select the VERB (Action) in this sentence:',
    sentence: 'Sarah sings a lovely song.',
    options: ['Sarah', 'sings', 'lovely', 'song'],
    answer: 'sings',
    explanation: 'A Verb describes an action or state (sings).'
  },
  {
    id: 3,
    question: 'Select the ADJECTIVE (Describing word):',
    sentence: 'I saw a big blue balloon.',
    options: ['saw', 'big', 'balloon', 'I'],
    answer: 'big',
    explanation: 'An Adjective describes a noun (big / blue).'
  },
  {
    id: 4,
    question: 'Which punctuation mark belongs at the end of a question?',
    sentence: 'Where are you going',
    options: ['. (Period)', '? (Question Mark)', '! (Exclamation Mark)', ', (Comma)'],
    answer: '? (Question Mark)',
    explanation: 'Questions end with a Question Mark (?).'
  },
  {
    id: 5,
    question: 'Identify the PRONOUN replacing the name:',
    sentence: 'Alex loves music. He plays guitar.',
    options: ['Alex', 'music', 'He', 'guitar'],
    answer: 'He',
    explanation: 'Pronouns like He, She, It replace nouns.'
  }
];

export default function GrammarGame() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const playSoundEffect = (isCorrect) => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = isCorrect ? 'sine' : 'sawtooth';
      osc.frequency.setValueAtTime(isCorrect ? 523.25 : 164.81, ctx.currentTime);
      if (isCorrect) {
        osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.2);
      } else {
        osc.frequency.exponentialRampToValueAtTime(110.0, ctx.currentTime + 0.2);
      }

      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSelectOption = (option) => {
    if (feedback !== null) return;
    setSelectedOpt(option);

    const isCorrect = option === currentQ.answer;
    playSoundEffect(isCorrect);

    if (isCorrect) {
      setScore((prev) => prev + 10);
      setFeedback({ success: true, text: '✨ Spot on! Great job!' });
    } else {
      if (navigator.vibrate) navigator.vibrate(200);
      setFeedback({ success: false, text: `Oops! ${currentQ.explanation}` });
    }
  };

  const handleNextQuestion = () => {
    setSelectedOpt(null);
    setFeedback(null);

    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsGameOver(true);
    }
  };

  const restartGame = () => {
    setCurrentIdx(0);
    setScore(0);
    setSelectedOpt(null);
    setFeedback(null);
    setIsGameOver(false);
  };

  return (
    <div className="grammar-game-container">
      <div className="grammar-header">
        <h1>🎯 Grammar Challenge Minigame</h1>
        <p>Test your knowledge of Nouns, Verbs, Adjectives & Punctuation!</p>
      </div>

      {!isGameOver ? (
        <motion.div
          key={currentQ.id}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="quiz-card"
        >
          <div className="progress-bar-container">
            <div
              className="progress-bar-fill"
              style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>

          <div className="status-row">
            <span>Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}</span>
            <span className="grammar-score">Score: {score} pts</span>
          </div>

          <h2 className="question-title">{currentQ.question}</h2>
          <div className="sentence-box">
            <p>&quot;{currentQ.sentence}&quot;</p>
          </div>

          <div className="options-grid">
            {currentQ.options.map((opt, i) => {
              let btnClass = 'option-btn';
              if (selectedOpt === opt) {
                btnClass += opt === currentQ.answer ? ' correct' : ' wrong';
              }

              return (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={btnClass}
                  onClick={() => handleSelectOption(opt)}
                  disabled={feedback !== null}
                >
                  {opt}
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`feedback-banner ${feedback.success ? 'success' : 'error'}`}
              >
                <p>{feedback.text}</p>
                <button className="next-q-btn" onClick={handleNextQuestion}>
                  {currentIdx + 1 < QUIZ_QUESTIONS.length ? 'Next Question ➔' : 'View Final Score 🏆'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="game-over-card"
        >
          <h2>🎉 Game Complete!</h2>
          <p className="final-score">Your Final Score: <strong>{score} / {QUIZ_QUESTIONS.length * 10}</strong></p>
          <p className="congrats-text">
            {score >= 40 ? '🌟 Grammar Master! Amazing work!' : '👍 Good effort! Keep practicing to get 100%!'}
          </p>

          <button className="restart-btn" onClick={restartGame}>🔄 Play Again</button>
        </motion.div>
      )}

      <div className="road">
        <Link to="/grammar" className="normal-link"><button>Back to Grammar</button></Link>
        <Link to="/games" className="normal-link"><button>All Games</button></Link>
      </div>
    </div>
  );
}
