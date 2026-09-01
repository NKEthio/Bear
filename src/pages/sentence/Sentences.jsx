import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Sentences.css';

const TUTORIAL_STEPS = [
  {
    id: 'intro',
    title: '1. What is a Sentence?',
    emoji: '🧱',
    description: 'A sentence is a team of words put together to build a complete thought or idea! Like building blocks!',
    example: 'The happy dog barks loudly.',
    interactiveParts: [
      { word: 'The happy dog', role: 'Who or What (Subject)', color: '#4299e1' },
      { word: 'barks loudly', role: 'Action (Predicate)', color: '#ed8936' }
    ]
  },
  {
    id: 'parts',
    title: '2. The Core Parts: Subject & Verb',
    emoji: '⚙️',
    description: 'Every great sentence has two superhero parts: The SUBJECT (who does it) and the VERB (the action happening).',
    example: 'Cats sleep.',
    interactiveParts: [
      { word: 'Cats', role: 'Subject (Who)', color: '#4299e1' },
      { word: 'sleep', role: 'Verb (Action)', color: '#48bb78' }
    ]
  },
  {
    id: 'types',
    title: '3. Sentence Types',
    emoji: '🎨',
    description: 'Sentences can do different jobs: Tell facts, ask questions, give commands, or shout with excitement!',
    types: [
      { name: 'Statement (.)', example: 'The sun shines bright.', icon: '☀️' },
      { name: 'Question (?)', example: 'Do you like apples?', icon: '❓' },
      { name: 'Command (!)', example: 'Clean your room now!', icon: '📢' },
      { name: 'Exclamation (!)', example: 'What a beautiful day!', icon: '🎉' }
    ]
  }
];

export default function Sentences() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedWord, setSelectedWord] = useState(null);

  const speakText = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  const currentTutorial = TUTORIAL_STEPS[activeStep];

  return (
    <main className="sentences-interactive-container" role="main">
      <div className="sentences-header">
        <h1>✨ Understanding Sentences</h1>
        <p className="subtitle">Learn how words come together to create thoughts & stories!</p>
      </div>

      {/* Step Tabs */}
      <div className="step-tabs">
        {TUTORIAL_STEPS.map((step, idx) => (
          <button
            key={step.id}
            className={`tab-btn ${activeStep === idx ? 'active' : ''}`}
            onClick={() => {
              setActiveStep(idx);
              setSelectedWord(null);
            }}
          >
            {step.emoji} Step {idx + 1}
          </button>
        ))}
      </div>

      {/* Main Interactive Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTutorial.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="tutorial-card"
        >
          <h2>{currentTutorial.title}</h2>
          <p className="tutorial-desc">{currentTutorial.description}</p>

          {currentTutorial.interactiveParts && (
            <div className="visualizer-box">
              <div className="visualizer-header">
                <span>🔊 Click any part to listen!</span>
              </div>
              <div className="sentence-display">
                {currentTutorial.interactiveParts.map((part, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="part-pill"
                    style={{ backgroundColor: part.color }}
                    onClick={() => {
                      setSelectedWord(part);
                      speakText(`${part.word}. This is the ${part.role}`);
                    }}
                  >
                    {part.word}
                  </motion.button>
                ))}
              </div>

              {selectedWord && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="role-info-badge"
                  style={{ borderColor: selectedWord.color }}
                >
                  <strong>{selectedWord.word}</strong> ➔ <span>{selectedWord.role}</span>
                </motion.div>
              )}
            </div>
          )}

          {currentTutorial.types && (
            <div className="types-grid">
              {currentTutorial.types.map((typeItem, index) => (
                <div key={index} className="type-card" onClick={() => speakText(typeItem.example)}>
                  <div className="type-icon">{typeItem.icon}</div>
                  <h3>{typeItem.name}</h3>
                  <p className="type-example">&quot;{typeItem.example}&quot;</p>
                  <span className="listen-hint">🔊 Click to listen</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Interactive Sentence Builder Playground */}
      <div className="playground-section">
        <h2>🎮 Quick Builder Playground</h2>
        <p>Pick a Subject and a Verb to form your own sentence!</p>
        <InteractivePlayground speakText={speakText} />
      </div>

      <div className="navigation-buttons">
        <Link to="/lessons" className="back-button">⬅ Back to Lessons</Link>
        <Link to="/games/sentences" className="next-button">Play Sentence Games 🎮</Link>
      </div>
    </main>
  );
}

function InteractivePlayground({ speakText }) {
  const subjects = ['The fluffy cat', 'My friend', 'A little bird', 'The robot'];
  const verbs = ['runs fast', 'sings happily', 'eats pizza', 'dances around'];

  const [selectedSub, setSelectedSub] = useState(subjects[0]);
  const [selectedVerb, setSelectedVerb] = useState(verbs[0]);

  const fullSentence = `${selectedSub} ${selectedVerb}.`;

  return (
    <div className="builder-playground">
      <div className="selectors-wrapper">
        <div className="selector-group">
          <label>Choose Subject (Who):</label>
          <div className="options-row">
            {subjects.map((sub) => (
              <button
                key={sub}
                className={`choice-chip ${selectedSub === sub ? 'selected' : ''}`}
                onClick={() => setSelectedSub(sub)}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        <div className="selector-group">
          <label>Choose Action (Verb):</label>
          <div className="options-row">
            {verbs.map((v) => (
              <button
                key={v}
                className={`choice-chip verb ${selectedVerb === v ? 'selected' : ''}`}
                onClick={() => setSelectedVerb(v)}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="result-sentence-box">
        <h3>Your Sentence:</h3>
        <p className="result-text">{fullSentence}</p>
        <button className="speak-sentence-btn" onClick={() => speakText(fullSentence)}>
          🔊 Listen to Sentence
        </button>
      </div>
    </div>
  );
}

InteractivePlayground.propTypes = {
  speakText: PropTypes.func.isRequired,
};
